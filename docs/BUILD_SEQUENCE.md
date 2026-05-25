# VowTrack Build Sequence

The dependency-ordered execution plan for building VowTrack from the clean baseline to launch. This is the **how/when**; the [ADRs](adr/README.md) are the **what/why** and the [PRODUCTION_ROADMAP](PRODUCTION_ROADMAP.md) is the phase-level view. This doc breaks those phases into **demoable milestones** — each ends in something you can open in a browser.

**Sequencing principles:**
- Ship a **walking skeleton** first (all surfaces deploy and talk), then fill it in.
- Bring the slow-to-mature, high-leverage surface (**public planner discovery** for SEO/AIEO) online early — the SEO clock starts ticking sooner.
- Layer money, agent, and MCP on after the core data + app are solid.
- Prefer **thin vertical slices** over building each layer to completion.

## Dependency map

```
M0 Walking skeleton ─► M1 Data ─► M2 Auth+tenancy ─► M3 Public discovery (SEO/AIEO)
                                                            │
                                          ┌─────────────────┘
                                          ▼
                              M4 Core app ─► M5 Payments+marketplace ─► M6 Agent (Elsie)
                                                            │
                                                            ▼
                                              M7 Public MCP+AIEO ─► M8 Launch hardening
```

- **Critical path to first revenue:** M0 → M1 → M2 → M4 → M5.
- **Parallelizable once M2 lands:** the web/SEO track (M3) and the app track (M4) can run side by side — M3 launches on seed data and does not need M4's editor.

---

## M0 — Walking skeleton (monorepo + deploys)
*Roadmap Phase 0 · ADR-0001, ADR-0002*

**Goal:** all three Workers deploy to one domain and respond.

- [ ] pnpm + Turborepo workspace: `apps/web` (Astro), `apps/app` (Vite/React), `apps/api` (Workers: Hono + Agents SDK), `packages/ui`, `packages/contracts`.
- [ ] Bootstrap each app from C3 templates (Astro / Vite+React / agents-starter).
- [ ] Wrangler config per app; `dev` / `staging` / `production` environments; Secrets Store wired.
- [ ] Edge routing on one origin: `/` `/planners/*` `/guides/*` → web, `/app/*` → app, `/api/*` `/agent/*` `/mcp` → api.
- [ ] CI: typecheck + build + preview deploy per PR.

**Exit / demo:** `vowtrack.dev/` (Astro), `/app` (React), `GET /api/health` all live on one domain.

## M1 — Data foundation
*Roadmap Phase 1 · ADR-0001, ADR-0009*

**Goal:** real schema in D1.

- [ ] Provision bindings: D1, KV, R2, Vectorize, Queues.
- [ ] Drizzle schema + migrations for core entities: `planner_profile`, `package`, `vendor`/`vendor_category`/`planner_vendor`, `wedding`, plan tables (`timeline_event`, `budget_line`, `guest`, `vow_draft`, `design_decision`, `task`, `suite`), `inquiry`/`match`, payment mirror tables, `message`, `audit_log`.
- [ ] Mirror canonical entities as Pydantic models for Python tooling/migration.
- [ ] Seed script: sample planners, vendors, packages.

**Exit / demo:** migrations apply cleanly; `/api` returns seeded planners.

## M2 — Auth & tenancy
*Roadmap Phase 1 · ADR-0005, ADR-0009*

**Goal:** real accounts with scoped data.

- [ ] Better Auth on D1: email/password + Google + Apple; Cloudflare Email for verification/reset (SPF/DKIM/DMARC).
- [ ] Organizations: planner-org + couple-household; role matrix (`owner`/`member`/`viewer`/`admin`).
- [ ] Shared **tenancy guard** in `apps/api` + tests (the correctness-critical invariant).
- [ ] Platform admin role + internal Admin Console login behind Cloudflare Access (+2FA, audit log).
- [ ] Wire login/signup screens (reuse prototype onboarding UI).

**Exit / demo:** a couple and a planner sign up, log in; cross-tenant reads are blocked.

## M3 — Public discovery (SEO/AIEO)
*Roadmap Phase 2 (web track) · ADR-0003*

**Goal:** planners are findable — start the SEO clock early.

