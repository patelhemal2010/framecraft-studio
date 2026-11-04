import { z } from 'zod';

export const SlotShapeSchema = z.enum([
  'rectangle',
  'rounded',
  'circle',
  'heart',
  'polaroid',
  'arch',
  'hexagon',
]);

export const TemplateCategorySchema = z.enum([
  'birthday',
  'wedding',
  'anniversary',
  'baby',
  'first-birthday',
  'family',
  'couple',
  'friends',
  'travel',
  'scrapbook',
  'polaroid',
  'floral',
  'calendar',
  'festival',
  'graduation',
  'parents-day',
  'valentines',
  'minimalist',
  'black-and-white',
  'custom-frames',
]);

export const AspectRatioSchema = z.enum(['4:5', '1:1', '3:4', '16:9', '9:16', '11:14', 'A4']);

export const PhotoSlotSchema = z.object({
  id: z.string(),
  label: z.string().optional(),
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  width: z.number().min(0).max(1),
  height: z.number().min(0).max(1),
  shape: SlotShapeSchema,
  borderRadius: z.number().optional(),
  borderWidth: z.number().optional(),
  borderColor: z.string().optional(),
  shadowBlur: z.number().optional(),
  shadowColor: z.string().optional(),
  shadowOpacity: z.number().optional(),
  zIndex: z.number().int(),
  fit: z.enum(['cover', 'contain']).optional(),
  rotation: z.number().optional(),
  defaultSampleUrl: z.string().optional(),
  isRequired: z.boolean().optional(),
});

export const TextElementSchema = z.object({
  id: z.string(),
  x: z.number().min(0).max(1),
  y: z.number().min(0).max(1),
  width: z.number().min(0).max(1).optional(),
  text: z.string(),
  fontFamily: z.string(),
  fontSize: z.number().positive(),
  fontWeight: z.enum(['normal', 'bold', '300', '500', '600', '700', '800']).optional(),
  fontStyle: z.enum(['normal', 'italic']).optional(),
  fill: z.string(),
  align: z.enum(['left', 'center', 'right']).optional(),
  letterSpacing: z.number().optional(),
  lineHeight: z.number().optional(),
  rotation: z.number().optional(),
  zIndex: z.number().int(),
  shadowColor: z.string().optional(),
  shadowBlur: z.number().optional(),
  shadowOpacity: z.number().optional(),
});

export const DecorativeElementSchema = z.object({
  id: z.string(),
  type: z.enum([
    'heart',
    'star',
    'floral',
    'ribbon',
    'badge',
    'frame-border',
    'line',
    'svg',
    'bouquet',
    'lotus',
    'butterfly',
    'rose',
    'crown',
    'tape',
    'envelope',
    'doodle',
  ]),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  rotation: z.number().optional(),
  color: z.string().optional(),
  opacity: z.number().min(0).max(1).optional(),
  zIndex: z.number().int(),
  svgPath: z.string().optional(),
  label: z.string().optional(),
});

export const BackgroundConfigSchema = z.object({
  type: z.enum(['color', 'gradient', 'pattern']),
  color: z.string().optional(),
  gradient: z
    .object({
      type: z.enum(['linear', 'radial']),
      angle: z.number().optional(),
      stops: z.array(z.object({ offset: z.number(), color: z.string() })),
    })
    .optional(),
  pattern: z
    .enum(['dots', 'grid', 'stripes', 'subtle-paper', 'linen', 'hearts', 'stars'])
    .optional(),
  opacity: z.number().min(0).max(1).optional(),
});

export const CalendarConfigSchema = z.object({
  month: z.number().int().min(1).max(12),
  year: z.number().int().min(1900).max(2100),
  weekStart: z.enum(['sun', 'mon']),
  layout: z.enum(['month', 'year']).optional(),
  highlightedDates: z.array(
    z.object({
      day: z.number().int().min(1).max(31),
      label: z.string().optional(),
      style: z.enum(['heart', 'circle', 'star', 'badge']).optional(),
      color: z.string().optional(),
    })
  ),
  x: z.number(),
  y: z.number(),
  width: z.number(),
  height: z.number(),
  headerColor: z.string().optional(),
  dayNumberColor: z.string().optional(),
  accentColor: z.string().optional(),
  fontFamily: z.string().optional(),
  showMonthHeader: z.boolean().optional(),
  zIndex: z.number().int(),
});

export const TemplateDefinitionSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  category: TemplateCategorySchema,
  description: z.string(),
  aspectRatio: AspectRatioSchema,
  canvasWidth: z.number().positive(),
  canvasHeight: z.number().positive(),
  supportedPrintSizes: z.array(z.string()),
  photoCount: z.number().int().nonnegative(),
  background: BackgroundConfigSchema,
  photoSlots: z.array(PhotoSlotSchema),
  textElements: z.array(TextElementSchema),
  decorativeElements: z.array(DecorativeElementSchema).optional(),
  calendarConfig: CalendarConfigSchema.optional(),
  tags: z.array(z.string()),
  version: z.number().int().positive(),
});

export const CropStateSchema = z.object({
  x: z.number(),
  y: z.number(),
  scale: z.number().positive(),
  rotation: z.number(),
  flipH: z.boolean().optional(),
  flipV: z.boolean().optional(),
  brightness: z.number().optional(),
  contrast: z.number().optional(),
});

export const AssignedPhotoSchema = z.object({
  slotId: z.string(),
  photoUrl: z.string(),
  assetId: z.string().optional(),
  crop: CropStateSchema,
  naturalWidth: z.number().optional(),
  naturalHeight: z.number().optional(),
});

export const ProjectDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  templateId: z.string(),
  category: TemplateCategorySchema,
  canvasWidth: z.number().positive(),
  canvasHeight: z.number().positive(),
  aspectRatio: AspectRatioSchema,
  background: BackgroundConfigSchema,
  slots: z.array(PhotoSlotSchema),
  assignedPhotos: z.record(z.string(), AssignedPhotoSchema),
  textElements: z.array(TextElementSchema),
  decorativeElements: z.array(DecorativeElementSchema),
  calendarConfig: CalendarConfigSchema.optional(),
  version: z.number().int().positive(),
  createdAt: z.string(),
  updatedAt: z.string(),
  thumbnailUrl: z.string().optional(),
});
