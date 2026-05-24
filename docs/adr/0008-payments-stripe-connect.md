# ADR-0008: Payments & billing — Stripe Connect

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** payments, business, platform

## Context

The monetization model ([ADR-0004](0004-monetization-marketplace-model.md)) needs four money flows:
1. **Planner subscriptions**, metered **per active couple** (low monthly fee).
2. **Payment take-rate** when a couple pays a planner/vendor through our link.
3. **Vendor sign-up commission** when a couple signs up/books a vendor via VowTrack.
4. **Payouts** to planners and vendors, minus our platform fee.

This is a three-sided marketplace with platform fees and payouts — the canonical Stripe Connect use case. We are on Cloudflare; Stripe is API/webhook-driven and works fine from Workers.

## Decision

We will use **Stripe** as the payments provider, with **Stripe Connect** for the marketplace and **Stripe Billing** for planner subscriptions.

- **Connected accounts:** planners and vendors onboard as Connect accounts (Express/standard onboarding hosted by Stripe to offload KYC/compliance/payouts).
- **Couple payments (take-rate):** couples pay via Stripe **Checkout** / **Payment Element** through "our link"; we attach an **application fee** = our payment take-rate, routing the remainder to the connected planner/vendor (destination/separate charges + transfers). This is the technical embodiment of the [ADR-0004](0004-monetization-marketplace-model.md) **gating rule** — paying through our rails is what links a couple to a planner and triggers our fee.
- **Planner subscription (per active couple):** Stripe Billing subscription with **metered/quantity-based** pricing keyed to the planner's count of active managed couples; report usage from our Workers API.
- **Vendor sign-up commission:** recorded as an application fee on the relevant Connect charge, or invoiced via Billing where there's no immediate charge — exact mechanism per vendor deal type (one-time vs. recurring) is a config detail, not an architecture change.
- **Integration surface:** Stripe-hosted Checkout + Express onboarding to minimize our PCI/KYC burden at launch; move to embedded Payment Element later if UX demands.
- **Webhooks → Queues:** Stripe webhooks hit a Worker that validates the signature and enqueues events to **Cloudflare Queues** for reliable, idempotent processing (subscription state, payout status, dispute handling) against D1.
- **Keys & security:** restricted API keys, secrets in Workers Secrets Store, webhook signature verification, idempotency keys on all charge/transfer calls.

## Options considered

### Option A — Stripe Connect + Billing (chosen)
- **Pros:** Purpose-built for marketplaces with platform fees + payouts; Connect hosts KYC/compliance/payouts so a small team can launch legally; Billing handles metered per-couple subscriptions natively; application fees implement take-rates cleanly; mature SDK/webhooks; works from Workers.
- **Cons:** Connect has real complexity (account states, capabilities, disputes, refunds across the fee split, tax/1099); Stripe fees stack on top of our take-rate (margin consideration); we must handle webhook reliability and idempotency carefully.

### Option B — PayPal/Braintree marketplace, or Adyen
- **Pros:** Alternatives with marketplace support; Adyen strong at scale.
- **Cons:** Higher integration lift / enterprise-oriented (Adyen); weaker DX and metered-billing story than Stripe for our stage. Rejected for launch.

### Option C — Build our own ledger / direct bank rails
- **Pros:** Max control, lowest per-txn fee at huge scale.
- **Cons:** Enormous compliance/KYC/payout burden; non-starter for launch. Rejected.

## Consequences

- **Positive:** All four money flows map to first-class Stripe primitives; compliance/payouts are largely outsourced; metered planner billing is native; take-rate is a parameter, not a rebuild.
- **Negative / trade-offs:** Connect account lifecycle, refunds/chargebacks across split charges, and tax reporting (1099-K) become real operational work — own them deliberately in Phase 2/3. Stripe fees compress margin; price take-rates accordingly. Webhook processing must be idempotent (hence Queues).
- **Follow-ups:** Finalize exact percentages with [ADR-0004](0004-monetization-marketplace-model.md); model `connected_account`, `transaction`, `application_fee`, `subscription`, `payout` in [ADR-0009](0009-data-model-and-multitenancy.md); pre-GA security review of payment/webhook handling.
