import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("hardware", "routes/hardware.tsx"),
  // Unlisted: printable QR codes — one sheet of them, one page per project.
  // The sheet answers on /hardware/qr as well; static beats :project in the
  // route ranking, so it is not shadowed.
  route("hardware/qr", "routes/qr.tsx", { id: "hardware-qr" }),
  route("qr", "routes/qr.tsx"),
  route("hardware/:project", "routes/project.tsx"),
  route("hardware/:project/qr", "routes/project-qr.tsx"),
  route("nights-and-weekends", "routes/nights-and-weekends.tsx"),
] satisfies RouteConfig;
