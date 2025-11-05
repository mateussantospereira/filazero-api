import { z } from "zod";

export const emailSchemaParams = z.object({
    email: z.email(),
});

export const idSchemaParams = z.object({
    id: z.coerce.number().int().positive(),
});
