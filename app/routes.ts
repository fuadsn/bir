import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("hardware", "routes/hardware.tsx"),
  route("hardware/:project", "routes/project.tsx"),
  route("nights-and-weekends", "routes/nights-and-weekends.tsx"),
] satisfies RouteConfig;
