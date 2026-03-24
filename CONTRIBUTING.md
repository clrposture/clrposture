# Contributing to Clrposture

Contributions are welcome. This document covers how to get set up and what to work on.

## Requirements

- Node.js 22+
- pnpm 9+

## Setup

```bash
git clone https://github.com/clrposture/clrposture-core.git
cd clrposture-core
pnpm install
pnpm build
pnpm test
```

All 52 tests should pass before you start.

## Development workflow

This project uses TDD. The expected order for any change is:

1. Write a failing test that describes the desired behaviour
2. Write the minimum implementation to make it pass
3. Refactor if needed, keeping tests green

No implementation code without a failing test driving it.

## Areas where contributions are most valuable

### Question bank (`packages/core/src/data/csf.ts`)
- Clearer plain-language descriptions for subcategory questions
- Better tier descriptions (more concrete, less abstract)
- Improved `stepRemediations` — each step should be a specific, actionable instruction for one tier advancement

### Industry profiles (`packages/core/src/profiles/`)
- New profiles: energy (NERC CIP), retail, education, state/local government
- Refinements to existing profiles based on real compliance requirements

### Scoring strategies (`packages/core/src/engine/scorer.ts`)
- New `ScoringStrategy` implementations: weighted scoring, minimum-tier scoring, percentile-based
- The `ScoringStrategy` interface makes this straightforward to extend without touching existing code

### Output formats (`packages/cli/src/commands/assess.ts`)
- HTML report
- PDF report
- Structured JSON schema improvements
(CSV export is already implemented via `--output report.csv` or `--format csv`)

## Submitting a pull request

1. Fork the repo and create a feature branch
2. Write tests first
3. Make sure `pnpm build && pnpm test` passes
4. Open a pull request with a clear description of what changed and why

## Project structure

```
packages/
├── core/          @clrposture/core — library published to npm
│   └── src/
│       ├── schema/        Zod schemas (single source of truth for all types)
│       ├── data/csf.ts    Full NIST CSF 2.0 question bank (106 subcategories)
│       ├── engine/        Scorer and GapAnalyzer
│       ├── export/        gapReportToCsv() and future serializers
│       └── profiles/      Pre-configured industry target profiles
└── cli/           @clrposture/cli — interactive terminal tool
    └── src/
        ├── commands/assess.ts
        └── index.ts
```

## Design patterns in use

- **Strategy** — `ScoringStrategy` in `scorer.ts`. New scoring approaches implement the interface and are injected into `Scorer`.
- **Builder** — `buildRemediationPlan` in `gap-analyzer.ts`. Constructs `RemediationPlan` step by step.
- **Single Responsibility** — `Scorer` owns math only. `GapAnalyzer` owns gap comparison and remediation planning only.

When adding new patterns, name them explicitly in a code comment.

## Code style

- TypeScript strict mode — no `any`, no type assertions unless genuinely necessary
- ESM only — no `require()`, no CommonJS
- Zod for all runtime validation — infer static types from schemas, do not duplicate type definitions
- Latest stable package versions — check changelogs before adding or upgrading dependencies
