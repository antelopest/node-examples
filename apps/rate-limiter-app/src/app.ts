import express from "express";
import { rateLimiter } from "./middlewares/rateLimiter";

const app = express();

app.use(
  rateLimiter({
    windowMs: 60_000,
    limit: 100
  })
);

app.get("/", (req, res) => {
  res.sendFile('views/index.html', { root: __dirname });
});

export default app;