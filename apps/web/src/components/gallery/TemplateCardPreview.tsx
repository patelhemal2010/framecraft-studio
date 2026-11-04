import React, { useRef, useState, useEffect } from 'react';
import { TemplateDefinition } from '@framecraft/shared';
import { TemplateCanvas } from '../canvas/TemplateCanvas.js';

interface TemplateCardPreviewProps {
  template: TemplateDefinition;
  /** Hide gallery badges / hover CTA (used in editor sidebar) */
  compact?: boolean;
}

// Global in-memory cache for rendered previews: key -> dataURL
const previewCache = new Map<string, string>();

export const TemplateCardPreview: React.FC<TemplateCardPreviewProps> = ({
  template,
  compact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });

  const bg = template.background.color || '#ffffff';
  const isLandscape = template.aspectRatio === '16:9';
  const isSquare = template.aspectRatio === '1:1';
  const is916 = template.aspectRatio === '9:16';
  const is34 = template.aspectRatio === '3:4';

  const aspectClass = isSquare
    ? 'aspect-square'
    : isLandscape
    ? 'aspect-[16/9]'
    : is916
    ? 'aspect-[9/16]'
    : is34
    ? 'aspect-[3/4]'
    : 'aspect-[4/5]';

  // IntersectionObserver for lazy-loading preview cards
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // If IntersectionObserver is supported
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              observer.unobserve(el);
            }
          });
        },
        { rootMargin: '250px' }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      setInView(true);
    }
  }, []);

  // Measure actual container dimensions for pixel-perfect scale-to-fit
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const updateSize = () => {
      const rect = el.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDimensions({
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        });
      }
    };

    updateSize();

    if ('ResizeObserver' in window) {
      const ro = new ResizeObserver(() => updateSize());
      ro.observe(el);
      return () => ro.disconnect();
    }
  }, [inView]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${compact ? '' : aspectClass} overflow-hidden ${
        compact ? '' : 'rounded-t-xl transition-transform duration-300 group-hover:scale-[1.01]'
      } flex items-center justify-center`}
      style={{ backgroundColor: bg }}
    >
      {/* Shared Konva Template Canvas Renderer when in view and dimensions measured */}
      {inView && dimensions.width > 0 && dimensions.height > 0 ? (
        <TemplateCanvas
          template={template}
          width={dimensions.width}
          height={dimensions.height}
          interactive={false}
          className="w-full h-full pointer-events-none"
        />
      ) : (
        /* Sleek Skeleton Loading Placeholder with template background */
        <div
          className="w-full h-full flex flex-col items-center justify-center animate-pulse"
          style={{ backgroundColor: bg }}
        >
          <div className="w-12 h-12 rounded-full bg-slate-300/30 flex items-center justify-center text-xs text-slate-400 font-mono">
            {template.photoCount}P
          </div>
        </div>
      )}

      {!compact && (
        <>
          {/* Gradient hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 z-20 pointer-events-none">
            <span className="w-full text-center py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md transition pointer-events-auto">
              Customize Design
            </span>
          </div>

          {/* Badges */}
          <span className="absolute bottom-2 right-2 z-10 bg-slate-900/85 backdrop-blur-md text-white text-[10px] px-2 py-0.5 rounded-full font-mono font-medium shadow-xs pointer-events-none">
            {template.photoCount} {template.photoCount === 1 ? 'photo' : 'photos'}
          </span>
          <span className="absolute top-2 right-2 z-10 bg-white/90 backdrop-blur-md text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold uppercase shadow-xs pointer-events-none">
            {template.aspectRatio}
          </span>
        </>
      )}
    </div>
  );
};
