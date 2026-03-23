import type { Profile } from "../schema/index.js";

/**
 * Federal Contractor target profile — Tier 3 baseline across all controls.
 * Elevated to Tier 4 for supply chain, access control, and incident response
 * reflecting EO 14144 and federal procurement cybersecurity requirements.
 */
export const FEDERAL_CONTRACTOR_PROFILE: Profile = {
  // GOVERN — strong policy and oversight requirements for federal work
  "GV.OC-01": 3, "GV.OC-02": 4, "GV.OC-03": 3, "GV.OC-04": 3, "GV.OC-05": 3,
  "GV.RM-01": 3, "GV.RM-02": 3, "GV.RM-03": 3, "GV.RM-04": 3, "GV.RM-05": 3, "GV.RM-06": 3, "GV.RM-07": 3,
  "GV.RR-01": 3, "GV.RR-02": 3, "GV.RR-03": 3, "GV.RR-04": 4,
  "GV.PO-01": 4, "GV.PO-02": 3,
  "GV.OV-01": 3, "GV.OV-02": 3, "GV.OV-03": 3,
  // Supply chain is a top priority per EO 14144
  "GV.SC-01": 4, "GV.SC-02": 4, "GV.SC-03": 4, "GV.SC-04": 4,
  "GV.SC-05": 4, "GV.SC-06": 3, "GV.SC-07": 4, "GV.SC-08": 4, "GV.SC-09": 4, "GV.SC-10": 3,
  // IDENTIFY
  "ID.AM-01": 3, "ID.AM-02": 3, "ID.AM-03": 3, "ID.AM-04": 3, "ID.AM-05": 3, "ID.AM-07": 4, "ID.AM-08": 3,
  "ID.RA-01": 4, "ID.RA-02": 3, "ID.RA-03": 3, "ID.RA-04": 3, "ID.RA-05": 3, "ID.RA-06": 3, "ID.RA-07": 3,
  "ID.IM-01": 3, "ID.IM-02": 3, "ID.IM-03": 3, "ID.IM-04": 3,
  // PROTECT — strong identity and access requirements for federal systems
  "PR.AA-01": 4, "PR.AA-02": 4, "PR.AA-03": 4, "PR.AA-04": 4, "PR.AA-05": 4, "PR.AA-06": 3,
  "PR.AT-01": 3, "PR.AT-02": 3,
  "PR.DS-01": 4, "PR.DS-02": 4, "PR.DS-10": 3, "PR.DS-11": 3,
  "PR.PS-01": 4, "PR.PS-02": 4, "PR.PS-03": 3, "PR.PS-04": 4, "PR.PS-05": 3, "PR.PS-06": 4,
  "PR.IR-01": 3, "PR.IR-02": 3, "PR.IR-03": 3, "PR.IR-04": 3,
  // DETECT
  "DE.CM-01": 3, "DE.CM-02": 3, "DE.CM-03": 3, "DE.CM-06": 4, "DE.CM-09": 3,
  "DE.AE-02": 3, "DE.AE-03": 3, "DE.AE-04": 3, "DE.AE-06": 3, "DE.AE-07": 3, "DE.AE-08": 3,
  // RESPOND — federal incident reporting requirements (CISA 72-hour rule)
  "RS.MA-01": 4, "RS.MA-02": 3, "RS.MA-03": 3, "RS.MA-04": 4, "RS.MA-05": 4,
  "RS.AN-03": 3, "RS.AN-06": 4, "RS.AN-07": 3, "RS.AN-08": 4,
  "RS.CO-02": 4, "RS.CO-03": 4,
  "RS.MI-01": 3, "RS.MI-02": 3,
  // RECOVER
  "RC.RP-01": 3, "RC.RP-02": 3, "RC.RP-03": 3, "RC.RP-04": 3, "RC.RP-05": 3,
  "RC.CO-03": 3, "RC.CO-04": 3,
};
