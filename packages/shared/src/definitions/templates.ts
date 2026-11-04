import { TemplateDefinition } from '../types/template.js';
import { BIRTHDAY_TEMPLATES } from './templates/birthday.js';
import { WEDDING_TEMPLATES } from './templates/wedding.js';
import { ANNIVERSARY_TEMPLATES } from './templates/anniversary.js';
import { BABY_TEMPLATES } from './templates/baby.js';
import { FIRST_BIRTHDAY_TEMPLATES } from './templates/first-birthday.js';
import { FAMILY_TEMPLATES } from './templates/family.js';
import { COUPLE_TEMPLATES } from './templates/couple.js';
import { FRIENDS_TEMPLATES } from './templates/friends.js';
import { TRAVEL_TEMPLATES } from './templates/travel.js';
import { SCRAPBOOK_TEMPLATES } from './templates/scrapbook.js';
import { POLAROID_TEMPLATES } from './templates/polaroid.js';
import { FLORAL_TEMPLATES } from './templates/floral.js';
import { CALENDAR_TEMPLATES } from './templates/calendar.js';
import { FESTIVAL_TEMPLATES } from './templates/festival.js';
import { GRADUATION_TEMPLATES } from './templates/graduation.js';
import { PARENTS_DAY_TEMPLATES } from './templates/parents-day.js';
import { VALENTINES_TEMPLATES } from './templates/valentines.js';
import { MINIMALIST_TEMPLATES } from './templates/minimalist.js';
import { BLACK_AND_WHITE_TEMPLATES } from './templates/black-and-white.js';
import { CUSTOM_FRAMES_TEMPLATES } from './templates/custom-frames.js';
import { ATOZ_FRAMES_TEMPLATES } from './templates/atoz-frames.js';

export const INITIAL_TEMPLATES: TemplateDefinition[] = [
  ...BIRTHDAY_TEMPLATES,
  ...WEDDING_TEMPLATES,
  ...ANNIVERSARY_TEMPLATES,
  ...BABY_TEMPLATES,
  ...FIRST_BIRTHDAY_TEMPLATES,
  ...FAMILY_TEMPLATES,
  ...COUPLE_TEMPLATES,
  ...FRIENDS_TEMPLATES,
  ...TRAVEL_TEMPLATES,
  ...SCRAPBOOK_TEMPLATES,
  ...POLAROID_TEMPLATES,
  ...FLORAL_TEMPLATES,
  ...CALENDAR_TEMPLATES,
  ...FESTIVAL_TEMPLATES,
  ...GRADUATION_TEMPLATES,
  ...PARENTS_DAY_TEMPLATES,
  ...VALENTINES_TEMPLATES,
  ...MINIMALIST_TEMPLATES,
  ...BLACK_AND_WHITE_TEMPLATES,
  ...CUSTOM_FRAMES_TEMPLATES,
  ...ATOZ_FRAMES_TEMPLATES,
];
