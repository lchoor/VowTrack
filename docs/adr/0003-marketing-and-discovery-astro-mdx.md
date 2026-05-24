# ADR-0003: Marketing + planner discovery on Astro + MDX (SEO + AIEO)

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** seo, aieo, product, frontend

## Context

Per [ADR-0002](0002-app-architecture-and-rendering.md), all public, must-be-found surfaces live in one frontend, separate from the authenticated app. The highest-value SEO/AIEO asset is **wedding-planner discovery**: couples search Google for "wedding planners in Austin," and increasingly ask an AI ("find me a boho wedding planner under $5k near Denver"). We must rank for the former and be answerable for the latter. We also need fast iteration on marketing pages, guides, and a content/SEO blog.

"AIEO" (AI Engine Optimization) means our content is **structured, citable, and machine-readable** so LLM-powered search (ChatGPT, Claude, Perplexity, Google AI Overviews) can find, quote, and cite VowTrack — including via our own MCP server ([ADR-0007](0007-mcp-server.md)).

## Decision

We will build the public site with **Astro + MDX**, deployed on Cloudflare Workers using the Astro Cloudflare adapter.

**Rendering strategy:**
- **SSG** for evergreen marketing/guides/blog (MDX content collections) — near-zero JS, top Core Web Vitals.
- **SSR (on-demand)** for `/planners` (directory, filters) and `/planners/:slug` (profiles), reading live planner data from **D1** and ranked results from **Vectorize**. Cache with Cloudflare cache + stale-while-revalidate; revalidate on planner profile updates.
- **Astro Islands** for the few interactive bits (search/filter widget, contact form) — ship JS only where needed.

**SEO foundations:**
- Per-page titles/meta/OG, canonical URLs, `sitemap.xml` (auto-generated, including every planner), `robots.txt`.
- Clean, stable, human-readable slugs: `/planners/austin/jane-doe-events`.
- Fast, mobile-first, accessible; image optimization via Astro assets / Cloudflare Images.

**AIEO foundations:**
- **Structured data (JSON-LD)** on every planner profile: `LocalBusiness` / `Service` / `AggregateRating` / `Offer` (packages) / `Review`. Directory pages emit `ItemList`/`BreadcrumbList`.
- **`/llms.txt`** and **`/llms-full.txt`** describing the site and linking the canonical planner index for AI crawlers.
- Clean semantic HTML and a content style that leads with direct, quotable answers (so AI engines cite us).
- A **public, read-only data feed** of planners (the same data the MCP server serves) so agents have a stable contract.
- FAQ blocks with `FAQPage` schema on guides.

The Astro site shares design tokens with the React app (Tailwind v4 theme) so planner cards and brand feel consistent across surfaces.

## Options considered

### Option A — Astro + MDX (chosen)
- **Pros:** Content-first; islands architecture ships minimal JS → excellent CWV (a direct SEO ranking factor); MDX lets the content/marketing team write guides with embedded components; first-class Cloudflare adapter with SSR for live planner pages; built-in sitemap/content-collections/SEO integrations; easy JSON-LD and `llms.txt`.
- **Cons:** A second frontend stack alongside React (accepted in ADR-0002); SSR planner pages need careful caching to stay fast under load.

### Option B — Next.js / React Router for marketing too
- **Pros:** One React stack.
- **Cons:** Heavier JS baseline on content pages hurts CWV; MDX authoring is less ergonomic; more config to reach the SEO baseline Astro gives free. Rejected (see ADR-0002 Option A).

### Option C — A hosted site builder / CMS (Webflow, Framer, Wix — the prototype's old target)
- **Pros:** Fastest for pure marketing.
- **Cons:** Cannot SSR live planner profiles from D1; weak control over JSON-LD/`llms.txt`/MCP integration; another vendor outside Cloudflare. Rejected — planner discovery must be dynamic and ours.

## Consequences

- **Positive:** Planner discovery is fast, crawlable, and AI-citable from day one; marketing iterates quickly in MDX; the same planner data powers web SEO, the MCP server, and the concierge — one source of truth.
- **Negative / trade-offs:** We own SEO/AIEO hygiene as an ongoing discipline (schema correctness, sitemap freshness, content cadence). SSR planner pages add a caching concern.
- **Follow-ups:** [ADR-0007](0007-mcp-server.md) reuses the planner data contract; [ADR-0009](0009-data-model-and-multitenancy.md) defines the planner/profile schema; GTM plan defines the content/SEO calendar.
