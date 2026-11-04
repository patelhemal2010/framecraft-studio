import { get, set, del } from 'idb-keyval';
import { ProjectData } from '@framecraft/shared';

const CURRENT_DRAFT_KEY = 'framecraft_current_draft';
const RECENT_PROJECTS_KEY = 'framecraft_recent_projects_index';

export async function saveDraft(project: ProjectData): Promise<void> {
  try {
    await set(CURRENT_DRAFT_KEY, project);
    await saveRecentProject(project);
  } catch (err) {
    console.warn('Failed to save draft to IndexedDB:', err);
  }
}

export async function loadDraft(): Promise<ProjectData | null> {
  try {
    const draft = await get<ProjectData>(CURRENT_DRAFT_KEY);
    return draft || null;
  } catch (err) {
    console.warn('Failed to load draft from IndexedDB:', err);
    return null;
  }
}

export async function clearDraft(): Promise<void> {
  try {
    await del(CURRENT_DRAFT_KEY);
  } catch (err) {
    console.warn('Failed to clear draft:', err);
  }
}

export async function saveRecentProject(project: ProjectData): Promise<void> {
  try {
    const list = (await get<ProjectData[]>(RECENT_PROJECTS_KEY)) || [];
    const filtered = list.filter((p) => p.id !== project.id);
    const updated = [project, ...filtered].slice(0, 20); // Keep 20 recent
    await set(RECENT_PROJECTS_KEY, updated);
  } catch (err) {
    console.warn('Failed to update recent projects index:', err);
  }
}

export async function listRecentProjects(): Promise<ProjectData[]> {
  try {
    const list = await get<ProjectData[]>(RECENT_PROJECTS_KEY);
    return list || [];
  } catch (err) {
    console.warn('Failed to list recent projects:', err);
    return [];
  }
}

export async function deleteRecentProject(id: string): Promise<void> {
  try {
    const list = (await get<ProjectData[]>(RECENT_PROJECTS_KEY)) || [];
    const updated = list.filter((p) => p.id !== id);
    await set(RECENT_PROJECTS_KEY, updated);
  } catch (err) {
    console.warn('Failed to delete recent project:', err);
  }
}
