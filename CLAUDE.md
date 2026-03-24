# Development Guidelines

## Engineering Standards

- **TDD always:** Write tests first. No implementation code without a failing test driving it.
- **Design patterns:** Actively apply patterns (Strategy, Repository, Factory, Builder, etc.) wherever they improve clarity and maintainability. Name them explicitly in code comments when used.
- **Latest packages only:** Always use the latest stable versions of every dependency. Never use deprecated APIs, options, or patterns — check changelogs and migration guides.
- **Quality over speed:** Prefer clean, well-structured code. Refactor as you go. Leave the codebase better than you found it.
- **Never co-sign commits:** Do not add `Co-Authored-By` or any Claude/AI attribution to commit messages.

---

# Implementation State

## Phase 0 — Status: Complete

### Tech Stack

| Concern | Choice | Reason |
|---|---|---|
| Language | TypeScript | Shared types between CLI and future Next.js web app |
| Monorepo | pnpm workspaces + Turborepo 2.x | Manages `@clrposture/core` and `@clrposture/cli` as separate packages |
| Schema validation | Zod 3.x | Runtime validation + static type inference from a single source |
| Testing | Vitest 3.x | Fast, native ESM support, compatible with Node 22 |
| CLI framework | Commander 13.x + @inquirer/prompts 7.x | Clean command definition + interactive prompts |
| Module system | ESM (`"type": "module"`) | No CJS dual-build complexity |
| Node target | 22+ | Latest LTS, required by ESM + `node:crypto` randomUUID |

### Package Structure

```
packages/
├── core/                        @clrposture/core (published to npm)
│   └── src/
│       ├── schema/index.ts      Zod schemas: Tier, FunctionId, Subcategory, Answer,
│       │                        Profile, Assessment, Gap, GapReport
│       ├── data/csf.ts          Full NIST CSF 2.0 question bank — all 6 functions,
│       │                        22 categories, 106 subcategories, plain-language
│       │                        questions with 4 tier descriptions each
│       ├── engine/
│       │   ├── scorer.ts        Scorer class — Strategy pattern (ScoringStrategy
│       │   │                    interface, AverageScoringStrategy default).
│       │   │                    Computes per-function tier averages from answers.
│       │   └── gap-analyzer.ts  GapAnalyzer class — diffs current answers against
│       │                        a target Profile. Returns GapReport with gaps sorted
│       │                        by delta and a RemediationPlan bucketed by time horizon.
│       ├── profiles/
│       │   ├── federal-contractor.ts  EO 14144, supply chain + identity elevated
│       │   ├── dib.ts                 CMMC 2.0 Level 2/3, broadly Tier 4, CUI-focused
│       │   ├── healthcare.ts          HIPAA, PHI protection + access control elevated
│       │   ├── fintech.ts             SOC 2 / PCI DSS, auth + data security elevated
│       │   └── mssp.ts                Neutral Tier 2–3 baseline for client assessments
│       ├── export/csv.ts        gapReportToCsv() — serializes GapReport to CSV,
       │                        one row per gap, pipe-separated steps column
       └── index.ts             Public API — re-exports everything above
└── cli/                         @clrposture/cli (binary: clrposture)
    └── src/
        ├── commands/assess.ts   Interactive assessment command — prompts through all
        │                        106 subcategories, prints gap report, saves to JSON
        │                        or CSV via --output / --format flags
        └── index.ts             Commander entrypoint — `clrposture assess`
```

### Design Patterns Applied

- **Strategy** — `ScoringStrategy` interface in `scorer.ts`. Swap `AverageScoringStrategy` for weighted, median, or minimum scoring without modifying `Scorer`.
- **Single Responsibility** — `Scorer` owns math only. `GapAnalyzer` owns comparison only. Data is pure data with no behaviour.
- **Open/Closed** — `Scorer` is open for extension (new strategies) and closed for modification.
- **Builder** — `buildRemediationPlan` inside `GapAnalyzer` constructs `RemediationPlan` step by step: gaps → time-horizon buckets → weakestFunction identification.

### Test Coverage

52 tests across 5 suites, all passing:
- `schema/__tests__/schema.test.ts` — Zod schema validation (valid + invalid inputs for every type)
- `engine/__tests__/scorer.test.ts` — scoring accuracy, edge cases, unknown IDs, empty input
- `engine/__tests__/gap-analyzer.test.ts` — delta calculation, sort order, function summaries, partial answers
- `engine/__tests__/remediation-planner.test.ts` — bucket assignment, step slicing, weakestFunction, sort order
- `export/__tests__/csv.test.ts` — CSV formatting, bucket labels, pipe-separated steps, quote escaping

