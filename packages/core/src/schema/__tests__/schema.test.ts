import { describe, expect, it } from "vitest";
import {
  AnswerSchema,
  AssessmentSchema,
  FunctionIdSchema,
  GapReportSchema,
  GapSchema,
  ProfileSchema,
  SubcategorySchema,
  TierSchema,
} from "../index.js";

describe("TierSchema", () => {
  it("accepts valid tiers 1–4", () => {
    expect(TierSchema.parse(1)).toBe(1);
    expect(TierSchema.parse(4)).toBe(4);
  });

  it("rejects tier 0", () => {
    expect(() => TierSchema.parse(0)).toThrow();
  });

  it("rejects tier 5", () => {
    expect(() => TierSchema.parse(5)).toThrow();
  });

  it("rejects non-integer", () => {
    expect(() => TierSchema.parse(1.5)).toThrow();
  });
});

describe("FunctionIdSchema", () => {
  it("accepts all 6 CSF 2.0 function IDs", () => {
    const ids = ["GV", "ID", "PR", "DE", "RS", "RC"] as const;
    for (const id of ids) {
      expect(FunctionIdSchema.parse(id)).toBe(id);
    }
  });

  it("rejects unknown function IDs", () => {
    expect(() => FunctionIdSchema.parse("XX")).toThrow();
  });
});

describe("SubcategorySchema", () => {
  const valid = {
    id: "GV.OC-01",
    description: "Do you have a documented cybersecurity policy?",
    nistRef: "GV.OC-01",
    tiers: [
      "No policy exists",
      "Informal, undocumented policy",
      "Documented policy, reviewed annually",
      "Continuously reviewed policy with board oversight",
    ],
    stepRemediations: [
      "Write an informal policy and communicate it to staff.",
      "Formalize the policy, get leadership sign-off, and schedule annual reviews.",
      "Automate policy acknowledgement tracking and link reviews to regulatory change alerts.",
    ],
  };

  it("accepts a valid subcategory", () => {
    expect(SubcategorySchema.parse(valid)).toEqual(valid);
  });

  it("rejects subcategory with fewer than 4 tier descriptions", () => {
    expect(() =>
      SubcategorySchema.parse({ ...valid, tiers: valid.tiers.slice(0, 3) })
    ).toThrow();
  });

  it("rejects subcategory with more than 4 tier descriptions", () => {
    expect(() =>
      SubcategorySchema.parse({ ...valid, tiers: [...valid.tiers, "extra"] })
    ).toThrow();
  });

  it("rejects subcategory with fewer than 3 step remediations", () => {
    expect(() =>
      SubcategorySchema.parse({ ...valid, stepRemediations: valid.stepRemediations.slice(0, 2) })
    ).toThrow();
  });

  it("rejects subcategory with more than 3 step remediations", () => {
    expect(() =>
      SubcategorySchema.parse({ ...valid, stepRemediations: [...valid.stepRemediations, "extra"] })
    ).toThrow();
  });
});

describe("AnswerSchema", () => {
  it("accepts a valid answer", () => {
    const answer = { subcategoryId: "GV.OC-01", tier: 2 };
    expect(AnswerSchema.parse(answer)).toEqual(answer);
  });

  it("rejects an answer with an invalid tier", () => {
    expect(() =>
      AnswerSchema.parse({ subcategoryId: "GV.OC-01", tier: 0 })
    ).toThrow();
  });
});

describe("ProfileSchema", () => {
  it("accepts a valid profile mapping", () => {
    const profile = { "GV.OC-01": 3, "ID.AM-01": 2 };
    expect(ProfileSchema.parse(profile)).toEqual(profile);
  });

  it("rejects a profile with an invalid tier value", () => {
    expect(() => ProfileSchema.parse({ "GV.OC-01": 5 })).toThrow();
  });
});

describe("AssessmentSchema", () => {
  const valid = {
    id: "abc-123",
    answers: [{ subcategoryId: "GV.OC-01", tier: 2 }],
    createdAt: new Date().toISOString(),
  };

  it("accepts a valid assessment", () => {
    expect(AssessmentSchema.parse(valid)).toEqual(valid);
  });

  it("accepts assessment with optional industry", () => {
    expect(AssessmentSchema.parse({ ...valid, industry: "fintech" })).toMatchObject({
      industry: "fintech",
    });
  });

  it("rejects assessment with invalid createdAt", () => {
    expect(() =>
      AssessmentSchema.parse({ ...valid, createdAt: "not-a-date" })
    ).toThrow();
  });
});

describe("GapSchema", () => {
  it("accepts a valid gap", () => {
    const gap = { subcategoryId: "GV.OC-01", currentTier: 1, targetTier: 3, delta: 2 };
    expect(GapSchema.parse(gap)).toEqual(gap);
  });

  it("rejects a gap with delta <= 0", () => {
    expect(() =>
      GapSchema.parse({ subcategoryId: "GV.OC-01", currentTier: 3, targetTier: 3, delta: 0 })
    ).toThrow();
  });
});

describe("GapReportSchema", () => {
  it("accepts a valid gap report", () => {
    const report = {
      assessmentId: "abc-123",
      gaps: [{ subcategoryId: "GV.OC-01", currentTier: 1, targetTier: 3, delta: 2 }],
      byFunction: {
        GV: { currentAvg: 1.5, targetAvg: 3.0, gapCount: 2 },
      },
      remediationPlan: {
        immediate: [],
        shortTerm: [{ subcategoryId: "GV.OC-01", currentTier: 1, targetTier: 3, delta: 2, steps: ["Step 1.", "Step 2."] }],
        strategic: [],
        weakestFunction: { id: "GV", currentAvg: 1.5, gapCount: 2 },
      },
    };
    expect(GapReportSchema.parse(report)).toEqual(report);
  });
});
