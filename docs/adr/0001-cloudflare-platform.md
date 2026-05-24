# ADR-0001: Cloudflare as the deployment platform & data layer

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** platform, infra

## Context

VowTrack is launching as a global, consumer-facing wedding-planning marketplace with an always-on AI concierge and an MCP server. We need low latency worldwide, cheap idle cost (early traffic is bursty and low), a path to stateful AI agents, and a single vendor to keep ops small at launch. The prototype currently has a stubbed Supabase/Hono backend that we are replacing.

The team has decided to standardize on **Cloudflare** for compute and data for the initial launch.

## Decision

We will build and deploy VowTrack entirely on the **Cloudflare Developer Platform**, using its managed data services as our primary stores:

| Concern | Cloudflare service |
|---|---|
| Compute / API / SSR | **Workers** |
| Relational data (couples, planners, vendors, suites, bookings) | **D1** (SQLite) |
| Sessions, feature flags, hot config, rate-limit counters | **KV** |
| User uploads (mood boards, inspiration images, contracts, planner portfolio media) | **R2** |
| Stateful AI agent + per-couple coordination, MCP session state | **Durable Objects** (via Agents SDK) |
| Semantic search over planners/vendors/content for AIEO + concierge retrieval | **Vectorize** |
| Async work (emails, webhooks, image processing, embeddings backfill) | **Queues** |
| LLM inference + embeddings | **Workers AI** (see [ADR-0006](0006-ai-agent-and-generative-ui.md)) |

Static assets ship via **Workers Assets**. We use **Wrangler** for local dev and deploys, and one Cloudflare account with separate `dev` / `staging` / `production` environments.

### Data access & portability

We deliberately store **both relational data in D1 and blobs/media in R2** (not one or the other), and we put a portable abstraction over the relational layer so that a future move off SQLite (e.g., D1 → Postgres) is a low-pain, mechanical change rather than a rewrite:

- **Drizzle ORM** is the single data-access layer for D1 from Workers/TypeScript. Drizzle's schema definitions are the **source of truth** for tables and migrations, give us typed queries, and support multiple SQL dialects — so switching the underlying database later is largely a dialect/driver swap, not an app rewrite. No raw `D1.prepare()` SQL scattered through the codebase.
- For any **Python-side** services or migration/ETL tooling, we mirror the same canonical entities as **Pydantic models** (a lightweight ODM pattern). Pydantic gives one validated schema definition reused across Python services and migration scripts, so the entity contract is consistent across languages and a database migration is less of a headache.
- Both definitions track the same entity contract in [ADR-0009](0009-data-model-and-multitenancy.md); blobs always live in R2 with only references stored in D1 (see D1-limits discipline below).

## Options considered

### Option A — Cloudflare (chosen)
- **Pros:** Single vendor; global edge by default; scale-to-zero pricing fits early bursty traffic; Durable Objects + Agents SDK give us stateful agents and MCP for "free"; Vectorize + Workers AI keep the AI stack in-platform with no egress; D1/KV/R2 cover all our storage needs; excellent local dev via Wrangler/Miniflare.
- **Cons:** D1 is SQLite with per-database size and write-throughput limits — we must shard or partition if a single planner's data grows huge; Workers have CPU-time and request-size limits that constrain heavy synchronous work (mitigated by Queues); some ecosystem libraries assume Node APIs (mitigated by `nodejs_compat`); vendor lock-in to Cloudflare primitives — **mitigated by the Drizzle ORM + Pydantic abstraction above, which keeps a D1→Postgres migration mechanical**.
- **Why chosen:** It is the team's stated platform, and it is genuinely the best fit for an edge-first, agent-native, low-ops launch.

### Option B — Supabase + Vercel (the prototype's implied path)
- **Pros:** Postgres (richer than SQLite), mature auth/storage, generous DX.
- **Cons:** Two vendors; agent statefulness and MCP need extra infra; cold-start and regional latency for a global audience; we'd still want an edge layer. Rejected — diverges from the platform decision and adds ops surface.

### Option C — AWS (Lambda/RDS/etc.)
- **Pros:** Maximum flexibility and ceiling.
- **Cons:** Highest ops burden and slowest time-to-launch for a small team; pay-for-idle; no native MCP/agent story. Rejected for launch.

## Consequences

- **Positive:** One bill, one CLI, one mental model. Stateful agents and MCP are first-class. Near-zero idle cost. Global latency handled by the edge.
- **Negative / trade-offs:** We design **around D1's limits from day one** (narrow hot tables, R2 for blobs, Vectorize for search rather than `LIKE` scans). We accept Cloudflare lock-in as a deliberate launch trade, but **bound** it with Drizzle ORM (TS) + Pydantic models (Python) so portability (e.g., D1→Postgres) stays a mechanical, post-PMF migration rather than a rewrite.
- **Follow-ups:** [ADR-0002](0002-app-architecture-and-rendering.md) (how the app is structured on Workers), [ADR-0009](0009-data-model-and-multitenancy.md) (D1 schema & tenancy), [ADR-0006](0006-ai-agent-and-generative-ui.md) (Workers AI), [ADR-0007](0007-mcp-server.md) (MCP on Workers).

<!-- @doc-review-state
{
  "version": 1,
  "threads": [
    {
      "id": "0e978ba1-33c1-4908-ae8c-8c63c88a091f",
      "line": 35,
      "author": "upagupta2003",
      "body": "@claude, lets use both D1 and R2. with drizzle orm if we need to switch and also Python based ODM pattern ( by using pydantic class ) to make sure we want to migrate, it will be less headache.",
      "createdAt": "2026-05-23T22:27:24.681Z",
      "responses": [
        {
          "author": "claude",
          "body": "Added a 'Data access & portability' subsection to the Decision: D1 + R2 both used; Drizzle ORM as the single typed data-access layer over D1 (schema = source of truth, multi-dialect so a DB switch is a driver/dialect swap, not a rewrite); Pydantic models mirror the same entities for Python services/migration tooling. Updated the lock-in con and consequences to reflect this bounds the migration headache.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "- **Cons:** D1 is SQLite with per-database size and write-throughput limits — we must shard or partition if a single pla"
    }
  ]
}
@end-doc-review-state -->
