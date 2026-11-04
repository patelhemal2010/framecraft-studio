import React from 'react';
import { Group, Path, Rect, Circle } from 'react-konva';
import { DecorativeElement, getHeartSvgPath } from '@framecraft/shared';

interface DecorativeRendererProps {
  element: DecorativeElement;
  canvasWidth: number;
  canvasHeight: number;
  isSelected?: boolean;
  onSelect?: () => void;
  readOnly?: boolean;
}

export const DecorativeRenderer: React.FC<DecorativeRendererProps> = ({
  element,
  canvasWidth,
  canvasHeight,
  isSelected = false,
  onSelect,
  readOnly = false,
}) => {
  const decX = Math.round(element.x * canvasWidth);
  const decY = Math.round(element.y * canvasHeight);
  const w = element.width <= 1 ? Math.round(element.width * canvasWidth) : (element.width || 48);
  const h = element.height <= 1 ? Math.round(element.height * canvasHeight) : (element.height || 48);
  const rot = element.rotation || 0;
  const opacity = element.opacity ?? 1;

  // Render SVG graphics per decorative type
  const renderGraphic = () => {
    switch (element.type) {
      case 'lotus':
        // Blooming Pink Lotus Flower
        return (
          <Group scaleX={w / 120} scaleY={h / 120}>
            <Path
              data="M 60,110 C 20,95 5,60 15,35 C 30,55 50,75 60,110 Z"
              fill={element.color || '#f472b6'}
              opacity={0.85}
            />
            <Path
              data="M 60,110 C 100,95 115,60 105,35 C 90,55 70,75 60,110 Z"
              fill={element.color || '#f472b6'}
              opacity={0.85}
            />
            <Path
              data="M 60,110 C 35,80 25,45 35,20 C 50,45 55,75 60,110 Z"
              fill={element.color || '#fb7185'}
              opacity={0.9}
            />
            <Path
              data="M 60,110 C 85,80 95,45 85,20 C 70,45 65,75 60,110 Z"
              fill={element.color || '#fb7185'}
              opacity={0.9}
            />
            <Path
              data="M 60,110 C 45,70 45,30 60,5 C 75,30 75,70 60,110 Z"
              fill={element.color || '#fda4af'}
            />
            <Circle x={60} y={65} radius={8} fill="#fde047" opacity={0.9} />
          </Group>
        );

      case 'bouquet':
        // Bouquet of red tulips in kraft wrap
        return (
          <Group scaleX={w / 100} scaleY={h / 140}>
            <Path
              data="M 20,60 L 50,135 L 80,60 Z"
              fill="#d97706"
              opacity={0.35}
              stroke="#b45309"
              strokeWidth={2}
            />
            <Path data="M 45,60 L 50,110" stroke="#15803d" strokeWidth={3} />
            <Path data="M 55,60 L 50,110" stroke="#15803d" strokeWidth={3} />
            <Path
              data="M 30,45 C 20,30 25,10 40,25 C 45,10 55,10 50,35 C 40,45 35,50 30,45 Z"
              fill={element.color || '#e11d48'}
            />
            <Path
              data="M 50,40 C 40,25 48,5 60,20 C 70,5 78,25 65,40 Z"
              fill={element.color || '#be123c'}
            />
            <Path
              data="M 40,55 C 32,40 38,20 50,35 C 60,20 68,40 55,55 Z"
              fill={element.color || '#f43f5e'}
            />
            <Circle x={50} y={90} radius={6} fill="#fb7185" />
            <Path data="M 45,90 Q 30,105 35,120" stroke="#fb7185" strokeWidth={3} />
            <Path data="M 55,90 Q 70,105 65,120" stroke="#fb7185" strokeWidth={3} />
          </Group>
        );

      case 'rose':
        // Single stem red rose
        return (
          <Group scaleX={w / 60} scaleY={h / 120}>
            <Path data="M 30,35 Q 32,70 30,115" stroke="#16a34a" strokeWidth={3} />
            <Path data="M 30,65 Q 15,60 18,50 Q 28,52 30,65" fill="#15803d" />
            <Path data="M 30,85 Q 45,80 42,70 Q 32,72 30,85" fill="#15803d" />
            <Circle x={30} y={25} radius={16} fill={element.color || '#be123c'} />
            <Path
              data="M 22,25 C 20,12 35,8 38,20 C 42,10 45,22 36,32 C 26,30 20,32 22,25 Z"
              fill={element.color || '#e11d48'}
            />
            <Circle x={30} y={23} radius={6} fill="#fb7185" opacity={0.8} />
          </Group>
        );

      case 'crown':
        // Royal Gold Crown
        return (
          <Group scaleX={w / 80} scaleY={h / 50}>
            <Path
              data="M 5,42 L 15,15 L 30,30 L 40,5 L 50,30 L 65,15 L 75,42 Z"
              fill={element.color || '#f59e0b'}
              stroke="#d97706"
              strokeWidth={2}
            />
            <Circle x={15} y={15} radius={3} fill="#fef08a" />
            <Circle x={40} y={5} radius={4} fill="#fef08a" />
            <Circle x={65} y={15} radius={3} fill="#fef08a" />
            <Rect x={8} y={38} width={64} height={5} fill="#d97706" cornerRadius={2} />
          </Group>
        );

      case 'tape':
        // Semi-transparent Washi Tape Strip
        return (
          <Rect
            width={w}
            height={h}
            fill={element.color || 'rgba(254, 240, 138, 0.65)'}
            stroke="rgba(202, 138, 4, 0.3)"
            strokeWidth={1}
            cornerRadius={2}
            shadowBlur={4}
            shadowColor="rgba(0,0,0,0.1)"
          />
        );

      case 'envelope':
        // Kraft envelope with hearts
        return (
          <Group scaleX={w / 80} scaleY={h / 80}>
            <Rect x={10} y={30} width={60} height={40} fill="#fde68a" stroke="#d97706" strokeWidth={2} cornerRadius={3} />
            <Path data="M 10,30 L 40,55 L 70,30" fill="none" stroke="#d97706" strokeWidth={2} />
            <Path data="M 40,15 C 35,5 25,5 25,18 C 25,28 40,35 40,35 C 40,35 55,28 55,18 C 55,5 45,5 40,15 Z" fill="#f43f5e" />
            <Path data="M 55,10 C 52,2 44,2 44,12 C 44,20 55,25 55,25 C 55,25 66,20 66,12 C 66,2 58,2 55,10 Z" fill="#fb7185" />
          </Group>
        );

      case 'butterfly':
        // Delicate butterfly
        return (
          <Group scaleX={w / 60} scaleY={h / 50}>
            <Path data="M 30,25 C 10,5 5,30 25,32 C 15,45 28,48 30,35 C 32,48 45,45 35,32 C 55,30 50,5 30,25 Z" fill={element.color || '#ec4899'} opacity={0.8} />
            <Path data="M 30,15 L 30,40" stroke="#831843" strokeWidth={2} />
          </Group>
        );

      case 'star':
        // 5-point golden star
        return (
          <Group scaleX={w / 50} scaleY={h / 50}>
            <Path
              data="M 25,1 L 32.5,17 L 50,19.5 L 37.5,31.5 L 40.5,49 L 25,40.5 L 9.5,49 L 12.5,31.5 L 0,19.5 L 17.5,17 Z"
              fill={element.color || '#f59e0b'}
              stroke="#d97706"
              strokeWidth={1.5}
            />
          </Group>
        );

      case 'frame-border':
        // Ornate / Chalk / Double outline border
        return (
          <Group>
            <Rect
              x={0}
              y={0}
              width={w}
              height={h}
              stroke={element.color || '#71717a'}
              strokeWidth={Math.max(2, Math.round(canvasWidth * 0.003))}
              fill="transparent"
              opacity={element.opacity ?? 0.6}
            />
            <Rect
              x={Math.round(canvasWidth * 0.008)}
              y={Math.round(canvasHeight * 0.008)}
              width={Math.max(0, w - Math.round(canvasWidth * 0.016))}
              height={Math.max(0, h - Math.round(canvasHeight * 0.016))}
              stroke={element.color || '#71717a'}
              strokeWidth={Math.max(1, Math.round(canvasWidth * 0.0015))}
              fill="transparent"
              opacity={element.opacity ? element.opacity * 0.7 : 0.4}
            />
          </Group>
        );

      case 'doodle':
        // Hand-drawn artistic sparkle / flourish
        return (
          <Group scaleX={w / 60} scaleY={h / 60}>
            <Path
              data="M 30,0 Q 30,30 60,30 Q 30,30 30,60 Q 30,30 0,30 Q 30,30 30,0 Z"
              fill={element.color || '#f43f5e'}
              opacity={0.85}
            />
            <Circle x={12} y={12} radius={3.5} fill={element.color || '#fbbf24'} />
            <Circle x={48} y={48} radius={3.5} fill={element.color || '#fbbf24'} />
          </Group>
        );

      case 'floral':
        // Botanical branch with leaves
        return (
          <Group scaleX={w / 80} scaleY={h / 80}>
            <Path data="M 10,70 Q 40,40 70,10" stroke={element.color || '#15803d'} strokeWidth={3} />
            <Path data="M 30,50 Q 20,35 35,35 Q 40,45 30,50 Z" fill={element.color || '#16a34a'} />
            <Path data="M 45,35 Q 35,20 50,20 Q 55,30 45,35 Z" fill={element.color || '#16a34a'} />
            <Path data="M 60,20 Q 50,5 65,5 Q 70,15 60,20 Z" fill={element.color || '#16a34a'} />
            <Path data="M 20,60 Q 35,65 25,75 Q 15,70 20,60 Z" fill={element.color || '#15803d'} />
          </Group>
        );

      case 'ribbon':
        // Festive banner ribbon
        return (
          <Group scaleX={w / 100} scaleY={h / 40}>
            <Path data="M 10,20 L 25,5 L 75,5 L 90,20 L 75,35 L 25,35 Z" fill={element.color || '#e11d48'} />
            <Path data="M 0,15 L 15,25 L 0,35 Z" fill={element.color || '#be123c'} />
            <Path data="M 100,15 L 85,25 L 100,35 Z" fill={element.color || '#be123c'} />
          </Group>
        );

      case 'badge':
        // Award seal rosette
        return (
          <Group scaleX={w / 60} scaleY={h / 60}>
            <Circle x={30} y={25} radius={22} fill={element.color || '#f59e0b'} stroke="#d97706" strokeWidth={2} />
            <Circle x={30} y={25} radius={18} fill="#fef08a" />
            <Path data="M 22,42 L 15,58 L 26,53 L 30,44 Z" fill="#d97706" />
            <Path data="M 38,42 L 45,58 L 34,53 L 30,44 Z" fill="#b45309" />
          </Group>
        );

      case 'line':
        return (
          <Rect width={w} height={Math.max(2, h)} fill={element.color || '#cbd5e1'} opacity={opacity} />
        );

      case 'svg':
        return element.svgPath ? (
          <Path data={element.svgPath} fill={element.color || '#000000'} opacity={opacity} />
        ) : (
          <Path data={getHeartSvgPath(w, h)} fill={element.color || '#f43f5e'} opacity={opacity} />
        );

      case 'heart':
      default:
        return (
          <Path
            data={getHeartSvgPath(w, h)}
            fill={element.color || '#f43f5e'}
            opacity={opacity}
          />
        );
    }
  };

  return (
    <Group
      x={decX}
      y={decY}
      rotation={rot}
      opacity={opacity}
      onClick={readOnly ? undefined : onSelect}
      onTap={readOnly ? undefined : onSelect}
      listening={!readOnly}
    >
      {renderGraphic()}

      {!readOnly && isSelected && (
        <Rect
          x={-4}
          y={-4}
          width={w + 8}
          height={h + 8}
          stroke="#4f46e5"
          strokeWidth={2}
          dash={[4, 3]}
          cornerRadius={4}
          listening={false}
        />
      )}
    </Group>
  );
};
