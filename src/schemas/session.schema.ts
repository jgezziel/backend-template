import { z } from "zod";

const Session = z.object({
  id: z.number({ required_error: "Session id is required" }),
  sessionKey: z.string({ required_error: "Session key is required" }),
  userId: z.number({ required_error: "User id is required" }),
  token: z.string({ required_error: "Token is required" }),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

export type SessionSchema = z.infer<typeof Session>;
