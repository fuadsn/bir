// Run: node app/lib/projects.server.test.ts
import assert from "node:assert/strict";
import { registerHooks } from "node:module";

// Vite resolves extensionless relative imports; plain node does not.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("./") && !specifier.endsWith(".ts")) {
      try {
        return nextResolve(`${specifier}.ts`, context);
      } catch {}
    }
    return nextResolve(specifier, context);
  },
});

let apiCalls = 0;
let rawCalls = 0;

globalThis.fetch = (async (url: string) => {
  if (String(url).includes("api.github.com")) {
    apiCalls++;
    await new Promise((resolve) => setTimeout(resolve, 50)); // widen the race window
    return {
      ok: true,
      json: async () => [
        { name: "Alpha", full_name: "org/Alpha", html_url: "", description: null, language: null, default_branch: "main", pushed_at: "2026-01-01T00:00:00Z", archived: false, fork: false },
        { name: "Beta", full_name: "org/Beta", html_url: "", description: null, language: null, default_branch: "main", pushed_at: "2026-06-01T00:00:00Z", archived: false, fork: true },
        { name: "IESA", full_name: "org/IESA", html_url: "", description: null, language: null, default_branch: "main", pushed_at: "2026-09-01T00:00:00Z", archived: false, fork: false },
      ],
    };
  }
  rawCalls++;
  return { ok: true, text: async () => "A hardware project.\n" };
}) as typeof fetch;

const { loadProjects } = await import("./projects.server.ts");

const results = await Promise.all([loadProjects(), loadProjects(), loadProjects(), loadProjects(), loadProjects()]);

assert.equal(apiCalls, 1, `5 concurrent calls should share one fetch, made ${apiCalls}`);
assert.ok(results.every((r) => r === results[0]), "every caller should get the same array");

const names = results[0].map((p) => p.name);
assert.deepEqual(names, ["Beta", "Alpha"], `excluded repos dropped, newest commit first, got ${names}`);
assert.equal(results[0][0].preview, "A hardware project.", "README preview is extracted");

const cached = await loadProjects();
assert.equal(apiCalls, 1, "a later call is served from cache");
assert.equal(cached, results[0], "cache returns the same array");

console.log(`ok — ${apiCalls} api call, ${rawCalls} raw calls, order: ${names.join(" > ")}`);
