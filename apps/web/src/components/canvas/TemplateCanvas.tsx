import React, { forwardRef, useMemo, useEffect, useRef } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import Konva from 'konva';
import {
  TemplateDefinition,
  ProjectData,
  AssignedPhoto,
  createDefaultCrop,
} from '@framecraft/shared';
import { PhotoSlotRenderer } from './PhotoSlotRenderer.js';
import { CalendarRenderer } from './CalendarRenderer.js';
import { DecorativeRenderer } from './DecorativeRenderer.js';
import { TextElementRenderer } from './TextElementRenderer.js';

export type SelectedElementType =
  | 'slot'
  | 'text'
  | 'decorative'
  | 'calendar'
  | 'background'
  | null;

export interface TemplateCanvasProps {
  template?: TemplateDefinition | null;
  project?: ProjectData | null;
  width?: number;
  height?: number;
  scale?: number;
  interactive?: boolean;
  selectedId?: string | null;
  selectedType?: SelectedElementType;
  onSelect?: (id: string | null, type: SelectedElementType) => void;
  onStageClick?: (e: any) => void;
  onRenderReady?: (stage: Konva.Stage) => void;
  className?: string;
  style?: React.CSSProperties;
}

export const TemplateCanvas = forwardRef<Konva.Stage, TemplateCanvasProps>(
  (
    {
      template,
      project,
      width,
      height,
      scale,
      interactive = false,
      selectedId = null,
      onSelect,
      onStageClick,
      onRenderReady,
      className,
      style,
    },
    ref
  ) => {
    const internalStageRef = useRef<Konva.Stage | null>(null);

    // Extract canonical model fields from either project (editor) or template (gallery/preview)
    const canvasWidth = project?.canvasWidth ?? template?.canvasWidth ?? 2400;
    const canvasHeight = project?.canvasHeight ?? template?.canvasHeight ?? 3000;
    const background = project?.background ?? template?.background ?? { type: 'color', color: '#ffffff' };
    const slots = project?.slots ?? template?.photoSlots ?? [];
    const calendarConfig = project?.calendarConfig ?? template?.calendarConfig;
    const decorativeElements = project?.decorativeElements ?? template?.decorativeElements ?? [];
    const textElements = project?.textElements ?? template?.textElements ?? [];

    // Compute assigned photos mapping
    const assignedPhotos: Record<string, AssignedPhoto> = useMemo(() => {
      if (project?.assignedPhotos) {
        return project.assignedPhotos;
      }
      const initial: Record<string, AssignedPhoto> = {};
      for (const slot of slots) {
        if (slot.defaultSampleUrl) {
          initial[slot.id] = {
            slotId: slot.id,
            photoUrl: slot.defaultSampleUrl,
            crop: createDefaultCrop(),
          };
        }
      }
      return initial;
    }, [project?.assignedPhotos, slots]);

    // Unified elements sorted by zIndex so background panels/mats (zIndex < 2) render BEHIND photos,
    // photos (zIndex 2) render in the middle, and foreground overlays/accents (zIndex > 2) render ON TOP.
    const renderItems = useMemo(() => {
      type RenderItem =
        | { kind: 'slot'; data: typeof slots[0]; zIndex: number }
        | { kind: 'calendar'; data: NonNullable<typeof calendarConfig>; zIndex: number }
        | { kind: 'decorative'; data: typeof decorativeElements[0]; zIndex: number }
        | { kind: 'text'; data: typeof textElements[0]; zIndex: number };

      const items: RenderItem[] = [];

      slots.forEach((slot) => {
        items.push({ kind: 'slot', data: slot, zIndex: slot.zIndex ?? 2 });
      });

      if (calendarConfig) {
        items.push({ kind: 'calendar', data: calendarConfig, zIndex: (calendarConfig as any).zIndex ?? 2 });
      }

      decorativeElements.forEach((dec) => {
        items.push({ kind: 'decorative', data: dec, zIndex: dec.zIndex ?? 1 });
      });

      textElements.forEach((txt) => {
        items.push({ kind: 'text', data: txt, zIndex: txt.zIndex ?? 3 });
      });

      return items.sort((a, b) => a.zIndex - b.zIndex);
    }, [slots, calendarConfig, decorativeElements, textElements]);

    // Scale-to-fit calculation
    let effectiveScale = scale ?? 1.0;
    let renderW = Math.round(canvasWidth * effectiveScale);
    let renderH = Math.round(canvasHeight * effectiveScale);

    if (width && height) {
      effectiveScale = Math.min(width / canvasWidth, height / canvasHeight);
      renderW = Math.round(canvasWidth * effectiveScale);
      renderH = Math.round(canvasHeight * effectiveScale);
    }

    const handleBackgroundClick = (e: any) => {
      if (!interactive) return;
      if (e.target === e.target.getStage() || e.target.name() === 'canvas-background') {
        onSelect?.(null, 'background');
      }
      onStageClick?.(e);
    };

    // Callback when stage is rendered and ready
    useEffect(() => {
      if (internalStageRef.current && onRenderReady) {
        onRenderReady(internalStageRef.current);
      }
    }, [onRenderReady]);

    const setRef = (node: Konva.Stage | null) => {
      internalStageRef.current = node;
      if (typeof ref === 'function') {
        ref(node);
      } else if (ref) {
        (ref as React.MutableRefObject<Konva.Stage | null>).current = node;
      }
    };

    return (
      <div
        className={`flex items-center justify-center select-none ${className || ''}`}
        style={style}
      >
        <Stage
          ref={setRef}
          width={renderW}
          height={renderH}
          scaleX={effectiveScale}
          scaleY={effectiveScale}
          listening={interactive}
          onClick={interactive ? handleBackgroundClick : undefined}
          onTap={interactive ? handleBackgroundClick : undefined}
        >
          <Layer listening={interactive}>
            {/* 1. Canvas Background */}
            {background.type === 'gradient' && background.gradient ? (
              <Rect
                name="canvas-background"
                x={0}
                y={0}
                width={canvasWidth}
                height={canvasHeight}
                opacity={background.opacity ?? 1}
                fillLinearGradientStartPoint={
                  background.gradient.type === 'radial'
                    ? { x: canvasWidth / 2, y: canvasHeight / 2 }
                    : {
                        x: 0,
                        y: 0,
                      }
                }
                fillLinearGradientEndPoint={(() => {
                  const angle = ((background.gradient.angle ?? 90) * Math.PI) / 180;
                  if (background.gradient.type === 'radial') {
                    return { x: canvasWidth, y: canvasHeight / 2 };
                  }
                  return {
                    x: Math.cos(angle - Math.PI / 2) * canvasWidth,
                    y: Math.sin(angle - Math.PI / 2) * canvasHeight,
                  };
                })()}
                fillLinearGradientColorStops={background.gradient.stops.flatMap((s) => [
                  s.offset,
                  s.color,
                ])}
              />
            ) : (
              <Rect
                name="canvas-background"
                x={0}
                y={0}
                width={canvasWidth}
                height={canvasHeight}
                fill={background.color || '#ffffff'}
                opacity={background.opacity ?? 1}
              />
            )}

            {/* 2. Unified Elements in zIndex Order */}
            {renderItems.map((item) => {
              if (item.kind === 'slot') {
                const slot = item.data;
                return (
                  <PhotoSlotRenderer
                    key={slot.id}
                    slot={slot}
                    assigned={assignedPhotos[slot.id]}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    isSelected={interactive && selectedId === slot.id}
                    onSelect={() => interactive && onSelect?.(slot.id, 'slot')}
                    readOnly={!interactive}
                  />
                );
              }
              if (item.kind === 'calendar') {
                return (
                  <CalendarRenderer
                    key="calendar"
                    config={item.data}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    isSelected={interactive && selectedId === 'calendar'}
                    onSelect={() => interactive && onSelect?.('calendar', 'calendar')}
                    readOnly={!interactive}
                  />
                );
              }
              if (item.kind === 'decorative') {
                const dec = item.data;
                return (
                  <DecorativeRenderer
                    key={dec.id}
                    element={dec}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    isSelected={interactive && selectedId === dec.id}
                    onSelect={() => interactive && onSelect?.(dec.id, 'decorative')}
                    readOnly={!interactive}
                  />
                );
              }
              if (item.kind === 'text') {
                const txt = item.data;
                return (
                  <TextElementRenderer
                    key={txt.id}
                    element={txt}
                    canvasWidth={canvasWidth}
                    canvasHeight={canvasHeight}
                    isSelected={interactive && selectedId === txt.id}
                    onSelect={() => interactive && onSelect?.(txt.id, 'text')}
                    readOnly={!interactive}
                  />
                );
              }
              return null;
            })}
          </Layer>
        </Stage>
      </div>
    );
  }
);

TemplateCanvas.displayName = 'TemplateCanvas';
