# ADR-0005: Authentication & identity — Better Auth on D1

- **Status:** Accepted
- **Date:** 2026-05-23
- **Deciders:** Founding team
- **Tags:** auth, platform, security

## Context

We have multiple identity types — **couples** (free consumers, often two partners sharing one wedding), **planners** (pros who own a public profile and manage many couples), and later **vendors** and **admins**. We need email/password + social login, sessions that work across the Astro public site and the React app on one domain, organization/team semantics (a planner "org" with collaborators; a couple "household" with two partners and view-only family), and we want to **own the user data in D1** with no per-MAU fee as couples scale.

## Decision

We will use **Better Auth**, self-hosted in a Cloudflare Worker with its **D1 adapter** for persistence and **KV** for session/rate-limit storage where appropriate.

- **Methods at launch:** email/password (with verification + reset via Cloudflare Email), Google OAuth, Apple OAuth.
- **Sessions:** secure, httpOnly cookies scoped to the apex domain so both the Astro site (`/`) and the React app (`/app`) share auth on one origin ([ADR-0002](0002-app-architecture-and-rendering.md)).
- **Organizations/teams:** use Better Auth's organization plugin to model **planner orgs** (planner + collaborators with roles) and **couple households** (two partners + invited view-only family). Roles: `owner`, `member`, `viewer`, plus platform `admin`.
- **Authorization:** role + tenancy checks enforced in the Workers API layer against the org/household membership; see [ADR-0009](0009-data-model-and-multitenancy.md).
- **Platform admin (VowTrack staff):** a dedicated `admin` role with its own staff login (username/password via Better Auth, **not** social), used by an internal **Admin Console** to resolve issues on behalf of planners and vendors from the UI — e.g., fix a broken profile, unblock a stuck Stripe Connect onboarding, correct a mismatched couple↔planner assignment, issue a refund/credit, or impersonate-for-support with consent. Requirements for this role:
  - **Extra protection:** the Admin Console sits behind **Cloudflare Access / Zero Trust** (Option D below) *in addition to* the Better Auth staff login — defense in depth, since admins can act across tenants.
  - **Mandatory step-up:** admin accounts require 2FA; sensitive actions (refunds, impersonation, data edits on a tenant) require re-auth / step-up.
  - **Full audit:** every admin action is written to `audit_log` ([ADR-0009](0009-data-model-and-multitenancy.md)) with actor, target tenant, action, and reason — admin power is the one place we deliberately break tenant isolation, so it must be the most observable.

## Options considered

### Option A — Better Auth on D1 (chosen)
- **Pros:** Open source, no per-MAU cost (critical when couples sign up free and in volume); data lives in our D1 next to domain data (simple joins, full ownership, no export friction); runs in Workers; first-class orgs/teams plugin matches our planner/couple model; full control of flows and emails.
- **Cons:** We operate it — email deliverability, session security, account-recovery edge cases, and OAuth app management are on us; less hand-holding than a managed vendor; we must keep the library and our integration patched.

### Option B — Clerk
- **Pros:** Fastest to ship; polished UI; orgs built in.
- **Cons:** Per-MAU pricing scales painfully with a free-couple model; identity data lives outside D1 (sync/export friction); another vendor. Rejected primarily on the free-at-scale cost model.

### Option C — WorkOS
- **Pros:** Excellent B2B/SSO for planner enterprises.
- **Cons:** B2B-priced and B2B-shaped; overkill and costly for a consumer-heavy base at launch. Revisit if we move upmarket to planner enterprises.

### Option D — Cloudflare Access / Zero Trust
- **Pros:** CF-native, great for internal/admin gating.
- **Cons:** Not a consumer identity product. We may still use it to protect internal admin tools, but not for couples/planners. Rejected as the primary IdP.

## Consequences

- **Positive:** Zero marginal auth cost as the free-couple base grows; identity co-located with domain data in D1; tenancy/teams map cleanly to product concepts; no vendor lock-in on identity.
- **Negative / trade-offs:** We own auth security and deliverability as an operational responsibility — budget for a security review of auth flows before GA, set up SPF/DKIM/DMARC for transactional email, and add monitoring for auth failures/abuse.
- **Follow-ups:** Configure Cloudflare Email for verification/reset; security-review auth + session handling pre-GA; define the role/permission matrix in [ADR-0009](0009-data-model-and-multitenancy.md).

<!-- @doc-review-state
{
  "version": 1,
  "threads": [
    {
      "id": "ac1da7e7-dfc6-4a46-8821-103aeb34776a",
      "line": 23,
      "author": "upagupta2003",
      "body": "We also need to add our own admin username / password to resolve some issues for wedding planners and vendors from UI.",
      "createdAt": "2026-05-23T22:49:09.727Z",
      "responses": [
        {
          "author": "claude",
          "body": "Added a 'Platform admin (VowTrack staff)' bullet to the Decision: a dedicated admin role with its own username/password staff login powering an internal Admin Console to fix planner/vendor issues from the UI (broken profiles, stuck Stripe onboarding, bad assignments, refunds, consented impersonation). Hardened it: behind Cloudflare Access in addition to the login, mandatory 2FA + step-up for sensitive actions, and full audit_log of every admin action since admin is the one place we cross tenant isolation.",
          "createdAt": "2026-05-23T23:10:00.000Z"
        }
      ],
      "resolved": true,
      "resolvedBy": "claude",
      "resolvedAt": "2026-05-23T23:10:00.000Z",
      "anchorText": "### Option A — Better Auth on D1 (chosen)"
    }
  ]
}
@end-doc-review-state -->
