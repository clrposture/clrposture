import type {
  Answer,
  CsfFunction,
  FunctionId,
  Gap,
  GapReport,
  Profile,
  RemediationItem,
  RemediationPlan,
  Tier,
} from "../schema/index.js";
import { Scorer } from "./scorer.js";

/**
 * GapAnalyzer computes the delta between a current assessment and a target profile,
 * and produces a prioritized remediation plan.
 *
 * Uses the Scorer internally to derive per-function averages, keeping
 * scoring concerns separate from gap analysis concerns (Single Responsibility).
 */
export class GapAnalyzer {
  private readonly scorer: Scorer;
  private readonly subcategoryToFunction: Map<string, FunctionId>;
  private readonly remediationIndex: Map<string, [string, string, string]>;

  constructor(private readonly functions: CsfFunction[]) {
    this.scorer = new Scorer(functions);
    this.subcategoryToFunction = this.buildFunctionIndex(functions);
    this.remediationIndex = this.buildRemediationIndex(functions);
  }

  analyze(answers: Answer[], target: Profile, assessmentId: string): GapReport {
    const answerMap = new Map(answers.map((a) => [a.subcategoryId, a.tier]));

    const gaps = this.buildGaps(answerMap, target);
    const byFunction = this.buildFunctionSummary(answerMap, target, gaps);
    const remediationPlan = this.buildRemediationPlan(gaps, byFunction);

    return { assessmentId, gaps, byFunction, remediationPlan };
  }

  private buildGaps(answerMap: Map<string, Tier>, target: Profile): Gap[] {
    const gaps: Gap[] = [];

    for (const [subcategoryId, targetTier] of Object.entries(target)) {
      const currentTier = answerMap.get(subcategoryId);
      if (currentTier === undefined) continue;

      const delta = targetTier - currentTier;
      if (delta <= 0) continue;

      gaps.push({ subcategoryId, currentTier, targetTier, delta });
    }

    return gaps.sort((a, b) => b.delta - a.delta);
  }

  private buildFunctionSummary(
    answerMap: Map<string, Tier>,
    target: Profile,
    gaps: Gap[]
  ): GapReport["byFunction"] {
    const answeredFunctions = new Set(
      [...answerMap.keys()]
        .map((id) => this.subcategoryToFunction.get(id))
        .filter((id): id is FunctionId => id !== undefined)
    );

    const scoreResult = this.scorer.score(
      [...answerMap.entries()].map(([subcategoryId, tier]) => ({ subcategoryId, tier }))
    );

    const byFunction: GapReport["byFunction"] = {};

    for (const functionId of answeredFunctions) {
      const currentAvg = scoreResult[functionId]?.average ?? 0;
      const targetAvg = this.averageTargetForFunction(functionId, answerMap, target);
      const gapCount = gaps.filter(
        (g) => this.subcategoryToFunction.get(g.subcategoryId) === functionId
      ).length;

      byFunction[functionId] = { currentAvg, targetAvg, gapCount };
    }

    return byFunction;
  }

  /**
   * Builder pattern: constructs RemediationPlan by bucketing gaps into
   * time horizons based on delta severity, then identifies the weakest function.
   *
   * Buckets:
   *   immediate  — delta >= 3 (Tier 1 or 2 against a Tier 4 target)
   *   shortTerm  — delta === 2
   *   strategic  — delta === 1 (incremental improvement)
   */
  private buildRemediationPlan(
    gaps: Gap[],
    byFunction: GapReport["byFunction"]
  ): RemediationPlan {
    const toItem = (gap: Gap): RemediationItem => {
      const stepRemediations = this.remediationIndex.get(gap.subcategoryId) ?? ["", "", ""] as [string, string, string];
      const steps = stepRemediations.slice(gap.currentTier - 1, gap.targetTier - 1) as string[];
      return {
        subcategoryId: gap.subcategoryId,
        currentTier: gap.currentTier,
        targetTier: gap.targetTier,
        delta: gap.delta,
        steps,
      };
    };

    const immediate = gaps.filter((g) => g.delta >= 3).map(toItem);
    const shortTerm = gaps.filter((g) => g.delta === 2).map(toItem);
    const strategic = gaps.filter((g) => g.delta === 1).map(toItem);

    const weakestFunction = this.findWeakestFunction(byFunction);

    return { immediate, shortTerm, strategic, weakestFunction };
  }

  private findWeakestFunction(
    byFunction: GapReport["byFunction"]
  ): RemediationPlan["weakestFunction"] {
    const entries = Object.entries(byFunction) as [FunctionId, { currentAvg: number; gapCount: number }][];
    const withGaps = entries.filter(([, s]) => s.gapCount > 0);

    if (withGaps.length === 0) return undefined;

    const [id, summary] = withGaps.reduce((worst, current) =>
      current[1].currentAvg < worst[1].currentAvg ? current : worst
    );

    return { id, currentAvg: summary.currentAvg, gapCount: summary.gapCount };
  }

  private averageTargetForFunction(
    functionId: FunctionId,
    answerMap: Map<string, Tier>,
    target: Profile
  ): number {
    const targets = [...answerMap.keys()]
      .filter((id) => this.subcategoryToFunction.get(id) === functionId)
      .map((id) => target[id])
      .filter((t): t is Tier => t !== undefined);

    if (targets.length === 0) return 0;
    return targets.reduce((sum, t) => sum + t, 0) / targets.length;
  }

  private buildFunctionIndex(functions: CsfFunction[]): Map<string, FunctionId> {
    const index = new Map<string, FunctionId>();
    for (const fn of functions) {
      for (const category of fn.categories) {
        for (const sub of category.subcategories) {
          index.set(sub.id, fn.id);
        }
      }
    }
    return index;
  }

  private buildRemediationIndex(functions: CsfFunction[]): Map<string, [string, string, string]> {
    const index = new Map<string, [string, string, string]>();
    for (const fn of functions) {
      for (const category of fn.categories) {
        for (const sub of category.subcategories) {
          index.set(sub.id, sub.stepRemediations);
        }
      }
    }
    return index;
  }
}