- [ ] Astro `/planners` directory (SSR, filters: location/style/budget/guest count).
- [ ] Astro `/planners/:slug` profile (SSR from D1, JSON-LD: `LocalBusiness`/`Service`/`Offer`/`Review`).
- [ ] Queue consumer: embed planner data into Vectorize for semantic search.
- [ ] `sitemap.xml` (incl. every planner), `llms.txt` / `llms-full.txt`, `robots.txt`.
- [ ] Marketing home + 5–10 high-intent MDX guides; edge cache + stale-while-revalidate on planner pages.

**Exit / demo:** search/browse seeded planners; profiles are crawlable and pass rich-results validation.

## M4 — Core app
*Roadmap Phase 1→2 · ADR-0002, ADR-0009*

**Goal:** planners and couples actually use the app.

- [ ] Decompose `HighFiPrototype.tsx` into routed components under `/app`; wire to the API (keep the `onNavigate` contract).
- [ ] Planner profile editor → write fans out via Queues to Vectorize reindex + SSR cache purge + sitemap (the ADR-0002 freshness flow).
- [ ] Planner: packages, vendor relationships, couple roster.
- [ ] Couple: dashboard + plan data (timeline, budget, guests, vows, design, checklist) on real API.
- [ ] Couple↔planner inquiry/match flow.

**Exit / demo:** planner edits a profile → live on web next request; couple plans with persisted data.

## M5 — Payments & marketplace
*Roadmap Phase 2 · ADR-0004, ADR-0008, ADR-0010*

**Goal:** money flows and the gating rule is live.

- [ ] Stripe Connect onboarding (planners/vendors as connected accounts; Express + hosted KYC).
- [ ] Couple Checkout with application-fee take-rate; couple↔planner match unlocked on payment (gating rule).
- [ ] Metered per-couple planner subscription (Stripe Billing).
- [ ] Vendor sign-up commission capture.
- [ ] Webhooks → Queues → D1, idempotent; refund/dispute handling.
- [ ] Design-partner beta instrumentation + ADR-0004 metrics (GMV, take-rate, leakage, planner MRR, per-couple cost).

**Exit / demo:** a couple pays through VowTrack → planner matched, take-rate captured, beta planner billed (free during beta).

> Note: exact percentages come from the beta → recorded in the planned **ADR-0011: Pricing**.

## M6 — Agent-native Elsie
*Roadmap Phase 3 · ADR-0006*

**Goal:** the concierge acts, not just advises.

- [ ] Extract the typed tool + widget contract from `ElsieChatOverlay.tsx` into `packages/contracts`.
- [ ] Per-couple Agent Durable Object (Agents SDK) + Workers AI inference + Vectorize retrieval.
- [ ] Tools: `navigate`, `render_widget`, and domain tools (`search_planners`, `update_timeline`, `draft_vows`, `request_vendor_proposal`, `update_budget`, …) — behind the tenancy guard, confirm-before-acting on financial/destructive actions.
- [ ] Client tool-dispatcher: `navigate` → router, `render_widget` → existing widgets (now backed by real data/actions).
- [ ] Golden-task eval set; keep the model-routing seam open for a later frontier-model tier.

**Exit / demo:** "fix my timeline" opens the timeline pre-focused and proposes a real, confirmable edit.

## M7 — Public MCP & AIEO finishing
*Roadmap Phase 4 · ADR-0003, ADR-0007*

**Goal:** external assistants discover VowTrack planners.

- [ ] Public discovery MCP (`McpAgent`) over public planner/vendor data; rate-limited; reuses M6 tool layer.
- [ ] List in MCP registries; verify Claude/ChatGPT can find planners.
- [ ] JSON-LD / `llms.txt` / public data-feed audit.

> Authenticated account MCP (OAuth-gated) is a later phase per ADR-0007 — not in launch scope.

**Exit / demo:** an external assistant returns a VowTrack planner in its answer.

## M8 — Launch hardening
*Roadmap Phase 5 · all ADRs*

**Goal:** safe, observable, legal GA.

- [ ] Security review: auth/session, payments/webhooks, tenancy isolation, MCP surfaces, agent guardrails.
- [ ] Observability + metric dashboards (Workers analytics, error tracking, Stripe reconciliation, agent eval).
- [ ] Performance (Core Web Vitals on public pages, D1 query review) + accessibility pass.
- [ ] Legal/ops: ToS (incl. gating-rule framing), privacy policy, 1099/tax, refund/dispute runbooks.

**Exit:** GA checklist signed off.

---

## Status tracking

Update the checkboxes above as milestones land. When the design-partner beta produces pricing data (during/after M5), write **ADR-0011: Pricing** and flip it to Accepted in the [ADR index](adr/README.md).
