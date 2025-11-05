import { z } from "zod";

export const emailSchemaParams = z.object({
    email: z.email(),
});

export const idSchemaParams = z.object({
    id: z.coerce.number().int().positive(),
});

export const weekdaysSchemaParams = z.object({
    id_expedient: z.coerce.number().int().positive(),
});