### Key Decisions Made

- **TypeScript over Python** — chosen for type sharing between CLI and future Next.js web app (Phase 1). The question bank types, Zod schemas, and scoring logic are all reusable in the browser without any porting.
- **Energy profile dropped** — replaced with `federal-contractor`, `dib`, and `mssp`. Energy (NERC CIP) is too niche for an SME tool at launch. Federal contractor and DIB reflect the highest current compliance pressure (EO 14144, CMMC 2.0).
- **MSSP profile added** — Tier 2–3 neutral baseline. MSSPs are the primary distribution channel and need a profile that works before industry is known.
- **106 subcategories** — all real NIST CSF 2.0 identifiers, mapped to plain-language questions with four tier descriptions each. No subcategories stubbed or omitted.
- **GapReport sorted by delta descending** — highest-priority gaps (largest distance from target) appear first. This drives the remediation roadmap in Phase 3.
- **Stepped remediations (`stepRemediations`)** — each subcategory carries three incremental remediation strings, one per tier transition (1→2, 2→3, 3→4). `GapAnalyzer` slices the relevant steps for each gap (`stepRemediations.slice(currentTier - 1, targetTier - 1)`), so a Tier 1→4 gap surfaces all three steps and a Tier 2→3 gap surfaces only one. This replaces a single generic remediation string.
- **Remediation time-horizon buckets** — gaps are sorted into `immediate` (delta ≥ 3), `shortTerm` (delta = 2), and `strategic` (delta = 1) in the `RemediationPlan`. CLI renders each bucket with numbered steps per item.
- **CSV export** — `gapReportToCsv()` in `export/csv.ts`. One row per gap, columns: `subcategoryId`, `currentTier`, `targetTier`, `delta`, `bucket`, `steps` (pipe-separated, always quoted). CLI auto-detects CSV from `.csv` extension or `--format csv` flag.
- **Project name** — renamed from ClearPosture to **Clrposture** (dropped vowels, Flickr/Tumblr pattern). GitHub org: `clrposture`. npm scope: `@clrposture`. Binary: `clrposture`.
- **GitHub repo** — https://github.com/clrposture/clrposture-core. Branch protection on `main`: CI must pass, no force pushes, no deletions, linear history. No review requirement (solo project).
- **npm** — `@clrposture/core` published. `@clrposture/cli` is repo-only. Publishing automated via `.github/workflows/publish.yml` triggered on `v*` tags using npm Automation token stored as `NPM_TOKEN` secret.
- **Regulatory references** — README includes a Regulatory Context table linking to NIST CSF 2.0 (DOI), EO 14144 (Federal Register), CMMC 2.0 + DFARS 252.204-7012 (DoD/eCFR), HIPAA Security Rule (HHS), SOC 2 (AICPA), PCI DSS. Supports NIW national importance documentation.

---

# Clrposture — Product Definition

**Tagline:** NIST CSF 2.0 Compliance for SMEs — Simple, Affordable, Actionable.

---

## The Problem

NIST CSF 2.0 (released February 2024) is the U.S. government's primary cybersecurity guidance framework. Federal contractors, healthcare organizations, energy companies, and financial services firms are increasingly required or pressured to align with it.

**The gap:** Enterprise GRC tools (ServiceNow, OneTrust, Archer) cost $2,000–$10,000+/month. The alternative is a spreadsheet. SMEs are left unprotected and non-compliant — not because they don't care, but because no affordable, practical tool exists.

---

## Target Users

| Segment | Why They Need It |
|---|---|
| SMEs selling to federal government | EO 14144 / federal procurement pressure |
| Healthcare SMEs | HIPAA + NIST alignment requirements |
| Fintech startups | SOC 2, PCI, investor due diligence |
| Energy sector SMEs | Critical infrastructure compliance |
| IT consultants / MSSPs | Need a tool to assess their clients |

---

## Architecture: Open Core

```
┌─────────────────────────────────┐
│         OPEN SOURCE             │
│  Assessment engine              │
│  CSF 2.0 question bank          │
│  Scoring logic                  │
│  Gap analysis algorithm         │
│  JSON/CSV export                │
│  CLI tool                       │
└─────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────┐
│      SAAS PLATFORM (paid)       │
│  Hosted web app                 │
│  Multi-user / team access       │
│  Progress tracking over time    │
│  Industry benchmarking          │
│  Remediation roadmap            │
│  PDF compliance reports         │
│  Integrations (Jira, Slack)     │
│  MSSP multi-tenant dashboard    │
└─────────────────────────────────┘
```

