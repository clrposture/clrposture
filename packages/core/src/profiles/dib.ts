import type { Profile } from "../schema/index.js";

/**
 * Defense Industrial Base (DIB) target profile — Tier 3–4 across all controls.
 * Elevated broadly to reflect CMMC 2.0 Level 2/3 requirements and
 * DFARS 252.204-7012 obligations for handling Controlled Unclassified Information (CUI).
 */
export const DIB_PROFILE: Profile = {
  // GOVERN — CMMC requires documented policies and executive accountability
  "GV.OC-01": 4, "GV.OC-02": 4, "GV.OC-03": 4, "GV.OC-04": 3, "GV.OC-05": 3,
  "GV.RM-01": 4, "GV.RM-02": 3, "GV.RM-03": 3, "GV.RM-04": 4, "GV.RM-05": 3, "GV.RM-06": 3, "GV.RM-07": 3,
  "GV.RR-01": 4, "GV.RR-02": 3, "GV.RR-03": 4, "GV.RR-04": 4,
  "GV.PO-01": 4, "GV.PO-02": 4,
  "GV.OV-01": 4, "GV.OV-02": 3, "GV.OV-03": 3,
  // Supply chain security is a core CMMC concern
  "GV.SC-01": 4, "GV.SC-02": 4, "GV.SC-03": 4, "GV.SC-04": 4,
  "GV.SC-05": 4, "GV.SC-06": 4, "GV.SC-07": 4, "GV.SC-08": 4, "GV.SC-09": 4, "GV.SC-10": 4,
  // IDENTIFY — full asset visibility required for CUI boundary definition
  "ID.AM-01": 4, "ID.AM-02": 4, "ID.AM-03": 4, "ID.AM-04": 3, "ID.AM-05": 4, "ID.AM-07": 4, "ID.AM-08": 4,
  "ID.RA-01": 4, "ID.RA-02": 4, "ID.RA-03": 4, "ID.RA-04": 3, "ID.RA-05": 4, "ID.RA-06": 3, "ID.RA-07": 3,
  "ID.IM-01": 3, "ID.IM-02": 4, "ID.IM-03": 3, "ID.IM-04": 4,
  // PROTECT — CUI protection drives strict access and encryption requirements
  "PR.AA-01": 4, "PR.AA-02": 4, "PR.AA-03": 4, "PR.AA-04": 4, "PR.AA-05": 4, "PR.AA-06": 4,
  "PR.AT-01": 4, "PR.AT-02": 4,
  "PR.DS-01": 4, "PR.DS-02": 4, "PR.DS-10": 4, "PR.DS-11": 4,
  "PR.PS-01": 4, "PR.PS-02": 4, "PR.PS-03": 4, "PR.PS-04": 4, "PR.PS-05": 4, "PR.PS-06": 4,
  "PR.IR-01": 4, "PR.IR-02": 3, "PR.IR-03": 3, "PR.IR-04": 3,
  // DETECT
  "DE.CM-01": 4, "DE.CM-02": 3, "DE.CM-03": 4, "DE.CM-06": 4, "DE.CM-09": 4,
  "DE.AE-02": 4, "DE.AE-03": 4, "DE.AE-04": 3, "DE.AE-06": 4, "DE.AE-07": 4, "DE.AE-08": 3,
  // RESPOND — DFARS requires reporting to DoD within 72 hours
  "RS.MA-01": 4, "RS.MA-02": 4, "RS.MA-03": 4, "RS.MA-04": 4, "RS.MA-05": 4,
  "RS.AN-03": 4, "RS.AN-06": 4, "RS.AN-07": 4, "RS.AN-08": 4,
  "RS.CO-02": 4, "RS.CO-03": 4,
  "RS.MI-01": 4, "RS.MI-02": 4,
  // RECOVER
  "RC.RP-01": 4, "RC.RP-02": 3, "RC.RP-03": 3, "RC.RP-04": 4, "RC.RP-05": 4,
  "RC.CO-03": 3, "RC.CO-04": 3,
};
