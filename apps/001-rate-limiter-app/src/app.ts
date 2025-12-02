import express from "express";
import { rateLimiter } from "./middlewares/rateLimiter";
import config from "./config/config";
import path from "path";
import fs from "fs";
import dataBuilding from "./utils/dataBulding";
import getTimeFormat from "./utils/getTimeFormat";

const app = express();

app.use(
  rateLimiter({
    windowMs: config.rateLimiterOptions.windowMs,
    limit: config.rateLimiterOptions.limit
  })
);

app.get("/", (req, res) => {
  const htmlPath = path.resolve('./src/views/index.html');
  let html = fs.readFileSync(htmlPath, "utf-8");

  html = dataBuilding(html, {
    limit: req.rateLimit?.limit,
    resetAt: getTimeFormat(req.rateLimit?.resetAt)
  });

  res.send(html);
});

app.listen(config.port, () => {
  console.log(`Server running on http://localhost:${config.port}`);
});