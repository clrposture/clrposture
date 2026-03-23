import { describe, expect, it } from "vitest";
import type { Answer, Profile } from "../../schema/index.js";
import { GapAnalyzer } from "../gap-analyzer.js";
import { CSF_FUNCTIONS } from "../../data/csf.js";

describe("GapAnalyzer", () => {
  const analyzer = new GapAnalyzer(CSF_FUNCTIONS);

  const currentAnswers: Answer[] = [
    { subcategoryId: "GV.OC-01", tier: 1 },
    { subcategoryId: "GV.OC-02", tier: 2 },
    { subcategoryId: "ID.AM-01", tier: 3 },
    { subcategoryId: "ID.AM-02", tier: 2 },
  ];

  const targetProfile: Profile = {
    "GV.OC-01": 3,
    "GV.OC-02": 2, // no gap
    "ID.AM-01": 4,
    "ID.AM-02": 3,
  };

  describe("analyze()", () => {
    it("identifies subcategories where current tier is below target", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "test-id");
      const gapIds = report.gaps.map((g) => g.subcategoryId);
      expect(gapIds).toContain("GV.OC-01");
      expect(gapIds).toContain("ID.AM-01");
      expect(gapIds).toContain("ID.AM-02");
    });

    it("excludes subcategories where current tier meets or exceeds target", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "test-id");
      const gapIds = report.gaps.map((g) => g.subcategoryId);
      expect(gapIds).not.toContain("GV.OC-02");
    });

    it("calculates the correct delta for each gap", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "test-id");
      const gvGap = report.gaps.find((g) => g.subcategoryId === "GV.OC-01");
      expect(gvGap?.delta).toBe(2); // target 3 - current 1
    });

    it("sorts gaps by delta descending (highest priority first)", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "test-id");
      const deltas = report.gaps.map((g) => g.delta);
      expect(deltas).toEqual([...deltas].sort((a, b) => b - a));
    });

    it("computes byFunction summary with correct gap counts", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "test-id");
      expect(report.byFunction["GV"]?.gapCount).toBe(1);
      expect(report.byFunction["ID"]?.gapCount).toBe(2);
    });

    it("computes correct currentAvg per function", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "test-id");
      // GV answered: GV.OC-01 (1), GV.OC-02 (2) → avg 1.5
      expect(report.byFunction["GV"]?.currentAvg).toBeCloseTo(1.5, 5);
    });

    it("computes correct targetAvg per function", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "test-id");
      // GV targets in profile: GV.OC-01 (3), GV.OC-02 (2) → avg 2.5
      expect(report.byFunction["GV"]?.targetAvg).toBeCloseTo(2.5, 5);
    });

    it("returns assessmentId unchanged", () => {
      const report = analyzer.analyze(currentAnswers, targetProfile, "my-assessment-id");
      expect(report.assessmentId).toBe("my-assessment-id");
    });

    it("returns an empty gaps array when current meets all targets", () => {
      const perfectAnswers: Answer[] = [
        { subcategoryId: "GV.OC-01", tier: 3 },
        { subcategoryId: "GV.OC-02", tier: 2 },
      ];
      const report = analyzer.analyze(perfectAnswers, targetProfile, "perfect");
      const relevantGaps = report.gaps.filter((g) =>
        ["GV.OC-01", "GV.OC-02"].includes(g.subcategoryId)
      );
      expect(relevantGaps).toHaveLength(0);
    });

    it("ignores target profile entries with no corresponding answer", () => {
      const partialAnswers: Answer[] = [{ subcategoryId: "GV.OC-01", tier: 1 }];
      const report = analyzer.analyze(partialAnswers, targetProfile, "partial");
      const gapIds = report.gaps.map((g) => g.subcategoryId);
      // ID.AM entries have no answers — should not appear as gaps
      expect(gapIds).not.toContain("ID.AM-01");
      expect(gapIds).not.toContain("ID.AM-02");
    });
  });
});
