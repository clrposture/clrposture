import { select, confirm } from "@inquirer/prompts";
import {
  CSF_FUNCTIONS,
  GapAnalyzer,
  gapReportToCsv,
  FINTECH_PROFILE,
  HEALTHCARE_PROFILE,
  FEDERAL_CONTRACTOR_PROFILE,
  DIB_PROFILE,
  MSSP_PROFILE,
  type Answer,
  type Profile,
} from "@clrposture/core";
import { writeFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const INDUSTRY_PROFILES: Record<string, Profile> = {
  fintech: FINTECH_PROFILE,
  healthcare: HEALTHCARE_PROFILE,
  "federal-contractor": FEDERAL_CONTRACTOR_PROFILE,
  dib: DIB_PROFILE,
  mssp: MSSP_PROFILE,
};

export async function runAssess(options: {
  industry?: string;
  output?: string;
  format?: string;
}): Promise<void> {
  console.log("\nClrposture — NIST CSF 2.0 Assessment\n");

  const industry =
    options.industry ??
    (await select({
      message: "Select your industry profile:",
      choices: [
        { name: "Federal Contractor (EO 14144)", value: "federal-contractor" },
        { name: "Defense Industrial Base / CMMC", value: "dib" },
        { name: "Healthcare (HIPAA)", value: "healthcare" },
        { name: "Fintech / Financial Services (SOC 2, PCI)", value: "fintech" },
        { name: "MSSP / IT Consultant (general baseline)", value: "mssp" },
        { name: "No industry target", value: "general" },
      ],
    }));

  const targetProfile: Profile | undefined = INDUSTRY_PROFILES[industry];
  const answers: Answer[] = [];

  for (const fn of CSF_FUNCTIONS) {
    console.log(`\n── ${fn.id}: ${fn.name} ──`);

    for (const category of fn.categories) {
      for (const sub of category.subcategories) {
        const tier = await select({
          message: `[${sub.id}] ${sub.description}`,
          choices: sub.tiers.map((label, i) => ({
            name: `Tier ${i + 1} — ${label}`,
            value: (i + 1) as 1 | 2 | 3 | 4,
          })),
        });

        answers.push({ subcategoryId: sub.id, tier });
      }
    }
  }

  const assessmentId = randomUUID();

  if (targetProfile) {
    const analyzer = new GapAnalyzer(CSF_FUNCTIONS);
    const report = analyzer.analyze(answers, targetProfile, assessmentId);

    console.log("\n── Gap Report ──\n");
    console.log(`Industry: ${industry}`);
    console.log(`Gaps identified: ${report.gaps.length}\n`);

    for (const [fnId, summary] of Object.entries(report.byFunction)) {
      console.log(
        `${fnId}: current avg ${summary.currentAvg.toFixed(1)} → target avg ${summary.targetAvg.toFixed(1)} | ${summary.gapCount} gap(s)`
      );
    }

    const printBucket = (label: string, items: typeof report.remediationPlan.immediate) => {
      if (items.length === 0) return;
      console.log(`\n${label}:`);
      for (const item of items) {
        console.log(`\n  ${item.subcategoryId}  Tier ${item.currentTier} → ${item.targetTier}  (delta: ${item.delta})`);
        item.steps.forEach((step, i) => {
          console.log(`    Step ${i + 1}: ${step}`);
        });
      }
    };

    printBucket("🔴 Immediate (address now)", report.remediationPlan.immediate);
    printBucket("🟡 Short-term (address within 90 days)", report.remediationPlan.shortTerm);
    printBucket("🟢 Strategic (address within 6–12 months)", report.remediationPlan.strategic);

    if (report.remediationPlan.weakestFunction) {
      const wf = report.remediationPlan.weakestFunction;
      console.log(`\nWeakest function: ${wf.id} (avg tier ${wf.currentAvg.toFixed(1)}, ${wf.gapCount} gap(s))`);
    }

    if (options.output) {
      const isCsv = options.format === "csv" || options.output.endsWith(".csv");
      const content = isCsv
        ? gapReportToCsv(report)
        : JSON.stringify({ assessmentId, industry, answers, report }, null, 2);
      writeFileSync(options.output, content);
      console.log(`\nReport saved to ${options.output}`);
    }
  } else {
    if (options.output) {
      writeFileSync(options.output, JSON.stringify({ assessmentId, answers }, null, 2));
      console.log(`\nAssessment saved to ${options.output}`);
    }
  }
}
