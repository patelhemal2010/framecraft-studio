import React, { useState, useRef } from 'react';
import {
  Layout,
  UploadCloud,
  Type,
  Calendar,
  Palette,
  Layers,
  Sparkles,
  Trash2,
  Image as ImageIcon,
  Check,
} from 'lucide-react';
import { useEditorStore } from '../../stores/editorStore.js';
import { INITIAL_TEMPLATES, TemplateDefinition, MONTH_NAMES } from '@framecraft/shared';
import { TemplateCardPreview } from '../gallery/TemplateCardPreview.js';

interface UploadedPhoto {
  id: string;
  url: string;
  name: string;
}

export const LeftSidebar: React.FC = () => {
  const project = useEditorStore((state) => state.project);
  const loadTemplate = useEditorStore((state) => state.loadTemplate);
  const assignPhoto = useEditorStore((state) => state.assignPhoto);
  const autoFillAll = useEditorStore((state) => state.autoFillAll);
  const clearAllPhotos = useEditorStore((state) => state.clearAllPhotos);
  const addText = useEditorStore((state) => state.addText);
  const updateCalendar = useEditorStore((state) => state.updateCalendar);
  const updateBackground = useEditorStore((state) => state.updateBackground);
  const selectedId = useEditorStore((state) => state.selectedId);
  const setSelected = useEditorStore((state) => state.setSelected);
  const deleteElement = useEditorStore((state) => state.deleteElement);
  const activeTab = useEditorStore((state) => state.activeSidebarTab);
  const setActiveTab = useEditorStore((state) => state.setActiveSidebarTab);

  // Uploaded photo storage
  const [uploadedPhotos, setUploadedPhotos] = useState<UploadedPhoto[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Template category filter in sidebar
  const [templateFilter, setTemplateFilter] = useState('all');

  // Handle local file uploads
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    const newItems: UploadedPhoto[] = [];

    Array.from(files).forEach((file) => {
      const url = URL.createObjectURL(file);
      newItems.push({
        id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        url,
        name: file.name,
      });
    });

    setUploadedPhotos((prev) => [...newItems, ...prev]);
    setIsUploading(false);

    // If slots are empty, auto-fill right away
    if (project) {
      const emptySlots = project.slots.filter((s) => !project.assignedPhotos[s.id]);
      if (emptySlots.length > 0) {
        autoFillAll(newItems);
      }
    }
  };

  const filledCount = project
    ? Object.keys(project.assignedPhotos).length
    : 0;
  const totalSlots = project?.slots.length || 0;

  const filteredTemplates =
    templateFilter === 'all'
      ? INITIAL_TEMPLATES
      : INITIAL_TEMPLATES.filter((t) => t.category === templateFilter);

  interface NavItem {
    id: 'templates' | 'uploads' | 'text' | 'calendar' | 'background' | 'layers';
    label: string;
    icon: any;
    badge?: number;
  }

  const navItems: NavItem[] = [
    { id: 'templates', label: 'Templates', icon: Layout },
    { id: 'uploads', label: 'Uploads', icon: UploadCloud, badge: uploadedPhotos.length || undefined },
    { id: 'text', label: 'Text', icon: Type },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'background', label: 'Background', icon: Palette },
    { id: 'layers', label: 'Layers', icon: Layers },
  ];

  return (
    <div className="w-80 md:w-96 bg-white border-r border-slate-200 flex flex-col h-[calc(100vh-3.5rem)] z-10 select-none shadow-sm">
      {/* Icon tabs */}
      <div className="flex border-b border-slate-200 bg-slate-50 overflow-x-auto scrollbar-none">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex-1 min-w-[54px] py-3 flex flex-col items-center justify-center text-xs font-medium border-b-2 transition relative ${
                isActive
                  ? 'border-indigo-600 text-indigo-600 bg-white'
                  : 'border-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100'
              }`}
              id={`tab-${item.id}`}
            >
              <Icon className="w-4 h-4 mb-1" />
              <span>{item.label}</span>
              {item.badge !== undefined && (
                <span className="absolute top-1 right-2 bg-indigo-500 text-white rounded-full text-[10px] px-1 font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Tab Content Panel */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* TAB 1: TEMPLATES */}
        {activeTab === 'templates' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-800">Browse Layouts</h3>
              <select
                value={templateFilter}
                onChange={(e) => setTemplateFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded px-2 py-1 bg-white focus:outline-none"
              >
                <option value="all">All Categories</option>
                <option value="birthday">Birthday</option>
                <option value="anniversary">Anniversary</option>
                <option value="baby">Baby & Kids</option>
                <option value="calendar">Calendar</option>
                <option value="family">Family</option>
                <option value="wedding">Wedding</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {filteredTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => loadTemplate(tmpl)}
                  className={`group relative text-left border rounded-xl overflow-hidden hover:border-indigo-500 hover:shadow-md transition bg-slate-50 ${
                    project?.templateId === tmpl.id ? 'ring-2 ring-indigo-600 border-transparent' : 'border-slate-200'
                  }`}
                >
                  <div className="aspect-[4/5] bg-slate-100 overflow-hidden relative">
                    <TemplateCardPreview template={tmpl} compact />
                    <span className="absolute bottom-1 right-1 z-10 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-medium pointer-events-none">
                      {tmpl.photoCount} {tmpl.photoCount === 1 ? 'photo' : 'photos'}
                    </span>
                  </div>
                  <div className="p-2">
                    <p className="text-xs font-semibold text-slate-800 truncate">{tmpl.name}</p>
                    <p className="text-[10px] text-slate-500 capitalize">{tmpl.category}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: UPLOADS & PHOTO FITTING */}
        {activeTab === 'uploads' && (
          <div className="space-y-4">
            {/* Slot status bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-slate-800">Photo Slots</p>
                <p className="text-[11px] text-slate-500">
                  {filledCount} of {totalSlots} slots filled
                </p>
              </div>
              <div className="flex space-x-1">
                {uploadedPhotos.length > 0 && (
                  <button
                    onClick={() => autoFillAll(uploadedPhotos)}
                    className="text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 px-2.5 py-1 rounded-lg transition"
                    id="auto-fill-btn"
                  >
                    Auto Fill
                  </button>
                )}
                {filledCount > 0 && (
                  <button
                    onClick={clearAllPhotos}
                    className="text-xs font-medium text-slate-500 hover:text-rose-600 px-2 py-1 rounded hover:bg-slate-100 transition"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>

            {/* Drop / Upload Area */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-indigo-200 hover:border-indigo-500 bg-indigo-50/50 hover:bg-indigo-50 rounded-xl p-6 text-center cursor-pointer transition"
              id="upload-dropzone"
            >
              <UploadCloud className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <p className="text-xs font-semibold text-slate-800">
                Click or drag photos here
              </p>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Supports JPG, PNG, WebP up to 25MB
              </p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>

            {/* Uploaded photos grid */}
            <div>
              <h4 className="text-xs font-semibold text-slate-700 mb-2">
                Your Uploads ({uploadedPhotos.length})
              </h4>
              {uploadedPhotos.length === 0 ? (
                <p className="text-xs text-slate-400 italic text-center py-4">
                  No photos uploaded yet. Select photos to start!
                </p>
              ) : (
                <div className="grid grid-cols-3 gap-2">
                  {uploadedPhotos.map((photo) => (
                    <div
                      key={photo.id}
                      className="group relative aspect-square rounded-lg overflow-hidden border border-slate-200 bg-slate-100 cursor-pointer hover:border-indigo-500 transition shadow-sm"
                      onClick={() => {
                        // If a slot is currently selected, assign to that slot; otherwise assign to first empty slot
                        if (project) {
                          const targetSlotId =
                            selectedId && project.slots.some((s) => s.id === selectedId)
                              ? selectedId
                              : project.slots.find((s) => !project.assignedPhotos[s.id])?.id ||
                                project.slots[0].id;
                          assignPhoto(targetSlotId, photo.url, photo.id);
                        }
                      }}
                    >
                      <img
                        src={photo.url}
                        alt={photo.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="text-[10px] text-white font-medium bg-black/60 px-1.5 py-0.5 rounded">
                          Assign
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: TEXT */}
        {activeTab === 'text' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">Add Text</h3>
            <div className="space-y-2">
              <button
                onClick={() =>
                  addText('CELEBRATE', {
                    fontSize: 54,
                    fontFamily: 'Playfair Display',
                    fontWeight: 'bold',
                  })
                }
                className="w-full text-left p-3 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-slate-50 transition"
              >
                <p className="text-lg font-serif font-bold text-slate-800">Add a Heading</p>
                <p className="text-xs text-slate-500">Playfair Display • Bold</p>
              </button>

              <button
                onClick={() =>
                  addText('A Beautiful Milestone', {
                    fontSize: 36,
                    fontFamily: 'Outfit',
                    fontWeight: '300',
                  })
                }
                className="w-full text-left p-3 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-slate-50 transition"
              >
                <p className="text-sm font-sans font-medium text-slate-700">Add a Subheading</p>
                <p className="text-xs text-slate-500">Outfit • Light</p>
              </button>

              <button
                onClick={() =>
                  addText('“Together is our favorite place to be”', {
                    fontSize: 26,
                    fontFamily: 'Inter',
                    fontStyle: 'italic',
                  })
                }
                className="w-full text-left p-3 border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-slate-50 transition"
              >
                <p className="text-xs italic text-slate-600">Add a Quote or Caption</p>
                <p className="text-[11px] text-slate-400">Inter • Italic</p>
              </button>
            </div>

            <div className="pt-2">
              <h4 className="text-xs font-semibold text-slate-700 mb-2">Preset Messages</h4>
              <div className="space-y-1.5">
                {[
                  'HAPPY BIRTHDAY',
                  'TOGETHER FOREVER',
                  '365 DAYS OF US',
                  'WELCOME LITTLE ONE',
                  'THE HEART OF OUR HOME',
                  'THE BEGINNING OF FOREVER',
                  'WANDERLUST & MEMORIES',
                ].map((phrase) => (
                  <button
                    key={phrase}
                    onClick={() => addText(phrase, { fontSize: 44, fontFamily: 'Playfair Display' })}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition border border-slate-100"
                  >
                    {phrase}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">Calendar Configuration</h3>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 space-y-3">
              {/* Month picker */}
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Selected Month
                </label>
                <select
                  value={project?.calendarConfig?.month || 10}
                  onChange={(e) => updateCalendar({ month: parseInt(e.target.value, 10) })}
                  className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-2 bg-white focus:outline-none"
                  id="calendar-month-select"
                >
                  {MONTH_NAMES.map((name, idx) => (
                    <option key={name} value={idx + 1}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Year picker */}
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Year
                </label>
                <input
                  type="number"
                  value={project?.calendarConfig?.year || 2026}
                  onChange={(e) => updateCalendar({ year: parseInt(e.target.value, 10) })}
                  className="w-full text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none font-mono"
                  id="calendar-year-input"
                />
              </div>

              {/* Week start */}
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Week Starts On
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => updateCalendar({ weekStart: 'sun' })}
                    className={`text-xs py-1.5 rounded-lg border font-medium transition ${
                      project?.calendarConfig?.weekStart === 'sun'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    Sunday
                  </button>
                  <button
                    onClick={() => updateCalendar({ weekStart: 'mon' })}
                    className={`text-xs py-1.5 rounded-lg border font-medium transition ${
                      project?.calendarConfig?.weekStart === 'mon'
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                        : 'border-slate-200 bg-white text-slate-600'
                    }`}
                  >
                    Monday
                  </button>
                </div>
              </div>

              {/* Highlight special day */}
              <div>
                <label className="text-xs font-medium text-slate-700 block mb-1">
                  Highlight Date (Birthday/Anniversary)
                </label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="31"
                    placeholder="Day (1-31)"
                    defaultValue={project?.calendarConfig?.highlightedDates?.[0]?.day || 24}
                    onChange={(e) => {
                      const dayVal = parseInt(e.target.value, 10);
                      if (dayVal >= 1 && dayVal <= 31) {
                        updateCalendar({
                          highlightedDates: [
                            {
                              day: dayVal,
                              label: 'Special Day',
                              style: 'heart',
                              color: '#e11d48',
                            },
                          ],
                        });
                      }
                    }}
                    className="w-24 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white focus:outline-none font-mono"
                    id="highlight-day-input"
                  />
                  <div className="flex-1 flex items-center space-x-1">
                    {(['heart', 'badge', 'circle'] as const).map((style) => (
                      <button
                        key={style}
                        onClick={() => {
                          const currentDay =
                            project?.calendarConfig?.highlightedDates?.[0]?.day || 24;
                          updateCalendar({
                            highlightedDates: [
                              {
                                day: currentDay,
                                label: 'Special Day',
                                style,
                                color: style === 'badge' ? '#f59e0b' : '#e11d48',
                              },
                            ],
                          });
                        }}
                        className={`flex-1 text-[11px] py-1.5 rounded border capitalize transition ${
                          project?.calendarConfig?.highlightedDates?.[0]?.style === style
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600 font-bold'
                            : 'border-slate-200 bg-white text-slate-600'
                        }`}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: BACKGROUND */}
        {activeTab === 'background' && (
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-800">Background Styling</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { name: 'Pure White', color: '#ffffff' },
                { name: 'Warm Cream', color: '#fffbf5' },
                { name: 'Soft Slate', color: '#f8fafc' },
                { name: 'Pastel Rose', color: '#fff1f2' },
                { name: 'Warm Gold', color: '#fef3c7' },
                { name: 'Sage Mint', color: '#f0fdf4' },
                { name: 'Ocean Mist', color: '#f0fdfa' },
                { name: 'Midnight Navy', color: '#0f172a' },
              ].map((swatch) => (
                <button
                  key={swatch.color}
                  onClick={() => updateBackground({ color: swatch.color })}
                  className="flex flex-col items-center p-2 rounded-xl border border-slate-200 hover:border-indigo-500 transition group"
                >
                  <div
                    className="w-9 h-9 rounded-full border border-slate-300 shadow-sm group-hover:scale-110 transition"
                    style={{ backgroundColor: swatch.color }}
                  />
                  <span className="text-[10px] text-slate-600 mt-1 truncate max-w-full font-medium">
                    {swatch.name}
                  </span>
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-medium text-slate-700 block mb-1">
                Custom Color (Hex)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="color"
                  value={project?.background?.color || '#ffffff'}
                  onChange={(e) => updateBackground({ color: e.target.value })}
                  className="w-9 h-9 p-0.5 rounded border border-slate-200 cursor-pointer"
                />
                <input
                  type="text"
                  value={project?.background?.color || '#ffffff'}
                  onChange={(e) => updateBackground({ color: e.target.value })}
                  className="flex-1 text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white font-mono"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: LAYERS */}
        {activeTab === 'layers' && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-800">Layers List</h3>
            <div className="space-y-1.5">
              {/* Slots */}
              {project?.slots.map((slot, idx) => (
                <div
                  key={slot.id}
                  onClick={() => setSelected(slot.id, 'slot')}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedId === slot.id
                      ? 'border-indigo-600 bg-indigo-50/60 font-semibold text-indigo-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
                    <span>{slot.label || `Photo Slot ${idx + 1}`} ({slot.shape})</span>
                  </div>
                  {project.assignedPhotos[slot.id] && (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  )}
                </div>
              ))}

              {/* Text elements */}
              {project?.textElements.map((txt) => (
                <div
                  key={txt.id}
                  onClick={() => setSelected(txt.id, 'text')}
                  className={`flex items-center justify-between p-2.5 rounded-lg border text-xs cursor-pointer transition ${
                    selectedId === txt.id
                      ? 'border-indigo-600 bg-indigo-50/60 font-semibold text-indigo-900'
                      : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <div className="flex items-center space-x-2 truncate">
                    <Type className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{txt.text}</span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteElement(txt.id);
                    }}
                    className="p-1 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
