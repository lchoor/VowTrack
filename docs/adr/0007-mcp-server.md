# ADR-0007: MCP server for planner discovery & planning tools

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** ai, aieo, product, platform

## Context

Two product requirements converge on MCP (Model Context Protocol):
1. **AIEO / discovery:** *"an agent can find wedding planners using our MCP server."* External assistants (Claude, ChatGPT, open-source models) should be able to query VowTrack's planner/vendor catalog and surface us in answers.
2. **Bring-your-own-model:** *"people can connect their Claude/ChatGPT or open-source models to VowTrack."* A couple or planner who prefers their own assistant should be able to drive their VowTrack plan from it.

These are two MCP audiences with very different trust levels — anonymous discovery vs. authenticated account control.

## Decision

We will run a **remote MCP server on Cloudflare Workers using the Agents SDK `McpAgent`**, reusing the same typed tool layer as the in-app concierge ([ADR-0006](0006-ai-agent-and-generative-ui.md)). We expose **two tiers, delivered in sequence**:

> **Sequencing:** **Launch with Tier 1 only** — the public, unauthenticated discovery MCP that lets people (and their assistants) *find planners*. This is low-risk (read-only public data), is the bigger acquisition/AIEO win, and needs no OAuth. **Tier 2 (authenticated account control) ships in a later phase**, after the Better Auth OAuth server is in place. The two-tier design is recorded here so Tier 1 is built without foreclosing Tier 2.

**1. Public / unauthenticated discovery MCP** (`/mcp` or `mcp.vowtrack.com`) — *launch*
- Read-only tools over public data: `search_planners`, `get_planner`, `list_packages`, `search_vendors`, `check_availability`.
- No auth required; rate-limited; serves the same planner data contract as the Astro directory ([ADR-0003](0003-marketing-and-discovery-astro-mdx.md)) and reads from D1 + Vectorize.
- This is our **agent-facing front door** — listed in MCP directories/registries so assistants can discover and recommend VowTrack planners.

**2. Authenticated account MCP** (OAuth-gated) — *later phase*
- Full tools scoped to the connected user via **OAuth 2.1** (Better Auth as the authorization server, [ADR-0005](0005-auth-better-auth-on-d1.md)): `get_my_plan`, `update_timeline`, `draft_vows`, `manage_guests`, `request_proposal`, `get_budget`, etc.
- A couple connects VowTrack to their own Claude/ChatGPT; the assistant acts **as them**, under the same tenancy and confirm-before-acting guardrails as Elsie.
- Financial/destructive actions still require explicit confirmation; tokens are scoped and revocable.

Both tiers are thin MCP wrappers over the shared tool layer — **no separate business logic**.

## Options considered

### Option A — Remote MCP on Workers (McpAgent), two tiers (chosen)
- **Pros:** Reuses the ADR-0006 tool layer (one implementation, three consumers: app, concierge, MCP); CF-native and stateful via Durable Objects; separating public-discovery from authed-control matches the two real audiences and their trust levels; positions VowTrack to be *recommended by* AI assistants (a new acquisition channel), not just used through them.
- **Cons:** Two security surfaces to harden; OAuth-for-MCP is still a maturing area we must implement carefully; rate-limiting/abuse protection needed on the public tier.

### Option B — Single authenticated MCP only
- **Pros:** Simpler, one surface.
- **Cons:** Loses the anonymous discovery/AIEO channel — the thing that gets VowTrack *recommended* by assistants. Rejected.

### Option C — No MCP, REST API only
- **Pros:** Less to build.
- **Cons:** Fails both stated requirements (agent discovery + BYO-model). Rejected.

## Consequences

- **Positive:** VowTrack becomes both *usable by* and *discoverable through* the AI assistants people already use — a differentiated acquisition and retention channel. One tool layer, no duplication. The public tier doubles as machine-readable AIEO surface alongside `llms.txt` and JSON-LD.
- **Negative / trade-offs:** We harden two surfaces and implement OAuth for MCP correctly (scopes, consent, revocation, audit). Public-tier abuse/rate-limiting and data-exposure review are required before listing publicly.
- **Follow-ups:** Build the public discovery MCP first (reuses planner data, low risk); add OAuth-gated account MCP after Better Auth OAuth server is in place; list the public MCP in registries as part of GTM/AIEO.

<!-- @doc-review-state
{
  "version": 1,
  "threads": [
    {
      "id": "29787d4b-00c0-4195-8510-046bd884f6b4",
      "line": 25,
      "author": "upagupta2003",
      "body": "We will launch this is next phase. we will launch with Public / unauthenticated discovery MCP for people to find planners.",
      "createdAt": "2026-05-23T22:55:36.087Z",
      "responses": [
        {
          "author": "claude",
          "body": "Added an explicit sequencing note to the Decision: launch with Tier 1 (public, unauthenticated discovery MCP for finding planners) only — low risk, no OAuth, bigger AIEO/acquisition win — and ship Tier 2 (authenticated account control) in a later phase once the Better Auth OAuth server exists. Marked the Tier 2 heading 'later phase'. Roadmap Phase 4 already builds them in this order.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "**2. Authenticated account MCP** (OAuth-gated)"
    }
  ]
}
@end-doc-review-state -->
