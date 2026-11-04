import React, { useEffect, useState, useRef } from 'react';
import { Group, Rect, Image as KonvaImage, Path, Text, Circle } from 'react-konva';
import {
  PhotoSlot,
  AssignedPhoto,
  calculateCoverFit,
  getHeartSvgPath,
  getArchSvgPath,
  getHexagonSvgPath,
} from '@framecraft/shared';
import { drawHeartPath, drawArchPath, drawHexagonPath } from './ShapePaths.js';
import { useEditorStore } from '../../stores/editorStore.js';

interface PhotoSlotRendererProps {
  slot: PhotoSlot;
  assigned?: AssignedPhoto;
  canvasWidth: number;
  canvasHeight: number;
  isSelected?: boolean;
  onSelect?: () => void;
  readOnly?: boolean;
  onImageLoaded?: () => void;
}

export const PhotoSlotRenderer: React.FC<PhotoSlotRendererProps> = ({
  slot,
  assigned,
  canvasWidth,
  canvasHeight,
  isSelected = false,
  onSelect,
  readOnly = false,
  onImageLoaded,
}) => {
  const updateCrop = useEditorStore((state) => state.updateCrop);

  // Compute absolute dimensions in canvas space
  const slotX = Math.round(slot.x * canvasWidth);
  const slotY = Math.round(slot.y * canvasHeight);
  const slotW = Math.round(slot.width * canvasWidth);
  const slotH = Math.round(slot.height * canvasHeight);
  const rotation = slot.rotation || 0;

  const [imageObj, setImageObj] = useState<HTMLImageElement | null>(null);
  const isDraggingCropRef = useRef(false);

  // Determine active photo URL: user assigned photo or template default sample URL
  const photoUrl = assigned?.photoUrl || slot.defaultSampleUrl;

  // Load image when photo changes
  useEffect(() => {
    if (!photoUrl) {
      setImageObj(null);
      return;
    }
    let isCurrent = true;
    const img = new window.Image();
    img.crossOrigin = 'anonymous';
    img.src = photoUrl;
    img.onload = () => {
      if (isCurrent) {
        setImageObj(img);
        onImageLoaded?.();
      }
    };
    img.onerror = () => {
      if (isCurrent) {
        setImageObj(null);
      }
    };
    return () => {
      isCurrent = false;
    };
  }, [photoUrl, onImageLoaded]);

  // Polaroid geometry calculations
  const isPolaroid = slot.shape === 'polaroid';
  const borderWidth = slot.borderWidth ?? (isPolaroid ? 0 : 4);
  const hasBorder = borderWidth > 0;
  const polaroidMargin = isPolaroid ? Math.round(slotW * 0.06) : 0;
  const polaroidBottomChin = isPolaroid ? Math.round(slotH * 0.18) : 0;

  // Window inside polaroid where photo lives
  const innerW = isPolaroid ? slotW - polaroidMargin * 2 : slotW;
  const innerH = isPolaroid ? slotH - polaroidMargin - polaroidBottomChin : slotH;

  // Compute cover fit transform for the image inside the inner window
  const fit = imageObj
    ? calculateCoverFit(innerW, innerH, imageObj.width, imageObj.height)
    : { baseScale: 1, initialX: 0, initialY: 0, scaledWidth: innerW, scaledHeight: innerH };

  const crop = assigned?.crop || { scale: 1, x: 0, y: 0, rotation: 0 };
  const effectiveScale = fit.baseScale * (crop.scale || 1);
  const renderedW = imageObj ? imageObj.width * effectiveScale : innerW;
  const renderedH = imageObj ? imageObj.height * effectiveScale : innerH;

  // Centered position + user pan offset
  const imgX = (innerW - renderedW) / 2 + (crop.x || 0);
  const imgY = (innerH - renderedH) / 2 + (crop.y || 0);

  // Clipping function per shape
  const clipFunc = (ctx: any) => {
    if (slot.shape === 'heart') {
      drawHeartPath(ctx, innerW, innerH);
    } else if (slot.shape === 'arch') {
      drawArchPath(ctx, innerW, innerH);
    } else if (slot.shape === 'hexagon') {
      drawHexagonPath(ctx, innerW, innerH);
    } else if (slot.shape === 'circle') {
      const radius = Math.min(innerW, innerH) / 2;
      ctx.beginPath();
      ctx.arc(innerW / 2, innerH / 2, radius, 0, Math.PI * 2);
      ctx.closePath();
    } else if (slot.shape === 'rounded') {
      const r = slot.borderRadius || 20;
      ctx.beginPath();
      ctx.roundRect(0, 0, innerW, innerH, r);
      ctx.closePath();
    } else {
      ctx.beginPath();
      ctx.rect(0, 0, innerW, innerH);
      ctx.closePath();
    }
  };

  return (
    <Group
      x={slotX}
      y={slotY}
      rotation={rotation}
      onClick={readOnly ? undefined : onSelect}
      onTap={readOnly ? undefined : onSelect}
      listening={!readOnly}
    >
      {/* 1. Polaroid Outer Card or Background Shadow */}
      {isPolaroid ? (
        <Rect
          width={slotW}
          height={slotH}
          fill="#ffffff"
          cornerRadius={4}
          shadowBlur={slot.shadowBlur || 22}
          shadowColor={slot.shadowColor || 'rgba(0,0,0,0.18)'}
          shadowOpacity={0.85}
          stroke="#f1f5f9"
          strokeWidth={1}
        />
      ) : slot.shape === 'heart' ? (
        <Path
          data={getHeartSvgPath(slotW, slotH)}
          fill="#f8fafc"
          shadowBlur={slot.shadowBlur ?? 15}
          shadowColor={slot.shadowColor || 'rgba(0,0,0,0.1)'}
          shadowOpacity={0.8}
        />
      ) : slot.shape === 'arch' ? (
        <Path
          data={getArchSvgPath(slotW, slotH)}
          fill="#f8fafc"
          shadowBlur={slot.shadowBlur ?? 15}
          shadowColor={slot.shadowColor || 'rgba(0,0,0,0.1)'}
          shadowOpacity={0.8}
        />
      ) : slot.shape === 'hexagon' ? (
        <Path
          data={getHexagonSvgPath(slotW, slotH)}
          fill="#f8fafc"
          shadowBlur={slot.shadowBlur ?? 15}
          shadowColor={slot.shadowColor || 'rgba(0,0,0,0.1)'}
          shadowOpacity={0.8}
        />
      ) : (
        <Rect
          width={slotW}
          height={slotH}
          fill={hasBorder ? '#f8fafc' : '#0a0f1a'}
          cornerRadius={slot.shape === 'rounded' ? slot.borderRadius || 20 : 0}
          shadowBlur={slot.shadowBlur ?? (hasBorder ? 15 : 0)}
          shadowColor={slot.shadowColor || 'rgba(0,0,0,0.1)'}
          shadowOpacity={0.8}
        />
      )}

      {/* 2. Photo Content Group (positioned inside polaroid margins if polaroid) */}
      <Group x={polaroidMargin} y={polaroidMargin} clipFunc={clipFunc}>
        {imageObj ? (
          <KonvaImage
            image={imageObj}
            x={imgX}
            y={imgY}
            width={renderedW}
            height={renderedH}
            rotation={crop.rotation || 0}
            draggable={!readOnly && isSelected}
            onDragStart={() => {
              isDraggingCropRef.current = true;
            }}
            onDragEnd={(e) => {
              isDraggingCropRef.current = false;
              const deltaX = e.target.x() - imgX;
              const deltaY = e.target.y() - imgY;
              updateCrop(slot.id, {
                x: (crop.x || 0) + deltaX,
                y: (crop.y || 0) + deltaY,
              });
            }}
          />
        ) : (
          /* Empty placeholder */
          <Group>
            <Rect
              width={innerW}
              height={innerH}
              fill="#18181b"
              stroke="#cbd5e1"
              strokeWidth={1}
            />
            <Text
              text="+"
              fontSize={40}
              fontFamily="Outfit"
              fill="#71717a"
              width={innerW}
              align="center"
              y={innerH / 2 - 28}
            />
            <Text
              text={slot.label || 'Add Photo'}
              fontSize={16}
              fontFamily="Outfit"
              fill="#a1a1aa"
              width={innerW}
              align="center"
              y={innerH / 2 + 14}
            />
          </Group>
        )}
      </Group>

      {/* 3. Border Overlay (skip when borderWidth is 0) */}
      {!isPolaroid && hasBorder && (
        <>
          {slot.shape === 'heart' ? (
            <Path
              data={getHeartSvgPath(slotW, slotH)}
              stroke={slot.borderColor || '#ffffff'}
              strokeWidth={borderWidth}
              listening={false}
            />
          ) : slot.shape === 'arch' ? (
            <Path
              data={getArchSvgPath(slotW, slotH)}
              stroke={slot.borderColor || '#ffffff'}
              strokeWidth={borderWidth}
              listening={false}
            />
          ) : slot.shape === 'hexagon' ? (
            <Path
              data={getHexagonSvgPath(slotW, slotH)}
              stroke={slot.borderColor || '#ffffff'}
              strokeWidth={borderWidth}
              listening={false}
            />
          ) : slot.shape === 'circle' ? (
            <Circle
              x={slotW / 2}
              y={slotH / 2}
              radius={Math.min(slotW, slotH) / 2}
              stroke={slot.borderColor || '#ffffff'}
              strokeWidth={borderWidth}
              listening={false}
            />
          ) : (
            <Rect
              width={slotW}
              height={slotH}
              cornerRadius={slot.shape === 'rounded' ? slot.borderRadius || 20 : 0}
              stroke={slot.borderColor || '#ffffff'}
              strokeWidth={borderWidth}
              listening={false}
            />
          )}
        </>
      )}

      {/* 4. Selection outline */}
      {!readOnly && isSelected && (
        <Rect
          x={-4}
          y={-4}
          width={slotW + 8}
          height={slotH + 8}
          stroke="#4f46e5"
          strokeWidth={3}
          cornerRadius={isPolaroid ? 6 : slot.shape === 'rounded' ? (slot.borderRadius || 20) + 4 : 4}
          dash={[6, 4]}
          listening={false}
        />
      )}
    </Group>
  );
};
