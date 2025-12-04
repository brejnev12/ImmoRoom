import { FastifyInstance } from "fastify";
import { ItemService } from "../services/item.service";
import { itemSchema, itemParamsSchema } from "../schemas/item.schema";

export default async function itemRoutes(app: FastifyInstance) {

  app.get("/items", async () => {
    return ItemService.getItems();
  });


  app.get("/items/:id", async (req, reply) => {
    const parse = itemParamsSchema.safeParse(req.params);
    if (!parse.success) return reply.status(400).send({ errors: parse.error.issues });

    const id = Number(parse.data.id);
    const item = await ItemService.getItem(id);
    if (!item) return reply.status(404).send({ error: "Item incroyable" });

    return item;
  });

  app.post("/items", async (req, reply) => {
    const parse = itemSchema.safeParse(req.body);
    if (!parse.success) return reply.status(400).send({ errors: parse.error.issues });

    const newItem = await ItemService.createItem(parse.data);
    return reply.status(201).send(newItem);
  });

  app.put("/items/:id", async (req, reply) => {
    const paramsParse = itemParamsSchema.safeParse(req.params);
    if (!paramsParse.success) return reply.status(400).send({ errors: paramsParse.error.issues });

    const id = Number(paramsParse.data.id);
    const bodyParse = itemSchema.safeParse(req.body);
    if (!bodyParse.success) return reply.status(400).send({ errors: bodyParse.error.issues });

    const updated = await ItemService.updateItem(id, bodyParse.data);
    if (!updated) return reply.status(404).send({ error: "Incroyable" });

    return updated;
  });

  app.delete("/items/:id", async (req, reply) => {
    const parse = itemParamsSchema.safeParse(req.params);
    if (!parse.success) return reply.status(400).send({ errors: parse.error.issues });

    const id = Number(parse.data.id);
    const deleted = await ItemService.deleteItem(id);
    if (!deleted) return reply.status(404).send({ error: "Item incroyable" });

    return { success: true };
  });

}
