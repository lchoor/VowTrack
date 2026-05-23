# VowTrack Go-To-Market Plan

How we acquire the three sides of the marketplace and what we put in front of them — including the landing/marketing site. Grounded in the monetization model ([ADR-0004](adr/0004-monetization-marketplace-model.md)) and the SEO/AIEO discovery strategy ([ADR-0003](adr/0003-marketing-and-discovery-astro-mdx.md), [ADR-0007](adr/0007-mcp-server.md)).

## Positioning

**VowTrack is the agent-native wedding platform.** Couples plan for free with an AI concierge (Elsie) that doesn't just advise — she *does*: opens the right screen, drafts the vows, adjusts the timeline, lines up the proposal. Planners get a profile that gets them *found* (by people and by AI) plus a CRM to run every couple. Vendors get qualified couples.

**One-liner:** *"Plan your wedding with an AI concierge that actually does the work — and find the planner who'll make it real."*

**Why we win now:** incumbents (The Knot, Zola, Aisle Planner) are directories + checklists. We are (1) genuinely agent-native — Elsie takes action via generative UI; (2) discoverable *by AI assistants themselves* via our MCP server, a channel incumbents don't have; (3) a real three-sided marketplace aligning couples, planners, and vendors.

## The flywheel

```
Free couples (great UX + SEO/AIEO content)
   │  delight + share wedding sites/guides → more couples
   ▼
Planner demand (couples want a planner) → planners create profiles (SaaS) 
   │  planners bring vendors + GMV onto our rails (gating rule)
   ▼
Vendor commission + payment take-rate → funds growth → better product → more couples
```

The free couple tier is the top of the funnel **and** the SEO/AIEO content engine. The gating rule ([ADR-0004](adr/0004-monetization-marketplace-model.md)) pulls GMV onto our rails.

## Audiences & channels

| Side | Acquire via | Hook |
|---|---|---|
| **Couples** | Organic SEO (planning guides, checklists, tools), AIEO (cited by ChatGPT/Claude/Perplexity), the free concierge, shareable wedding tools, social/Pinterest | "Plan free with an AI concierge that does the work." |
| **Planners** | Planner directory SEO (their profile gets them found), outbound to planner communities, low per-couple price, "get discovered by AI" pitch | "A profile people and AI assistants find — plus a CRM per couple." |
| **Vendors** | Planner referrals, category landing pages, commission-only (no upfront) | "Qualified couples, pay only on sign-up." |

## The landing / marketing site (Astro + MDX)

Built per [ADR-0003](adr/0003-marketing-and-discovery-astro-mdx.md). Reuse the prototype's visual language (warm `#FAF7F2`, navy/gold, serif headings) so brand carries from marketing → app.

### Page map (launch)

- **`/` Home** — hero (the one-liner + concierge demo), the flywheel value props for each side, social proof, primary CTA "Start planning free," secondary "I'm a planner."
- **`/planners` Directory** — searchable/filterable (location, style, budget, guest count). **SSR**, the core SEO/AIEO asset. `ItemList` JSON-LD.
- **`/planners/:slug` Profile** — bio, packages, portfolio, reviews, availability, "Work with me" CTA. **SSR**, rich JSON-LD (`LocalBusiness`/`Service`/`Offer`/`Review`). This is what ranks and what the MCP serves.
- **`/for-planners`** — value prop + pricing (per-couple SaaS), "Claim your profile" CTA.
- **`/for-vendors`** — commission-only pitch, category examples.
- **`/pricing`** — free for couples; planner per-couple fee; transparent take-rate framing.
- **`/guides/*` (MDX)** — SEO/AIEO content engine: "How much does a wedding planner cost," "Wedding timeline template," "Boho wedding ideas," region pages. `FAQPage`/`HowTo` schema, lead with quotable answers.
- **`/about`, `/contact`, legal** (privacy, ToS incl. gating-rule framing).
- **`/llms.txt`, `/llms-full.txt`, `/sitemap.xml`, `/robots.txt`** — machine discovery.

### SEO + AIEO checklist (launch)

- Per-page meta/OG/canonical; auto sitemap incl. every planner; clean slugs.
- JSON-LD on every planner + guide; directory emits `ItemList`/`BreadcrumbList`.
- `llms.txt` + public planner data feed + public discovery MCP listed in registries ([ADR-0007](adr/0007-mcp-server.md)).
- Top Core Web Vitals (Astro islands → minimal JS).
- Content cadence: ship the 15–20 highest-intent guides + top metro planner-cost pages before launch; weekly thereafter.

## Pricing (placeholders — finalize per [ADR-0004](adr/0004-monetization-marketplace-model.md))

- **Couples:** free.
- **Planners:** low monthly fee **per active managed couple** (e.g., $X/couple/mo) — scales with their book of business, no big upfront. (Design-partner cohort: free for 12 months — [ADR-0010](adr/0010-design-partner-beta-and-pricing-discovery.md).)
- **Payment take-rate:** **Y%** on couple→planner/vendor payments made through our link.
- **Vendor sign-up commission:** **Z%** of the vendor sign-up.

> Exact X/Y/Z, one-time vs. recurring vendor commission, and refund/chargeback handling are **discovered via the [ADR-0010](adr/0010-design-partner-beta-and-pricing-discovery.md) design-partner beta and recorded in ADR-0011: Pricing** — set before the pricing page goes live.

## Launch sequence

1. **Design-partner beta** ([ADR-0010](adr/0010-design-partner-beta-and-pricing-discovery.md)) — hand-recruit **8–15 planners free for 12 months** as design partners with real profiles → gives the directory content + real GMV to test the gating rule and Stripe Connect, and to **discover pricing** (payment take-rate + vendor commission still apply; only the SaaS fee is waived). Invite couples to those planners. Final numbers land in **ADR-0011: Pricing**.
2. **AIEO/SEO seeding** — publish guides + metro pages, submit sitemap, list public MCP in registries, verify JSON-LD renders in rich results & that assistants can cite/find planners.
3. **Public launch** — Product Hunt + wedding/planner communities; lead with "agent-native" + "found by AI" differentiation; concierge demo video.
4. **Iterate on metrics** — GMV, take-rate, leakage rate, planner MRR, per-couple cost, couple activation, concierge action-completion rate.

## North-star & guardrail metrics

- **North star:** GMV flowing through VowTrack rails (proves the gating rule + marketplace work).
- **Growth:** couple sign-ups, organic + AI-referred traffic to `/planners`, planner profiles created.
- **Monetization:** planner MRR, take-rate revenue, vendor commission, blended take-rate.
- **Health:** leakage rate (off-platform transactions after match), couple activation, concierge action-completion rate, planner retention.

## 90-day GTM priorities

1. Stand up the Astro public site + planner directory with seed profiles and full SEO/AIEO (ties to roadmap Phases 2 & web track).
2. Recruit the private-beta planner cohort; get real GMV through Stripe Connect.
3. Publish the launch content set; verify AI assistants can discover planners via MCP/`llms.txt`.
4. Public launch once concierge actions + payment gating are reliable.
