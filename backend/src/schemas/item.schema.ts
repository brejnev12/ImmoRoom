import { z } from "zod";

// Schéma pour validation des corps de requête (POST / PUT)
export const itemSchema = z.object({
  title: z.string().min(1, "Title obligatoire"),
  city: z.string().min(1, "City obligatoire"),
  price: z.number().min(0, "Price >= 0"),
  surface: z.number().min(0, "Surface >= 0"),
});


// Schéma pour validation des params (id)
export const itemParamsSchema = z.object({
  id: z.string().regex(/^\d+$/, "Id un nombre")
});
