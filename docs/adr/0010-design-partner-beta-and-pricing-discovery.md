# ADR-0010: Design-partner beta & pricing discovery

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** business, product, gtm, pricing

## Context

[ADR-0004](0004-monetization-marketplace-model.md) commits us to a three-sided hybrid (free couples, planner SaaS per couple, vendor commission, payment take-rate) but deliberately leaves the **actual numbers open**: the planner per-couple fee, the payment take-rate %, the vendor commission % (and whether it's one-time or recurring), plus refund/chargeback/tax handling. Setting these from a spreadsheet, before we have a single real planner running a real wedding on the platform, would be guessing. We also don't yet know where the product has gaps that only show up in real planner/vendor workflows.

We need a structured way to (a) discover pricing the market will bear and (b) surface product gaps — before we harden billing and publish a pricing page.

## Decision

We will run a **design-partner beta**: recruit a small cohort of wedding planners to use VowTrack **free for their first 12 months**, in exchange for working with us as design partners to set pricing and find gaps. This ADR owns the **process**; the final numbers it produces will be recorded in a follow-up ADR (**ADR-0011: Pricing**) and reflected in the [GTM pricing page](../GTM_PLAN.md).

### Who and how many
- **8–15 wedding planners**, hand-recruited, spanning a range of book sizes (solo planners → small studios) and price tiers (budget → luxury) so pricing signal isn't skewed to one segment.
- Optionally a handful of their **vendors**, so we also observe the vendor-commission flow end-to-end.

### The offer (to planners)
- **Free for 12 months:** no per-couple SaaS fee for the beta period.
- In return: regular feedback, willingness to run **real couples and real payments through our rails** (so we observe GMV, take-rate mechanics, and leakage for real), a public planner profile, and a testimonial/case study if it goes well.
- **Important:** the **payment take-rate and vendor commission still apply during beta** (these are transaction economics we must observe live and which fund Stripe costs). Only the planner *subscription* is waived. This keeps the gating rule ([ADR-0004](0004-monetization-marketplace-model.md)) and the money plumbing exercised from day one — the beta is free on the SaaS line, not a payments-off sandbox.
- 12 months gives planners a **full wedding cycle** (most weddings are booked 9–14 months out), so we see the entire booking→planning→pay→wedding lifecycle before asking them to pay.

### The process
1. **Recruit & onboard** the cohort; set explicit expectations (feedback cadence, free period end date, what happens after).
2. **Instrument everything** — the ADR-0004 metrics from day one: GMV, blended take-rate, leakage rate, per-couple cost-to-serve, planner activation/retention, concierge action-completion. Plus a running **gap log** of missing features/friction.
3. **Cadence:** lightweight biweekly check-ins + a shared gap log; a deeper pricing interview at ~month 3 and ~month 6 (willingness-to-pay, value-metric validation: is "per active couple" the right meter? what would they happily pay? what feels punitive?).
4. **Pricing experiments:** test the *value metric* and rough price points in conversation and via soft commitments ("would you pay $X/couple/mo?") rather than live price changes during the free period.
5. **Decision gate (≈ month 6–9):** with real GMV + willingness-to-pay data, set the launch numbers → write **ADR-0011: Pricing**, build the pricing page, and define the **conversion plan** for beta planners (e.g., grandfathered/discounted rate as a thank-you when their free year ends).
6. **Graduate the beta** at month 12: planners convert to paid (with their grandfather rate); learnings roll into GA.

### Guardrails / what could go wrong
- **Cost exposure:** free SaaS for ≤15 planners is a bounded, affordable cost; payment take-rate during beta offsets Stripe fees. Cap the cohort size.
- **Anchoring low:** a free year can anchor planners to "free" — mitigate by being explicit up front that it's a 12-month design-partner program with paid conversion, and by validating willingness-to-pay early.
- **Unrepresentative signal:** mitigate via segment diversity in recruiting; don't over-index on a single enthusiastic planner.

## Options considered

### Option A — Design-partner beta, free 12 months, then ADR-0011 sets prices (chosen)
- **Pros:** Prices are grounded in real GMV and real willingness-to-pay, not guesses; a full wedding cycle surfaces product gaps before GA; creates founding-customer goodwill, testimonials, and seed content for the planner directory; exercises payments/gating live (only the subscription is waived).
- **Cons:** Delays locked pricing 6–12 months; risk of anchoring planners to free; some operational overhead running the cohort; bounded free-SaaS cost.

### Option B — Set prices now from market comps / a model, launch paid immediately
- **Pros:** Fastest to revenue; simple.
- **Cons:** High chance of mispricing the novel value metric (per-couple + take-rate hybrid has no clean comp); no early signal on product gaps; harder to recruit early planners with no proof and full price. Rejected — we'd be guessing on the thing this ADR exists to learn.

### Option C — Paid beta at a steep discount (e.g., 50% off) instead of free
- **Pros:** Tests real willingness-to-pay with actual money; less anchoring to free.
- **Cons:** Much harder to recruit the founding cohort with zero track record; a discount off an unknown number is still a guess. Rejected for the *initial* cohort; the month-6 pricing experiments effectively cover the willingness-to-pay question.

## Consequences

- **Positive:** Launch pricing is evidence-based; product gaps are found in real workflows pre-GA; founding planners become advocates and supply directory content; payments/gating are battle-tested early.
- **Negative / trade-offs:** Locked pricing and the pricing page wait on this program; we carry a small free-SaaS cost and the operational load of running design partners; we must manage the free→paid conversion carefully to avoid churn at month 12.
- **Follow-ups:** **ADR-0011: Pricing** (the numbers, written at the decision gate); recruit cohort + stand up the metrics/gap-log instrumentation (ties to [roadmap](../PRODUCTION_ROADMAP.md) Phase 2 and the [GTM private-beta step](../GTM_PLAN.md)); define beta-planner conversion/grandfather terms.
