import { z } from "zod";

export const avatarUrlSchema = z.string();
export const bioSchema = z.string().max(160);

export const updateFormSchema = z.object({
  avatarUrl: avatarUrlSchema.optional(),
  bio: bioSchema.optional(),
});

export type UpdateFormType = z.infer<typeof updateFormSchema>;
