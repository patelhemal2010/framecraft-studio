import { describe, it, expect, beforeEach } from 'vitest';
import { useEditorStore } from '../stores/editorStore.js';
import { INITIAL_TEMPLATES } from '@framecraft/shared';

describe('Editor Store & State Management', () => {
  beforeEach(() => {
    const store = useEditorStore.getState();
    store.loadTemplate(INITIAL_TEMPLATES[0]);
  });

  it('loads a template definition into active project with default sample photos', () => {
    const state = useEditorStore.getState();
    expect(state.project).toBeDefined();
    expect(state.project?.title).toBe(INITIAL_TEMPLATES[0].name);
    expect(state.project?.slots.length).toBe(INITIAL_TEMPLATES[0].photoSlots.length);
    expect(state.project?.assignedPhotos['slot-1']).toBeDefined();
    expect(state.project?.assignedPhotos['slot-1'].crop.scale).toBe(1);
  });

  it('updates photo crop and zooms', () => {
    const store = useEditorStore.getState();
    store.updateCrop('slot-1', { scale: 1.8, rotation: 90 });

    const updated = useEditorStore.getState().project?.assignedPhotos['slot-1'];
    expect(updated?.crop.scale).toBe(1.8);
    expect(updated?.crop.rotation).toBe(90);
  });

  it('resets photo crop to default', () => {
    const store = useEditorStore.getState();
    store.updateCrop('slot-1', { scale: 2.5, rotation: 180, x: 50, y: -40 });
    store.resetCrop('slot-1');

    const reset = useEditorStore.getState().project?.assignedPhotos['slot-1'];
    expect(reset?.crop.scale).toBe(1);
    expect(reset?.crop.rotation).toBe(0);
    expect(reset?.crop.x).toBe(0);
  });

  it('supports undo and redo transitions', () => {
    const store = useEditorStore.getState();
    expect(store.history.past.length).toBe(0);

    // Make an edit (e.g. rename title)
    store.updateTitle('My Custom 30th Birthday Frame');
    expect(useEditorStore.getState().project?.title).toBe('My Custom 30th Birthday Frame');
    expect(useEditorStore.getState().history.past.length).toBe(1);

    // Undo
    store.undo();
    expect(useEditorStore.getState().project?.title).toBe(INITIAL_TEMPLATES[0].name);
    expect(useEditorStore.getState().history.future.length).toBe(1);

    // Redo
    store.redo();
    expect(useEditorStore.getState().project?.title).toBe('My Custom 30th Birthday Frame');
  });

  it('adds and edits text elements', () => {
    const store = useEditorStore.getState();
    const initialCount = store.project?.textElements.length || 0;

    store.addText('Special Memories', { fontSize: 40 });
    const afterAdd = useEditorStore.getState().project;
    expect(afterAdd?.textElements.length).toBe(initialCount + 1);

    const addedElement = afterAdd?.textElements[afterAdd.textElements.length - 1];
    expect(addedElement?.text).toBe('Special Memories');

    // Update text
    store.updateText(addedElement!.id, { text: 'Forever Blessed' });
    const afterUpdate = useEditorStore.getState().project?.textElements.find(
      (t) => t.id === addedElement!.id
    );
    expect(afterUpdate?.text).toBe('Forever Blessed');
  });

  it('updates calendar month and highlighted date', () => {
    const store = useEditorStore.getState();
    store.updateCalendar({
      month: 12,
      year: 2026,
      highlightedDates: [{ day: 25, label: 'Christmas', style: 'heart' }],
    });

    const cal = useEditorStore.getState().project?.calendarConfig;
    expect(cal?.month).toBe(12);
    expect(cal?.year).toBe(2026);
    expect(cal?.highlightedDates[0]?.day).toBe(25);
  });
});
