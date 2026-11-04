import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ChevronLeft,
  Undo2,
  Redo2,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Download,
  Eye,
  CheckCircle2,
  Cloud,
  AlertCircle,
} from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore.js';

interface TopToolbarProps {
  onOpenExport: () => void;
  onOpenPreview: () => void;
}

export const TopToolbar: React.FC<TopToolbarProps> = ({
  onOpenExport,
  onOpenPreview,
}) => {
  const navigate = useNavigate();
  const project = useEditorStore((state) => state.project);
  const updateTitle = useEditorStore((state) => state.updateTitle);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const history = useEditorStore((state) => state.history);
  const zoom = useEditorStore((state) => state.zoom);
  const setZoom = useEditorStore((state) => state.setZoom);
  const saveStatus = useEditorStore((state) => state.saveStatus);

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleInput, setTitleInput] = useState(project?.title || 'Untitled Design');

  const handleTitleSubmit = () => {
    if (titleInput.trim()) {
      updateTitle(titleInput.trim());
    }
    setIsEditingTitle(false);
  };

  const zoomPercent = Math.round(zoom * 100);

  return (
    <header className="h-14 bg-white border-b border-slate-200 px-4 flex items-center justify-between z-20 select-none shadow-sm">
      {/* Left: Back & Project Title */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigate('/templates')}
          className="flex items-center space-x-1 px-2.5 py-1.5 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
          title="Back to Templates"
          id="back-to-templates-btn"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Templates</span>
        </button>

        <div className="h-5 w-px bg-slate-200" />

        {/* Title editing */}
        {isEditingTitle ? (
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
            onBlur={handleTitleSubmit}
            onKeyDown={(e) => e.key === 'Enter' && handleTitleSubmit()}
            autoFocus
            className="px-2 py-1 text-sm font-semibold text-slate-800 border border-indigo-500 rounded focus:outline-none"
          />
        ) : (
          <button
            onClick={() => {
              setTitleInput(project?.title || 'Untitled Design');
              setIsEditingTitle(true);
            }}
            className="text-sm font-semibold text-slate-800 hover:text-indigo-600 px-2 py-1 rounded hover:bg-slate-50 transition max-w-xs truncate"
            title="Click to rename design"
          >
            {project?.title || 'Untitled Design'}
          </button>
        )}

        {/* Save status badge */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 pl-2">
          {saveStatus === 'saved' && (
            <>
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-600 font-medium hidden sm:inline">Saved</span>
            </>
          )}
          {saveStatus === 'saving' && (
            <>
              <Cloud className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
              <span className="text-indigo-600 font-medium hidden sm:inline">Saving...</span>
            </>
          )}
          {saveStatus === 'unsaved' && (
            <span className="text-slate-400 hidden sm:inline">Unsaved changes</span>
          )}
          {saveStatus === 'error' && (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
              <span className="text-rose-600 font-medium hidden sm:inline">Save error</span>
            </>
          )}
        </div>
      </div>

      {/* Center: Undo, Redo, Zoom Controls */}
      <div className="flex items-center space-x-1 sm:space-x-2">
        <button
          onClick={undo}
          disabled={history.past.length === 0}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
          title="Undo (Ctrl+Z)"
          id="undo-btn"
        >
          <Undo2 className="w-4 h-4" />
        </button>
        <button
          onClick={redo}
          disabled={history.future.length === 0}
          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:hover:bg-transparent transition"
          title="Redo (Ctrl+Shift+Z)"
          id="redo-btn"
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-slate-200" />

        {/* Zoom controls */}
        <div className="flex items-center space-x-1 bg-slate-100 p-0.5 rounded-lg text-xs font-medium text-slate-700">
          <button
            onClick={() => setZoom(zoom - 0.05)}
            className="p-1 rounded hover:bg-white transition"
            title="Zoom Out"
            id="zoom-out-btn"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="w-11 text-center font-mono">{zoomPercent}%</span>
          <button
            onClick={() => setZoom(zoom + 0.05)}
            className="p-1 rounded hover:bg-white transition"
            title="Zoom In"
            id="zoom-in-btn"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(0.23)}
            className="p-1 rounded hover:bg-white transition text-slate-500"
            title="Fit Canvas to Screen"
            id="zoom-fit-btn"
          >
            <Maximize2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Right: Preview & Export */}
      <div className="flex items-center space-x-2">
        <button
          onClick={onOpenPreview}
          className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
          id="preview-btn"
        >
          <Eye className="w-4 h-4 text-slate-600" />
          <span className="hidden sm:inline">Preview</span>
        </button>

        <button
          onClick={onOpenExport}
          className="flex items-center space-x-1.5 px-4 py-1.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg shadow-sm hover:shadow transition"
          id="export-btn"
        >
          <Download className="w-4 h-4" />
          <span>Export Design</span>
        </button>
      </div>
    </header>
  );
};
