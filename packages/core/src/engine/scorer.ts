import type { Answer, CsfFunction, FunctionId } from "../schema/index.js";

export interface FunctionScore {
  average: number;
  answeredCount: number;
}

export type ScoreResult = Partial<Record<FunctionId, FunctionScore>>;

/**
 * Strategy pattern: defines how a set of tier values is reduced to a single score.
 * Swap implementations to support weighted scoring, median scoring, etc.
 */
export interface ScoringStrategy {
  reduce(tiers: number[]): number;
}

/** Default strategy: arithmetic mean of all answered tiers. */
export class AverageScoringStrategy implements ScoringStrategy {
  reduce(tiers: number[]): number {
    if (tiers.length === 0) return 0;
    return tiers.reduce((sum, t) => sum + t, 0) / tiers.length;
  }
}

/**
 * Scorer computes per-function scores from a list of answers.
 *
 * Accepts a ScoringStrategy to allow alternative scoring rules
 * without modifying this class (Open/Closed Principle).
 */
export class Scorer {
  /** Maps subcategoryId → FunctionId for O(1) lookup. */
  private readonly subcategoryIndex: Map<string, FunctionId>;

  constructor(
    private readonly functions: CsfFunction[],
    private readonly strategy: ScoringStrategy = new AverageScoringStrategy()
  ) {
    this.subcategoryIndex = this.buildIndex(functions);
  }

  score(answers: Answer[]): ScoreResult {
    const grouped = this.groupByFunction(answers);
    const result: ScoreResult = {};

    for (const [functionId, tiers] of grouped.entries()) {
      result[functionId] = {
        average: this.strategy.reduce(tiers),
        answeredCount: tiers.length,
      };
    }

    return result;
  }

  private groupByFunction(answers: Answer[]): Map<FunctionId, number[]> {
    const grouped = new Map<FunctionId, number[]>();

    for (const answer of answers) {
      const functionId = this.subcategoryIndex.get(answer.subcategoryId);
      if (functionId === undefined) continue;

      const existing = grouped.get(functionId) ?? [];
      existing.push(answer.tier);
      grouped.set(functionId, existing);
    }

    return grouped;
  }

  private buildIndex(functions: CsfFunction[]): Map<string, FunctionId> {
    const index = new Map<string, FunctionId>();
    for (const fn of functions) {
      for (const category of fn.categories) {
        for (const subcategory of category.subcategories) {
          index.set(subcategory.id, fn.id);
        }
      }
    }
    return index;
  }
}
