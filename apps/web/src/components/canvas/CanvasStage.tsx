import React, { forwardRef } from 'react';
import Konva from 'konva';
import { useEditorStore } from '../../stores/editorStore.js';
import { TemplateCanvas } from './TemplateCanvas.js';

interface CanvasStageProps {
  onStageClick?: (e: any) => void;
}

export const CanvasStage = forwardRef<Konva.Stage, CanvasStageProps>(
  ({ onStageClick }, ref) => {
    const project = useEditorStore((state) => state.project);
    const zoom = useEditorStore((state) => state.zoom);
    const selectedId = useEditorStore((state) => state.selectedId);
    const selectedType = useEditorStore((state) => state.selectedType);
    const setSelected = useEditorStore((state) => state.setSelected);

    if (!project) return null;

    const width = project.canvasWidth * zoom;
    const height = project.canvasHeight * zoom;

    return (
      <div
        className="flex items-center justify-center min-h-full p-8 select-none"
        id="canvas-container"
      >
        <div
          className="relative transition-all duration-150 rounded shadow-2xl bg-white"
          style={{
            width,
            height,
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          }}
        >
          <TemplateCanvas
            ref={ref}
            project={project}
            scale={zoom}
            interactive={true}
            selectedId={selectedId}
            selectedType={selectedType}
            onSelect={setSelected}
            onStageClick={onStageClick}
          />
        </div>
      </div>
    );
  }
);

CanvasStage.displayName = 'CanvasStage';
