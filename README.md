# Clrposture

**NIST CSF 2.0 compliance assessments for SMEs — simple, affordable, actionable.**

Enterprise GRC tools cost $2,000–$10,000/month. The alternative is a spreadsheet. Clrposture is the open source middle ground: a structured self-assessment engine built on NIST CSF 2.0 that any organization can run in under 30 minutes and get a prioritized gap report from.

---

## Regulatory context

Clrposture is built on [NIST CSF 2.0](https://www.nist.gov/cyberframework) and maps directly to the compliance pressures facing U.S. small and mid-sized businesses:

| Regulation / Standard | Who it affects | How Clrposture helps |
|---|---|---|
| [NIST CSF 2.0](https://doi.org/10.6028/NIST.CSWP.29) | All organizations | Full framework coverage — all 6 functions, 106 subcategories |
| [Executive Order 14144](https://www.federalregister.gov/documents/2025/01/22/2025-01680/strengthening-and-promoting-innovation-in-the-nations-cybersecurity) (Jan 2025) | Federal contractors | `federal-contractor` profile targets supply chain and identity controls |
| [CMMC 2.0](https://www.acq.osd.mil/cmmc/) / [DFARS 252.204-7012](https://www.ecfr.gov/current/title-48/chapter-2/subchapter-H/part-252/subpart-252.2/section-252.204-7012) | Defense Industrial Base | `dib` profile targets Tier 4 across CUI-relevant controls |
| [HIPAA Security Rule](https://www.hhs.gov/hipaa/for-professionals/security/index.html) | Healthcare organizations | `healthcare` profile elevates PHI access and encryption controls |
| [SOC 2](https://us.aicpa.org/interestareas/frc/assuranceadvisoryservices/aicpasoc2report) / [PCI DSS](https://www.pcisecuritystandards.org/) | Fintech / financial services | `fintech` profile elevates authentication and data security controls |

---

## What is NIST CSF 2.0?

The [NIST Cybersecurity Framework 2.0](https://www.nist.gov/cyberframework) (released February 2024) is the U.S. government's primary cybersecurity guidance standard. It is increasingly required or strongly expected for:

- Federal contractors (EO 14144, federal procurement)
- Defense suppliers (CMMC 2.0 / DFARS)
- Healthcare organizations (HIPAA alignment)
- Financial services (SOC 2, PCI DSS, investor due diligence)

The framework organizes cybersecurity practices into **6 functions**, **22 categories**, and **106 subcategories**. Each subcategory is scored on a **Tier 1–4 scale**:

| Tier | Meaning |
|------|---------|
| 1 | Partial — ad hoc, reactive |
| 2 | Risk Informed — some process, not organization-wide |
| 3 | Repeatable — formal policies, consistently applied |
| 4 | Adaptive — continuously improving, measured |

---

## How the assessment works

1. **Answer 106 plain-language questions** — one per subcategory, each with four tier descriptions to choose from. No NIST jargon required.
2. **Select an industry profile** — a pre-configured target profile defines where your organization *should* be for your sector.
3. **Get a gap report** — Clrposture computes your current tier per function, compares it against the target, and surfaces your highest-priority gaps ranked by delta.

### Industry profiles

| Profile | Regulatory basis |
|---------|-----------------|
| `federal-contractor` | EO 14144, federal procurement requirements |
| `dib` | CMMC 2.0 Level 2/3, DFARS 252.204-7012 (CUI handling) |
| `healthcare` | HIPAA Security Rule, ePHI protection |
| `fintech` | SOC 2 Type II, PCI DSS, investor due diligence |
| `mssp` | General SME baseline — useful for consultants assessing clients before industry is known |

---

## Getting started

### Requirements

- Node.js 22+
- pnpm 9+

### Install

```bash
git clone https://github.com/clrposture/clrposture-core.git
cd clrposture-core
pnpm install
```

### Build

```bash
pnpm build
```

---

## Running an assessment

### Interactive CLI

```bash
# Run from the repo
pnpm --filter @clrposture/cli dev

# Or after building, run directly
node packages/cli/dist/index.js assess
```

You will be prompted to:
1. Select your industry profile
2. Answer each of the 106 subcategory questions by choosing a tier description

At the end, you receive a gap report in your terminal showing:
- Current and target average tier per function
- Gaps bucketed by priority: Immediate (delta ≥ 3), Short-term (delta = 2), Strategic (delta = 1)
- Numbered remediation steps per gap, one per tier transition
- Weakest function highlighted

### Save results to a file

```bash
# JSON (default)
node packages/cli/dist/index.js assess --output report.json

# CSV
node packages/cli/dist/index.js assess --output report.csv
node packages/cli/dist/index.js assess --output report.csv --format csv
```

The CSV contains one row per gap with columns: `subcategoryId`, `currentTier`, `targetTier`, `delta`, `bucket`, `steps`.

### Skip the industry prompt

```bash
node packages/cli/dist/index.js assess --industry fintech
```

Available values: `federal-contractor`, `dib`, `healthcare`, `fintech`, `mssp`

---

## Using Clrposture as a library

Install the core package in your own project:

```bash
npm install @clrposture/core
```

### Run an assessment programmatically

```typescript
import {
  CSF_FUNCTIONS,
  GapAnalyzer,
  FINTECH_PROFILE,
  type Answer,
} from "@clrposture/core";

const answers: Answer[] = [
  { subcategoryId: "GV.OC-01", tier: 2 },
  { subcategoryId: "PR.AA-02", tier: 1 },
  // ... all 106 answers
];

const analyzer = new GapAnalyzer(CSF_FUNCTIONS);
const report = analyzer.analyze(answers, FINTECH_PROFILE, "my-assessment-id");

console.log(report.gaps);        // prioritized gaps
console.log(report.byFunction);  // per-function summary
```

### Use a custom target profile

```typescript
import { type Profile } from "@clrposture/core";

const myProfile: Profile = {
  "GV.OC-01": 3,
  "PR.AA-02": 4,
  // ... define targets for any subcategory you care about
};
```

### Swap the scoring strategy

```typescript
import { Scorer, type ScoringStrategy } from "@clrposture/core";

// Example: minimum tier instead of average
class MinimumScoringStrategy implements ScoringStrategy {
  reduce(tiers: number[]): number {
    return Math.min(...tiers);
  }
}

const scorer = new Scorer(CSF_FUNCTIONS, new MinimumScoringStrategy());
const scores = scorer.score(answers);
```

---

## Making sense of your results

### Reading the gap report

```
Industry: fintech
Gaps identified: 11

GV: current avg 1.8 → target avg 3.0 | 4 gap(s)
ID: current avg 2.3 → target avg 3.0 | 3 gap(s)
PR: current avg 1.5 → target avg 3.6 | 8 gap(s)

🔴 Immediate (address now):

  PR.AA-02  Tier 1 → 4  (delta: 3)
    Step 1: Eliminate all shared credentials immediately. Assign individual accounts
            to every person. Enforce a minimum password length of 14 characters.
    Step 2: Enable MFA on your highest-risk accounts: email, VPN, admin consoles,
            and cloud platforms. Use an authenticator app (not SMS).
    Step 3: Enforce MFA for all users without exception. For privileged accounts,
            require phishing-resistant MFA such as FIDO2/passkeys or hardware keys.

  GV.OC-01  Tier 1 → 4  (delta: 3)
    Step 1: Write an informal policy and communicate it to staff.
    Step 2: Formalize the policy, get leadership sign-off, schedule annual reviews.
    Step 3: Automate acknowledgement tracking and link reviews to regulatory alerts.

🟡 Short-term (address within 90 days):

  PR.DS-01  Tier 2 → 4  (delta: 2)
    Step 1: Enable encryption at rest on all laptops, servers, and cloud storage.
    Step 2: Enforce encryption standards in your data classification policy and
            audit compliance quarterly.

🟢 Strategic (address within 6–12 months):

  ID.AM-01  Tier 3 → 4  (delta: 1)
    Step 1: Automate asset discovery and integrate with your vulnerability management
            tooling to maintain a continuously updated inventory.

Weakest function: PR (avg tier 1.5, 8 gap(s))
```

Each gap surfaces only the steps relevant to its size — a Tier 1→4 gap shows all three steps, a Tier 2→3 gap shows one. You advance one tier at a time.

### What to do with gaps

1. **Work through buckets in order** — Immediate gaps (delta ≥ 3) represent your largest exposure. Address these before Short-term or Strategic items.
2. **Each step is one tier transition** — steps are incremental by design. Security maturity cannot be skipped; each tier builds on the last.
3. **Focus on Protect first** — PR gaps (access control, encryption, patching) typically represent the most direct attack surface reduction.
4. **Fix Govern in parallel** — GV gaps (policy, roles, risk management) are required for any audit or certification. They take organizational effort, not technical effort.
5. **Reassess quarterly** — a single assessment is a snapshot. Value comes from tracking improvement over time.

### Common first actions by gap type

| Subcategory | What it means | First action |
|-------------|--------------|--------------|
| `PR.AA-02` | No MFA | Enable MFA on email, VPN, and admin accounts this week |
| `PR.DS-01` | No encryption at rest | Enable disk encryption on all laptops and servers |
| `PR.PS-02` | No patch management | Set up automatic OS and software updates |
| `GV.PO-01` | No security policy | Draft a one-page policy; get it signed by leadership |
| `RS.MA-01` | No incident response plan | Create a one-page "what to do if we get hacked" document |
| `ID.AM-01` | No asset inventory | Spend one day creating a spreadsheet of all hardware |

---

## Running the tests

```bash
# All packages
pnpm test

# Core package only
pnpm --filter @clrposture/core test

# Watch mode during development
pnpm --filter @clrposture/core test:watch
```

The test suite covers (52 tests, 5 suites):
- Zod schema validation (valid and invalid inputs for every type)
- Scorer accuracy (averages, edge cases, unknown subcategory IDs, empty input)
- GapAnalyzer correctness (delta calculation, sorting, function summaries, partial answers)
- Remediation planner (bucket assignment, step slicing by gap size, weakest function identification)
- CSV export (formatting, bucket labels, pipe-separated steps, quote escaping)

---

## Project structure

```
packages/
├── core/                    @clrposture/core — published to npm
│   └── src/
│       ├── schema/          Zod schemas for all data types
│       ├── data/csf.ts      Full NIST CSF 2.0 question bank (106 subcategories)
│       ├── engine/
│       │   ├── scorer.ts    Tier scoring engine (Strategy pattern)
│       │   └── gap-analyzer.ts  Gap analysis + remediation planning
│       ├── export/
│       │   └── csv.ts       gapReportToCsv() — CSV serialization
│       └── profiles/        Pre-configured industry target profiles
└── cli/                     @clrposture/cli — interactive terminal assessment
    └── src/
        ├── commands/assess.ts
        └── index.ts
```

---

## Contributing

Contributions are welcome. The most valuable areas:

- **Question bank improvements** — better plain-language descriptions, clearer tier distinctions
- **New industry profiles** — energy, retail, education, state/local government
- **Scoring strategies** — weighted scoring, percentile-based scoring
- **Output formats** — HTML report, PDF (CSV is already supported)

To contribute:

1. Fork the repo
2. Create a feature branch
3. Write tests first
4. Open a pull request with a clear description of the change

---

## License

MIT — free to use, modify, and distribute, including for commercial purposes. See [LICENSE](./LICENSE).
