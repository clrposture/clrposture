import { describe, expect, it } from "vitest";
import type { Answer, Profile } from "../../schema/index.js";
import { GapAnalyzer } from "../gap-analyzer.js";
import { CSF_FUNCTIONS } from "../../data/csf.js";

describe("RemediationPlan (via GapAnalyzer)", () => {
  const analyzer = new GapAnalyzer(CSF_FUNCTIONS);

  const answers: Answer[] = [
    { subcategoryId: "GV.OC-01", tier: 1 }, // delta 3 → immediate
    { subcategoryId: "GV.OC-02", tier: 2 }, // delta 2 → short-term
    { subcategoryId: "ID.AM-01", tier: 3 }, // delta 1 → strategic
    { subcategoryId: "PR.AA-02", tier: 3 }, // delta 1 → strategic
    { subcategoryId: "RS.MA-01", tier: 1 }, // delta 3 → immediate
  ];

  const target: Profile = {
    "GV.OC-01": 4,
    "GV.OC-02": 4,
    "ID.AM-01": 4,
    "PR.AA-02": 4,
    "RS.MA-01": 4,
  };

  it("places delta >= 3 gaps in immediate bucket", () => {
    const { remediationPlan } = analyzer.analyze(answers, target, "test");
    const ids = remediationPlan.immediate.map((i) => i.subcategoryId);
    expect(ids).toContain("GV.OC-01");
    expect(ids).toContain("RS.MA-01");
  });

  it("places delta === 2 gaps in shortTerm bucket", () => {
    const { remediationPlan } = analyzer.analyze(answers, target, "test");
    const ids = remediationPlan.shortTerm.map((i) => i.subcategoryId);
    expect(ids).toContain("GV.OC-02");
  });

  it("places delta === 1 gaps in strategic bucket", () => {
    const { remediationPlan } = analyzer.analyze(answers, target, "test");
    const ids = remediationPlan.strategic.map((i) => i.subcategoryId);
    expect(ids).toContain("ID.AM-01");
    expect(ids).toContain("PR.AA-02");
  });

  it("includes the correct steps from the question bank based on the gap", () => {
    const { remediationPlan } = analyzer.analyze(answers, target, "test");
    // GV.OC-01: currentTier=1, targetTier=4 → all 3 steps
    const item = remediationPlan.immediate.find((i) => i.subcategoryId === "GV.OC-01");
    expect(item?.steps).toHaveLength(3);
    expect(item?.steps[0]).toBeTruthy();
  });

  it("identifies the weakest function", () => {
    const answersAllFunctions: Answer[] = [
      { subcategoryId: "GV.OC-01", tier: 3 },
      { subcategoryId: "ID.AM-01", tier: 3 },
      { subcategoryId: "RS.MA-01", tier: 1 }, // RS is weakest
      { subcategoryId: "RS.MA-02", tier: 1 },
    ];
    const targetAllFunctions: Profile = {
      "GV.OC-01": 3,
      "ID.AM-01": 3,
      "RS.MA-01": 3,
      "RS.MA-02": 3,
    };
    const { remediationPlan } = analyzer.analyze(answersAllFunctions, targetAllFunctions, "test");
    expect(remediationPlan.weakestFunction?.id).toBe("RS");
  });

  it("returns no weakest function when there are no gaps", () => {
    const perfectAnswers: Answer[] = [
      { subcategoryId: "GV.OC-01", tier: 3 },
    ];
    const perfectTarget: Profile = { "GV.OC-01": 3 };
    const { remediationPlan } = analyzer.analyze(perfectAnswers, perfectTarget, "test");
    expect(remediationPlan.weakestFunction).toBeUndefined();
  });

  it("sorts each bucket by delta descending", () => {
    const mixedAnswers: Answer[] = [
      { subcategoryId: "GV.OC-01", tier: 2 }, // delta 2
      { subcategoryId: "GV.OC-02", tier: 1 }, // delta 3
    ];
    const mixedTarget: Profile = {
      "GV.OC-01": 4,
      "GV.OC-02": 4,
    };
    const { remediationPlan } = analyzer.analyze(mixedAnswers, mixedTarget, "test");
    const immediateDeltas = remediationPlan.immediate.map((i) => i.delta);
    expect(immediateDeltas).toEqual([...immediateDeltas].sort((a, b) => b - a));
  });
});
