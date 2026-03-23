import { z } from "zod";

// --- Primitives ---

export const TierSchema = z.union([
  z.literal(1),
  z.literal(2),
  z.literal(3),
  z.literal(4),
]);
export type Tier = z.infer<typeof TierSchema>;

export const FunctionIdSchema = z.enum(["GV", "ID", "PR", "DE", "RS", "RC"]);
export type FunctionId = z.infer<typeof FunctionIdSchema>;

// --- Question Bank ---

export const SubcategorySchema = z.object({
  id: z.string(),
  description: z.string(),
  nistRef: z.string(),
  tiers: z.tuple([z.string(), z.string(), z.string(), z.string()]),
  /**
   * Three incremental remediation steps, one per tier transition:
   *   [0] Tier 1 → 2
   *   [1] Tier 2 → 3
   *   [2] Tier 3 → 4
   */
  stepRemediations: z.tuple([z.string(), z.string(), z.string()]),
});
export type Subcategory = z.infer<typeof SubcategorySchema>;

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  subcategories: z.array(SubcategorySchema),
});
export type Category = z.infer<typeof CategorySchema>;

export const CsfFunctionSchema = z.object({
  id: FunctionIdSchema,
  name: z.string(),
  categories: z.array(CategorySchema),
});
export type CsfFunction = z.infer<typeof CsfFunctionSchema>;

// --- Assessment ---

export const AnswerSchema = z.object({
  subcategoryId: z.string(),
  tier: TierSchema,
});
export type Answer = z.infer<typeof AnswerSchema>;

export const ProfileSchema = z.record(z.string(), TierSchema);
export type Profile = z.infer<typeof ProfileSchema>;

export const AssessmentSchema = z.object({
  id: z.string(),
  industry: z.string().optional(),
  answers: z.array(AnswerSchema),
  createdAt: z.string().datetime(),
});
export type Assessment = z.infer<typeof AssessmentSchema>;

// --- Gap Analysis ---

export const GapSchema = z.object({
  subcategoryId: z.string(),
  currentTier: TierSchema,
  targetTier: TierSchema,
  delta: z.number().int().positive(),
});
export type Gap = z.infer<typeof GapSchema>;

export const FunctionSummarySchema = z.object({
  currentAvg: z.number(),
  targetAvg: z.number(),
  gapCount: z.number().int().nonnegative(),
});
export type FunctionSummary = z.infer<typeof FunctionSummarySchema>;

export const RemediationItemSchema = z.object({
  subcategoryId: z.string(),
  currentTier: TierSchema,
  targetTier: TierSchema,
  delta: z.number().int().positive(),
  /** Ordered steps to advance from currentTier to targetTier, one per tier transition. */
  steps: z.array(z.string()).min(1),
});
export type RemediationItem = z.infer<typeof RemediationItemSchema>;

export const RemediationPlanSchema = z.object({
  immediate: z.array(RemediationItemSchema),
  shortTerm: z.array(RemediationItemSchema),
  strategic: z.array(RemediationItemSchema),
  weakestFunction: z.object({
    id: FunctionIdSchema,
    currentAvg: z.number(),
    gapCount: z.number().int().nonnegative(),
  }).optional(),
});
export type RemediationPlan = z.infer<typeof RemediationPlanSchema>;

export const GapReportSchema = z.object({
  assessmentId: z.string(),
  gaps: z.array(GapSchema),
  byFunction: z.record(FunctionIdSchema, FunctionSummarySchema),
  remediationPlan: RemediationPlanSchema,
});
export type GapReport = z.infer<typeof GapReportSchema>;
