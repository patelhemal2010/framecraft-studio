export type SlotShape = 'rectangle' | 'rounded' | 'circle' | 'heart' | 'polaroid' | 'arch' | 'hexagon';

export type TemplateCategory =
  | 'birthday'
  | 'wedding'
  | 'anniversary'
  | 'baby'
  | 'first-birthday'
  | 'family'
  | 'couple'
  | 'friends'
  | 'travel'
  | 'scrapbook'
  | 'polaroid'
  | 'floral'
  | 'calendar'
  | 'festival'
  | 'graduation'
  | 'parents-day'
  | 'valentines'
  | 'minimalist'
  | 'black-and-white'
  | 'custom-frames';

export type AspectRatio = '4:5' | '1:1' | '3:4' | '16:9' | '9:16' | '11:14' | 'A4';

export interface PhotoSlot {
  id: string;
  label?: string;
  /** Normalized coordinates (0 to 1) relative to canvas dimensions */
  x: number;
  y: number;
  width: number;
  height: number;
  shape: SlotShape;
  borderRadius?: number; // In canvas pixels
  borderWidth?: number;  // In canvas pixels
  borderColor?: string;
  shadowBlur?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  zIndex: number;
  fit?: 'cover' | 'contain';
  rotation?: number; // In degrees
  defaultSampleUrl?: string;
  isRequired?: boolean;
}

export interface TextElement {
  id: string;
  /** Normalized coordinates (0 to 1) relative to canvas dimensions */
  x: number;
  y: number;
  width?: number; // Normalized width for text wrapping/alignment
  text: string;
  fontFamily: string;
  fontSize: number; // Base size in logical canvas units
  fontWeight?: 'normal' | 'bold' | '300' | '500' | '600' | '700' | '800';
  fontStyle?: 'normal' | 'italic';
  fill: string;
  align?: 'left' | 'center' | 'right';
  letterSpacing?: number;
  lineHeight?: number;
  rotation?: number;
  zIndex: number;
  shadowColor?: string;
  shadowBlur?: number;
  shadowOpacity?: number;
}

export interface DecorativeElement {
  id: string;
  type:
    | 'heart'
    | 'star'
    | 'floral'
    | 'ribbon'
    | 'badge'
    | 'frame-border'
    | 'line'
    | 'svg'
    | 'bouquet'
    | 'lotus'
    | 'butterfly'
    | 'rose'
    | 'crown'
    | 'tape'
    | 'envelope'
    | 'doodle';
  x: number;
  y: number;
  width: number;
  height: number;
  rotation?: number;
  color?: string;
  opacity?: number;
  zIndex: number;
  svgPath?: string;
  label?: string;
}

export interface BackgroundConfig {
  type: 'color' | 'gradient' | 'pattern';
  color?: string;
  gradient?: {
    type: 'linear' | 'radial';
    angle?: number;
    stops: { offset: number; color: string }[];
  };
  pattern?: 'dots' | 'grid' | 'stripes' | 'subtle-paper' | 'linen' | 'hearts' | 'stars';
  opacity?: number;
}

export interface CalendarConfig {
  month: number; // 1 - 12
  year: number;
  weekStart: 'sun' | 'mon';
  /** Single-month grid (default) or full 12-month year-at-a-glance */
  layout?: 'month' | 'year';
  highlightedDates: {
    day: number;
    label?: string;
    style?: 'heart' | 'circle' | 'star' | 'badge';
    color?: string;
  }[];
  x: number;
  y: number;
  width: number;
  height: number;
  headerColor?: string;
  dayNumberColor?: string;
  accentColor?: string;
  fontFamily?: string;
  showMonthHeader?: boolean;
  zIndex: number;
}

export interface TemplateDefinition {
  id: string;
  slug: string;
  name: string;
  category: TemplateCategory;
  description: string;
  aspectRatio: AspectRatio;
  canvasWidth: number;
  canvasHeight: number;
  supportedPrintSizes: string[];
  photoCount: number;
  background: BackgroundConfig;
  photoSlots: PhotoSlot[];
  textElements: TextElement[];
  decorativeElements?: DecorativeElement[];
  calendarConfig?: CalendarConfig;
  tags: string[];
  version: number;
}

export interface CropState {
  x: number;       // Pixel pan offset in slot coordinate space
  y: number;
  scale: number;   // Zoom factor, 1.0 = base cover scale
  rotation: number;// 0, 90, 180, 270
  flipH?: boolean;
  flipV?: boolean;
  brightness?: number; // 0 to 2, 1 = normal
  contrast?: number;   // 0 to 2, 1 = normal
}

export interface AssignedPhoto {
  slotId: string;
  photoUrl: string;
  assetId?: string;
  crop: CropState;
  naturalWidth?: number;
  naturalHeight?: number;
}

export interface ProjectData {
  id: string;
  title: string;
  templateId: string;
  category: TemplateCategory;
  canvasWidth: number;
  canvasHeight: number;
  aspectRatio: AspectRatio;
  background: BackgroundConfig;
  slots: PhotoSlot[];
  assignedPhotos: Record<string, AssignedPhoto>;
  textElements: TextElement[];
  decorativeElements: DecorativeElement[];
  calendarConfig?: CalendarConfig;
  version: number;
  createdAt: string;
  updatedAt: string;
  thumbnailUrl?: string;
}

export interface PrintSizePreset {
  id: string;
  label: string;
  category: 'standard' | 'photo' | 'poster' | 'metric';
  inches: { width: number; height: number };
  pixels300Dpi: { width: number; height: number };
  aspectRatio: AspectRatio;
}