---

## Releases

---

### Phase 0 — Open Source Core (CLI + Library)
**Goal:** Establish GitHub presence. Lay the foundation everything else builds on.

**Deliverables:**
- Full NIST CSF 2.0 question bank (all 6 functions, ~106 subcategories)
- Plain-language questions mapped to each subcategory (no NIST jargon)
- Tier scoring engine (Tiers 1–4) per function
- Current Profile vs. Target Profile gap analysis
- Industry profiles: federal-contractor, dib, healthcare, fintech, mssp (pre-configured target profiles)
- JSON and CSV output
- MIT license, public GitHub repo
- README with usage examples and contribution guide

**Success metrics:**
- Repo is public and installable via npm
- At least one industry profile ships at launch
- CI/CD pipeline in place

---

### Phase 1 — MVP Web App (Free, No Auth)
**Goal:** Any SME owner can complete an assessment and get a gap report in under 30 minutes, no account required.

**Deliverables:**
- Web UI walking through all 6 CSF 2.0 functions
- Plain-language questions (powered by Phase 0 engine)
- Automatic tier scoring per function
- Gap analysis results page
- Exportable PDF report
- Email capture for follow-up / SaaS conversion
- PostHog analytics (privacy-friendly, open source)
- Deploy to Vercel or similar

**Stack:**
- Frontend: Next.js + Tailwind
- Backend: Supabase (DB + storage) or serverless functions
- PDF: React PDF or Puppeteer
- Analytics: PostHog

**Success metrics:**
- 100 assessments completed
- Email capture rate > 20%
- Assessment completion rate > 60%

---

### Phase 2 — SaaS Free Tier (Auth + Persistence)
**Goal:** Users can create accounts, save assessments, and return over time.

**Deliverables:**
- User authentication (email + Google OAuth)
- Organization profile (name, industry, size)
- Assessment history — view past results
- Basic dashboard showing current tier per function
- Shareable assessment link (read-only, for consultants)

**Success metrics:**
- 300 registered organizations
- 40% of users return for a second assessment
- 3+ industries represented in user base

---

### Phase 3 — Pro Tier ($49/month)
**Goal:** Turn power users and consultants into paying customers.

**Deliverables:**
- Progress tracking over time (tier improvement graphs)
- Remediation roadmap with prioritized action items
- Team access (up to 5 users per organization)
- Industry benchmarking (anonymized aggregate data — "you score higher than 60% of fintech SMEs")
- Jira / Linear integration (auto-create tickets from identified gaps)
- Branded PDF reports

**Success metrics:**
- 50 paying Pro customers
- MRR: $2,500+
- Churn < 10% monthly

---

### Phase 4 — MSSP / Consultant Tier ($199/month)
**Goal:** Make IT consultants and MSSPs a distribution channel.

**Deliverables:**
- Multi-tenant dashboard (manage multiple client organizations)
- White-label reports (consultant's branding)
- Client-facing portal (clients see their own results, consultant sees all)
- Bulk assessment templates
- Priority support SLA
- Usage analytics per client

**Success metrics:**
- 25 MSSP/consultant accounts
- Each managing average 5+ client organizations
- MRR: $5,000+

---

### Phase 5 — Integrations & Ecosystem
**Goal:** Embed Clrposture into existing security and dev workflows.

**Deliverables:**
- Slack app (assessment reminders, gap alerts)
- GitHub Action (trigger reassessment on infra changes)
- API (public, documented) for third-party integrations
- Zapier / Make connector
- SBOM integration (connect supply chain risk to GOVERN function gaps)

**Success metrics:**
- 100+ API keys issued
- 3+ third-party integrations built by community

---

## Impact Metrics (NIW-Oriented)

Track these from day one — they map directly to national importance arguments:

| Metric | Why It Matters |
|---|---|
| Assessments completed | National reach across SMEs |
| Industries represented | Coverage of critical sectors |
| GitHub stars / forks | Community adoption |
| Critical gaps identified (aggregate) | Systemic risk exposure documented |
| SMEs that improved tier score | Measurable security outcomes |
| Consultants using the tool | Multiplier effect |
| U.S. states represented | Geographic national distribution |
| Government entities using open source | Direct federal alignment |

---

## Notes

- Open source CLI ships first — establishes GitHub presence before any SaaS work begins.
- Analytics are instrumented from Phase 1 — every assessment is a data point.
- The MSSP tier is the most important for distribution — consultants bring their entire client base.
- Phase 5 SBOM integration creates a natural bridge to a future standalone SBOM product.
