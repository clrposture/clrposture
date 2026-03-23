import type { Profile } from "../schema/index.js";

/**
 * MSSP / IT Consultant baseline profile — Tier 2 floor, Tier 3 target across all controls.
 * Used by consultants to assess clients before industry is known.
 * Represents a reasonable "any SME should be here" benchmark — not industry-specific.
 */
export const MSSP_PROFILE: Profile = {
  // GOVERN
  "GV.OC-01": 2, "GV.OC-02": 2, "GV.OC-03": 2, "GV.OC-04": 2, "GV.OC-05": 2,
  "GV.RM-01": 3, "GV.RM-02": 2, "GV.RM-03": 2, "GV.RM-04": 2, "GV.RM-05": 2, "GV.RM-06": 2, "GV.RM-07": 2,
  "GV.RR-01": 2, "GV.RR-02": 2, "GV.RR-03": 2, "GV.RR-04": 2,
  "GV.PO-01": 3, "GV.PO-02": 2,
  "GV.OV-01": 2, "GV.OV-02": 2, "GV.OV-03": 2,
  "GV.SC-01": 2, "GV.SC-02": 2, "GV.SC-03": 2, "GV.SC-04": 2,
  "GV.SC-05": 2, "GV.SC-06": 2, "GV.SC-07": 2, "GV.SC-08": 2, "GV.SC-09": 2, "GV.SC-10": 2,
  // IDENTIFY
  "ID.AM-01": 3, "ID.AM-02": 3, "ID.AM-03": 2, "ID.AM-04": 2, "ID.AM-05": 2, "ID.AM-07": 2, "ID.AM-08": 2,
  "ID.RA-01": 3, "ID.RA-02": 2, "ID.RA-03": 2, "ID.RA-04": 2, "ID.RA-05": 2, "ID.RA-06": 2, "ID.RA-07": 2,
  "ID.IM-01": 2, "ID.IM-02": 2, "ID.IM-03": 2, "ID.IM-04": 2,
  // PROTECT — MFA and patching are non-negotiable minimums for any SME
  "PR.AA-01": 3, "PR.AA-02": 3, "PR.AA-03": 3, "PR.AA-04": 2, "PR.AA-05": 3, "PR.AA-06": 2,
  "PR.AT-01": 3, "PR.AT-02": 2,
  "PR.DS-01": 3, "PR.DS-02": 3, "PR.DS-10": 2, "PR.DS-11": 3,
  "PR.PS-01": 2, "PR.PS-02": 3, "PR.PS-03": 2, "PR.PS-04": 2, "PR.PS-05": 2, "PR.PS-06": 2,
  "PR.IR-01": 2, "PR.IR-02": 2, "PR.IR-03": 2, "PR.IR-04": 2,
  // DETECT
  "DE.CM-01": 2, "DE.CM-02": 1, "DE.CM-03": 2, "DE.CM-06": 2, "DE.CM-09": 3,
  "DE.AE-02": 2, "DE.AE-03": 2, "DE.AE-04": 2, "DE.AE-06": 2, "DE.AE-07": 2, "DE.AE-08": 2,
  // RESPOND — every SME needs a basic IR plan
  "RS.MA-01": 3, "RS.MA-02": 2, "RS.MA-03": 2, "RS.MA-04": 2, "RS.MA-05": 2,
  "RS.AN-03": 2, "RS.AN-06": 2, "RS.AN-07": 2, "RS.AN-08": 2,
  "RS.CO-02": 2, "RS.CO-03": 2,
  "RS.MI-01": 2, "RS.MI-02": 2,
  // RECOVER
  "RC.RP-01": 3, "RC.RP-02": 2, "RC.RP-03": 2, "RC.RP-04": 2, "RC.RP-05": 2,
  "RC.CO-03": 2, "RC.CO-04": 2,
};
