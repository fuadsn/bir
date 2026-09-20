import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("hardware", "routes/hardware.tsx"),
  route("hardware/:project", "routes/project.tsx"),
  route("hardware/:project/qr", "routes/project-qr.tsx"),
  // Unlisted: printable QR codes — one sheet of them, one page per project.
  route("qr", "routes/qr.tsx"),
  route("nights-and-weekends", "routes/nights-and-weekends.tsx"),
] satisfies RouteConfig;
