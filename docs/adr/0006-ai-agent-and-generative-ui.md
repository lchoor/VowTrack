# ADR-0006: Agent-native concierge — Workers AI + generative UI

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** ai, product, frontend

## Context

VowTrack must be **agent-native**: Elsie (the concierge) should not just *describe* what to do — she should **take the user to the right screen and act there** (generative UI). The prototype already demonstrates the shape: a chat overlay that renders interactive widgets (vow drafts, timeline adjustments, vendor proposals, design swatches) and an app driven by `onNavigate(view)` state. We are turning that mocked behavior into a real, tool-calling agent. Per the platform decision, inference runs on **Workers AI** ([ADR-0001](0001-cloudflare-platform.md)).

"Agent-native" here means two capabilities:
1. **Navigation as a tool** — the agent can move the user to any screen/entity (`navigate({ view, params })`), so "let's fix your timeline" *opens the timeline*, pre-focused.
2. **Generative UI** — the agent returns typed UI components (the existing widgets), not just prose, and those components can perform real actions against the API.

## Decision

We will build Elsie on the **Cloudflare Agents SDK** (Durable Object-backed), using **Workers AI** for inference and embeddings, with a **typed tool + UI-component contract** shared between the agent and the React app.

**Architecture:**
- One **Agent (Durable Object) per couple/wedding**, holding conversation state, plan context, and a reference to the wedding's data. This gives each couple a persistent, stateful concierge.
- **Inference:** Workers AI (instruct model with tool/function calling) for the conversation loop; Workers AI embeddings for retrieval over the couple's plan + the planner/vendor catalog in **Vectorize**.
- **Tools (server-side, typed):**
  - `navigate({ view, entityId? })` — emits a navigation intent the client executes (this is what makes it agent-native, not advisory).
  - `render_widget({ type, data })` — returns a typed generative-UI component (`vow_draft`, `timeline_adjustment`, `vendor_proposal`, `design_swatches`, `checklist`, `weather`, plus new ones).
  - Domain tools: `search_planners`, `search_vendors`, `update_timeline`, `draft_vows`, `request_vendor_proposal`, `update_budget`, etc. — each calls the same Workers API the UI uses (no privileged backdoor).
- **Client contract:** the agent streams a structured response (text + tool calls). The React app has a single dispatcher that maps `navigate` → router, `render_widget` → the existing widget components, domain tools → optimistic UI + API calls. We **formalize the widget union** that `ElsieChatOverlay.tsx` already hints at (`VowAiMessage.widget`) into a shared TypeScript type used by both agent and client.
- **Guardrails:** every tool runs under the requesting user's auth + tenancy ([ADR-0005](0005-auth-better-auth-on-d1.md), [ADR-0009](0009-data-model-and-multitenancy.md)); destructive/financial actions (approve proposal, send payment link, message a vendor) require explicit user confirmation in the UI, never silent execution.
- The **same tool layer is exposed over MCP** ([ADR-0007](0007-mcp-server.md)) so external models get the same capabilities.

## Options considered

### Option A — Workers AI + Agents SDK + typed generative-UI contract (chosen)
- **Pros:** Stays in-platform (no egress, low latency, cheapest inference) per ADR-0001; Durable Objects give per-couple stateful agents for free; navigation-as-a-tool + a typed widget union turn the existing prototype widgets into real generative UI with minimal rework; one tool layer reused by app, agent, and MCP.
- **Cons:** Workers AI models have a lower reasoning/tool-use ceiling than frontier APIs today — complex multi-step planning may need tighter prompting, smaller tool scopes, and good retrieval; model selection/quality on Workers AI evolves and we must track it.

### Option B — Frontier API (Anthropic/OpenAI) for the agent
- **Pros:** Best tool-use/reasoning quality.
- **Cons:** Per-token cost on a free-couple base; egress and added vendor; contradicts the ADR-0001/AI decision to stay CF-native at launch. **Deferred** — the architecture is model-agnostic at the tool layer, so we can route hard flows to a frontier model later (a "hybrid" follow-up) without rework.

### Option C — Advisory chatbot only (text directions, no tools)
- **Pros:** Simplest.
- **Cons:** Not agent-native — fails the core product requirement. The prototype already exceeds this. Rejected.

## Consequences

- **Positive:** Elsie genuinely *acts* — navigates, drafts, proposes, updates — turning the prototype's faked widgets into a real differentiator. One capability layer serves UI, agent, and MCP. Per-couple state enables continuity ("where we left off").
- **Negative / trade-offs:** We design tools to be small, well-described, and confirm-before-acting to keep Workers AI reliable; we invest in retrieval quality (Vectorize) to compensate for a smaller model. We must evaluate agent quality continuously (golden-task eval set) and keep the option to route hard tasks to a stronger model open.
- **Follow-ups:** Extract the shared widget/tool TypeScript contract from `ElsieChatOverlay.tsx`; build the client tool-dispatcher; stand up the per-couple Agent DO; [ADR-0007](0007-mcp-server.md) wraps the same tools for external models.
