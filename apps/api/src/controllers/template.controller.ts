import { Request, Response } from 'express';
import { prisma } from '../config/db.js';
import { INITIAL_TEMPLATES, TemplateDefinition, TEMPLATE_CATEGORIES } from '@framecraft/shared';

export async function listTemplates(req: Request, res: Response) {
  const { category, search, orientation, photoCount, sort, page = '1', limit = '100' } = req.query;

  try {
    const where: any = { isPublic: true };
    if (category && category !== 'all') {
      where.category = String(category);
    }
    if (search) {
      where.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
      ];
    }

    const templates = await prisma.template.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    let results: TemplateDefinition[] = templates.map(
      (t: any) => t.templateJson as unknown as TemplateDefinition
    );

    // Photo count filtering
    if (photoCount && photoCount !== 'all') {
      const pc = String(photoCount);
      if (pc === '1') {
        results = results.filter((t) => t.photoCount === 1);
      } else if (pc === '2-4') {
        results = results.filter((t) => t.photoCount >= 2 && t.photoCount <= 4);
      } else if (pc === '5-8') {
        results = results.filter((t) => t.photoCount >= 5 && t.photoCount <= 8);
      } else if (pc === '9+') {
        results = results.filter((t) => t.photoCount >= 9);
      } else if (!isNaN(Number(pc))) {
        const num = Number(pc);
        results = results.filter((t) => t.photoCount === num);
      }
    }

    // Apply orientation filter
    if (orientation && orientation !== 'all') {
      results = results.filter((t: TemplateDefinition) => {
        if (orientation === 'square') return t.canvasWidth === t.canvasHeight;
        if (orientation === 'portrait') return t.canvasHeight > t.canvasWidth;
        if (orientation === 'landscape') return t.canvasWidth > t.canvasHeight;
        return true;
      });
    }

    // Sorting
    if (sort === 'popular') {
      results.sort((a, b) => b.photoCount - a.photoCount);
    } else if (sort === 'name') {
      results.sort((a, b) => a.name.localeCompare(b.name));
    }

    const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
    const limitNum = Math.max(1, parseInt(String(limit), 10) || 100);
    const paginated = results.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    return res.json({
      success: true,
      data: paginated,
      total: results.length,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(results.length / limitNum),
    });
  } catch (err) {
    // Fallback to in-memory initial templates
    let results: TemplateDefinition[] = [...INITIAL_TEMPLATES];
    if (category && category !== 'all') {
      results = results.filter((t: TemplateDefinition) => t.category === category);
    }
    if (search) {
      const q = String(search).toLowerCase();
      results = results.filter(
        (t: TemplateDefinition) =>
          t.name.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q))
      );
    }
    if (photoCount && photoCount !== 'all') {
      const pc = String(photoCount);
      if (pc === '1') results = results.filter((t) => t.photoCount === 1);
      else if (pc === '2-4') results = results.filter((t) => t.photoCount >= 2 && t.photoCount <= 4);
      else if (pc === '5-8') results = results.filter((t) => t.photoCount >= 5 && t.photoCount <= 8);
      else if (pc === '9+') results = results.filter((t) => t.photoCount >= 9);
    }
    if (orientation && orientation !== 'all') {
      results = results.filter((t: TemplateDefinition) => {
        if (orientation === 'square') return t.canvasWidth === t.canvasHeight;
        if (orientation === 'portrait') return t.canvasHeight > t.canvasWidth;
        if (orientation === 'landscape') return t.canvasWidth > t.canvasHeight;
        return true;
      });
    }

    return res.json({
      success: true,
      data: results,
      total: results.length,
    });
  }
}

export async function getTemplateBySlug(req: Request, res: Response) {
  const slug = String(req.params.slug);

  try {
    const template = await prisma.template.findUnique({
      where: { slug },
    });

    if (template) {
      return res.json({
        success: true,
        data: template.templateJson as unknown as TemplateDefinition,
      });
    }
  } catch (e) {
    // fallback below
  }

  const fallback = INITIAL_TEMPLATES.find((t) => t.slug === slug || t.id === slug);
  if (!fallback) {
    return res.status(404).json({
      success: false,
      error: 'Template not found',
    });
  }

  return res.json({
    success: true,
    data: fallback,
  });
}

export async function getCategories(req: Request, res: Response) {
  try {
    const dbCounts = await prisma.template.groupBy({
      by: ['category'],
      _count: { id: true },
    });

    const countMap: Record<string, number> = {};
    dbCounts.forEach((c: { category: string; _count: { id: number } }) => {
      countMap[c.category] = c._count.id;
    });

    const categories = [
      {
        id: 'all',
        name: 'All Templates',
        shortLabel: 'All',
        description: 'Explore our complete collection of personalized photo collages and frame layouts',
        iconName: 'LayoutGrid',
        count: INITIAL_TEMPLATES.length,
      },
      ...TEMPLATE_CATEGORIES.map((cat) => ({
        id: cat.id,
        name: cat.name,
        shortLabel: cat.shortLabel,
        description: cat.description,
        iconName: cat.iconName,
        count: countMap[cat.id] || INITIAL_TEMPLATES.filter((t) => t.category === cat.id).length,
      })),
    ];

    return res.json({
      success: true,
      data: categories,
    });
  } catch (err) {
    const categories = [
      {
        id: 'all',
        name: 'All Templates',
        shortLabel: 'All',
        description: 'Explore our complete collection of personalized frame layouts',
        iconName: 'LayoutGrid',
        count: INITIAL_TEMPLATES.length,
      },
      ...TEMPLATE_CATEGORIES.map((cat) => ({
        id: cat.id,
        name: cat.name,
        shortLabel: cat.shortLabel,
        description: cat.description,
        iconName: cat.iconName,
        count: INITIAL_TEMPLATES.filter((t) => t.category === cat.id).length,
      })),
    ];

    return res.json({
      success: true,
      data: categories,
    });
  }
}
