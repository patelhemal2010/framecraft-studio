import { AssignedPhoto, PhotoSlot } from '../types/template.js';
import { createDefaultCrop } from '../geometry/crop.js';

export interface UploadedImageInput {
  id: string;
  url: string;
  naturalWidth?: number;
  naturalHeight?: number;
}

export interface AutoFillResult {
  assignments: Record<string, AssignedPhoto>;
  filledSlotIds: string[];
  remainingSlotIds: string[];
  unassignedImages: UploadedImageInput[];
}

/**
 * Predictably fills template slots with uploaded images.
 * Prioritizes prominent slots (by area/prominence or predefined slot index order).
 */
export function autoFillSlots(
  slots: PhotoSlot[],
  uploadedImages: UploadedImageInput[],
  currentAssignments: Record<string, AssignedPhoto> = {},
  options: { overwriteExisting?: boolean } = { overwriteExisting: false }
): AutoFillResult {
  const newAssignments: Record<string, AssignedPhoto> = { ...currentAssignments };

  // Sort slots in natural reading order or by area
  const sortedSlots = [...slots].sort((a, b) => {
    // Primary: y position, secondary: x position
    if (Math.abs(a.y - b.y) > 0.05) {
      return a.y - b.y;
    }
    return a.x - b.x;
  });

  const availableSlots = options.overwriteExisting
    ? sortedSlots
    : sortedSlots.filter((slot) => !newAssignments[slot.id]);

  const unassignedImages: UploadedImageInput[] = [];

  let imageIdx = 0;
  for (const slot of availableSlots) {
    if (imageIdx < uploadedImages.length) {
      const img = uploadedImages[imageIdx];
      newAssignments[slot.id] = {
        slotId: slot.id,
        photoUrl: img.url,
        assetId: img.id,
        crop: createDefaultCrop(),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      };
      imageIdx++;
    }
  }

  // Any remaining images not assigned
  for (let i = imageIdx; i < uploadedImages.length; i++) {
    unassignedImages.push(uploadedImages[i]);
  }

  const filledSlotIds = slots
    .filter((s) => Boolean(newAssignments[s.id]))
    .map((s) => s.id);

  const remainingSlotIds = slots
    .filter((s) => !newAssignments[s.id])
    .map((s) => s.id);

  return {
    assignments: newAssignments,
    filledSlotIds,
    remainingSlotIds,
    unassignedImages,
  };
}
