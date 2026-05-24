# ADR-0002: App architecture — split public (SEO/AIEO) surfaces from the authenticated app

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** platform, product, seo

## Context

VowTrack has three fundamentally different kinds of surface, with conflicting requirements:

1. **Public, must-be-found surfaces** — the marketing site **and the wedding-planner directory + individual planner profiles**. These must rank in Google (SEO) and be discoverable/answerable by AI engines and agents (AIEO). The product requirement is explicit: *"people can search for wedding planners, and an agent can find wedding planners using our MCP server."* These pages must be server-rendered, fast, crawlable, and rich in structured data.
2. **The authenticated planning app** — couple dashboards, planner CRM, suites, timelines, budgets, the Elsie concierge. This is behind login, highly interactive, and must **not** be indexed. SEO is irrelevant here; app feel and statefulness matter.
3. **The API + agent + MCP layer** — shared services behind both.

The current prototype is a single 7,600-line React SPA (`HighFiPrototype.tsx`) that client-renders everything. Shipping planner profiles inside a client-rendered SPA would be the single biggest SEO/AIEO mistake we could make.

## Decision

We will **split the public surfaces from the authenticated app**, served under one domain by path:

| Surface | Path | Tech | Rendering |
|---|---|---|---|
| Marketing + planner directory + planner profiles | `/`, `/planners`, `/planners/:slug`, blog, guides | **Astro + MDX** ([ADR-0003](0003-marketing-and-discovery-astro-mdx.md)) | SSG where static, **SSR on Workers** for planner pages (live data from D1) |
| Authenticated app | `/app/*` | **React (Vite) SPA on Workers Assets** | Client-rendered |
| API / agent / MCP | `/api/*`, `/agent/*`, `/mcp` | **Workers** | Server |

Routing across surfaces is done at the edge with a single Worker (or Cloudflare routing rules), so it is **one origin, one domain** — good for cookies, SEO authority consolidation, and a coherent brand. Planner profile pages are SSR'd by Astro pulling from D1 + Vectorize, so a planner's live packages/portfolio are always crawlable and agent-readable.

The existing prototype's React code is **reused, not rewritten**: `HighFiPrototype.tsx` is decomposed into route-level components and moved under `/app`. We keep React 18 + Tailwind v4 + Radix. We do **not** migrate the authenticated app to a meta-framework for launch.

### Build & deploy model — how many Workers and how it fits together

At launch we run **three deployable Workers** plus shared bindings, in a single monorepo (one repo, independent deploys):

| Worker | Repo path | Responsibility | Bindings |
|---|---|---|---|
| `vowtrack-web` | `apps/web` | Astro SSR + static — marketing, `/planners` directory, `/planners/:slug` profiles, guides | D1 (read), Vectorize (read), R2 (read), KV (cache) |
| `vowtrack-app` | `apps/app` | Serves the React SPA via **Workers Assets** (the migrated prototype) | none (talks to API over HTTPS) |
| `vowtrack-api` | `apps/api` | REST API, Better Auth, Stripe webhooks, the per-couple **Agent Durable Object**, and the **MCP** endpoints | D1, KV, R2, Vectorize, Queues, Workers AI, Durable Objects |

**Routing:** one origin, path-based. Use **Cloudflare routes** (or a thin front Worker with Service Bindings) to map `/` and `/planners/*` and `/guides/*` → `web`, `/app/*` → `app`, and `/api/*` `/agent/*` `/mcp` → `api`. Cookies are set on the apex domain so auth is shared across surfaces ([ADR-0005](0005-auth-better-auth-on-d1.md)).

**How a planner profile edit propagates (the key data-freshness flow):**

```
Planner edits profile in the React app  (apps/app, /app/...)
        │  PUT /api/planners/:id
        ▼
vowtrack-api  → writes to D1 via Drizzle (source of truth)
        │  enqueues a job → Cloudflare Queues
        ▼
Queue consumer:
  (a) re-embeds the profile text into Vectorize  (so search/MCP reflect it)
  (b) purges the cached SSR page for /planners/:slug  (cache invalidation)
  (c) marks sitemap dirty → sitemap regenerated for crawlers
        ▼
vowtrack-web  serves /planners/:slug via SSR reading live D1 data,
              behind edge cache + stale-while-revalidate.
              After the purge the next request renders fresh; otherwise
              SWR refreshes within the TTL.
        ▼
Reflected everywhere from one write: web profile page (SEO),
public discovery MCP, and the in-app concierge — all read the same D1 + Vectorize.
```

The takeaway: **D1 is the single source of truth**; one write fans out (via Queues) to search index, page cache, and sitemap, so SEO, AIEO/MCP, and in-app views never drift. Profiles are SSR (not statically built), so edits are visible on the next request after cache purge — no full redeploy needed for content changes. Redeploys are only for code.

### Recommended starter kits

Bootstrap each Worker from Cloudflare's official templates via **C3** (`npm create cloudflare@latest`) rather than from scratch — confirm exact template names with `create-cloudflare` at setup time:

