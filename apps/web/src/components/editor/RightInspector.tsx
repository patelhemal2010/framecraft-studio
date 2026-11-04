import React, { useRef } from 'react';
import {
  RotateCw,
  ZoomIn,
  RefreshCw,
  Trash2,
  Upload,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Bold,
  Italic,
  Sliders,
  Type,
  ImageIcon,
} from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore.js';

export const RightInspector: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const selectedId = useEditorStore((state) => state.selectedId);
  const selectedType = useEditorStore((state) => state.selectedType);
  const updateCrop = useEditorStore((state) => state.updateCrop);
  const resetCrop = useEditorStore((state) => state.resetCrop);
  const removePhoto = useEditorStore((state) => state.removePhoto);
  const assignPhoto = useEditorStore((state) => state.assignPhoto);
  const updateText = useEditorStore((state) => state.updateText);
  const deleteElement = useEditorStore((state) => state.deleteElement);
  const updateBackground = useEditorStore((state) => state.updateBackground);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!project) return null;

  // Selected Slot
  const currentSlot =
    selectedType === 'slot' && selectedId
      ? project.slots.find((s) => s.id === selectedId)
      : null;
  const currentAssigned = currentSlot ? project.assignedPhotos[currentSlot.id] : null;

  // Selected Text
  const currentText =
    selectedType === 'text' && selectedId
      ? project.textElements.find((t) => t.id === selectedId)
      : null;

  const handlePhotoReplace = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentSlot || !e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);
    assignPhoto(currentSlot.id, url);
  };

  return (
    <aside className="w-72 bg-white border-l border-slate-200 flex flex-col h-[calc(100vh-3.5rem)] select-none shadow-sm overflow-y-auto p-4 space-y-5">
      {/* CASE 1: PHOTO SLOT SELECTED */}
      {currentSlot && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <ImageIcon className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">
                {currentSlot.label || 'Photo Slot'}
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">
              {currentSlot.shape}
            </span>
          </div>

          {currentAssigned ? (
            <div className="space-y-4">
              {/* Photo Zoom (Crop scale) */}
              <div>
                <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1">
                  <span>Photo Zoom</span>
                  <span className="font-mono text-slate-500">
                    {(currentAssigned.crop.scale || 1).toFixed(1)}x
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="3"
                  step="0.05"
                  value={currentAssigned.crop.scale || 1}
                  onChange={(e) =>
                    updateCrop(currentSlot.id, {
                      scale: parseFloat(e.target.value),
                    })
                  }
                  className="w-full accent-indigo-600"
                  id="crop-zoom-slider"
                />
              </div>

              {/* Crop actions: Rotate, Reset */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() =>
                    updateCrop(currentSlot.id, {
                      rotation: ((currentAssigned.crop.rotation || 0) + 90) % 360,
                    })
                  }
                  className="flex items-center justify-center space-x-1.5 py-1.5 px-3 border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 transition"
                  id="rotate-photo-btn"
                >
                  <RotateCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Rotate 90°</span>
                </button>

                <button
                  onClick={() => resetCrop(currentSlot.id)}
                  className="flex items-center justify-center space-x-1.5 py-1.5 px-3 border border-slate-200 hover:border-indigo-500 hover:bg-slate-50 rounded-lg text-xs font-medium text-slate-700 transition"
                  id="reset-crop-btn"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
                  <span>Reset Crop</span>
                </button>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Replace / Remove photo */}
              <div className="space-y-2">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-semibold transition"
                  id="replace-photo-btn"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Replace Photo</span>
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handlePhotoReplace}
                  className="hidden"
                />

                <button
                  onClick={() => removePhoto(currentSlot.id)}
                  className="w-full flex items-center justify-center space-x-1.5 py-2 px-3 text-rose-600 hover:bg-rose-50 rounded-lg text-xs font-medium transition"
                  id="remove-photo-btn"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Photo</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center py-6">
              <p className="text-xs text-slate-500 mb-3">This slot is empty</p>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center space-x-1.5 py-2 px-4 bg-indigo-600 text-white hover:bg-indigo-700 rounded-lg text-xs font-semibold shadow-sm transition"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Photo</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handlePhotoReplace}
                className="hidden"
              />
            </div>
          )}
        </div>
      )}

      {/* CASE 2: TEXT ELEMENT SELECTED */}
      {currentText && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <Type className="w-4 h-4 text-indigo-600" />
              <h3 className="text-sm font-semibold text-slate-800">Edit Typography</h3>
            </div>
          </div>

          {/* Textarea content */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Text Content
            </label>
            <textarea
              rows={3}
              value={currentText.text}
              onChange={(e) => updateText(currentText.id, { text: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded-lg p-2.5 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 font-sans"
              id="text-content-input"
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Font Family
            </label>
            <select
              value={currentText.fontFamily}
              onChange={(e) => updateText(currentText.id, { fontFamily: e.target.value })}
              className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none"
              id="font-family-select"
            >
              <option value="Playfair Display">Playfair Display (Serif)</option>
              <option value="Outfit">Outfit (Modern Sans)</option>
              <option value="Inter">Inter (Clean Sans)</option>
              <option value="Dancing Script">Dancing Script (Handwriting)</option>
              <option value="Great Vibes">Great Vibes (Romantic Script)</option>
              <option value="Cinzel">Cinzel (Classic Roman)</option>
              <option value="Montserrat">Montserrat (Geometric)</option>
            </select>
          </div>

          {/* Font Size & Weight */}
          <div>
            <div className="flex justify-between items-center text-xs font-medium text-slate-700 mb-1">
              <span>Font Size</span>
              <span className="font-mono text-slate-500">{currentText.fontSize}px</span>
            </div>
            <input
              type="range"
              min="16"
              max="120"
              value={currentText.fontSize}
              onChange={(e) =>
                updateText(currentText.id, { fontSize: parseInt(e.target.value, 10) })
              }
              className="w-full accent-indigo-600"
              id="font-size-slider"
            />
          </div>

          {/* Formatting & Alignment */}
          <div className="flex items-center space-x-2">
            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() =>
                  updateText(currentText.id, {
                    fontWeight: currentText.fontWeight === 'bold' ? 'normal' : 'bold',
                  })
                }
                className={`p-1.5 transition ${
                  currentText.fontWeight === 'bold'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                title="Bold"
              >
                <Bold className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() =>
                  updateText(currentText.id, {
                    fontStyle: currentText.fontStyle === 'italic' ? 'normal' : 'italic',
                  })
                }
                className={`p-1.5 transition ${
                  currentText.fontStyle === 'italic'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                title="Italic"
              >
                <Italic className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex border border-slate-200 rounded-lg overflow-hidden">
              <button
                onClick={() => updateText(currentText.id, { align: 'left' })}
                className={`p-1.5 transition ${
                  currentText.align === 'left'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                title="Align Left"
              >
                <AlignLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateText(currentText.id, { align: 'center' })}
                className={`p-1.5 transition ${
                  currentText.align === 'center'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                title="Align Center"
              >
                <AlignCenter className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => updateText(currentText.id, { align: 'right' })}
                className={`p-1.5 transition ${
                  currentText.align === 'right'
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                title="Align Right"
              >
                <AlignRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Color swatches */}
          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">Text Color</label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={currentText.fill}
                onChange={(e) => updateText(currentText.id, { fill: e.target.value })}
                className="w-8 h-8 p-0.5 rounded border border-slate-200 cursor-pointer"
              />
              <div className="flex space-x-1.5">
                {['#0f172a', '#f8fafc', '#e11d48', '#f59e0b', '#4f46e5', '#10b981'].map((c) => (
                  <button
                    key={c}
                    onClick={() => updateText(currentText.id, { fill: c })}
                    className="w-6 h-6 rounded-full border border-slate-300"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => deleteElement(currentText.id)}
              className="w-full flex items-center justify-center space-x-1.5 py-1.5 text-xs text-rose-600 hover:bg-rose-50 rounded-lg transition"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Delete Text Element</span>
            </button>
          </div>
        </div>
      )}

      {/* CASE 3: NO SELECTION OR BACKGROUND */}
      {!currentSlot && !currentText && (
        <div className="space-y-4">
          <div className="flex items-center space-x-2 pb-2 border-b border-slate-100">
            <Sliders className="w-4 h-4 text-slate-600" />
            <h3 className="text-sm font-semibold text-slate-800">Design Overview</h3>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-xs text-slate-600 space-y-1.5">
            <p>
              <span className="font-semibold text-slate-800">Resolution:</span>{' '}
              {project.canvasWidth} × {project.canvasHeight} px
            </p>
            <p>
              <span className="font-semibold text-slate-800">Aspect Ratio:</span>{' '}
              {project.aspectRatio}
            </p>
            <p>
              <span className="font-semibold text-slate-800">Photo Slots:</span>{' '}
              {project.slots.length} slots
            </p>
          </div>

          <div>
            <label className="text-xs font-medium text-slate-700 block mb-1">
              Canvas Background
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={project.background.color || '#ffffff'}
                onChange={(e) => updateBackground({ color: e.target.value })}
                className="w-8 h-8 p-0.5 rounded border border-slate-200 cursor-pointer"
              />
              <span className="text-xs font-mono text-slate-600">
                {project.background.color || '#ffffff'}
              </span>
            </div>
          </div>

          <div className="bg-indigo-50/60 p-3 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 leading-relaxed">
            💡 <strong>Pro-Tip:</strong> Click any photo frame on the canvas to zoom, pan, or rotate. Click any text to customize typography!
          </div>
        </div>
      )}
    </aside>
  );
};
