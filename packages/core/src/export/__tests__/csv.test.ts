import { describe, expect, it } from "vitest";
import { gapReportToCsv } from "../csv.js";
import type { GapReport } from "../../schema/index.js";

const report: GapReport = {
  assessmentId: "test-123",
  gaps: [
    { subcategoryId: "GV.OC-01", currentTier: 1, targetTier: 4, delta: 3 },
    { subcategoryId: "PR.AA-02", currentTier: 2, targetTier: 4, delta: 2 },
    { subcategoryId: "ID.AM-01", currentTier: 3, targetTier: 4, delta: 1 },
  ],
  byFunction: {
    GV: { currentAvg: 1.0, targetAvg: 4.0, gapCount: 1 },
    PR: { currentAvg: 2.0, targetAvg: 4.0, gapCount: 1 },
    ID: { currentAvg: 3.0, targetAvg: 4.0, gapCount: 1 },
  },
  remediationPlan: {
    immediate: [
      {
        subcategoryId: "GV.OC-01",
        currentTier: 1,
        targetTier: 4,
        delta: 3,
        steps: ["Step A", "Step B", "Step C"],
      },
    ],
    shortTerm: [
      {
        subcategoryId: "PR.AA-02",
        currentTier: 2,
        targetTier: 4,
        delta: 2,
        steps: ["Step D", "Step E"],
      },
    ],
    strategic: [
      {
        subcategoryId: "ID.AM-01",
        currentTier: 3,
        targetTier: 4,
        delta: 1,
        steps: ["Step F"],
      },
    ],
    weakestFunction: { id: "GV", currentAvg: 1.0, gapCount: 1 },
  },
};

describe("gapReportToCsv", () => {
  it("includes a header row", () => {
    const csv = gapReportToCsv(report);
    const lines = csv.split("\n");
    expect(lines[0]).toBe(
      "subcategoryId,currentTier,targetTier,delta,bucket,steps"
    );
  });

  it("produces one data row per gap", () => {
    const csv = gapReportToCsv(report);
    const lines = csv.split("\n").filter(Boolean);
    expect(lines).toHaveLength(4); // 1 header + 3 gaps
  });

  it("labels immediate bucket correctly", () => {
    const csv = gapReportToCsv(report);
    expect(csv).toContain("GV.OC-01,1,4,3,immediate");
  });

  it("labels shortTerm bucket correctly", () => {
    const csv = gapReportToCsv(report);
    expect(csv).toContain("PR.AA-02,2,4,2,short-term");
  });

  it("labels strategic bucket correctly", () => {
    const csv = gapReportToCsv(report);
    expect(csv).toContain("ID.AM-01,3,4,1,strategic");
  });

  it("joins multiple steps with a pipe separator", () => {
    const csv = gapReportToCsv(report);
    expect(csv).toContain('"Step A | Step B | Step C"');
  });

  it("wraps steps containing commas in quotes", () => {
    const reportWithComma: GapReport = {
      ...report,
      remediationPlan: {
        ...report.remediationPlan,
        immediate: [
          {
            subcategoryId: "GV.OC-01",
            currentTier: 1,
            targetTier: 4,
            delta: 3,
            steps: ["Do this, then that"],
          },
        ],
      },
    };
    const csv = gapReportToCsv(reportWithComma);
    expect(csv).toContain('"Do this, then that"');
  });
});
