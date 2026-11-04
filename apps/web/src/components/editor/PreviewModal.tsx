import React from 'react';
import { X, Sparkles, Download } from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore.js';
import { CanvasStage } from '../canvas/CanvasStage.js';

interface PreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenExport: () => void;
}

export const PreviewModal: React.FC<PreviewModalProps> = ({
  isOpen,
  onClose,
  onOpenExport,
}) => {
  const project = useEditorStore((state) => state.project);
  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        {/* Top Floating Controls */}
        <div className="w-full flex items-center justify-between pb-4 px-2 text-white">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="font-semibold text-sm">{project.title} — Real-Time Preview</span>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => {
                onClose();
                onOpenExport();
              }}
              className="flex items-center space-x-1.5 px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-md transition"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Design</span>
            </button>
            <button
              id="close-preview-btn"
              onClick={onClose}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
              title="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scaled Preview Frame */}
        <div className="overflow-auto max-h-[75vh] p-4 flex items-center justify-center">
          <div className="scale-75 origin-top transition-transform">
            <CanvasStage />
          </div>
        </div>
      </div>
    </div>
  );
};
