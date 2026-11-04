import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FolderKanban,
  Clock,
  Sparkles,
  ArrowRight,
  Trash2,
  Copy,
  Plus,
} from 'lucide-react';
import { ProjectData } from '@framecraft/shared';
import { listRecentProjects, deleteRecentProject } from '../lib/storage.js';
import { useEditorStore } from '../stores/editorStore.js';

export const MyProjectsPage: React.FC = () => {
  const navigate = useNavigate();
  const setProject = useEditorStore((state) => state.setProject);

  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const recents = await listRecentProjects();
      setProjects(recents);
      setIsLoading(false);
    }
    load();
  }, []);

  const handleOpenProject = (p: ProjectData) => {
    setProject(p);
    navigate(`/editor/${p.templateId}`);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this project?')) {
      await deleteRecentProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleDuplicate = (p: ProjectData, e: React.MouseEvent) => {
    e.stopPropagation();
    const copy: ProjectData = {
      ...p,
      id: crypto.randomUUID(),
      title: `${p.title} (Copy)`,
      updatedAt: new Date().toISOString(),
    };
    setProjects((prev) => [copy, ...prev]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            My Projects
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Access your saved designs and continue customizing anytime
          </p>
        </div>

        <Link
          to="/templates"
          className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          <span>New Collage</span>
        </Link>
      </div>

      {/* Projects Grid */}
      {isLoading ? (
        <div className="text-center py-20">
          <p className="text-xs text-slate-400">Loading your designs...</p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center space-y-4 max-w-md mx-auto">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto">
            <FolderKanban className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No saved designs yet</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Choose any of our ready-made templates and start crafting your personalized frame or collage!
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center space-x-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow transition"
          >
            <span>Explore Templates</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map((p) => {
            const firstPhotoUrl = Object.values(p.assignedPhotos)[0]?.photoUrl;
            return (
              <div
                key={p.id}
                onClick={() => handleOpenProject(p)}
                className="group bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="aspect-[4/5] bg-slate-100 overflow-hidden relative">
                  {firstPhotoUrl ? (
                    <img
                      src={firstPhotoUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                      <FolderKanban className="w-12 h-12" />
                    </div>
                  )}

                  <span className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-slate-700 text-[10px] px-2 py-0.5 rounded-md font-mono font-semibold uppercase">
                    {p.aspectRatio}
                  </span>
                </div>

                {/* Card Meta */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition truncate">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-slate-400 flex items-center space-x-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{new Date(p.updatedAt).toLocaleDateString()}</span>
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-indigo-600">
                      Continue Editing
                    </span>
                    <div className="flex items-center space-x-1">
                      <button
                        onClick={(e) => handleDuplicate(p, e)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition"
                        title="Duplicate design"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={(e) => handleDelete(p.id, e)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                        title="Delete design"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
