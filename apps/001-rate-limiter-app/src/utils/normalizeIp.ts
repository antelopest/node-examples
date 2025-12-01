/* Цель получить стабильный и одинаковый ключ для одного и того же клиента */

import { Request } from "express";

export default function normalizeIp(req: Request): string {

  /* XFF (NGING, CLOUDFLARE) */
  const xff = req.headers["x-forwarded-for"];

  if (typeof xff === "string") {
    const parts: string[] = xff.split(",");
    if (parts.length > 0 && parts[0]) {
      return parts[0].trim();
    }
  }

  if (Array.isArray(xff) && xff.length > 0 && typeof xff[0] === "string") {
    return xff[0].trim();
  }

  const ip = req.ip;

  if (typeof ip !== 'string') {
    throw new Error("Request IP is not a string.");
  }

  /* localhost */
  if (ip === "::1") {
    return "127.0.0.1";
  }

  // IPv4 in format IPv6: ::ffff:192.168.1.20 => 192.168.1.20
  if (ip.startsWith("::ffff:")) {
    return ip.slice(7);
  }

  // IPv4 or IPv6
  return ip;
}