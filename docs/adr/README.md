# VowTrack Architecture Decision Records

This directory holds the **Architecture Decision Records (ADRs)** that productionalize VowTrack — taking it from a Figma Make prototype to a launchable, agent-native wedding-planning marketplace on Cloudflare.

ADRs exist so we can **decide fast and not relitigate**. Each one captures a single decision, the context, the options we weighed, and the consequences we accept. If you disagree with a decision, don't reopen the discussion casually — write a new ADR that supersedes it.

## Status legend

- **Accepted** — decided, build against it.
- **Proposed** — drafted, awaiting sign-off.
- **Superseded** — replaced by a later ADR (linked).

## Index

| # | Title | Status |
|---|-------|--------|
| [0001](0001-cloudflare-platform.md) | Cloudflare as the deployment platform & data layer | Accepted |
| [0002](0002-app-architecture-and-rendering.md) | App architecture: split public (SEO/AIEO) surfaces from the authenticated app | Accepted |
| [0003](0003-marketing-and-discovery-astro-mdx.md) | Marketing + planner discovery on Astro + MDX | Accepted |
| [0004](0004-monetization-marketplace-model.md) | Monetization & marketplace model | Accepted |
| [0005](0005-auth-better-auth-on-d1.md) | Authentication & identity: Better Auth on D1 | Accepted |
| [0006](0006-ai-agent-and-generative-ui.md) | Agent-native concierge: Workers AI + generative UI | Accepted |
| [0007](0007-mcp-server.md) | MCP server for planner discovery & planning tools | Accepted |
| [0008](0008-payments-stripe-connect.md) | Payments & billing: Stripe Connect | Accepted |
| [0009](0009-data-model-and-multitenancy.md) | Data model & multi-tenancy | Accepted |
| [0010](0010-design-partner-beta-and-pricing-discovery.md) | Design-partner beta & pricing discovery | Accepted |
| 0011 | Pricing (the numbers) | Planned — written at ADR-0010's decision gate |

## How to add an ADR

1. Copy [`0000-adr-template.md`](0000-adr-template.md) to the next number.
2. Fill it in. Keep it to one decision.
3. Set status to **Proposed**, open a PR, get sign-off, flip to **Accepted**.
4. Add a row to the index above.

## Companion planning docs

- [`../PRODUCTION_ROADMAP.md`](../PRODUCTION_ROADMAP.md) — phased plan from prototype to launch.
- [`../GTM_PLAN.md`](../GTM_PLAN.md) — go-to-market, landing page, and launch plan.
