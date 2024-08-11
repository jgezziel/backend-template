import { z } from "zod";

const User = z.object({
  id: z.number({
    required_error: "This field is required",
  }),
  name: z
    .string({
      required_error: "Name is required",
    })
    .min(3, {
      message: "Name must be at least 3 characters long",
    })
    .max(50, {
      message: "Name must be at most 50 characters",
    }),
  firstLastName: z
    .string({
      required_error: "First last name is required",
    })
    .min(3, {
      message: "First last name must be at least 3 characters long",
    })
    .max(50, {
      message: "First last name must be at most 50 characters",
    }),
  secondLastName: z
    .string({
      required_error: "Second last name is required",
    })
    .min(3, {
      message: "Second last name must be at least 3 characters long",
    })
    .max(50, {
      message: "Second last name must be at most 50 characters",
    }),
  username: z
    .string({
      required_error: "Username is required",
    })
    .min(3, {
      message: "Username must be at least 3 characters long",
    })
    .max(50, {
      message: "Username must be at most 50 characters",
    }),
  email: z
    .string({
      required_error: "Email is required",
    })
    .email({
      message: "Invalid email",
    })
    .min(5, {
      message: "Email must be at least 5 characters long",
    })
    .max(100, {
      message: "Email must be at most 100 characters long",
    }),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, {
      message: "Password must be at least 8 characters long",
    }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

const UserPartial = User.partial();
const NoIDUser = User.omit({ id: true, status: true });

export const validateUser = (object: unknown) => {
  return NoIDUser.safeParse(object);
};

export const validateUserPartial = (object: unknown) => {
  return User.partial().safeParse(object);
};


/*
export const encryptPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 10)
}

export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  return await bcrypt.compare(password, hash)
} */

export type UserSchema = z.infer<typeof User>;
export type UserPartialSchema = z.infer<typeof UserPartial>;

export type NoIDUserSchema = z.infer<typeof NoIDUser>;
