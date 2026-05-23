# ADR-0004: Monetization & marketplace model

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** product, business, payments

## Context

We need a monetization model that funds the platform without putting a paywall in front of couples (who provide the demand and the viral, word-of-mouth, SEO-generating content). The prototype already implies a planner-mediated relationship ("your planner reviews your inquiry"). The founder's stated model blends three motions, so this ADR records the pros/cons of the three "pure" motions and then the **hybrid** we are actually building.

## Decision

We will build a **three-sided hybrid: free for couples, SaaS for planners, take-rate on payments and vendor sign-ups.** Concretely:

1. **Couples — free.** Sign up, plan, browse planner profiles, browse/contact vendors. No paywall.
2. **Vendor sign-up commission.** When a couple signs up / books a **vendor** through VowTrack, we charge a **percentage of that vendor sign-up** (referral take-rate).
3. **Planner SaaS — per active couple.** Planners create and maintain public profiles (designs, packages, vendors) and manage their couples in-app. We charge planners a **low monthly fee per managed couple**.
4. **Payment take-rate.** When a couple pays a planner or vendor **through our payment link**, we take a **percentage** of that transaction.
5. **The gating rule.** Couples are free, **but a couple is only assigned/matched to a wedding planner if they transact through our payment links.** "Use our rails → get the planner relationship and concierge orchestration." This is the incentive that pulls GMV onto the platform instead of off-platform.

This makes Stripe Connect the financial backbone ([ADR-0008](0008-payments-stripe-connect.md)): planners and vendors are connected accounts; platform application fees implement the take-rates; planner subscriptions are metered per active couple.

## Options considered

### Option A — Pure B2C (charge couples a subscription / one-time fee)
- **Pros:** Simple billing; direct relationship with the end user; predictable per-user revenue.
- **Cons:** A paywall throttles the top of funnel exactly where we want virality and SEO; couples plan one wedding once — low LTV, no retention; competes with free incumbents (The Knot, Zola) on price. **Rejected as the primary motion** — but note couples remaining free is itself the growth engine.

### Option B — Pure B2B (sell software to planners only)
- **Pros:** Planners are repeat, paying, retained customers (many weddings/year) → real LTV and predictable MRR; smaller, reachable audience to sell to; classic SaaS metrics.
- **Cons:** Ignores the couple-side demand and the consumer SEO/AIEO flywheel; planner-only TAM is limited; nothing monetizes the couples who self-serve without a planner. **Rejected as the *only* motion**, but the planner SaaS fee is a core pillar of the hybrid.

### Option C — Pure marketplace / lead-gen (take-rate on vendors only)
- **Pros:** Aligns revenue with value delivered (GMV); no friction for either side to start; scales with transaction volume.
- **Cons:** Marketplace leakage is the killer — couples and vendors can transact off-platform after meeting; needs liquidity on both sides before it pays; revenue is lumpy. **Rejected as the only motion**, but vendor commission + payment take-rate are pillars of the hybrid.

### Option D — Three-sided hybrid (chosen)
Free couples (demand + virality + SEO) → planner SaaS (retained MRR) → vendor commission + payment take-rate (GMV upside), with the **payment-link gating rule** to fight leakage.
- **Pros:** Diversified revenue across three pillars; no couple paywall preserves the growth flywheel; the gating rule (planner match requires using our rails) directly counters marketplace leakage; planner SaaS gives predictable MRR while take-rates give GMV upside; each side reinforces the others (delighted couples attract planners; planners bring vendors and GMV).
- **Cons:** Most complex to build and explain; requires Stripe Connect + metered billing + commission accounting from early on; the gating rule must feel like a *benefit* ("pay through VowTrack to unlock your dedicated planner & concierge"), not a hostage situation, or it creates resentment; we must measure leakage and unit economics carefully.

## Consequences

- **Positive:** We capture value from whichever behavior a user exhibits — self-serve couple, planner-led couple, or vendor transaction — without taxing entry. Clear path from free → monetized.
- **Negative / trade-offs:** Billing/accounting complexity lands in Phase 2, not later (Stripe Connect, application fees, metered subscriptions, payout/refund/dispute flows). We must instrument **take-rate %, GMV, leakage rate, planner MRR, and per-couple cost** as first-class metrics. The gating rule needs careful, benefit-framed UX and legal/ToS clarity.
- **Open questions — owned by a dedicated ADR, not decided here:** the exact percentages (vendor commission %, payment take-rate %, planner per-couple fee), whether vendor commission is one-time or recurring, and refund/chargeback/tax handling are **deferred to [ADR-0010](0010-design-partner-beta-and-pricing-discovery.md)** (the design-partner beta that discovers these from real data) and its follow-up **ADR-0011: Pricing** (where the numbers are recorded). This ADR sets the *model and shape*; ADR-0010/0011 set the *numbers*.
- **Follow-ups:** [ADR-0010](0010-design-partner-beta-and-pricing-discovery.md) (free-12-month planner beta + pricing-discovery process), [ADR-0008](0008-payments-stripe-connect.md) (Stripe Connect mechanics), [ADR-0009](0009-data-model-and-multitenancy.md) (modeling planner↔couple↔vendor↔transaction), [GTM plan](../GTM_PLAN.md) (pricing page & messaging).

<!-- @doc-review-state
{
  "version": 1,
  "threads": [
    {
      "id": "819b7364-5784-4615-a617-b13b1890b865",
      "line": 46,
      "author": "upagupta2003",
      "body": "lets create a separate ADR, to decide on this. We will also launch it as beta for few planners for free for 1 year to use this service and identify any gaps.",
      "createdAt": "2026-05-23T22:46:31.305Z",
      "responses": [
        {
          "author": "claude",
          "body": "Created ADR-0010 (Design-partner beta & pricing discovery): recruit 8–15 planners free for 12 months as design partners to set pricing and surface product gaps over a full wedding cycle. Note payment take-rate + vendor commission still apply during beta (only the SaaS subscription is waived) so the money plumbing and gating rule are exercised live. This ADR-0004 now defers the numbers to ADR-0010 and a follow-up ADR-0011: Pricing.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "- **Negative / trade-offs:** Billing/accounting complexity lands in Phase 2, not later (Stripe Connect, application fees"
    },
    {
      "id": "990808a3-0df6-44fc-8aa8-346424cb24d5",
      "line": 47,
      "author": "upagupta2003",
      "body": "Separate adr with explaination of process to involve some initial wedding planners to figure out the pricing.",
      "createdAt": "2026-05-23T22:47:56.355Z",
      "responses": [
        {
          "author": "claude",
          "body": "ADR-0010 documents the full process: recruit a segment-diverse cohort, instrument the ADR-0004 metrics + a gap log from day one, biweekly check-ins, pricing interviews at months 3 and 6 (validate the 'per active couple' value metric + willingness-to-pay), a decision gate at ~month 6–9 that writes ADR-0011: Pricing, and a free→paid conversion plan (grandfather rate) at month 12.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "- **Open questions to resolve before GA (not blockers for the ADR):** exact percentages (vendor commission %, payment ta"
    }
  ]
}
@end-doc-review-state -->
