import { z } from "zod";

export const avatarSchema = z.string();
export const descriptionSchema = z.string().max(160);

export const updateFormSchema = z.object({
  avatar: avatarSchema.optional(),
  description: descriptionSchema.optional(),
});

export type UpdateFormType = z.infer<typeof updateFormSchema>;
