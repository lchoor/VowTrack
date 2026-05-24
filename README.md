# VowTrack

The agent-native wedding-planning marketplace — couples plan for free with an AI concierge, planners get discovered and run their book of business, vendors get qualified couples.

> **Status:** clean baseline for the production build. The original Figma Make prototype is preserved on the [`archive/figma-proto`](../../tree/archive/figma-proto) branch and the [`figma-proto`](../../releases/tag/figma-proto) tag.

## Where to start

All architecture and go-to-market decisions are recorded as ADRs:

- **[docs/adr/](docs/adr/README.md)** — Architecture Decision Records (platform, app architecture, monetization, auth, AI/agent, MCP, payments, data model).
- **[docs/PRODUCTION_ROADMAP.md](docs/PRODUCTION_ROADMAP.md)** — phased plan from baseline to launch.
- **[docs/GTM_PLAN.md](docs/GTM_PLAN.md)** — go-to-market, landing page, and launch plan.

## Stack (per ADRs)

- **Platform:** Cloudflare — Workers, D1, KV, R2, Durable Objects, Vectorize, Queues ([ADR-0001](docs/adr/0001-cloudflare-platform.md)).
- **Architecture:** Astro + MDX for public SEO/AIEO surfaces; React SPA for the authenticated app; Workers for API/agent/MCP ([ADR-0002](docs/adr/0002-app-architecture-and-rendering.md)).
- **Auth:** Better Auth on D1 ([ADR-0005](docs/adr/0005-auth-better-auth-on-d1.md)).
- **AI:** Workers AI + Agents SDK, agent-native generative UI ([ADR-0006](docs/adr/0006-ai-agent-and-generative-ui.md)) + MCP ([ADR-0007](docs/adr/0007-mcp-server.md)).
- **Payments:** Stripe Connect ([ADR-0008](docs/adr/0008-payments-stripe-connect.md)).

## Repository layout (target)

Per [ADR-0002](docs/adr/0002-app-architecture-and-rendering.md), a pnpm + Turborepo monorepo:

```
apps/
  web/        # Astro SSR — marketing + planner directory/profiles (SEO/AIEO)
  app/        # React SPA — the authenticated planning app
  api/        # Workers — REST API, Better Auth, Agent DO, MCP
packages/
  ui/         # shared design tokens / components
  contracts/  # shared TS types (tool/widget union, API DTOs)
docs/         # ADRs, roadmap, GTM plan
```

Scaffolding lands in roadmap Phase 0.
