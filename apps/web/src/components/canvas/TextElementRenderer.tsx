import React from 'react';
import { Group, Text, Rect } from 'react-konva';
import { TextElement } from '@framecraft/shared';
import { useEditorStore } from '../../stores/editorStore.js';

interface TextElementRendererProps {
  element: TextElement;
  canvasWidth: number;
  canvasHeight: number;
  isSelected?: boolean;
  onSelect?: () => void;
  readOnly?: boolean;
}

export const TextElementRenderer: React.FC<TextElementRendererProps> = ({
  element,
  canvasWidth,
  canvasHeight,
  isSelected = false,
  onSelect,
  readOnly = false,
}) => {
  const updateText = useEditorStore((state) => state.updateText);

  const textX = Math.round(element.x * canvasWidth);
  const textY = Math.round(element.y * canvasHeight);
  const textW = element.width
    ? Math.round(element.width * canvasWidth)
    : Math.round(canvasWidth * 0.8);

  // If centered alignment, adjust x anchor so it centers relative to normalized x
  const renderX = element.align === 'center' ? textX - textW / 2 : textX;

  const fontStyle = [
    element.fontStyle === 'italic' ? 'italic' : '',
    element.fontWeight === 'bold' || element.fontWeight === '700' || element.fontWeight === '800'
      ? 'bold'
      : 'normal',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Group
      x={renderX}
      y={textY}
      onClick={readOnly ? undefined : onSelect}
      onTap={readOnly ? undefined : onSelect}
      draggable={!readOnly && isSelected}
      listening={!readOnly}
      onDragEnd={(e) => {
        if (readOnly) return;
        const newRenderX = e.target.x();
        const newY = e.target.y();
        const newNormX =
          element.align === 'center'
            ? (newRenderX + textW / 2) / canvasWidth
            : newRenderX / canvasWidth;
        const newNormY = newY / canvasHeight;

        updateText(element.id, {
          x: Number(newNormX.toFixed(4)),
          y: Number(newNormY.toFixed(4)),
        });
      }}
    >
      <Text
        text={element.text}
        width={textW}
        align={element.align || 'center'}
        fontSize={element.fontSize || 36}
        fontFamily={element.fontFamily || 'Playfair Display'}
        fontStyle={fontStyle}
        fill={element.fill || '#0f172a'}
        letterSpacing={element.letterSpacing || 0}
        lineHeight={element.lineHeight || 1.2}
        shadowColor={element.shadowColor}
        shadowBlur={element.shadowBlur}
        shadowOpacity={element.shadowOpacity}
      />

      {!readOnly && isSelected && (
        <Rect
          x={-6}
          y={-6}
          width={textW + 12}
          height={(element.fontSize || 36) * 1.5 + 12}
          stroke="#4f46e5"
          strokeWidth={2}
          dash={[5, 4]}
          cornerRadius={4}
          listening={false}
        />
      )}
    </Group>
  );
};
