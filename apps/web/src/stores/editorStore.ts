import { create } from 'zustand';
import {
  TemplateDefinition,
  ProjectData,
  PhotoSlot,
  TextElement,
  DecorativeElement,
  CalendarConfig,
  BackgroundConfig,
  CropState,
  AssignedPhoto,
  createDefaultCrop,
  autoFillSlots,
  UploadedImageInput,
} from '@framecraft/shared';
import { saveDraft } from '../lib/storage.js';

export type SelectedElementType =
  | 'slot'
  | 'text'
  | 'decorative'
  | 'calendar'
  | 'background'
  | null;

export type SaveStatus = 'saved' | 'saving' | 'unsaved' | 'error';

interface HistoryState {
  past: ProjectData[];
  future: ProjectData[];
}

interface EditorState {
  project: ProjectData | null;
  history: HistoryState;
  selectedId: string | null;
  selectedType: SelectedElementType;
  zoom: number;
  saveStatus: SaveStatus;
  activeSidebarTab: 'templates' | 'uploads' | 'text' | 'calendar' | 'background' | 'layers';

  // Actions
  loadTemplate: (template: TemplateDefinition) => void;
  setProject: (project: ProjectData) => void;
  setSelected: (id: string | null, type: SelectedElementType) => void;
  setZoom: (zoom: number) => void;
  setActiveSidebarTab: (tab: 'templates' | 'uploads' | 'text' | 'calendar' | 'background' | 'layers') => void;
  updateTitle: (title: string) => void;

  // Photo actions
  assignPhoto: (
    slotId: string,
    photoUrl: string,
    assetId?: string,
    naturalWidth?: number,
    naturalHeight?: number
  ) => void;
  updateCrop: (slotId: string, cropUpdate: Partial<CropState>) => void;
  resetCrop: (slotId: string) => void;
  removePhoto: (slotId: string) => void;
  autoFillAll: (images: UploadedImageInput[]) => void;
  clearAllPhotos: () => void;

  // Text actions
  updateText: (id: string, updates: Partial<TextElement>) => void;
  addText: (text?: string, overrides?: Partial<TextElement>) => void;

  // Element actions
  deleteElement: (id: string) => void;
  reorderLayer: (id: string, direction: 'up' | 'down' | 'front' | 'back') => void;

  // Calendar actions
  updateCalendar: (updates: Partial<CalendarConfig>) => void;

  // Background actions
  updateBackground: (updates: Partial<BackgroundConfig>) => void;

  // History
  undo: () => void;
  redo: () => void;
}

const MAX_HISTORY = 30;

function pushHistory(currentProject: ProjectData, history: HistoryState): HistoryState {
  return {
    past: [...history.past.slice(-(MAX_HISTORY - 1)), JSON.parse(JSON.stringify(currentProject))],
    future: [],
  };
}

let autosaveTimer: any = null;
function triggerAutosave(project: ProjectData, set: any) {
  set({ saveStatus: 'unsaved' });
  if (autosaveTimer) clearTimeout(autosaveTimer);
  autosaveTimer = setTimeout(async () => {
    try {
      set({ saveStatus: 'saving' });
      await saveDraft(project);
      set({ saveStatus: 'saved' });
    } catch {
      set({ saveStatus: 'error' });
    }
  }, 1000);
}

/** Default editor zoom so a 2400×3000 frame fits on screen when a template opens. */
export const DEFAULT_CANVAS_ZOOM = 0.23;

