import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Konva from 'konva';
import { useEditorStore } from '../stores/editorStore.js';
import { INITIAL_TEMPLATES } from '@framecraft/shared';
import { loadDraft } from '../lib/storage.js';
import { TopToolbar } from '../components/editor/TopToolbar.js';
import { LeftSidebar } from '../components/editor/LeftSidebar.js';
import { RightInspector } from '../components/editor/RightInspector.js';
import { CanvasStage } from '../components/canvas/CanvasStage.js';
import { ExportModal } from '../components/export/ExportModal.js';
import { PreviewModal } from '../components/editor/PreviewModal.js';

export const EditorPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const project = useEditorStore((state) => state.project);
  const loadTemplate = useEditorStore((state) => state.loadTemplate);
  const setProject = useEditorStore((state) => state.setProject);
  const setSelected = useEditorStore((state) => state.setSelected);
  const undo = useEditorStore((state) => state.undo);
  const redo = useEditorStore((state) => state.redo);
  const deleteElement = useEditorStore((state) => state.deleteElement);
  const selectedId = useEditorStore((state) => state.selectedId);
  const selectedType = useEditorStore((state) => state.selectedType);

  const stageRef = useRef<Konva.Stage | null>(null);

  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Initialize template or restore draft
  useEffect(() => {
    async function init() {
      // 1. If project already loaded and matches slug, keep it
      const matchedTemplate = INITIAL_TEMPLATES.find(
        (t) => t.slug === slug || t.id === slug
      );

      if (!matchedTemplate) {
        // Fallback to first template
        loadTemplate(INITIAL_TEMPLATES[0]);
        return;
      }

      // Restore draft only when it matches this template AND is not an older layout version
      const draft = await loadDraft();
      const draftIsCurrent =
        draft &&
        draft.templateId === matchedTemplate.id &&
        (draft.version ?? 0) >= matchedTemplate.version;

      if (draftIsCurrent) {
        setProject(draft);
      } else {
        // Always apply latest template definition (invalidates stale drafts after template edits)
        loadTemplate(matchedTemplate);
      }
    }

    init();
  }, [slug]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if currently typing inside an input or textarea
      const targetTag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (targetTag === 'input' || targetTag === 'textarea' || targetTag === 'select') {
        return;
      }

      // Ctrl/Cmd + Z: Undo
      if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        undo();
        return;
      }

      // Ctrl/Cmd + Shift + Z: Redo
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        redo();
        return;
      }

      // Escape: Deselect
      if (e.key === 'Escape') {
        setSelected(null, null);
        return;
      }

      // Delete / Backspace: Remove selected text/decorative element
      if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
        if (selectedType === 'text' || selectedType === 'decorative') {
          e.preventDefault();
          deleteElement(selectedId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, selectedType, undo, redo, deleteElement, setSelected]);

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden select-none">
      {/* Top Application Toolbar */}
      <TopToolbar
        onOpenExport={() => setIsExportOpen(true)}
        onOpenPreview={() => setIsPreviewOpen(true)}
      />

      {/* Main Studio Workspace */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Toolbox Sidebar */}
        <LeftSidebar />

        {/* Center Canvas Area with pan/zoom scroll */}
        <main
          className="flex-1 overflow-auto bg-slate-200/80 relative flex items-center justify-center p-6"
          id="editor-canvas-viewport"
        >
          <CanvasStage ref={stageRef} />
        </main>

        {/* Right Properties Inspector */}
        <RightInspector />
      </div>

      {/* Export Modal */}
      <ExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

      {/* Full-Screen Preview Modal */}
      <PreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        onOpenExport={() => setIsExportOpen(true)}
      />
    </div>
  );
};
