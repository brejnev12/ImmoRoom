import Fastify from "fastify";
import itemRoutes from "./routes/item.routes";
import fastifyCors from "@fastify/cors";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(fastifyCors, {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  });

  app.register(itemRoutes);

  app.get("/", async () => ({ message: "API demarre!" }));

  return app;
}
