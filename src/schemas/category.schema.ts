import { z } from "zod";

export const Category = z.object({
  id: z.number({ required_error: "Category id is required" }),
  name: z
    .string({ required_error: "Category name is required" })
    .min(3, {
      message: "Category name must be at least 3 characters",
    })
    .max(100, {
      message: "Category name must be less than 100 characters",
    }),
  description: z
    .string({ required_error: "Category description is required" }).min(3, {
      message: "Category description must be at least 3 characters",
    })
    .max(300, {
      message: "Category description must be less than 300 characters",
    }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

const newCategory = Category.omit({ id: true, status: true });

export const validateCategory = (object: unknown) => {
  return newCategory.safeParse(object);
};

export type CategorySchema = z.infer<typeof Category>;
export type NewCategorySchema = z.infer<typeof newCategory>;