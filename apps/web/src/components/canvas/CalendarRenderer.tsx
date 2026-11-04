import React from 'react';
import { Group, Rect, Text, Path, Circle } from 'react-konva';
import { CalendarConfig, generateCalendarGrid, getHeartSvgPath, MONTH_NAMES } from '@framecraft/shared';

interface CalendarRendererProps {
  config: CalendarConfig;
  canvasWidth: number;
  canvasHeight: number;
  isSelected?: boolean;
  onSelect?: () => void;
  readOnly?: boolean;
}

function renderMonthGrid(
  config: CalendarConfig,
  calW: number,
  calH: number,
  options?: { compact?: boolean; monthOverride?: number; showHeader?: boolean }
) {
  const compact = options?.compact ?? false;
  const monthConfig: CalendarConfig = {
    ...config,
    month: options?.monthOverride ?? config.month,
  };
  const gridData = generateCalendarGrid(monthConfig);
  const showHeader = options?.showHeader ?? config.showMonthHeader !== false;

  // Scale typography to the calendar box so grids stay readable at any size
  const scale = compact
    ? Math.min(calW / 260, calH / 200, 1.2)
    : Math.min(calW / 640, calH / 460, 1.85);
  const safeScale = Math.max(0.65, scale);

  const headerFont = Math.round((compact ? 15 : 42) * safeScale);
  const weekdayFont = Math.round((compact ? 10 : 20) * safeScale);
  const dayFont = Math.round((compact ? 11 : 28) * safeScale);
  const highlightR = Math.round((compact ? 8 : 18) * safeScale);
  const headerHeight = showHeader ? Math.round(headerFont * 1.45) : 0;
  const weekdaysHeight = Math.round(weekdayFont * 1.7);
  const daysStartY = headerHeight + weekdaysHeight;
  const colWidth = calW / 7;
  const rowHeight = Math.max(dayFont + 4, (calH - daysStartY) / Math.max(gridData.weeks.length, 1));
  const fontFamily = config.fontFamily || 'Montserrat';

  return (
    <Group>
      {showHeader && (
        <Text
          text={
            compact
              ? gridData.monthName.toUpperCase()
              : `${gridData.monthName} ${gridData.year}`
          }
          fontSize={headerFont}
          fontFamily={fontFamily}
          fontStyle="bold"
          fill={config.headerColor || '#0f172a'}
          width={calW}
          align={compact ? 'center' : 'left'}
          y={Math.round(headerFont * 0.1)}
        />
      )}

      {gridData.weekdays.map((dayName, colIdx) => (
        <Text
          key={`${gridData.monthName}-${dayName}`}
          text={compact ? dayName.charAt(0) : dayName.slice(0, 3).toUpperCase()}
          x={colIdx * colWidth}
          y={headerHeight + Math.round(weekdayFont * 0.15)}
          width={colWidth}
          align="center"
          fontSize={weekdayFont}
          fontFamily={fontFamily}
          fontStyle="bold"
          fill={config.dayNumberColor || '#64748b'}
          opacity={0.85}
        />
      ))}

      {gridData.weeks.map((week, rowIdx) =>
        week.map((cell, colIdx) => {
          if (cell.day === null) return null;

          const cellX = colIdx * colWidth;
          const cellY = daysStartY + rowIdx * rowHeight;
          const centerX = cellX + colWidth / 2;
          const centerY = cellY + rowHeight / 2;

          return (
            <Group key={`day-${gridData.monthName}-${cell.day}`}>
              {cell.isHighlighted && (
                <Group>
                  {cell.highlightStyle === 'heart' ? (
                    <Path
                      data={getHeartSvgPath(highlightR * 2, highlightR * 2)}
                      x={centerX - highlightR}
                      y={centerY - highlightR - 1}
                      fill={cell.highlightColor || config.accentColor || '#e11d48'}
                      opacity={0.95}
                    />
                  ) : cell.highlightStyle === 'badge' ? (
                    <Rect
                      x={centerX - highlightR}
                      y={centerY - highlightR}
                      width={highlightR * 2}
                      height={highlightR * 2}
                      cornerRadius={compact ? 4 : 8}
                      fill={cell.highlightColor || config.accentColor || '#f59e0b'}
                    />
                  ) : (
                    <Circle
                      x={centerX}
                      y={centerY - 1}
                      radius={highlightR}
                      fill={cell.highlightColor || config.accentColor || '#e11d48'}
                    />
                  )}
                </Group>
              )}

              <Text
                text={String(cell.day)}
                x={cellX}
                y={centerY - dayFont / 2}
                width={colWidth}
                align="center"
                fontSize={dayFont}
                fontFamily={fontFamily}
                fontStyle={cell.isHighlighted ? 'bold' : 'normal'}
                fill={
                  cell.isHighlighted
                    ? '#ffffff'
                    : config.dayNumberColor || '#1e293b'
                }
              />
            </Group>
          );
        })
      )}
    </Group>
  );
}

export const CalendarRenderer: React.FC<CalendarRendererProps> = ({
  config,
  canvasWidth,
  canvasHeight,
  isSelected = false,
  onSelect,
  readOnly = false,
}) => {
  const calX = Math.round(config.x * canvasWidth);
  const calY = Math.round(config.y * canvasHeight);
  const calW = Math.round(config.width * canvasWidth);
  const calH = Math.round(config.height * canvasHeight);
  const isYear = config.layout === 'year';

  return (
    <Group
      x={calX}
      y={calY}
      onClick={readOnly ? undefined : onSelect}
      onTap={readOnly ? undefined : onSelect}
      listening={!readOnly}
    >
      {!readOnly && isSelected && (
        <Rect
          x={-10}
          y={-10}
          width={calW + 20}
          height={calH + 20}
          stroke="#4f46e5"
          strokeWidth={2}
          dash={[6, 4]}
          cornerRadius={12}
        />
      )}

      {isYear ? (
        <Group>
          {MONTH_NAMES.map((name, idx) => {
            const col = idx % 3;
            const row = Math.floor(idx / 3);
            const cellW = calW / 3;
            const cellH = calH / 4;
            const padX = cellW * 0.06;
            const padY = cellH * 0.04;
            return (
              <Group
                key={name}
                x={col * cellW + padX}
                y={row * cellH + padY}
              >
                {renderMonthGrid(config, cellW - padX * 2, cellH - padY * 2, {
                  compact: true,
                  monthOverride: idx + 1,
                  showHeader: true,
                })}
              </Group>
            );
          })}
        </Group>
      ) : (
        renderMonthGrid(config, calW, calH)
      )}
    </Group>
  );
};
