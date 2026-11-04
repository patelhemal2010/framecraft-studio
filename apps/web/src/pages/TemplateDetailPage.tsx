import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sparkles, Check, Printer, Layers } from 'lucide-react';
import { INITIAL_TEMPLATES } from '@framecraft/shared';
import { useEditorStore } from '../stores/editorStore.js';

export const TemplateDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const loadTemplate = useEditorStore((state) => state.loadTemplate);

  const template = INITIAL_TEMPLATES.find((t) => t.slug === slug || t.id === slug);

  if (!template) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-4 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Template not found</h2>
        <Link to="/templates" className="text-indigo-600 hover:underline text-sm font-semibold">
          Return to all templates
        </Link>
      </div>
    );
  }

  const handleCustomize = () => {
    loadTemplate(template);
    navigate(`/editor/${template.slug}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Gallery</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left: Template Preview Card */}
        <div className="lg:col-span-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-200">
          <div className="relative aspect-[4/5] rounded-xl overflow-hidden bg-slate-900 shadow-inner">
            <img
              src={template.photoSlots[0]?.defaultSampleUrl}
              alt={template.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right: Template Details & CTA */}
        <div className="lg:col-span-6 space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
              {template.category}
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
              {template.name}
            </h1>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {template.description}
            </p>
          </div>

          {/* Specifications */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Template Specifications
            </h3>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-500">Required Photos:</span>{' '}
                <span className="font-semibold text-slate-800">{template.photoCount}</span>
              </div>
              <div>
                <span className="text-slate-500">Canvas Ratio:</span>{' '}
                <span className="font-semibold text-slate-800">{template.aspectRatio}</span>
              </div>
              <div>
                <span className="text-slate-500">Native Resolution:</span>{' '}
                <span className="font-semibold text-slate-800">
                  {template.canvasWidth} × {template.canvasHeight} px
                </span>
              </div>
              <div>
                <span className="text-slate-500">Supported Sizes:</span>{' '}
                <span className="font-semibold text-slate-800">
                  {template.supportedPrintSizes.join(', ')}
                </span>
              </div>
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Key Features
            </h3>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Automatic cover-fit scaling preserves original photo aspect ratios</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complete text and message personalization with luxury fonts</span>
              </li>
              <li className="flex items-center space-x-2">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Export high-resolution 300 DPI print-ready PNG, JPG, or PDF</span>
              </li>
            </ul>
          </div>

          {/* Primary Action Button */}
          <div className="pt-4">
            <button
              onClick={handleCustomize}
              className="w-full flex items-center justify-center space-x-2 py-3.5 px-6 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 transition"
              id="customize-template-btn"
            >
              <span>Use This Template in Editor</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
