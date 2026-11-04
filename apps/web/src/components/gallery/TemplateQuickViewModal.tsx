import React from 'react';
import { X, ArrowRight, Printer, Sparkles, Layers, Sliders } from 'lucide-react';
import { TemplateDefinition } from '@framecraft/shared';
import { TemplateCardPreview } from './TemplateCardPreview.js';

interface TemplateQuickViewModalProps {
  template: TemplateDefinition | null;
  isOpen: boolean;
  onClose: () => void;
  onCustomize: (template: TemplateDefinition) => void;
}

export const TemplateQuickViewModal: React.FC<TemplateQuickViewModalProps> = ({
  template,
  isOpen,
  onClose,
  onCustomize,
}) => {
  if (!isOpen || !template) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 rounded-full shadow-sm transition"
          id="close-quickview-btn"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Preview Canvas Presentation */}
        <div className="md:w-1/2 p-6 bg-slate-100 flex items-center justify-center border-b md:border-b-0 md:border-r border-slate-200">
          <div className="w-full max-w-xs shadow-xl rounded-xl overflow-hidden border border-slate-200 bg-white">
            <TemplateCardPreview template={template} />
          </div>
        </div>

        {/* Right: Template Details & Action */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-5">
            <div>
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-full capitalize">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{template.category}</span>
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-2">
                {template.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                {template.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs">
              <div>
                <p className="text-slate-400 font-medium">Aspect Ratio</p>
                <p className="font-semibold text-slate-800 font-mono mt-0.5">{template.aspectRatio}</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Photo Slots</p>
                <p className="font-semibold text-slate-800 mt-0.5">{template.photoCount} editable slots</p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Native Resolution</p>
                <p className="font-semibold text-slate-800 font-mono mt-0.5">
                  {template.canvasWidth} × {template.canvasHeight} px
                </p>
              </div>
              <div>
                <p className="text-slate-400 font-medium">Print Output</p>
                <p className="font-semibold text-slate-800 mt-0.5">300 DPI Print-Ready</p>
              </div>
            </div>

            {/* Supported Print Sizes */}
            <div>
              <p className="text-xs font-semibold text-slate-700 flex items-center space-x-1.5 mb-2">
                <Printer className="w-3.5 h-3.5 text-indigo-600" />
                <span>Supported Print Sizes:</span>
              </p>
              <div className="flex flex-wrap gap-1.5">
                {template.supportedPrintSizes.map((size) => (
                  <span
                    key={size}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded-md text-[11px] font-mono font-medium text-slate-700 shadow-2xs"
                  >
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1">
              {template.tags.map((tag) => (
                <span key={tag} className="text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Action button */}
          <div className="pt-6 border-t border-slate-100 mt-6">
            <button
              onClick={() => onCustomize(template)}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-semibold shadow-md transition hover:shadow-lg"
              id="quickview-customize-btn"
            >
              <span>Customize This Template</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
