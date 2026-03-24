import type { GapReport, RemediationItem } from "../schema/index.js";

const HEADER = "subcategoryId,currentTier,targetTier,delta,bucket,steps";

function csvCell(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function itemToRow(item: RemediationItem, bucket: string): string {
  const steps = `"${item.steps.join(" | ").replace(/"/g, '""')}"`;
  return [item.subcategoryId, item.currentTier, item.targetTier, item.delta, bucket, steps].join(",");
}

/**
 * Serializes a GapReport to CSV format.
 * One row per gap, ordered: immediate → short-term → strategic.
 */
export function gapReportToCsv(report: GapReport): string {
  const rows: string[] = [HEADER];

  for (const item of report.remediationPlan.immediate) {
    rows.push(itemToRow(item, "immediate"));
  }
  for (const item of report.remediationPlan.shortTerm) {
    rows.push(itemToRow(item, "short-term"));
  }
  for (const item of report.remediationPlan.strategic) {
    rows.push(itemToRow(item, "strategic"));
  }

  return rows.join("\n");
}
