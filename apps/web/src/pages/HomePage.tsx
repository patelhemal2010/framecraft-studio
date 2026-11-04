import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Printer,
  Heart,
  Eye,
  SlidersHorizontal,
  Flame,
  Clock,
  LayoutGrid,
  Image as ImageIcon,
  RotateCcw,
} from 'lucide-react';
import {
  INITIAL_TEMPLATES,
  TemplateDefinition,
  TEMPLATE_CATEGORIES,
} from '@framecraft/shared';
import { useEditorStore } from '../stores/editorStore.js';
import { TemplateCardPreview } from '../components/gallery/TemplateCardPreview.js';
import { TemplateQuickViewModal } from '../components/gallery/TemplateQuickViewModal.js';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const loadTemplate = useEditorStore((state) => state.loadTemplate);
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category');

  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam || 'all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [photoCountFilter, setPhotoCountFilter] = useState<string>('all');
  const [orientationFilter, setOrientationFilter] = useState<string>('all');
  const [sortTab, setSortTab] = useState<'all' | 'popular' | 'recent' | 'featured'>('all');
  const [visibleCount, setVisibleCount] = useState<number>(16);

  // Sync category with URL search param changes (e.g. from navbar or footer links)
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setVisibleCount(16);
      const section = document.getElementById('templates-section');
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      setSelectedCategory('all');
    }
  }, [categoryParam]);

  // Quick View Modal State
  const [quickViewTemplate, setQuickViewTemplate] = useState<TemplateDefinition | null>(null);

  // Compute Category Counts
  const categoryList = useMemo(() => {
    return [
      {
        id: 'all',
        name: 'All Templates',
        shortLabel: 'All',
        count: INITIAL_TEMPLATES.length,
      },
      ...TEMPLATE_CATEGORIES.map((cat) => ({
        id: cat.id,
        name: cat.name,
        shortLabel: cat.shortLabel,
        count: INITIAL_TEMPLATES.filter((t) => t.category === cat.id).length,
      })),
    ];
  }, []);

  // Filter & Sort Templates
  const filteredTemplates = useMemo(() => {
    let list = [...INITIAL_TEMPLATES];

    // Category filter
    if (selectedCategory !== 'all') {
      list = list.filter((tmpl) => tmpl.category === selectedCategory);
    }

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((tmpl) => {
        return (
          tmpl.name.toLowerCase().includes(q) ||
          tmpl.description.toLowerCase().includes(q) ||
          tmpl.category.toLowerCase().includes(q) ||
          tmpl.tags.some((t) => t.toLowerCase().includes(q))
        );
      });
    }

    // Photo count filter
    if (photoCountFilter !== 'all') {
      if (photoCountFilter === '1') list = list.filter((tmpl) => tmpl.photoCount === 1);
      else if (photoCountFilter === '2-4') list = list.filter((tmpl) => tmpl.photoCount >= 2 && tmpl.photoCount <= 4);
      else if (photoCountFilter === '5-8') list = list.filter((tmpl) => tmpl.photoCount >= 5 && tmpl.photoCount <= 8);
      else if (photoCountFilter === '9+') list = list.filter((tmpl) => tmpl.photoCount >= 9);
    }

    // Orientation filter
    if (orientationFilter !== 'all') {
      if (orientationFilter === 'portrait') list = list.filter((tmpl) => tmpl.canvasHeight > tmpl.canvasWidth);
      else if (orientationFilter === 'square') list = list.filter((tmpl) => tmpl.canvasHeight === tmpl.canvasWidth);
      else if (orientationFilter === 'landscape') list = list.filter((tmpl) => tmpl.canvasWidth > tmpl.canvasHeight);
    }

    // Sort tabs
    if (sortTab === 'popular') {
      list.sort((a, b) => b.photoCount - a.photoCount);
    } else if (sortTab === 'recent') {
      list.sort((a, b) => b.version - a.version);
    } else if (sortTab === 'featured') {
      list.sort((a, b) => (b.decorativeElements?.length || 0) - (a.decorativeElements?.length || 0));
    }

    return list;
  }, [selectedCategory, searchQuery, photoCountFilter, orientationFilter, sortTab]);

  const displayedTemplates = useMemo(() => {
    return filteredTemplates.slice(0, visibleCount);
  }, [filteredTemplates, visibleCount]);

  const handleUseTemplate = (tmpl: TemplateDefinition) => {
    loadTemplate(tmpl);
    navigate(`/editor/${tmpl.slug}`);
  };

  const resetAllFilters = () => {
    setSearchParams({}, { replace: true });
    setSelectedCategory('all');
    setSearchQuery('');
    setPhotoCountFilter('all');
    setOrientationFilter('all');
    setSortTab('all');
    setVisibleCount(16);
  };

  return (
    <div className="space-y-16 pb-20">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-indigo-50/60 via-slate-50 to-white pt-14 pb-16 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Headlines & CTA */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center space-x-2 bg-indigo-50 border border-indigo-100 px-3.5 py-1.5 rounded-full text-xs font-semibold text-indigo-700 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                <span>Over {INITIAL_TEMPLATES.length} Original Photo Collage Templates</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
                Turn Your Moments Into{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Custom Works of Art
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Choose from Pinterest & Etsy-inspired scrapbook collages, tilted polaroid clusters, romantic love letter keepsakes, and functional calendars. Auto-fit your images and export high-resolution print files.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4 pt-2">
                <button
                  onClick={() => handleUseTemplate(INITIAL_TEMPLATES[0])}
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 px-7 py-3.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white rounded-xl font-semibold shadow-lg shadow-indigo-200 transition hover:shadow-xl"
                  id="hero-create-btn"
                >
                  <span>Start Designing Free</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <a
                  href="#templates-section"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-xl font-semibold transition text-center"
                >
                  Explore All {INITIAL_TEMPLATES.length} Templates
                </a>
              </div>

              {/* Feature checkmarks */}
              <div className="pt-6 grid grid-cols-3 gap-3 text-left">
                <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>300 DPI Print Output</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>20 Curated Categories</span>
                </div>
                <div className="flex items-center space-x-2 text-xs text-slate-600 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% Vector Precision</span>
                </div>
              </div>
            </div>

            {/* Right: Featured Hero Showcase */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-sm bg-white p-3.5 rounded-2xl shadow-2xl border border-slate-200 rotate-1 hover:rotate-0 transition duration-500">
                <TemplateCardPreview template={INITIAL_TEMPLATES[0]} />
                <div className="p-3 bg-white flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 truncate">{INITIAL_TEMPLATES[0].name}</h3>
                    <p className="text-[11px] text-slate-500 capitalize">{INITIAL_TEMPLATES[0].category} • {INITIAL_TEMPLATES[0].photoCount} photos</p>
                  </div>
                  <button
                    onClick={() => handleUseTemplate(INITIAL_TEMPLATES[0])}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-semibold shadow-xs"
                  >
                    Customize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TEMPLATE GALLERY SECTION */}
      <section id="templates-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header with Search and Sorting Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Collage Template Gallery
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Select any editable layout to customize photos, captions, and colors
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by theme, keyword, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs border border-slate-200 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-2xs"
              id="template-search-input"
            />
          </div>
        </div>

        {/* Collection Sorting Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-200 pb-2">
          <button
            onClick={() => setSortTab('all')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              sortTab === 'all'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>All Layouts</span>
          </button>
          <button
            onClick={() => setSortTab('popular')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              sortTab === 'popular'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-400" />
            <span>Most Popular</span>
          </button>
          <button
            onClick={() => setSortTab('recent')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              sortTab === 'recent'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-indigo-400" />
            <span>Recently Added</span>
          </button>
          <button
            onClick={() => setSortTab('featured')}
            className={`flex items-center space-x-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
              sortTab === 'featured'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Featured Keepsakes</span>
          </button>
        </div>

        {/* 20 Categories Pill Navigation with accurate counts */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-3 pt-1 scrollbar-thin">
          {categoryList.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                setVisibleCount(16);
                if (cat.id === 'all') {
                  setSearchParams({}, { replace: true });
                } else {
                  setSearchParams({ category: cat.id }, { replace: true });
                }
              }}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition flex items-center space-x-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs'
              }`}
              id={`filter-${cat.id}-btn`}
            >
              <span>{cat.shortLabel}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === cat.id ? 'bg-indigo-700 text-indigo-100' : 'bg-slate-100 text-slate-500'
              }`}>
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Filters Toolbar: Photo Count & Orientation */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-50 border border-slate-200 p-3 rounded-xl text-xs text-slate-600">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center space-x-1.5 font-semibold text-slate-800">
              <SlidersHorizontal className="w-3.5 h-3.5 text-indigo-600" />
              <span>Filters:</span>
            </div>

            {/* Photo count selector */}
            <div className="flex items-center space-x-1.5">
              <span>Photo Slots:</span>
              <select
                value={photoCountFilter}
                onChange={(e) => {
                  setPhotoCountFilter(e.target.value);
                  setVisibleCount(16);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none font-medium text-slate-700 shadow-2xs"
                id="photo-count-filter"
              >
                <option value="all">Any Photo Count</option>
                <option value="1">1 Photo (Single Hero)</option>
                <option value="2-4">2 – 4 Photos (Small Collage)</option>
                <option value="5-8">5 – 8 Photos (Medium Collage)</option>
                <option value="9+">9+ Photos (Large Gallery)</option>
              </select>
            </div>

            {/* Orientation selector */}
            <div className="flex items-center space-x-1.5">
              <span>Orientation:</span>
              <select
                value={orientationFilter}
                onChange={(e) => {
                  setOrientationFilter(e.target.value);
                  setVisibleCount(16);
                }}
                className="bg-white border border-slate-200 rounded-lg px-2.5 py-1 text-xs focus:outline-none font-medium text-slate-700 shadow-2xs"
                id="orientation-filter"
              >
                <option value="all">All Orientations</option>
                <option value="portrait">Portrait (4:5 / A4)</option>
                <option value="square">Square (1:1)</option>
                <option value="landscape">Landscape (16:9)</option>
              </select>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <span className="font-mono text-slate-500">
              Showing {displayedTemplates.length} of {filteredTemplates.length} templates
            </span>
            {(selectedCategory !== 'all' || searchQuery || photoCountFilter !== 'all' || orientationFilter !== 'all' || sortTab !== 'all') && (
              <button
                onClick={resetAllFilters}
                className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Templates Multi-Column Grid */}
        {filteredTemplates.length === 0 ? (
          <div className="text-center py-16 bg-white border border-slate-200 rounded-2xl p-8 space-y-3">
            <ImageIcon className="w-10 h-10 text-slate-300 mx-auto" />
            <h3 className="text-base font-semibold text-slate-800">No templates matched your filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Try adjusting your search query or reset your category, orientation, and photo count filters.
            </p>
            <button
              onClick={resetAllFilters}
              className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {displayedTemplates.map((template) => (
              <div
                key={template.id}
                className="group bg-white border border-slate-200 hover:border-indigo-400 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Visual Thumbnail Preview Area */}
                <div
                  className="cursor-pointer"
                  onClick={() => handleUseTemplate(template)}
                  title={`Open editor for ${template.name}`}
                >
                  <TemplateCardPreview template={template} />
                </div>

                {/* Card Meta & Actions */}
                <div className="p-4 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full capitalize">
                        {template.category}
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuickViewTemplate(template);
                        }}
                        className="text-slate-400 hover:text-slate-700 p-1 rounded-md hover:bg-slate-100 transition"
                        title="Quick View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <h3
                      onClick={() => handleUseTemplate(template)}
                      className="text-sm font-bold text-slate-900 group-hover:text-indigo-600 transition truncate cursor-pointer"
                    >
                      {template.name}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {template.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-[11px] text-slate-400 font-mono">
                      {template.supportedPrintSizes[0]}
                    </span>
                    <button
                      onClick={() => handleUseTemplate(template)}
                      className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 flex items-center space-x-1"
                    >
                      <span>Customize</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Load More Button / Pagination */}
        {filteredTemplates.length > visibleCount && (
          <div className="text-center pt-8">
            <button
              onClick={() => setVisibleCount((prev) => prev + 16)}
              className="px-8 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 font-semibold rounded-xl text-xs shadow-xs hover:shadow-md transition"
            >
              Load More Templates ({filteredTemplates.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </section>

      {/* QUICK VIEW MODAL */}
      <TemplateQuickViewModal
        template={quickViewTemplate}
        isOpen={Boolean(quickViewTemplate)}
        onClose={() => setQuickViewTemplate(null)}
        onCustomize={(tmpl) => {
          setQuickViewTemplate(null);
          handleUseTemplate(tmpl);
        }}
      />
    </div>
  );
};