- **Monorepo:** pnpm workspaces + Turborepo (`apps/web`, `apps/app`, `apps/api`, `packages/ui`, `packages/contracts`).
- **`apps/web`:** C3 **Astro** template (`--framework=astro`) with the Cloudflare adapter; add `@astrojs/mdx`, `@astrojs/sitemap`, Tailwind.
- **`apps/app`:** C3 **Vite + React** template deployed via Workers Assets (closest to the current prototype's Vite setup).
- **`apps/api`:** Cloudflare **`agents-starter`** (Agents SDK) as the base for the Agent DO + MCP, plus Hono for the REST API; **Better Auth** with its D1 adapter; **Drizzle** for D1. The remote-MCP template (`remote-mcp-server` / authless variant) seeds the MCP endpoints. (The `cloudflare:build-agent` and `cloudflare:build-mcp` skills in this workspace scaffold these.)

## Options considered

### Option A — One meta-framework for everything (React Router v7 / Next on Workers)
Marketing, planner profiles, and the app all in one SSR React framework.
- **Pros:** One codebase, one mental model, SSR available everywhere including planner profiles; shared components between marketing and app.
- **Cons:** **This is the disqualifying trade-off for VowTrack** — folding the content/SEO surfaces into a React app framework makes MDX-authored marketing/SEO content second-class and bloats content pages with the app's JS bundle, directly undercutting the Core Web Vitals and crawlability that planner discovery (our highest-value asset) depends on. On top of that: heaviest migration from the current prototype, and we'd be hand-rolling the SEO/AIEO tooling Astro gives us for free (sitemaps, content collections, island hydration, near-zero JS on content pages). Over-engineered for launch and works against the one thing we cannot compromise. **Rejected.**

### Option B — Astro for marketing only + everything app-ish (incl. planner profiles) in the React SPA
- **Pros:** Minimal change to the prototype; marketing gets Astro's SEO.
- **Cons:** **Fatal for the core requirement** — planner directory/profiles would be client-rendered, so weak SEO and poor agent-readability without us bolting on prerendering. The thing we most need found would be the least findable. Rejected.

### Option C — Astro owns ALL public/SEO surfaces incl. planner profiles; React SPA owns only the authed app (chosen)
- **Pros:** Planner profiles are SSR'd, crawlable, and structured-data-rich by default — exactly the SEO/AIEO requirement; content team writes planner guides/blog in MDX; the app stays a fast SPA with no SEO compromise; the prototype is largely reused; clean security boundary (public vs. authed); each surface scales and deploys independently.
- **Cons:** Two frontends to build/deploy (Astro + React) and a small amount of shared design-system duplication; edge routing config to maintain. Acceptable and well-understood.

### Option D — TanStack Start full-stack React
- **Pros:** Modern full-stack React with server functions on Workers.
- **Cons:** Newest/least-proven; same "content pages in a React framework" weakness as Option A. Rejected for launch; revisit post-PMF if we want to unify.

## Consequences

- **Positive:** The highest-value SEO/AIEO surface (planner discovery) gets best-in-class rendering; the app stays fast and reuses existing code; clear separation of concerns and blast radius.
- **Negative / trade-offs:** We maintain a shared design system across two frontends (mitigate by extracting Tailwind tokens + a small shared component package, and by keeping Astro's planner cards visually aligned with the app). One extra deploy pipeline.
- **Follow-ups:** [ADR-0003](0003-marketing-and-discovery-astro-mdx.md) details the Astro/AIEO approach; [ADR-0007](0007-mcp-server.md) exposes the same planner data to agents; decompose `HighFiPrototype.tsx` into `/app` routes (see roadmap Phase 1).

<!-- @doc-review-state
{
  "version": 1,
  "threads": [
    {
      "id": "3ea21dab-78b2-4518-aed8-5989e499b528",
      "line": 37,
      "author": "upagupta2003",
      "body": "this is the biggest disadvantage. it doesn't work for vowtrack.",
      "createdAt": "2026-05-23T22:29:30.943Z",
      "responses": [
        {
          "author": "claude",
          "body": "Agreed — rewrote Option A's con to call this out explicitly as the disqualifying trade-off: folding content/SEO surfaces into a React app framework bloats them with app JS and makes MDX content second-class, undercutting the Core Web Vitals + crawlability that planner discovery depends on. Marked Rejected.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "- **Cons:** Heaviest migration from the current prototype; MDX-authored marketing/SEO content is second-class vs. a cont"
    },
    {
      "id": "d66aa8a0-5264-4807-a3d3-b7e0bf0a96f3",
      "line": 10,
      "author": "upagupta2003",
      "body": "Lets add a mental flow how everything will be build and deployed. how many workers and how the changes to planners profile will be reflected.",
      "createdAt": "2026-05-23T22:32:58.151Z",
      "responses": [
        {
          "author": "claude",
          "body": "Added a 'Build & deploy model' section: 3 deployable Workers (vowtrack-web Astro SSR, vowtrack-app React SPA via Workers Assets, vowtrack-api API+Agent DO+MCP) in one monorepo, path-based routing on one origin. Included a diagram of how a planner profile edit fans out from a single D1 write via Queues to Vectorize (search/MCP), SSR page-cache purge, and sitemap — so SEO/AIEO/app never drift, and edits show on the next request without a redeploy.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "VowTrack has three fundamentally different kinds of surface, with conflicting requirements:"
    },
    {
      "id": "4f421c62-979f-4665-9d00-85d276af7136",
      "line": 10,
      "author": "upagupta2003",
      "body": "Also add the github repository or lets decide on a starter kit that can help us out.",
      "createdAt": "2026-05-23T22:33:53.408Z",
      "responses": [
        {
          "author": "claude",
          "body": "Added a 'Recommended starter kits' section: bootstrap each Worker via C3 (npm create cloudflare@latest) — Astro template for apps/web, Vite+React for apps/app, Cloudflare agents-starter + remote-MCP template + Better Auth (D1) + Drizzle for apps/api; pnpm workspaces + Turborepo for the monorepo. Noted the build-agent/build-mcp skills in this workspace can scaffold these, and to confirm exact template names at setup.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "VowTrack has three fundamentally different kinds of surface, with conflicting requirements:"
    }
  ]
}
@end-doc-review-state -->
