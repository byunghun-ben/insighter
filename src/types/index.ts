import { z } from "zod";
import { eventSchema } from "../schemas";

export type Event = z.infer<typeof eventSchema>;