export const useEditorStore = create<EditorState>((set, get) => ({
  project: null,
  history: { past: [], future: [] },
  selectedId: null,
  selectedType: null,
  zoom: DEFAULT_CANVAS_ZOOM,
  saveStatus: 'saved',
  activeSidebarTab: 'templates',

  loadTemplate: (template) => {
    const initialAssigned: Record<string, AssignedPhoto> = {};
    for (const slot of template.photoSlots) {
      if (slot.defaultSampleUrl) {
        initialAssigned[slot.id] = {
          slotId: slot.id,
          photoUrl: slot.defaultSampleUrl,
          crop: createDefaultCrop(),
        };
      }
    }

    const project: ProjectData = {
      id: crypto.randomUUID(),
      title: template.name,
      templateId: template.id,
      category: template.category,
      canvasWidth: template.canvasWidth,
      canvasHeight: template.canvasHeight,
      aspectRatio: template.aspectRatio,
      background: { ...template.background },
      slots: [...template.photoSlots],
      assignedPhotos: initialAssigned,
      textElements: [...template.textElements],
      decorativeElements: [...(template.decorativeElements || [])],
      calendarConfig: template.calendarConfig ? { ...template.calendarConfig } : undefined,
      // Track template definition version so draft restore can detect layout updates
      version: template.version,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    set({
      project,
      history: { past: [], future: [] },
      selectedId: null,
      selectedType: null,
      zoom: DEFAULT_CANVAS_ZOOM,
      saveStatus: 'saved',
    });

    triggerAutosave(project, set);
  },

  setProject: (project) => {
    set({
      project,
      history: { past: [], future: [] },
      selectedId: null,
      selectedType: null,
      zoom: DEFAULT_CANVAS_ZOOM,
      saveStatus: 'saved',
    });
  },

  setSelected: (id, type) => {
    set({ selectedId: id, selectedType: type });
  },

  setZoom: (zoom) => {
    const clamped = Math.max(0.15, Math.min(2.5, zoom));
    set({ zoom: clamped });
  },

  setActiveSidebarTab: (activeSidebarTab) => {
    set({ activeSidebarTab });
  },

  updateTitle: (title) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);
    const updated: ProjectData = {
      ...project,
      title,
      updatedAt: new Date().toISOString(),
    };
    set({ project: updated, history: newHistory });
    triggerAutosave(updated, set);
  },

  assignPhoto: (slotId, photoUrl, assetId, naturalWidth, naturalHeight) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const updatedAssigned = {
      ...project.assignedPhotos,
      [slotId]: {
        slotId,
        photoUrl,
        assetId,
        crop: createDefaultCrop(),
        naturalWidth,
        naturalHeight,
      },
    };

    const updated: ProjectData = {
      ...project,
      assignedPhotos: updatedAssigned,
      updatedAt: new Date().toISOString(),
    };

    set({
      project: updated,
      history: newHistory,
      selectedId: slotId,
      selectedType: 'slot',
    });
    triggerAutosave(updated, set);
  },

  updateCrop: (slotId, cropUpdate) => {
    const { project } = get();
    if (!project || !project.assignedPhotos[slotId]) return;

    const currentAssigned = project.assignedPhotos[slotId];
    const newCrop: CropState = {
      ...currentAssigned.crop,
      ...cropUpdate,
    };

    const updatedAssigned = {
      ...project.assignedPhotos,
      [slotId]: {
        ...currentAssigned,
        crop: newCrop,
      },
    };

    const updated: ProjectData = {
      ...project,
      assignedPhotos: updatedAssigned,
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated });
    triggerAutosave(updated, set);
  },

  resetCrop: (slotId) => {
    const { project, history } = get();
    if (!project || !project.assignedPhotos[slotId]) return;
    const newHistory = pushHistory(project, history);

    const currentAssigned = project.assignedPhotos[slotId];
    const updatedAssigned = {
      ...project.assignedPhotos,
      [slotId]: {
        ...currentAssigned,
        crop: createDefaultCrop(),
      },
    };

    const updated: ProjectData = {
      ...project,
      assignedPhotos: updatedAssigned,
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated, history: newHistory });
    triggerAutosave(updated, set);
  },

  removePhoto: (slotId) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const updatedAssigned = { ...project.assignedPhotos };
    delete updatedAssigned[slotId];

    const updated: ProjectData = {
      ...project,
      assignedPhotos: updatedAssigned,
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated, history: newHistory });
    triggerAutosave(updated, set);
  },

  autoFillAll: (images) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const result = autoFillSlots(project.slots, images, project.assignedPhotos, {
      overwriteExisting: true,
    });

    const updated: ProjectData = {
      ...project,
      assignedPhotos: result.assignments,
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated, history: newHistory });
    triggerAutosave(updated, set);
  },

  clearAllPhotos: () => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const updated: ProjectData = {
      ...project,
      assignedPhotos: {},
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated, history: newHistory });
    triggerAutosave(updated, set);
  },

  updateText: (id, updates) => {
    const { project } = get();
    if (!project) return;

    const updatedTexts = project.textElements.map((el) =>
      el.id === id ? { ...el, ...updates } : el
    );

    const updated: ProjectData = {
      ...project,
      textElements: updatedTexts,
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated });
    triggerAutosave(updated, set);
  },

  addText: (text = 'Double click to edit', overrides = {}) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const newElement: TextElement = {
      id: `text-${Date.now()}`,
      x: 0.5,
      y: 0.5,
      text,
      fontFamily: 'Playfair Display',
      fontSize: 48,
      fontWeight: 'bold',
      fill: '#0f172a',
      align: 'center',
      zIndex: project.textElements.length + 10,
      ...overrides,
    };

    const updated: ProjectData = {
      ...project,
      textElements: [...project.textElements, newElement],
      updatedAt: new Date().toISOString(),
    };

    set({
      project: updated,
      history: newHistory,
      selectedId: newElement.id,
      selectedType: 'text',
    });
    triggerAutosave(updated, set);
  },

  deleteElement: (id) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const updatedTexts = project.textElements.filter((t) => t.id !== id);
    const updatedDecorations = project.decorativeElements.filter((d) => d.id !== id);

    const updated: ProjectData = {
      ...project,
      textElements: updatedTexts,
      decorativeElements: updatedDecorations,
      updatedAt: new Date().toISOString(),
    };

    set({
      project: updated,
      history: newHistory,
      selectedId: null,
      selectedType: null,
    });
    triggerAutosave(updated, set);
  },

  reorderLayer: (id, direction) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    // Reorder among text & decorative elements
    const textIdx = project.textElements.findIndex((t) => t.id === id);
    if (textIdx !== -1) {
      const texts = [...project.textElements];
      const el = texts[textIdx];
      if (direction === 'up') el.zIndex += 1;
      if (direction === 'down') el.zIndex = Math.max(1, el.zIndex - 1);
      if (direction === 'front') el.zIndex = 50;
      if (direction === 'back') el.zIndex = 1;

      const updated = { ...project, textElements: texts };
      set({ project: updated, history: newHistory });
      triggerAutosave(updated, set);
    }
  },

  updateCalendar: (updates) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const currentCal = project.calendarConfig || {
      month: 10,
      year: 2026,
      weekStart: 'sun',
      highlightedDates: [],
      x: 0.1,
      y: 0.55,
      width: 0.8,
      height: 0.35,
      zIndex: 2,
    };

    const updated: ProjectData = {
      ...project,
      calendarConfig: {
        ...currentCal,
        ...updates,
      },
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated, history: newHistory });
    triggerAutosave(updated, set);
  },

  updateBackground: (updates) => {
    const { project, history } = get();
    if (!project) return;
    const newHistory = pushHistory(project, history);

    const updated: ProjectData = {
      ...project,
      background: {
        ...project.background,
        ...updates,
      },
      updatedAt: new Date().toISOString(),
    };

    set({ project: updated, history: newHistory });
    triggerAutosave(updated, set);
  },

  undo: () => {
    const { project, history } = get();
    if (!project || history.past.length === 0) return;

    const previous = history.past[history.past.length - 1];
    const newPast = history.past.slice(0, -1);
    const newFuture = [JSON.parse(JSON.stringify(project)), ...history.future];

    set({
      project: previous,
      history: { past: newPast, future: newFuture },
    });
    triggerAutosave(previous, set);
  },

  redo: () => {
    const { project, history } = get();
    if (!project || history.future.length === 0) return;

    const next = history.future[0];
    const newFuture = history.future.slice(1);
    const newPast = [...history.past, JSON.parse(JSON.stringify(project))];

    set({
      project: next,
      history: { past: newPast, future: newFuture },
    });
    triggerAutosave(next, set);
  },
}));
