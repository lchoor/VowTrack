# ADR-0009: Data model & multi-tenancy

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** platform, data, security

## Context

VowTrack has three principal actors — **couples**, **planners**, **vendors** — plus platform admins, connected by a marketplace ([ADR-0004](0004-monetization-marketplace-model.md)) and powered by an agent/MCP layer ([ADR-0006](0006-ai-agent-and-generative-ui.md), [ADR-0007](0007-mcp-server.md)) that acts under a user's identity. We store relational data in **D1** ([ADR-0001](0001-cloudflare-platform.md)), which is SQLite — so we design narrow hot tables, push blobs to R2, and use Vectorize for search. We need clean tenancy boundaries so a planner can never see another planner's couples, a couple's private plan is never public, and agent tools inherit these rules automatically.

## Decision

We will model **two tenant types** and enforce tenancy at the API layer, with public/private separation baked into the schema.

**Tenancy:**
- A **Planner Org** is a tenant: a planner plus collaborators (Better Auth organization, [ADR-0005](0005-auth-better-auth-on-d1.md)). Owns a public profile, packages, vendor relationships, and a roster of managed couples.
- A **Wedding (couple household)** is a tenant: one or two partners plus invited view-only family. Owns the plan (timeline, budget, guests, suites, vows, design). Optionally linked to **one** Planner Org.
- Every domain row carries its owning tenant id; **every API/agent/MCP query is scoped by the caller's membership** — no cross-tenant reads without an explicit, audited share.

**Core entities (D1):**
- `user`, `organization`, `member` (Better Auth) — identity & teams.
- `planner_profile` — **public** SEO/AIEO surface: slug, bio, location, styles, rating, media refs (R2), serving the Astro directory + MCP. Embedded in Vectorize for semantic search.
- `package` — planner's offerings (public): price range, inclusions → JSON-LD `Offer`.
- `vendor`, `vendor_category`, `planner_vendor` — vendor catalog and planner↔vendor relationships.
- `wedding` — the couple's tenant root: date, budget target, guest count, linked `planner_org_id?`.
- Plan data scoped to `wedding`: `timeline_event`, `budget_line`, `guest`, `vow_draft`, `design_decision`, `task`/checklist, `suite` (bridal/groom/etc. from the prototype sitemap).
- `inquiry` / `match` — a couple's inquiry to a planner and the resulting assignment (gated by payment per [ADR-0004](0004-monetization-marketplace-model.md)).
- Payments ([ADR-0008](0008-payments-stripe-connect.md)): `connected_account`, `transaction`, `application_fee`, `subscription`, `payout` — mirrored from Stripe via webhook→Queues, source of truth stays Stripe.
- `message` — couple↔planner↔Elsie conversation threads.
- `audit_log` — who/what/when for sensitive and agent-initiated actions.

**Public vs. private:** planner profiles, packages, and vendor listings are **public** (crawlable, MCP-readable). Everything under a `wedding` is **private** to that household + its linked planner. The public MCP tier ([ADR-0007](0007-mcp-server.md)) can only ever touch public tables.

**D1 limits discipline:** large/grow-unbounded media → R2 (store only refs); search → Vectorize, not `LIKE` scans; keep hot tables narrow; plan for partitioning if a single planner org's data grows large; use Queues for bulk/async writes.

## Options considered

### Option A — Two tenant types (Planner Org + Wedding), API-layer scoping, public/private split (chosen)
- **Pros:** Maps directly to the product and to Better Auth orgs; the public/private split makes SEO/AIEO and MCP-public-tier safe by construction; one source of truth for planner data across web, agent, and MCP; agent tools inherit tenancy automatically since they call the same scoped API.
- **Cons:** Two tenant types add authorization nuance (a couple linked to a planner spans both); requires disciplined, consistently-applied scoping (a single missed check leaks data) — mitigated by a shared query/guard helper and tests.

### Option B — Single tenant type (everything under one "account")
- **Pros:** Simpler authz.
- **Cons:** Can't cleanly express "one planner, many couples, each couple private" — exactly our core relationship. Rejected.

### Option C — Database-per-tenant (a D1 per planner org)
- **Pros:** Hard isolation; sidesteps single-DB size limits.
- **Cons:** Massive operational complexity (migrations across N DBs, cross-tenant marketplace queries become hard, public directory needs aggregation); premature at launch. Revisit only if a single shared D1 hits limits.

## Consequences

- **Positive:** Clear, enforceable boundaries; public discovery data and private plan data are structurally separated; agent and MCP safety follows from API-layer scoping; one planner dataset serves web SEO, concierge, and MCP.
- **Negative / trade-offs:** Tenancy scoping is a correctness-critical invariant — centralize it in a guard layer, cover it with tests, and include it in the pre-GA security review. We accept SQLite/D1 constraints and design around them now rather than retrofitting.
- **Follow-ups:** Write migrations; build the shared tenancy guard used by API, agent ([ADR-0006](0006-ai-agent-and-generative-ui.md)), and MCP ([ADR-0007](0007-mcp-server.md)); define the role/permission matrix; backfill Vectorize embeddings for planner/vendor search.
