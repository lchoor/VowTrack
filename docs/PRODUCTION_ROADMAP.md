# VowTrack Production Roadmap

From Figma Make prototype → launchable, agent-native wedding marketplace on Cloudflare.

This roadmap operationalizes the [ADRs](adr/README.md). Phases are ordered by dependency, not calendar — run tracks in parallel where the team allows. Each phase lists the **goal**, **work**, and **exit criteria**.

## Where we are today

- A high-fidelity React 18 + Vite SPA prototype (`src/app/components/HighFiPrototype.tsx`, ~7.6k lines) with Tailwind v4 + Radix.
- Elsie concierge is **mocked**: `ElsieChatOverlay.tsx` renders real generative-UI widgets (vow draft, timeline adjustment, vendor proposal, design swatches) driven by keyword matching and `setTimeout`, with `onNavigate(view)` already wired through the app.
- Backend is a **stub**: Supabase/Hono `index.tsx` only has a health check; a KV store helper exists.
- Domain is well-defined: `sitemap.ts` enumerates Bridal/Groom suites, Planning Hub, Logistics, Resources, Account.

The prototype is an asset — the plan **reuses** its UI and the already-correct navigation/widget patterns rather than rewriting.

---

## Phase 0 — Foundations & repo restructure

**Goal:** A monorepo on Cloudflare with CI/CD and the prototype building unchanged.

- Restructure into a workspace: `apps/web` (Astro), `apps/app` (React SPA, the migrated prototype), `apps/api` (Workers: API + agent + MCP), `packages/ui` (shared design tokens/components), `packages/contracts` (shared TS types: tool/widget union, API DTOs).
- Move `HighFiPrototype.tsx` into `apps/app` as-is; get it building/deploying to Workers Assets.
- Set up Wrangler envs (`dev`/`staging`/`production`), one Cloudflare account, secrets in Secrets Store.
- CI: typecheck, build, deploy previews per PR.
- Replace/remove the Supabase stub.

**Exit:** Prototype runs on Cloudflare at a staging URL; CI deploys previews. **(ADR-0001, ADR-0002)**

## Phase 1 — Data, auth, tenancy

**Goal:** Real accounts and real data behind the app.

- D1 schema + migrations for core entities; R2 buckets for media; KV for sessions/flags; Vectorize index created. **(ADR-0009)**
- Better Auth on D1: email/password + Google + Apple; couple-household and planner-org organizations; role matrix; Cloudflare Email for verification/reset. **(ADR-0005)**
- Shared **tenancy guard** in `apps/api` enforcing org/household scoping; tests.
- Decompose `HighFiPrototype.tsx` into route-level components under `/app/*`; wire screens to the real API instead of mock state. Keep the `onNavigate` contract.

**Exit:** A couple and a planner can sign up, log in, and see real, tenant-scoped data. **(ADR-0001, ADR-0005, ADR-0009)**

## Phase 2 — Marketplace, payments & planner profiles

**Goal:** The three-sided model is live and monetizable.

- Astro public site: marketing pages + **planner directory** (`/planners`) and **SSR planner profiles** (`/planners/:slug`) reading D1 + Vectorize, with JSON-LD, sitemap, `llms.txt`. **(ADR-0003)**
- Planner profile editor in-app (bio, packages, portfolio media → R2, vendors).
- Stripe Connect onboarding for planners/vendors; couple Checkout with application-fee take-rate; metered per-couple planner subscription; webhooks → Queues → D1. **(ADR-0008)**
- Implement the **gating rule**: couple↔planner match unlocked by paying through our link. **(ADR-0004)**
- Couple-side vendor browse/sign-up with commission capture.
- Kick off the **design-partner beta**: recruit 8–15 planners free for 12 months, stand up pricing/gap-log instrumentation. **(ADR-0010)**

**Exit:** A couple can find a planner via search, get matched by paying through VowTrack, and a planner is billed per active couple; vendor sign-ups capture commission. **(ADR-0003, ADR-0004, ADR-0008)**

## Phase 3 — Agent-native concierge (real Elsie)

**Goal:** Replace mocked Elsie with a real Workers AI agent that acts.

- Extract the **typed tool + widget contract** from `ElsieChatOverlay.tsx` into `packages/contracts`. **(ADR-0006)**
- Per-couple Agent Durable Object (Agents SDK); Workers AI inference + embeddings; Vectorize retrieval over the couple's plan + planner/vendor catalog.
- Implement tools: `navigate`, `render_widget`, `search_planners`, `search_vendors`, `update_timeline`, `draft_vows`, `request_vendor_proposal`, `update_budget`, etc. — all behind the tenancy guard, with confirm-before-acting on financial/destructive actions.
- Client tool-dispatcher mapping `navigate`→router and `render_widget`→existing widgets (now backed by real data/actions).
- Golden-task eval set for agent quality; keep the model-routing seam open for later frontier-model use.

**Exit:** Elsie navigates the user to the right screen and performs real actions; widgets are live. **(ADR-0006)**

## Phase 4 — MCP & AIEO

**Goal:** VowTrack is discoverable through and usable from external assistants.

- **Public discovery MCP** (`/mcp`): read-only planner/vendor tools over public data; rate-limited; reuses the Phase 3 tool layer. **(ADR-0007)**
- **Authenticated account MCP**: OAuth 2.1 via Better Auth; full scoped tools; revocable tokens; confirm-before-acting. **(ADR-0007)**
- AIEO finishing: JSON-LD coverage audit, `llms.txt`/`llms-full.txt`, public planner data feed; list the public MCP in registries. **(ADR-0003, ADR-0007)**

**Exit:** An external Claude/ChatGPT can find a VowTrack planner and (when authed) drive a plan. **(ADR-0003, ADR-0007)**

## Phase 5 — Launch hardening

**Goal:** Safe, observable, legal GA.

- Security review: auth/session, payments/webhooks, tenancy isolation, MCP surfaces, agent guardrails. (`/security-review`)
- Observability: Workers analytics/logs, error tracking, Stripe reconciliation, agent eval dashboards; key metrics from ADR-0004 (GMV, take-rate, leakage, planner MRR, per-couple cost).
- Performance: Core Web Vitals on public pages; D1 query review; cache strategy for planner pages.
- Legal/ops: ToS (incl. gating-rule framing), privacy policy, payout/tax (1099-K) handling, refund/dispute runbooks.
- Accessibility pass on app + public site.

**Exit:** GA checklist signed off. **(all ADRs)**

---

## Parallelization notes

- **Web/SEO track** (ADR-0003) can start in Phase 1 against seed data while the app is wired up.
- **Agent track** (ADR-0006) depends on the tool layer but its widget contract can be extracted in Phase 1.
- **Payments** (ADR-0008) is the long pole for legal/compliance — start Connect onboarding research early in Phase 1.

## Risk register (top items)

| Risk | ADR | Mitigation |
|---|---|---|
| D1 size/throughput limits | 0001, 0009 | Narrow tables, R2 for blobs, Vectorize for search, partition plan ready |
| Workers AI reasoning ceiling | 0006 | Small typed tools, strong retrieval, eval set, model-routing seam |
| Marketplace leakage | 0004 | Payment-link gating rule, measure leakage rate, benefit-framed UX |
| Auth/payments security (self-hosted) | 0005, 0008 | Pre-GA security review, restricted keys, idempotent webhooks |
| Tenancy data leak | 0009 | Centralized guard + tests, included in security review |
