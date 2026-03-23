import { describe, expect, it } from "vitest";
import type { Answer } from "../../schema/index.js";
import { Scorer } from "../scorer.js";
import { CSF_FUNCTIONS } from "../../data/csf.js";

// Helper: build answers for every subcategory in a function at a given tier
function answersForFunction(functionId: string, tier: 1 | 2 | 3 | 4): Answer[] {
  const fn = CSF_FUNCTIONS.find((f) => f.id === functionId);
  if (!fn) throw new Error(`Unknown function: ${functionId}`);
  return fn.categories.flatMap((cat) =>
    cat.subcategories.map((sub) => ({ subcategoryId: sub.id, tier }))
  );
}

describe("Scorer", () => {
  const scorer = new Scorer(CSF_FUNCTIONS);

  describe("score()", () => {
    it("returns tier 1 average when all answers are tier 1", () => {
      const answers = answersForFunction("GV", 1);
      const result = scorer.score(answers);
      expect(result.GV?.average).toBeCloseTo(1, 5);
    });

    it("returns tier 4 average when all answers are tier 4", () => {
      const answers = answersForFunction("ID", 4);
      const result = scorer.score(answers);
      expect(result.ID?.average).toBeCloseTo(4, 5);
    });

    it("correctly averages mixed tiers within a function", () => {
      const fn = CSF_FUNCTIONS.find((f) => f.id === "PR")!;
      const subcategoryIds = fn.categories.flatMap((c) =>
        c.subcategories.map((s) => s.id)
      );
      // Alternate tier 2 and 4 → expected average = 3
      const answers: Answer[] = subcategoryIds.map((id, i) => ({
        subcategoryId: id,
        tier: i % 2 === 0 ? 2 : 4,
      }));
      const result = scorer.score(answers);
      expect(result.PR?.average).toBeCloseTo(3, 5);
    });

    it("only includes functions that have at least one answer", () => {
      const answers = answersForFunction("DE", 2);
      const result = scorer.score(answers);
      expect(Object.keys(result)).toEqual(["DE"]);
    });

    it("returns the answered count per function", () => {
      const answers = answersForFunction("RS", 3);
      const result = scorer.score(answers);
      const rsSubcategoryCount = CSF_FUNCTIONS.find((f) => f.id === "RS")!
        .categories.flatMap((c) => c.subcategories).length;
      expect(result.RS?.answeredCount).toBe(rsSubcategoryCount);
    });

    it("handles an empty answers array without throwing", () => {
      const result = scorer.score([]);
      expect(result).toEqual({});
    });

    it("ignores answers for unknown subcategory IDs", () => {
      const answers: Answer[] = [{ subcategoryId: "XX.ZZ-99", tier: 3 }];
      const result = scorer.score(answers);
      expect(result).toEqual({});
    });
  });
});
