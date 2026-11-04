import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import confetti from 'canvas-confetti';
import {
  Download,
  X,
  FileImage,
  FileText,
  CheckCircle2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore.js';
import {
  PRINT_SIZE_PRESETS,
  PrintSizePreset,
  calculateExportDimensions,
  calculateCoverFit,
  generateCalendarGrid,
  getHeartSvgPath,
} from '@framecraft/shared';
import { drawHeartPath } from '../canvas/HeartPath.js';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const project = useEditorStore((state) => state.project);

  const [selectedFormat, setSelectedFormat] = useState<'png' | 'jpg' | 'pdf'>('png');
  const [selectedPresetId, setSelectedPresetId] = useState<string>('8x10');
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  if (!isOpen || !project) return null;

  const currentPreset =
    PRINT_SIZE_PRESETS.find((p) => p.id === selectedPresetId) || PRINT_SIZE_PRESETS[2];

  /**
   * Dedicated high-resolution export renderer.
   * Directly draws onto an off-screen HTML5 Canvas at full target DPI resolution,
   * completely independent of current editor zoom or screen viewport.
   */
  const renderDesignToCanvas = async (
    targetW: number,
    targetH: number
  ): Promise<HTMLCanvasElement> => {
    const offCanvas = document.createElement('canvas');
    offCanvas.width = targetW;
    offCanvas.height = targetH;
    const ctx = offCanvas.getContext('2d')!;

    setExportProgress(10);

    // 1. Draw Background
    ctx.fillStyle = project.background.color || '#ffffff';
    ctx.fillRect(0, 0, targetW, targetH);

    setExportProgress(25);

    // 2. Pre-load all assigned photos
    const loadedImages: Record<string, HTMLImageElement> = {};
    const photoLoadPromises = Object.entries(project.assignedPhotos).map(
      ([slotId, assigned]) =>
        new Promise<void>((resolve) => {
          if (!assigned.photoUrl) return resolve();
          const img = new Image();
          img.crossOrigin = 'anonymous';
          img.src = assigned.photoUrl;
          img.onload = () => {
            loadedImages[slotId] = img;
            resolve();
          };
          img.onerror = () => resolve();
        })
    );

    await Promise.all(photoLoadPromises);
    setExportProgress(60);

    // Helpers to render each element type onto off-screen canvas
    const drawSlot = (slot: (typeof project.slots)[0]) => {
      const sx = Math.round(slot.x * targetW);
      const sy = Math.round(slot.y * targetH);
      const sw = Math.round(slot.width * targetW);
      const sh = Math.round(slot.height * targetH);
      const rot = slot.rotation || 0;
      const isPolaroid = slot.shape === 'polaroid';

      ctx.save();

      // Apply rotation around slot center if present
      if (rot) {
        ctx.translate(sx + sw / 2, sy + sh / 2);
        ctx.rotate((rot * Math.PI) / 180);
        ctx.translate(-(sx + sw / 2), -(sy + sh / 2));
      }

      // If polaroid, draw white photo frame card with shadow
      if (isPolaroid) {
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,0.18)';
        ctx.shadowBlur = 20 * (targetW / project.canvasWidth);
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(sx, sy, sw, sh);
        ctx.restore();
      }

      const pMargin = isPolaroid ? Math.round(sw * 0.06) : 0;
      const pChin = isPolaroid ? Math.round(sh * 0.18) : 0;
      const photoX = sx + pMargin;
      const photoY = sy + pMargin;
      const photoW = isPolaroid ? sw - pMargin * 2 : sw;
      const photoH = isPolaroid ? sh - pMargin - pChin : sh;

      // Clipping Path per shape
      ctx.save();
      ctx.beginPath();
      if (slot.shape === 'heart') {
        ctx.translate(photoX, photoY);
        drawHeartPath(ctx, photoW, photoH);
        ctx.clip();
        ctx.translate(-photoX, -photoY);
      } else if (slot.shape === 'circle') {
        const radius = Math.min(photoW, photoH) / 2;
        ctx.arc(photoX + photoW / 2, photoY + photoH / 2, radius, 0, Math.PI * 2);
        ctx.clip();
      } else if (slot.shape === 'rounded') {
        const r = (slot.borderRadius || 20) * (targetW / project.canvasWidth);
        ctx.roundRect(photoX, photoY, photoW, photoH, r);
        ctx.clip();
      } else {
        ctx.rect(photoX, photoY, photoW, photoH);
        ctx.clip();
      }

      // Draw photo or placeholder
      const img = loadedImages[slot.id];
      const assigned = project.assignedPhotos[slot.id];
      if (img && assigned) {
        const fit = calculateCoverFit(photoW, photoH, img.width, img.height);
        const crop = assigned.crop || { scale: 1, x: 0, y: 0 };
        const effectiveScale = fit.baseScale * (crop.scale || 1);
        const rw = img.width * effectiveScale;
        const rh = img.height * effectiveScale;

        const scaleRatio = targetW / project.canvasWidth;
        const px = photoX + (photoW - rw) / 2 + (crop.x || 0) * scaleRatio;
        const py = photoY + (photoH - rh) / 2 + (crop.y || 0) * scaleRatio;

        ctx.drawImage(img, px, py, rw, rh);
      } else {
        ctx.fillStyle = '#18181b';
        ctx.fillRect(photoX, photoY, photoW, photoH);
      }

      ctx.restore();

      // Border stroke (if not polaroid)
      if (!isPolaroid && slot.borderWidth) {
        ctx.save();
        ctx.lineWidth = (slot.borderWidth || 4) * (targetW / project.canvasWidth);
        ctx.strokeStyle = slot.borderColor || '#ffffff';

        if (slot.shape === 'heart') {
          ctx.translate(photoX, photoY);
          drawHeartPath(ctx, photoW, photoH);
          ctx.stroke();
          ctx.translate(-photoX, -photoY);
        } else if (slot.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(photoX + photoW / 2, photoY + photoH / 2, Math.min(photoW, photoH) / 2, 0, Math.PI * 2);
          ctx.stroke();
        } else if (slot.shape === 'rounded') {
          const r = (slot.borderRadius || 20) * (targetW / project.canvasWidth);
          ctx.beginPath();
          ctx.roundRect(photoX, photoY, photoW, photoH, r);
          ctx.stroke();
        } else {
          ctx.strokeRect(photoX, photoY, photoW, photoH);
        }
        ctx.restore();
      }

      ctx.restore();
    };

    const drawCalendar = (cal: NonNullable<typeof project.calendarConfig>) => {
      const cx = Math.round(cal.x * targetW);
      const cy = Math.round(cal.y * targetH);
      const cw = Math.round(cal.width * targetW);
      const ch = Math.round(cal.height * targetH);

      const gridData = generateCalendarGrid(cal);
      const colWidth = cw / 7;
      const headerHeight = (cal.showMonthHeader !== false ? 50 : 0) * (targetW / project.canvasWidth);
      const weekdaysHeight = 36 * (targetW / project.canvasWidth);
      const daysStartY = cy + headerHeight + weekdaysHeight;
      const rowHeight = (ch - headerHeight - weekdaysHeight) / gridData.weeks.length;

      ctx.save();

      // Header title
      if (cal.showMonthHeader !== false) {
        ctx.font = `bold ${Math.round(32 * (targetW / project.canvasWidth))}px "Playfair Display", serif`;
        ctx.fillStyle = cal.headerColor || '#0f172a';
        ctx.textAlign = 'center';
        ctx.fillText(
          `${gridData.monthName.toUpperCase()} ${gridData.year}`,
          cx + cw / 2,
          cy + 36 * (targetW / project.canvasWidth)
        );
      }

      // Weekday Row
      ctx.font = `bold ${Math.round(18 * (targetW / project.canvasWidth))}px Inter, sans-serif`;
      ctx.fillStyle = cal.dayNumberColor || '#64748b';
      ctx.textAlign = 'center';
      gridData.weekdays.forEach((dayName, colIdx) => {
        ctx.fillText(
          dayName.toUpperCase(),
          cx + colIdx * colWidth + colWidth / 2,
          cy + headerHeight + 24 * (targetW / project.canvasWidth)
        );
      });

      // Days Grid & Highlights
      gridData.weeks.forEach((week, rowIdx) => {
        week.forEach((cell, colIdx) => {
          if (cell.day === null) return;
          const cellCenterX = cx + colIdx * colWidth + colWidth / 2;
          const cellCenterY = daysStartY + rowIdx * rowHeight + rowHeight / 2;

          // Draw highlight badge
          if (cell.isHighlighted) {
            ctx.fillStyle = cell.highlightColor || cal.accentColor || '#e11d48';
            ctx.beginPath();
            ctx.arc(cellCenterX, cellCenterY - 4, 18 * (targetW / project.canvasWidth), 0, Math.PI * 2);
            ctx.fill();
          }

          // Draw day number
          ctx.font = `${cell.isHighlighted ? 'bold' : 'normal'} ${Math.round(
            20 * (targetW / project.canvasWidth)
          )}px Inter, sans-serif`;
          ctx.fillStyle = cell.isHighlighted ? '#ffffff' : cal.dayNumberColor || '#1e293b';
          ctx.textAlign = 'center';
          ctx.fillText(String(cell.day), cellCenterX, cellCenterY + 4);
        });
      });

      ctx.restore();
    };

    const drawDecorative = (dec: (typeof project.decorativeElements)[0]) => {
      const dx = Math.round(dec.x * targetW);
      const dy = Math.round(dec.y * targetH);
      const dw = dec.width <= 1 ? Math.round(dec.width * targetW) : Math.round(dec.width * (targetW / project.canvasWidth));
      const dh = dec.height <= 1 ? Math.round(dec.height * targetH) : Math.round(dec.height * (targetH / project.canvasHeight));
      const rot = dec.rotation || 0;

      ctx.save();
      ctx.translate(dx, dy);
      if (rot) {
        ctx.rotate((rot * Math.PI) / 180);
      }
      ctx.globalAlpha = dec.opacity ?? 1;

      if (dec.type === 'line') {
        ctx.fillStyle = dec.color || '#cbd5e1';
        ctx.fillRect(0, 0, dw, Math.max(2, dh));
      } else if (dec.type === 'heart') {
        drawHeartPath(ctx, dw, dh);
        ctx.fillStyle = dec.color || '#f43f5e';
        ctx.fill();
      } else if (dec.type === 'star') {
        const starPath = new Path2D('M 25,1 L 32.5,17 L 50,19.5 L 37.5,31.5 L 40.5,49 L 25,40.5 L 9.5,49 L 12.5,31.5 L 0,19.5 L 17.5,17 Z');
        ctx.save();
        ctx.scale(dw / 50, dh / 50);
        ctx.fillStyle = dec.color || '#f59e0b';
        ctx.fill(starPath);
        ctx.restore();
      } else if (dec.type === 'frame-border') {
        ctx.strokeStyle = dec.color || '#71717a';
        ctx.lineWidth = Math.max(2, Math.round(targetW * 0.003));
        ctx.strokeRect(0, 0, dw, dh);
      } else if (dec.type === 'tape') {
        ctx.fillStyle = dec.color || 'rgba(254, 240, 138, 0.65)';
        ctx.fillRect(0, 0, dw, dh);
      } else if (dec.type === 'crown') {
        const crownPath = new Path2D('M 5,42 L 15,15 L 30,30 L 40,5 L 50,30 L 65,15 L 75,42 Z');
        ctx.save();
        ctx.scale(dw / 80, dh / 50);
        ctx.fillStyle = dec.color || '#f59e0b';
        ctx.fill(crownPath);
        ctx.restore();
      } else if (dec.type === 'rose') {
        ctx.save();
        ctx.scale(dw / 60, dh / 120);
        ctx.strokeStyle = '#16a34a';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(30, 35);
        ctx.quadraticCurveTo(32, 70, 30, 115);
        ctx.stroke();
        ctx.fillStyle = dec.color || '#be123c';
        ctx.beginPath();
        ctx.arc(30, 25, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      } else {
        drawHeartPath(ctx, dw, dh);
        ctx.fillStyle = dec.color || '#f43f5e';
        ctx.fill();
      }

      ctx.restore();
    };

    const drawText = (txt: (typeof project.textElements)[0]) => {
      const tx = Math.round(txt.x * targetW);
      const ty = Math.round(txt.y * targetH);
      const scaledFontSize = Math.round(txt.fontSize * (targetW / project.canvasWidth));

      ctx.save();
      const style = txt.fontStyle === 'italic' ? 'italic' : 'normal';
      const weight = txt.fontWeight === 'bold' ? 'bold' : 'normal';
      ctx.font = `${style} ${weight} ${scaledFontSize}px "${txt.fontFamily}", sans-serif`;
      ctx.fillStyle = txt.fill || '#0f172a';
      ctx.textAlign = (txt.align as CanvasTextAlign) || 'center';

      ctx.fillText(txt.text, tx, ty + scaledFontSize);
      ctx.restore();
    };

    // Collect all render items sorted by zIndex
    type ExportItem =
      | { kind: 'slot'; data: (typeof project.slots)[0]; zIndex: number }
      | { kind: 'calendar'; data: NonNullable<typeof project.calendarConfig>; zIndex: number }
      | { kind: 'decorative'; data: (typeof project.decorativeElements)[0]; zIndex: number }
      | { kind: 'text'; data: (typeof project.textElements)[0]; zIndex: number };

    const exportItems: ExportItem[] = [
      ...project.slots.map((s) => ({ kind: 'slot' as const, data: s, zIndex: s.zIndex ?? 2 })),
      ...(project.calendarConfig
        ? [{ kind: 'calendar' as const, data: project.calendarConfig, zIndex: (project.calendarConfig as any).zIndex ?? 2 }]
        : []),
      ...project.decorativeElements.map((d) => ({ kind: 'decorative' as const, data: d, zIndex: d.zIndex ?? 1 })),
      ...project.textElements.map((t) => ({ kind: 'text' as const, data: t, zIndex: t.zIndex ?? 3 })),
    ].sort((a, b) => a.zIndex - b.zIndex);

    // Render items in exact zIndex order
    for (const item of exportItems) {
      if (item.kind === 'slot') drawSlot(item.data);
      else if (item.kind === 'calendar') drawCalendar(item.data);
      else if (item.kind === 'decorative') drawDecorative(item.data);
      else if (item.kind === 'text') drawText(item.data);
    }

    setExportProgress(100);
    return offCanvas;
  };

  const handleExportDownload = async () => {
    setIsExporting(true);
    setExportProgress(5);

    try {
      // Calculate target dimensions according to selected preset
      const dims = calculateExportDimensions(
        currentPreset.pixels300Dpi.width,
        currentPreset.pixels300Dpi.height,
        1.0,
        4000
      );

      const canvas = await renderDesignToCanvas(dims.width, dims.height);
      const safeFilename = `${project.title.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${currentPreset.id}`;

      if (selectedFormat === 'png') {
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = `${safeFilename}.png`;
        link.href = dataUrl;
        link.click();
      } else if (selectedFormat === 'jpg') {
        const dataUrl = canvas.toDataURL('image/jpeg', 0.95);
        const link = document.createElement('a');
        link.download = `${safeFilename}.jpg`;
        link.href = dataUrl;
        link.click();
      } else if (selectedFormat === 'pdf') {
        // High quality PDF generation
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const orientation = dims.height >= dims.width ? 'p' : 'l';
        const pdf = new jsPDF({
          orientation,
          unit: 'in',
          format: [currentPreset.inches.width, currentPreset.inches.height],
        });
        pdf.addImage(imgData, 'JPEG', 0, 0, currentPreset.inches.width, currentPreset.inches.height);
        pdf.save(`${safeFilename}.pdf`);
      }

      // Celebrate with confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });

      onClose();
    } catch (err: any) {
      alert(`Export failed: ${err.message}`);
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <h2 className="text-lg font-bold text-slate-800">Export Print-Ready Design</h2>
          </div>
          <button
            id="close-export-btn"
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Format Selector */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-2">
            Output Format
          </label>
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { id: 'png', label: 'PNG Image', desc: 'Lossless quality', icon: FileImage },
              { id: 'jpg', label: 'JPG Photo', desc: 'Standard print', icon: FileImage },
              { id: 'pdf', label: 'PDF Document', desc: '300 DPI vector PDF', icon: FileText },
            ].map((f) => {
              const Icon = f.icon;
              const isSel = selectedFormat === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setSelectedFormat(f.id as any)}
                  className={`p-3 rounded-xl border text-left transition ${
                    isSel
                      ? 'border-indigo-600 bg-indigo-50/70 ring-1 ring-indigo-600'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                  id={`format-${f.id}-btn`}
                >
                  <Icon
                    className={`w-5 h-5 mb-1.5 ${isSel ? 'text-indigo-600' : 'text-slate-400'}`}
                  />
                  <p className="text-xs font-semibold text-slate-800">{f.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{f.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Print Size Presets */}
        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-2">
            Print Size Preset (300 DPI)
          </label>
          <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto p-1">
            {PRINT_SIZE_PRESETS.map((preset) => {
              const isSel = selectedPresetId === preset.id;
              return (
                <button
                  key={preset.id}
                  onClick={() => setSelectedPresetId(preset.id)}
                  className={`p-2.5 rounded-xl border text-left transition ${
                    isSel
                      ? 'border-indigo-600 bg-indigo-50/60 font-semibold text-indigo-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                  id={`preset-${preset.id}-btn`}
                >
                  <p className="text-xs truncate">{preset.label}</p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                    {preset.pixels300Dpi.width} × {preset.pixels300Dpi.height} px
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Progress bar when exporting */}
        {isExporting && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-600">
              <span className="flex items-center space-x-1.5">
                <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-600" />
                <span>Rendering high-resolution artwork...</span>
              </span>
              <span className="font-mono">{exportProgress}%</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
              <div
                className="bg-indigo-600 h-full transition-all duration-300"
                style={{ width: `${exportProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Action button */}
        <div className="flex items-center justify-end space-x-2 pt-3 border-t border-slate-100">
          <button
            onClick={onClose}
            disabled={isExporting}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Cancel
          </button>
          <button
            onClick={handleExportDownload}
            disabled={isExporting}
            className="flex items-center space-x-2 px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition disabled:opacity-50"
            id="download-export-confirm-btn"
          >
            {isExporting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download {selectedFormat.toUpperCase()}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
