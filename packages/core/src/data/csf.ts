import type { CsfFunction } from "../schema/index.js";

/**
 * NIST CSF 2.0 question bank.
 * All 6 functions, 22 categories, 106 subcategories.
 *
 * stepRemediations[0] = action to advance from Tier 1 → Tier 2
 * stepRemediations[1] = action to advance from Tier 2 → Tier 3
 * stepRemediations[2] = action to advance from Tier 3 → Tier 4
 */
export const CSF_FUNCTIONS: CsfFunction[] = [
  {
    id: "GV",
    name: "Govern",
    categories: [
      {
        id: "GV.OC",
        name: "Organizational Context",
        subcategories: [
          {
            id: "GV.OC-01",
            nistRef: "GV.OC-01",
            description: "Is your organization's mission, goals, and stakeholder expectations for cybersecurity documented?",
            tiers: [
              "No documentation exists; cybersecurity is not tied to organizational goals",
              "Informally understood but not documented",
              "Documented and communicated to relevant staff",
              "Continuously reviewed and updated with stakeholder input",
            ],
            stepRemediations: [
              "Hold a 30-minute leadership conversation to agree on what cybersecurity means to the business. Write one paragraph capturing the outcome and share it informally with IT staff.",
              "Turn that paragraph into a formal cybersecurity mission statement. Tie it to a business outcome (e.g., protecting customer data, maintaining federal contracts). Get leadership sign-off and communicate it to all staff.",
              "Schedule a quarterly stakeholder review of the mission statement. Track changes over time and update whenever business strategy, key contracts, or regulatory obligations change.",
            ],
          },
          {
            id: "GV.OC-02",
            nistRef: "GV.OC-02",
            description: "Do you understand the legal, regulatory, and contractual cybersecurity requirements that apply to your organization?",
            tiers: [
              "Requirements are unknown or ignored",
              "Some requirements are identified but not tracked",
              "Requirements are documented and assigned to owners",
              "Requirements are continuously monitored with proactive updates when regulations change",
            ],
            stepRemediations: [
              "Spend two hours listing every regulation, contract, and framework you are likely subject to (e.g., FAR/DFARS, HIPAA, PCI DSS, state breach notification laws). This is your starting inventory — accuracy matters more than completeness at this stage.",
              "Formalize the inventory: document each requirement, assign an owner, note the compliance deadline or review cycle, and identify any current gaps. Review the list whenever you sign a new contract.",
              "Subscribe to regulatory change alerts (CISA, your industry ISAC, relevant agency newsletters). Assign someone to monitor for changes and trigger a requirements review when updates are published.",
            ],
          },
          {
            id: "GV.OC-03",
            nistRef: "GV.OC-03",
            description: "Are your critical business processes and the assets that support them identified and prioritized for cybersecurity?",
            tiers: [
              "Critical processes are not identified",
              "Some critical processes are informally known",
              "Critical processes and supporting assets are formally documented",
              "Criticality is continuously reassessed and informs security investments",
            ],
            stepRemediations: [
              "Ask each department head: 'What would cause the most damage if it stopped working or was compromised?' Collect the top 3 answers from each. This gives you an informal criticality map.",
              "Formalize the list into a Business Impact Analysis (BIA): for each critical process, document which systems and data it depends on, estimated downtime cost, and recovery priority. Review it annually.",
              "Integrate the BIA into your budget and risk processes. Any time a critical process changes (new system, new vendor, restructuring), trigger a BIA update. Use criticality rankings to drive security investment decisions.",
            ],
          },
          {
            id: "GV.OC-04",
            nistRef: "GV.OC-04",
            description: "Are cybersecurity risk tolerances and appetites established and communicated by leadership?",
            tiers: [
              "No risk tolerance defined",
              "Risk tolerance is informally understood by leadership",
              "Risk tolerance is formally defined and documented",
              "Risk tolerance is reviewed regularly and drives resource allocation decisions",
            ],
            stepRemediations: [
              "In the next leadership meeting, ask two questions: 'What types of security incident would be unacceptable to us?' and 'What is the maximum downtime we could tolerate?' Note the answers informally.",
              "Turn those answers into a one-page Risk Appetite Statement with leadership sign-off. Define what is acceptable, what is tolerable with monitoring, and what is unacceptable. Share it with IT and security staff.",
              "Review the Risk Appetite Statement quarterly alongside the risk register. When risk scores change or new risks emerge, confirm they still fall within stated tolerance. Use tolerance thresholds to justify or reject security budget requests.",
            ],
          },
          {
            id: "GV.OC-05",
            nistRef: "GV.OC-05",
            description: "Are outcomes from cybersecurity activities used to inform business decisions?",
            tiers: [
              "Cybersecurity and business decisions are made independently",
              "Cybersecurity outcomes are occasionally considered in business decisions",
              "A formal process integrates cybersecurity outcomes into business planning",
              "Cybersecurity outcomes continuously inform strategic and operational decisions",
            ],
            stepRemediations: [
              "Start bringing one cybersecurity data point into leadership meetings: open critical vulnerabilities, recent phishing click rate, or patch compliance percentage. The goal is visibility, not action yet.",
              "Add a standing cybersecurity agenda item to monthly leadership meetings. Present one risk update and one metric trend. Document decisions made as a result.",
              "Connect cybersecurity outcomes directly to strategic planning: use assessment scores, incident frequency, and gap closure rates to justify investment, evaluate vendor risk, and inform product roadmap decisions.",
            ],
          },
        ],
      },
      {
        id: "GV.RM",
        name: "Risk Management Strategy",
        subcategories: [
          {
            id: "GV.RM-01",
            nistRef: "GV.RM-01",
            description: "Does your organization have a documented cybersecurity risk management strategy approved by leadership?",
            tiers: [
              "No risk management strategy exists",
              "An informal approach exists but is not documented",
              "A documented strategy is approved by leadership",
              "Strategy is reviewed and updated regularly; improvements are tracked",
            ],
            stepRemediations: [
              "Write down in plain language how your organization currently handles security risks — even if the answer is 'we fix things when they break.' Having it on paper reveals the gaps.",
              "Draft a one-page risk management strategy: how you identify risks, how you score them (likelihood × impact), and how you decide to mitigate, transfer, or accept them. Get it signed by leadership.",
              "Review the strategy annually and after major incidents. Track whether your response decisions led to the expected outcomes. Update the strategy based on what worked and what didn't.",
            ],
          },
          {
            id: "GV.RM-02",
            nistRef: "GV.RM-02",
            description: "Are cybersecurity risk appetite and risk tolerance statements established?",
            tiers: [
              "No appetite or tolerance statements exist",
              "Informally understood by some leaders",
              "Formally documented and communicated",
              "Continuously reviewed and linked to business outcomes",
            ],
            stepRemediations: [
              "Ask leadership: 'What risks are we willing to live with, and what would be a disaster?' Capture answers in meeting notes — this is the seed of your appetite statement.",
              "Write a two-sentence Risk Appetite Statement and a separate Risk Tolerance Statement. Example appetite: 'We accept low-severity risks in non-critical systems.' Example tolerance: 'No unauthorized access to customer PII is acceptable.' Get leadership sign-off.",
              "Review both statements at every risk register review. When new risks emerge, explicitly compare them to the statements. Use the statements to make budget decisions transparent: 'We're investing in X because it addresses an intolerable risk.'",
            ],
          },
          {
            id: "GV.RM-03",
            nistRef: "GV.RM-03",
            description: "Do cybersecurity risk management activities integrate with enterprise risk management (ERM)?",
            tiers: [
              "Cybersecurity risk is managed in isolation",
              "Some ad-hoc coordination with ERM",
              "Cybersecurity risk is formally integrated into ERM processes",
              "Fully integrated; cybersecurity risk is a standing agenda item in ERM reviews",
            ],
            stepRemediations: [
              "Find out who owns enterprise risk management in your organization (CFO, COO, or risk committee). Share your top 3 cybersecurity risks with them and ask if they belong in the broader risk register.",
              "Add cybersecurity risks to the enterprise risk register using the same format as other operational risks. Assign owners, set review cadence, and ensure cyber risks are visible to the same stakeholders as financial and operational risks.",
              "Make cybersecurity a standing agenda item in ERM review meetings. Report on risk trends, new threats, and remediation progress in the same format as other risk categories. Use ERM outcomes to update security priorities.",
            ],
          },
          {
            id: "GV.RM-04",
            nistRef: "GV.RM-04",
            description: "Are strategic-level cybersecurity risks identified and managed?",
            tiers: [
              "No strategic risk identification process",
              "Risks identified reactively after incidents",
              "Strategic risks identified proactively and tracked",
              "Strategic risks continuously monitored with executive dashboards",
            ],
            stepRemediations: [
              "After your next incident or near-miss, document it as a risk: what happened, what could have happened, and what it would take to prevent recurrence. This is reactive risk identification — a starting point.",
              "Hold a quarterly proactive risk review: 'What new threats emerged this quarter? What business changes introduced new risk?' Add findings to a risk register and assign owners.",
              "Build an executive risk dashboard showing your top 5–10 strategic risks, their current scores, trends over time, and owners. Update it monthly. Use it to drive board-level cybersecurity conversations.",
            ],
          },
          {
            id: "GV.RM-05",
            nistRef: "GV.RM-05",
            description: "Are lines of communication established for cybersecurity risks across the organization?",
            tiers: [
              "No formal communication channels",
              "Ad-hoc communication when issues arise",
              "Defined channels for escalating and reporting risks",
              "Regular risk reporting to board and executives; feedback loops in place",
            ],
            stepRemediations: [
              "Define verbally who gets called when a security issue arises. Make sure at least two people know: the primary contact and a backup. Test it by asking staff 'Who would you call if you received a suspicious email?'",
              "Document the escalation path: IT → Manager → CISO/CTO → CEO. Specify what triggers each escalation level. Publish it in your security policy and test it with a tabletop exercise.",
              "Establish a regular risk reporting rhythm: monthly summary to management, quarterly briefing to the board. Create a feedback loop so leadership can ask questions and direct priorities back to the security team.",
            ],
          },
          {
            id: "GV.RM-06",
            nistRef: "GV.RM-06",
            description: "Does your organization use a standardized risk response taxonomy (avoid, transfer, mitigate, accept)?",
            tiers: [
              "No standard risk responses defined",
              "Responses are determined informally case by case",
              "A standard taxonomy is documented and used",
              "Taxonomy is enforced; outcomes are measured and reviewed",
            ],
            stepRemediations: [
              "For your next three risk decisions, explicitly label the response as one of: Avoid (stop the activity), Transfer (insurance/contract), Mitigate (add a control), or Accept (document and monitor). This builds the habit without requiring a formal process yet.",
              "Document a four-option taxonomy and include it in your risk management strategy. Require that every item added to the risk register has a labeled response type with an owner and a due date.",
              "Track the outcomes of past risk responses: Did mitigation controls work? Did transferred risks materialize? Use this data to improve response decisions and update the taxonomy guidance.",
            ],
          },
          {
            id: "GV.RM-07",
            nistRef: "GV.RM-07",
            description: "Are strategic opportunities related to cybersecurity identified and considered in risk decisions?",
            tiers: [
              "Opportunities are never considered in risk decisions",
              "Occasionally considered but not systematically",
              "Opportunities are formally included in risk assessments",
              "Opportunities are continuously evaluated to improve security posture and business value",
            ],
            stepRemediations: [
              "Next time you discuss a security risk, ask: 'Is there an investment here that would also create a business advantage?' Examples: MFA rollout that reduces insurance premiums, or SOC 2 that unlocks enterprise customers.",
              "Add an 'Opportunity' column to your risk register. For each risk, note whether addressing it creates a competitive, financial, or compliance benefit. Include this in risk review discussions.",
              "Incorporate opportunity analysis into strategic planning: evaluate how security investments map to business growth, cost reduction, or market positioning. Track realized benefits alongside risk reduction metrics.",
            ],
          },
        ],
      },
      {
        id: "GV.RR",
        name: "Roles, Responsibilities, and Authorities",
        subcategories: [
          {
            id: "GV.RR-01",
            nistRef: "GV.RR-01",
            description: "Are leadership roles and responsibilities for cybersecurity clearly defined and assigned?",
            tiers: [
              "No roles defined",
              "Roles informally assigned",
              "Roles formally defined in job descriptions or policy",
              "Roles reviewed regularly; accountability is measured and enforced",
            ],
            stepRemediations: [
              "Identify by name who is currently responsible for cybersecurity decisions, even informally. Write it down. If no one is responsible, assign an interim owner today.",
              "Formalize cybersecurity responsibilities in job descriptions for leadership roles: who owns the security program, who approves policy, who gets called during an incident, and who reports to the board.",
              "Review role assignments annually and whenever leadership changes. Measure accountability by tracking whether security owners are meeting their obligations (policy reviews done, incidents reported, risk register updated).",
            ],
          },
          {
            id: "GV.RR-02",
            nistRef: "GV.RR-02",
            description: "Are cybersecurity responsibilities assigned to individuals across all functions, not just IT?",
            tiers: [
              "Cybersecurity is only IT's responsibility",
              "Some non-IT staff have informal cybersecurity duties",
              "Responsibilities are formally assigned across departments",
              "All staff understand their cybersecurity role; responsibilities are enforced",
            ],
            stepRemediations: [
              "Identify one cybersecurity action that each department already does informally (e.g., HR revokes access for departing employees, Finance verifies wire transfers). Acknowledge these as security responsibilities.",
              "Formalize one cybersecurity responsibility per department in writing: HR owns offboarding access revocation, Finance owns payment fraud prevention, Operations owns physical access logs. Include in job descriptions or department policies.",
              "Train all staff on their specific cybersecurity responsibilities. Track completion. Enforce accountability through performance reviews — security responsibilities should be assessed like any other job duty.",
            ],
          },
          {
            id: "GV.RR-03",
            nistRef: "GV.RR-03",
            description: "Are adequate resources (budget, staff, tools) allocated to cybersecurity?",
            tiers: [
              "No dedicated cybersecurity resources",
              "Resources allocated reactively after incidents",
              "Resources budgeted annually based on risk assessments",
              "Resources continuously adjusted based on threat landscape and business needs",
            ],
            stepRemediations: [
              "Identify what you're already spending on security (even indirectly: endpoint protection, email filtering, backup storage). Make it visible as a line item. Zero-budget is a decision — make it a conscious one.",
              "In the next budget cycle, create a dedicated cybersecurity budget line. Industry benchmark: 5–10% of IT budget. At minimum: fund a password manager, MFA solution, and endpoint protection for all staff.",
              "Tie budget requests directly to risk register items. Review resource adequacy quarterly: Are risks being addressed at the rate planned? Adjust allocations when threat landscape or business risk changes.",
            ],
          },
          {
            id: "GV.RR-04",
            nistRef: "GV.RR-04",
            description: "Is cybersecurity risk communicated to and understood by senior leadership and the board?",
            tiers: [
              "Leadership is not informed of cybersecurity risks",
              "Leadership receives ad-hoc security updates",
              "Regular briefings on cybersecurity risk are provided to leadership",
              "Leadership actively engages in cybersecurity decisions; metrics are tracked at the board level",
            ],
            stepRemediations: [
              "Send leadership a one-page summary after your next security event or assessment. Keep it business-language: impact, likelihood, and what you're doing about it. No technical jargon.",
              "Establish a monthly security briefing to leadership: top risks, one metric, one decision needed from them. Build a template and stick to it — consistency builds trust and engagement.",
              "Create a board-level cybersecurity dashboard with 3–5 KPIs tracked over time (e.g., tier score by function, open critical gaps, incident frequency). Present it quarterly. Track whether leadership decisions lead to measurable risk reduction.",
            ],
          },
        ],
      },
      {
        id: "GV.PO",
        name: "Policy",
        subcategories: [
          {
            id: "GV.PO-01",
            nistRef: "GV.PO-01",
            description: "Does your organization have a cybersecurity policy that is approved by leadership and communicated to staff?",
            tiers: [
              "No cybersecurity policy exists",
              "An informal or draft policy exists",
              "A formal policy is approved, documented, and communicated",
              "Policy is reviewed annually, updated as needed, and staff confirm understanding",
            ],
            stepRemediations: [
              "Use the SANS Security Policy Templates (free) as a starting point. Write a one-page acceptable use policy covering passwords, device use, and email. Share it informally with staff this month.",
              "Get the policy formally approved by leadership, publish it in your intranet or employee handbook, and require all staff to acknowledge it in writing within 30 days.",
              "Schedule an annual policy review. Update the policy when regulations, threats, or technology change. Track staff acknowledgements and follow up with anyone who hasn't confirmed they've read it.",
            ],
          },
          {
            id: "GV.PO-02",
            nistRef: "GV.PO-02",
            description: "Are cybersecurity policies reviewed and updated to reflect changes in requirements, threats, and technology?",
            tiers: [
              "Policies are never reviewed after creation",
              "Policies are reviewed after major incidents only",
              "Policies are reviewed on a defined schedule",
              "Policies are continuously reviewed with automated alerts for regulatory changes",
            ],
            stepRemediations: [
              "Add a calendar reminder to review your security policy after any major incident. Also review it whenever you sign a new contract or adopt a significant new technology.",
              "Set an annual policy review date. Create a checklist: Have regulations changed? Have we adopted new technology? Have we had incidents that exposed policy gaps? Update accordingly.",
              "Subscribe to CISA and your industry ISAC alerts. When a relevant regulatory change or major threat is published, immediately assess whether your policies need updating. Track policy version history.",
            ],
          },
        ],
      },
      {
        id: "GV.OV",
        name: "Oversight",
        subcategories: [
          {
            id: "GV.OV-01",
            nistRef: "GV.OV-01",
            description: "Are cybersecurity results reviewed by leadership to inform and adjust strategy?",
            tiers: [
              "No oversight of cybersecurity results by leadership",
              "Informal, occasional review of security outcomes",
              "Formal periodic reviews by leadership",
              "Continuous oversight; outcomes drive real-time strategy adjustments",
            ],
            stepRemediations: [
              "Bring one security outcome to the next leadership meeting: a recent near-miss, a gap you closed, or a new risk identified. Start the habit of leadership visibility into security results.",
              "Schedule a formal quarterly security review with leadership. Present: assessment scores, gaps closed, new risks identified, and budget spent vs. planned. Document decisions made.",
              "Build a real-time security dashboard accessible to leadership. Set up alerts for critical events that require immediate leadership awareness. Tie security outcomes directly to strategic planning cycles.",
            ],
          },
          {
            id: "GV.OV-02",
            nistRef: "GV.OV-02",
            description: "Are cybersecurity risk management outcomes used to update the risk management strategy?",
            tiers: [
              "Outcomes are not used to update strategy",
              "Updates happen reactively after major events",
              "Risk outcomes are periodically reviewed and strategy is updated",
              "Feedback loop is automated; strategy updates are continuous",
            ],
            stepRemediations: [
              "After your next significant incident or risk event, document one change to how you manage that type of risk. Even a small adjustment counts — the goal is to establish the habit.",
              "At each quarterly risk review, ask: 'Did our risk responses work as expected? What should we do differently?' Document one strategy update per review cycle.",
              "Automate the feedback loop: when a risk response is marked complete, require evidence of effectiveness. Feed this data directly into strategy reviews. Track strategy version changes over time.",
            ],
          },
          {
            id: "GV.OV-03",
            nistRef: "GV.OV-03",
            description: "Is organizational performance in cybersecurity measured and reported?",
            tiers: [
              "No performance metrics defined",
              "Metrics tracked informally",
              "Formal metrics collected and reported to leadership",
              "Metrics benchmarked against industry; used to drive investment decisions",
            ],
            stepRemediations: [
              "Pick one metric to start tracking this month: patch compliance rate, open critical vulnerabilities, or phishing simulation click rate. Collect it manually if needed — the habit matters more than the tooling.",
              "Define a small set of 3–5 formal metrics, assign owners to collect them, and report them monthly to leadership in a consistent format. Include trend data after three months.",
              "Benchmark your metrics against industry data (CISA reports, your ISAC, or Verizon DBIR). Use benchmarks to justify investment: 'We're below industry average on X, and here's what it would cost to close the gap.'",
            ],
          },
        ],
      },
      {
        id: "GV.SC",
        name: "Cybersecurity Supply Chain Risk Management",
        subcategories: [
          {
            id: "GV.SC-01",
            nistRef: "GV.SC-01",
            description: "Does your organization have a cybersecurity supply chain risk management program?",
            tiers: [
              "No supply chain risk management",
              "Informal review of major vendors only",
              "Formal program covers all critical vendors",
              "Continuous monitoring of supply chain risk; vendor scorecards maintained",
            ],
            stepRemediations: [
              "List your top 5 vendors by access level (who can reach your systems or data). For each, note what they can access and whether they have a security certification. This is your starting inventory.",
              "Expand the inventory to all vendors. Create a formal review process: before renewing any contract, review the vendor's security posture. Require SOC 2 or equivalent for vendors with sensitive data access.",
              "Assign risk scores to all vendors. Implement continuous monitoring: set Google Alerts for vendors + 'breach', use a vendor risk platform (BitSight, SecurityScorecard), and schedule annual formal reassessments.",
            ],
          },
          {
            id: "GV.SC-02",
            nistRef: "GV.SC-02",
            description: "Are cybersecurity requirements included in contracts with suppliers and third-party providers?",
            tiers: [
              "No cybersecurity requirements in contracts",
              "Requirements added informally on a case-by-case basis",
              "Standard cybersecurity clauses in all vendor contracts",
              "Requirements are tailored by risk level; compliance is audited",
            ],
            stepRemediations: [
              "For your next vendor contract renewal, add one clause: the vendor must notify you within 72 hours of any security incident affecting your data.",
              "Create a standard security addendum for all vendor contracts: incident notification, data handling requirements, right to audit, and minimum security standards. Apply it to all new contracts.",
              "Tier your contract requirements by vendor risk level. High-risk vendors (access to sensitive data) get stricter clauses: mandatory SOC 2 Type II, annual penetration testing, and the right to terminate for security failures. Audit compliance annually.",
            ],
          },
          {
            id: "GV.SC-03",
            nistRef: "GV.SC-03",
            description: "Are supply chain cybersecurity risks identified and assessed before onboarding new suppliers?",
            tiers: [
              "No pre-onboarding risk assessment",
              "Informal checks for high-value suppliers",
              "Formal risk assessment required before onboarding",
              "Continuous reassessment; risk profiles updated after threat intelligence changes",
            ],
            stepRemediations: [
              "Before onboarding your next vendor, ask three questions: Do they have a security certification? Have they had a breach in the last 2 years? Do they encrypt data in transit and at rest? Document the answers.",
              "Create a formal vendor onboarding checklist with pass/fail criteria. Any vendor with access to sensitive data must pass before contract signing. Escalate exceptions to leadership for explicit risk acceptance.",
              "Build a continuous reassessment process: monitor vendors for breach news, review their security posture annually, and re-run the full assessment whenever their access scope changes significantly.",
            ],
          },
          {
            id: "GV.SC-04",
            nistRef: "GV.SC-04",
            description: "Do you maintain an inventory of all suppliers and the systems or data they can access?",
            tiers: [
              "No inventory of suppliers",
              "Partial, informal list maintained",
              "Complete inventory with access details",
              "Inventory is continuously updated and linked to risk ratings",
            ],
            stepRemediations: [
              "Spend two hours listing every vendor your organization pays. Note which ones have any access to your systems, network, or data — even read-only access.",
              "Build a complete vendor register: vendor name, data/systems they access, access type (read/write/admin), contract expiry, point of contact, and last security review date. Review it quarterly.",
              "Link the vendor register to risk ratings. Flag high-risk vendors for continuous monitoring. Automate updates: when a vendor's contract renews or access changes, trigger a register update and risk re-evaluation.",
            ],
          },
          {
            id: "GV.SC-05",
            nistRef: "GV.SC-05",
            description: "Are requirements for notifying you of cybersecurity incidents included in supplier agreements?",
            tiers: [
              "No notification requirements",
              "Informally expected but not contractual",
              "Formal notification clauses in contracts",
              "Notification requirements tested; response playbooks exist for supplier incidents",
            ],
            stepRemediations: [
              "Email your top 5 vendors and ask them: 'What is your process for notifying customers of a security incident?' Their answer tells you where you stand, even before contracts are updated.",
              "Add an incident notification clause to all vendor contracts: vendors must notify you within 72 hours of discovering a security incident that may affect your data or systems.",
              "Test the notification process annually: contact your highest-risk vendors and confirm their notification procedure is current. Create a response playbook for 'our vendor has been breached' so you know exactly what to do when the call comes.",
            ],
          },
          {
            id: "GV.SC-06",
            nistRef: "GV.SC-06",
            description: "Are planning and due diligence performed when acquiring products and services to reduce supply chain risk?",
            tiers: [
              "No due diligence process",
              "Ad-hoc review before major purchases",
              "Defined due diligence process for all acquisitions",
              "Risk-based due diligence with continuous post-acquisition monitoring",
            ],
            stepRemediations: [
              "Before approving your next software or service purchase, spend 15 minutes checking: Is there a published security page? Any recent CVEs? Any public breach history? Bring findings to the purchase decision.",
              "Create a due diligence checklist for all acquisitions above a defined threshold. Include: security certifications, CVE history, privacy policy review, and data handling documentation. File results with procurement records.",
              "Implement risk-tiered due diligence: minimal checks for low-risk tools, full security review for vendors with sensitive data access. Add post-acquisition monitoring for critical vendors: track CVEs, breach news, and certification renewals.",
            ],
          },
          {
            id: "GV.SC-07",
            nistRef: "GV.SC-07",
            description: "Are the risks posed by products and services from suppliers monitored on an ongoing basis?",
            tiers: [
              "No ongoing monitoring",
              "Reactive monitoring after reported incidents",
              "Periodic review of supplier risk",
              "Continuous monitoring with automated threat feeds and vendor security scores",
            ],
            stepRemediations: [
              "Set up Google Alerts for your top 10 vendors with search terms '[vendor name] breach' and '[vendor name] security incident'. This gives you free reactive monitoring with minimal effort.",
              "Conduct an annual formal review of all critical vendors: check for new CVEs in products they provide, review any changes to their security certifications, and confirm your contract terms are still adequate.",
              "Implement continuous monitoring using a vendor risk platform (BitSight, SecurityScorecard, or RiskRecon) or automated feeds from your ISAC. Set alert thresholds that trigger immediate review when a vendor's risk score drops significantly.",
            ],
          },
          {
            id: "GV.SC-08",
            nistRef: "GV.SC-08",
            description: "Are cybersecurity risks related to software development or modification by suppliers addressed?",
            tiers: [
              "No controls on supplier software development",
              "Informal code review for critical suppliers",
              "Formal SDLC requirements included in supplier contracts",
              "Suppliers must demonstrate SDLC compliance; SBOMs required",
            ],
            stepRemediations: [
              "For any vendor delivering custom code, ask: 'Do you perform code review and vulnerability scanning before releasing software to us?' Document the answer and flag if it's no.",
              "Add SDLC requirements to contracts for software-delivering vendors: mandatory code review, SAST scanning, and a defined process for patching vulnerabilities in delivered code. Require notification when vulnerabilities are found post-delivery.",
              "Require vendors to provide a Software Bill of Materials (SBOM) with each delivery. Use it to track known vulnerabilities in third-party dependencies. Audit vendor SDLC compliance annually.",
            ],
          },
          {
            id: "GV.SC-09",
            nistRef: "GV.SC-09",
            description: "Do you understand and manage the cybersecurity risks of using open source software?",
            tiers: [
              "Open source risks are not considered",
              "Open source use is tracked informally",
              "Policy governs open source use; license and vulnerability reviews required",
              "Automated scanning for open source vulnerabilities; SBOM maintained",
            ],
            stepRemediations: [
              "Run a free dependency vulnerability scan on your codebase this week: `npm audit`, `pip-audit`, or OWASP Dependency-Check. Review critical findings — this is your baseline.",
              "Create an open source policy: all open source components must be reviewed for license compatibility and known CVEs before use. Add dependency scanning to your CI pipeline.",
              "Maintain a Software Bill of Materials (SBOM) for all internally developed software. Set up automated CVE scanning that alerts when a new vulnerability is published for a dependency you use. Establish a patching SLA for critical CVEs.",
            ],
          },
          {
            id: "GV.SC-10",
            nistRef: "GV.SC-10",
            description: "Are cybersecurity supply chain risk management activities integrated with broader risk management?",
            tiers: [
              "Supply chain risk is managed separately",
              "Occasional coordination with risk management",
              "Supply chain risk is a formal input to enterprise risk management",
              "Fully integrated; supply chain risks appear in the enterprise risk register",
            ],
            stepRemediations: [
              "Add your top 2 vendor risks to your risk register — treat them the same as internal risks. Assign an owner and a response decision.",
              "Integrate vendor risk reviews into your quarterly risk management cycle. Ensure supply chain risks are visible to the same leadership audience as financial and operational risks.",
              "Automate the connection: when a vendor's risk score changes significantly, automatically update the enterprise risk register entry. Include supply chain risk metrics in executive risk reporting.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "ID",
    name: "Identify",
    categories: [
      {
        id: "ID.AM",
        name: "Asset Management",
        subcategories: [
          {
            id: "ID.AM-01",
            nistRef: "ID.AM-01",
            description: "Do you maintain an inventory of all hardware assets (computers, servers, network devices)?",
            tiers: [
              "No hardware inventory exists",
              "Partial inventory maintained informally",
              "Complete, documented inventory with ownership assigned",
              "Inventory is continuously updated and integrated with security monitoring tools",
            ],
            stepRemediations: [
              "Spend one day walking through your office and listing every device: laptops, desktops, servers, routers, switches, printers. Use a spreadsheet. Record make, model, owner, and location.",
              "Migrate to a formal asset inventory tool (free options: Snipe-IT, OCS Inventory). Assign an owner to every device. Set a policy that all new hardware is added before deployment.",
              "Integrate the inventory with your security monitoring tools (EDR, vulnerability scanner) so every device in the inventory is automatically enrolled in scanning. Alert on devices present in the network but absent from the inventory.",
            ],
          },
          {
            id: "ID.AM-02",
            nistRef: "ID.AM-02",
            description: "Do you maintain an inventory of all software applications and platforms in use?",
            tiers: [
              "No software inventory exists",
              "Partial inventory maintained informally",
              "Complete software inventory with version and licensing data",
              "Software inventory is continuously updated; unauthorized software is automatically detected",
            ],
            stepRemediations: [
              "List all software used across the organization: OS versions, SaaS apps, desktop applications, and internally developed tools. A spreadsheet is fine to start. Focus on completeness over detail.",
              "Add version numbers, license status, vendor support dates, and owner information to every entry. Flag anything that is end-of-life or unlicensed.",
              "Automate software inventory with your MDM or endpoint management tool. Set up automated detection of new software installations. Alert on unauthorized or unlicensed software.",
            ],
          },
          {
            id: "ID.AM-03",
            nistRef: "ID.AM-03",
            description: "Are network communications and data flows documented and understood?",
            tiers: [
              "No network documentation",
              "Partial, informal network diagrams",
              "Documented network topology and data flows",
              "Network documentation is continuously updated and used for security analysis",
            ],
            stepRemediations: [
              "Draw a simple network diagram showing: internet connection, firewall, internal network segments, and where servers/workstations sit. Use draw.io (free). Focus on accuracy over completeness.",
              "Add data flow annotations: where does sensitive data originate, how does it move between systems, and where does it leave the organization? Validate the diagram against your actual network configuration.",
              "Automate network discovery (Nmap, your firewall's visibility tools) to detect new devices and connections. Set up alerts for unexpected traffic flows. Update the diagram whenever architecture changes.",
            ],
          },
          {
            id: "ID.AM-04",
            nistRef: "ID.AM-04",
            description: "Are external information systems (e.g., cloud services, partner systems) inventoried and assessed?",
            tiers: [
              "No inventory of external systems",
              "Key external systems informally tracked",
              "All external systems inventoried with risk assessment",
              "External systems continuously monitored; risk assessments updated when systems change",
            ],
            stepRemediations: [
              "List every cloud service and external system your organization uses (AWS, Google Workspace, Salesforce, GitHub, etc.). Note what data each holds. A spreadsheet is sufficient to start.",
              "For each external system, document: data classification, who has access, whether it has a SOC 2 or equivalent report, and the last time you reviewed its security configuration.",
              "Monitor external systems continuously: subscribe to their security bulletins, review their SOC 2 reports annually, and reassess when they announce major changes. Include them in your vendor risk program.",
            ],
          },
          {
            id: "ID.AM-05",
            nistRef: "ID.AM-05",
            description: "Are assets prioritized based on their classification, criticality, and business value?",
            tiers: [
              "No asset prioritization",
              "Critical assets informally identified",
              "Assets formally classified and prioritized",
              "Prioritization continuously updated based on business changes and threat intelligence",
            ],
            stepRemediations: [
              "Mark 10–15 assets in your inventory as 'critical' based on intuition: your most important servers, the systems holding customer data, the tools revenue depends on. This informal classification is the starting point.",
              "Apply a formal classification scheme to all assets: High (customer data, production systems, financial records), Medium (internal tools, non-sensitive business data), Low (test systems, public information). Apply your strongest controls to High assets.",
              "Review asset classifications quarterly and whenever the business changes. Tie classification levels directly to security control requirements: encryption, access controls, monitoring, and backup frequency should all vary by classification.",
            ],
          },
          {
            id: "ID.AM-07",
            nistRef: "ID.AM-07",
            description: "Are inventories of data, including sensitive and regulated data, maintained?",
            tiers: [
              "No data inventory",
              "Key data stores informally identified",
              "Formal data inventory with classification labels",
              "Data inventory continuously updated; data flows tracked in real time",
            ],
            stepRemediations: [
              "List the top 5 places where sensitive data lives in your organization: which databases, file shares, cloud storage, and email systems hold PII, financial data, health information, or CUI.",
              "Create a formal data inventory: data type, classification (PII, PHI, CUI, financial), location, owner, who can access it, and which regulation governs it. Review it when new systems are added.",
              "Automate data discovery using DLP tools (Microsoft Purview, Varonis, or open-source alternatives). Track data flows in real time. Alert when sensitive data appears in unexpected locations or moves outside approved boundaries.",
            ],
          },
          {
            id: "ID.AM-08",
            nistRef: "ID.AM-08",
            description: "Are systems, hardware, software, and data managed throughout their life cycles (procurement to disposal)?",
            tiers: [
              "No lifecycle management",
              "Lifecycle tracked for critical assets only",
              "Formal lifecycle management for all assets",
              "Lifecycle integrated with security controls; decommissioning includes data sanitization audits",
            ],
            stepRemediations: [
              "Add an end-of-life (EOL) date field to your asset inventory for hardware and software. Flag anything already past EOL or within 12 months of it.",
              "Create a formal decommissioning checklist: revoke all access, wipe data using NIST 800-88 guidelines, update the inventory, and notify affected users. Run it for every device or system retired.",
              "Integrate lifecycle status into your security controls: assets approaching EOL should trigger a replacement plan 6–12 months in advance. Automate decommissioning workflows so nothing gets missed when a system is retired.",
            ],
          },
        ],
      },
      {
        id: "ID.RA",
        name: "Risk Assessment",
        subcategories: [
          {
            id: "ID.RA-01",
            nistRef: "ID.RA-01",
            description: "Are vulnerabilities in your assets identified and documented?",
            tiers: [
              "No vulnerability identification process",
              "Vulnerabilities identified reactively after incidents",
              "Regular vulnerability scans performed and results documented",
              "Continuous vulnerability scanning with automated prioritization and remediation tracking",
            ],
            stepRemediations: [
              "Run a free vulnerability scan this week on your most critical systems: Tenable Nessus Essentials (free for up to 32 IPs) or OpenVAS. Document every critical and high finding — this is your baseline.",
              "Establish a regular scan cadence (monthly at minimum). Create a vulnerability tracking spreadsheet: finding, severity, affected asset, owner, due date, status. Define SLAs: critical = 7 days, high = 30 days.",
              "Move to continuous scanning using an automated platform. Integrate findings directly into your ticketing system. Track mean time to remediate (MTTR) by severity. Report patch compliance metrics to leadership monthly.",
            ],
          },
          {
            id: "ID.RA-02",
            nistRef: "ID.RA-02",
            description: "Do you use cyber threat intelligence from external sources to understand threats relevant to your organization?",
            tiers: [
              "No threat intelligence used",
              "Informal monitoring of public threat news",
              "Formal threat intelligence subscription or ISAC membership",
              "Threat intelligence integrated with security tools and drives proactive controls",
            ],
            stepRemediations: [
              "Subscribe to CISA's free alert emails (cisa.gov/subscribe-updates-cisa). Set up Google Alerts for your industry + 'cyber attack'. Spend 15 minutes per week reviewing what's relevant to your organization.",
              "Join your industry's Information Sharing and Analysis Center (ISAC) — most offer free or low-cost membership. Subscribe to the NIST NVD for CVE notifications. Assign someone to review and act on intelligence weekly.",
              "Integrate threat intelligence feeds directly into your security tooling: block known-malicious IPs and domains at the firewall, update your EDR with new indicators of compromise, and use threat intel to prioritize vulnerability remediation.",
            ],
          },
          {
            id: "ID.RA-03",
            nistRef: "ID.RA-03",
            description: "Are internal and external threats to assets identified and documented?",
            tiers: [
              "Threats not identified",
              "Threats identified informally when they arise",
              "Formal threat identification process with documented threat library",
              "Threat identification continuously updated with intelligence feeds",
            ],
            stepRemediations: [
              "List your top 5 threats based on what worries you most: ransomware, phishing, credential theft, insider threat, supply chain compromise. Don't overthink it — your intuition is a valid starting point.",
              "Build a formal threat library using the STRIDE model or MITRE ATT&CK. Document each threat: source (external/internal), target assets, likely attack method, and current controls. Review quarterly.",
              "Continuously update the threat library using intelligence feeds, incident reports from your ISAC, and post-incident findings. Map threats to MITRE ATT&CK techniques and use the mapping to evaluate control coverage.",
            ],
          },
          {
            id: "ID.RA-04",
            nistRef: "ID.RA-04",
            description: "Are the potential business impacts and likelihoods of cybersecurity threats assessed?",
            tiers: [
              "No impact or likelihood assessment",
              "Informal assessment for major known threats",
              "Formal risk assessment methodology applied to identified threats",
              "Quantitative risk assessments updated continuously; linked to financial impact models",
            ],
            stepRemediations: [
              "For each threat in your threat list, gut-check: How likely is this in the next 12 months (Low/Medium/High)? How bad would it be (Low/Medium/High)? Write it down — this is qualitative risk assessment.",
              "Apply a numerical scoring system: likelihood 1–5, impact 1–5, risk score = likelihood × impact. Use NIST SP 800-30 as a free methodology reference. Document scores with rationale and review quarterly.",
              "Move toward quantitative assessment: estimate financial impact for your top 5 risks using FAIR methodology or your cyber insurance carrier's models. Tie risk scores to specific dollar ranges so budget decisions can be justified numerically.",
            ],
          },
          {
            id: "ID.RA-05",
            nistRef: "ID.RA-05",
            description: "Are threats, vulnerabilities, likelihoods, and impacts used to determine and prioritize risk?",
            tiers: [
              "Risks not prioritized",
              "Risks prioritized informally by experienced staff",
              "Formal risk register with prioritization criteria",
              "Risk prioritization automated; continuously updated and reported to leadership",
            ],
            stepRemediations: [
              "Take your threat list and vulnerability findings and sort them by gut-feel severity. The goal is to have a rough priority order — something is better than nothing for directing limited resources.",
              "Create a risk register: risk description, threat source, affected asset, likelihood, impact, risk score, owner, response decision, and status. Use score to prioritize — address the highest scores first.",
              "Automate risk scoring: feed vulnerability scanner output and threat intelligence into your risk register automatically. Report the top 10 risks to leadership monthly. Trigger re-prioritization whenever a new critical vulnerability or threat is identified.",
            ],
          },
          {
            id: "ID.RA-06",
            nistRef: "ID.RA-06",
            description: "Are risk responses (mitigation, transfer, avoidance, acceptance) identified and prioritized?",
            tiers: [
              "No formal risk response process",
              "Responses decided case by case",
              "Formal risk response options documented and approved",
              "Responses continuously reviewed and adjusted; effectiveness measured",
            ],
            stepRemediations: [
              "For your top 5 risks, decide right now: Mitigate (add a control), Transfer (insure), Avoid (stop the activity), or Accept (document it consciously). Note who made the decision and when.",
              "Formalize the process: all risks in the register must have a documented response decision with an owner, a due date, and leadership approval for accepted risks above a defined threshold.",
              "Track response effectiveness: after each mitigation is completed, verify it reduced the risk score. Review accepted risks quarterly to confirm the rationale is still valid. Report response completion rates to leadership.",
            ],
          },
          {
            id: "ID.RA-07",
            nistRef: "ID.RA-07",
            description: "Are changes to your environment and new risks identified and assessed on an ongoing basis?",
            tiers: [
              "Risk assessment is a one-time activity",
              "Assessments triggered by major changes only",
              "Scheduled periodic reassessments and change-triggered reviews",
              "Continuous risk assessment; automated detection of environmental changes triggers reassessment",
            ],
            stepRemediations: [
              "After your next system change, vendor addition, or business restructuring, spend 15 minutes asking: 'What new risks does this introduce?' Write down the answer. Start associating change with risk review.",
              "Add a risk assessment step to your change management process. Any significant change (new system, new vendor, architectural change, major hire) triggers a risk review. Conduct full reassessments quarterly.",
              "Automate change detection: use your asset inventory, cloud infrastructure tools, and configuration management to alert on environmental changes. Each alert triggers a risk reassessment workflow.",
            ],
          },
        ],
      },
      {
        id: "ID.IM",
        name: "Improvement",
        subcategories: [
          {
            id: "ID.IM-01",
            nistRef: "ID.IM-01",
            description: "Are improvements to cybersecurity identified from evaluations and assessments?",
            tiers: [
              "No improvement identification process",
              "Improvements identified informally after incidents",
              "Formal lessons-learned reviews after assessments and incidents",
              "Continuous improvement process; findings tracked to closure with metrics",
            ],
            stepRemediations: [
              "After your next assessment or audit, write down three things you would do differently. Even if you never formalize the list, you're building the improvement mindset.",
              "Create a findings tracker after every assessment: finding, severity, owner, due date, status. Review it monthly until all items are closed or formally accepted by leadership.",
              "Track improvement metrics over time: how many findings were identified, how many were closed on time, and how your assessment scores change between cycles. Report these trends to leadership quarterly.",
            ],
          },
          {
            id: "ID.IM-02",
            nistRef: "ID.IM-02",
            description: "Are improvements to cybersecurity identified from security tests and exercises?",
            tiers: [
              "No security testing or exercises performed",
              "Ad-hoc testing occasionally performed",
              "Regular penetration tests and tabletop exercises; findings tracked",
              "Continuous testing program; red team exercises and findings drive security roadmap",
            ],
            stepRemediations: [
              "Run a tabletop exercise this quarter. Scenario: 'We received a ransomware demand at 9am Monday. Walk through what we do in the first hour.' No tools needed — just a conference room and the right people. Document the gaps you discover.",
              "Establish a regular testing cadence: annual penetration test by an external vendor, and quarterly tabletop exercises. Track all findings in your improvement tracker and assign owners.",
              "Build a continuous testing program: red team engagements, automated adversarial simulation (BAS tools), and frequent tabletops for different scenarios. Use findings to drive the security roadmap and justify budget.",
            ],
          },
          {
            id: "ID.IM-03",
            nistRef: "ID.IM-03",
            description: "Are improvements to cybersecurity identified from execution of operational processes?",
            tiers: [
              "Operational experience not used to improve security",
              "Lessons learned occasionally captured",
              "Formal process to capture and act on operational improvements",
              "Continuous feedback loops; operational data drives automated improvement recommendations",
            ],
            stepRemediations: [
              "Create a simple security feedback channel — a Slack channel, email alias, or shared doc — where staff can report friction, near-misses, or security concerns. Review it monthly.",
              "Establish a formal process to review operational feedback quarterly. Identify patterns, prioritize actionable improvements, and track them to closure. Report outcomes back to staff to encourage continued participation.",
              "Automate the feedback loop: use operational metrics (alert response times, patch cycle completion, training completion rates) to automatically surface improvement recommendations. Feed these into your security roadmap.",
            ],
          },
          {
            id: "ID.IM-04",
            nistRef: "ID.IM-04",
            description: "Are improvements to cybersecurity identified from incidents and near-misses?",
            tiers: [
              "Incidents not analyzed for improvement",
              "Post-incident reviews happen occasionally",
              "Formal post-incident reviews with action items tracked to closure",
              "Incidents automatically trigger improvement workflows; trends analyzed for systemic issues",
            ],
            stepRemediations: [
              "After your next security incident or near-miss, hold a 30-minute conversation: What happened? Why? What would have prevented it? Write down one concrete action item with an owner.",
              "Formalize post-incident reviews for all P1 and P2 incidents within 5 business days. Use the 5 Whys to identify root cause. Track all action items to closure. Share findings with leadership.",
              "Build an automated improvement workflow: every declared incident triggers a post-incident review task. Analyze trends across incidents quarterly to identify systemic issues. Use aggregate findings to inform strategic security investments.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "PR",
    name: "Protect",
    categories: [
      {
        id: "PR.AA",
        name: "Identity Management, Authentication, and Access Control",
        subcategories: [
          {
            id: "PR.AA-01",
            nistRef: "PR.AA-01",
            description: "Are identities and credentials managed for all authorized users, services, and hardware?",
            tiers: [
              "No formal identity management",
              "Identities managed informally; no central directory",
              "Central identity management system with defined provisioning process",
              "Automated identity lifecycle management; just-in-time access provisioning",
            ],
            stepRemediations: [
              "Audit your user accounts: list every account across all systems. Identify shared accounts, orphaned accounts (former employees), and service accounts with human credentials. Disable everything that shouldn't be active.",
              "Implement a central identity provider (Azure AD/Entra ID, Google Workspace, or Okta). Define a provisioning process: new hire checklist, access request approval, and offboarding revocation within 24 hours of departure.",
              "Automate the identity lifecycle: integrate your IdP with HR systems so provisioning and deprovisioning happen automatically. Implement just-in-time access for privileged roles — temporary elevation instead of permanent admin rights.",
            ],
          },
          {
            id: "PR.AA-02",
            nistRef: "PR.AA-02",
            description: "Are identities proven and bound to credentials at authentication?",
            tiers: [
              "No authentication controls; shared credentials common",
              "Basic username/password authentication",
              "Multi-factor authentication (MFA) required for privileged and remote access",
              "MFA enforced for all users and systems; phishing-resistant MFA for privileged accounts",
            ],
            stepRemediations: [
              "Eliminate all shared credentials immediately. Assign individual accounts to every person. Enforce a minimum password length of 14 characters and require a password manager (Bitwarden is free).",
              "Enable MFA on your highest-risk accounts first: email, VPN, admin consoles, and cloud platforms. Use an authenticator app (not SMS). Microsoft Authenticator and Google Authenticator are free.",
              "Enforce MFA for all users without exception. For privileged accounts (admins, executives), require phishing-resistant MFA such as FIDO2/passkeys or hardware security keys. Block any authentication without MFA at the identity provider level.",
            ],
          },
          {
            id: "PR.AA-03",
            nistRef: "PR.AA-03",
            description: "Are users, services, and hardware authenticated before granting access?",
            tiers: [
              "Authentication not consistently enforced",
              "Authentication required but inconsistently applied",
              "Authentication enforced for all systems and services",
              "Continuous authentication and session validation; anomalous access triggers alerts",
            ],
            stepRemediations: [
              "Audit all systems for unauthenticated access points: open file shares, unprotected internal web apps, and APIs without authentication. Document every finding. Disable anonymous access on anything sensitive.",
              "Require authentication on every system and service — no exceptions. Ensure all internal web apps and APIs require login. Disable or block access to any system that cannot be protected with authentication.",
              "Implement continuous session validation: set short session timeouts, require re-authentication after inactivity, and monitor for anomalous access patterns (unusual hours, unexpected geolocations, impossible travel). Alert on suspicious sessions.",
            ],
          },
          {
            id: "PR.AA-04",
            nistRef: "PR.AA-04",
            description: "Are identity assertions (tokens, certificates) protected and managed?",
            tiers: [
              "No management of identity tokens or certificates",
              "Certificates managed manually and informally",
              "Formal certificate lifecycle management; tokens validated and expired",
              "Automated certificate management; short-lived credentials preferred; revocation monitored",
            ],
            stepRemediations: [
              "Inventory all TLS certificates: which domains they cover and when they expire. Set calendar alerts 60 days before each expiry. This prevents the most common certificate failure mode — forgetting to renew.",
              "Implement a formal certificate lifecycle process: centralized tracking, defined renewal ownership, and validation that expired certificates are replaced before cutover. Rotate API keys and service tokens on a defined schedule (annually at minimum).",
              "Automate certificate management using Let's Encrypt or your cloud provider's ACM. Prefer short-lived certificates and credentials. Monitor for certificate misuse and revocation events. Implement certificate transparency log monitoring.",
            ],
          },
          {
            id: "PR.AA-05",
            nistRef: "PR.AA-05",
            description: "Is access to assets granted using least privilege principles?",
            tiers: [
              "No access controls; users have broad permissions",
              "Access controls exist but are not regularly reviewed",
              "Least privilege enforced; access reviews performed periodically",
              "Automated access reviews; just-in-time access; privilege escalation requires approval",
            ],
            stepRemediations: [
              "Identify your 5 most over-privileged accounts: who has admin rights they don't use regularly? Remove those rights today. Focus on accounts with access to sensitive data or production systems.",
              "Conduct a quarterly access review for all privileged and sensitive-data accounts. Remove any access that isn't clearly tied to a current job requirement. Apply least privilege to all new access requests by default.",
              "Automate access reviews using your IdP's access certification features. Implement just-in-time privileged access: admins request elevation, it's approved, they get temporary access, it automatically expires. No permanent admin rights.",
            ],
          },
          {
            id: "PR.AA-06",
            nistRef: "PR.AA-06",
            description: "Is physical access to assets managed and monitored?",
            tiers: [
              "No physical access controls",
              "Basic physical controls (locks) without logging",
              "Access cards, logs, and visitor management in place",
              "Physical access continuously monitored; anomalies automatically alerted",
            ],
            stepRemediations: [
              "Lock your server room and any area with network equipment. Require all visitors to sign in with name, time, host, and purpose. Revoke physical access within 24 hours of an employee's departure.",
              "Implement access card or key fob entry for restricted areas. Log all access events. Maintain a visitor log with photo ID verification. Review access logs after any security event.",
              "Deploy continuous physical access monitoring: integrate badge access logs with your security monitoring platform. Alert on after-hours access to server rooms, tailgating detection, or access by accounts that have been deprovisioned.",
            ],
          },
        ],
      },
      {
        id: "PR.AT",
        name: "Awareness and Training",
        subcategories: [
          {
            id: "PR.AT-01",
            nistRef: "PR.AT-01",
            description: "Do all staff receive cybersecurity awareness training?",
            tiers: [
              "No security awareness training",
              "Ad-hoc training when incidents occur",
              "Annual security awareness training required for all staff",
              "Continuous training with role-based modules, phishing simulations, and effectiveness tracking",
            ],
            stepRemediations: [
              "Send all staff one security awareness resource this month: a short video (CISA has free ones), a phishing awareness tip sheet, or a 10-minute micro-training module. Track who completed it.",
              "Enroll all staff in a formal annual security awareness training platform (KnowBe4 free tier, Proofpoint, or CISA's free resources). Require completion within 30 days of hire and annually thereafter. Track completion rates.",
              "Move to continuous training: monthly micro-modules, quarterly phishing simulations, and role-specific training for high-risk roles. Measure effectiveness through phishing click rates and quiz scores. Report trends to leadership.",
            ],
          },
          {
            id: "PR.AT-02",
            nistRef: "PR.AT-02",
            description: "Do individuals with privileged access receive role-specific cybersecurity training?",
            tiers: [
              "No specialized training for privileged users",
              "Informal guidance provided to privileged users",
              "Formal role-based training required for privileged access",
              "Advanced training with certification requirements; training updated for new threats",
            ],
            stepRemediations: [
              "Share SANS security cheat sheets and posters (free) with everyone who has admin or elevated access. Follow up with a 30-minute discussion on privileged access risks.",
              "Require formal role-based training as a condition of privileged access. Define what training is required for each role (sysadmin, DBA, cloud admin) and track completion. Revoke access if training lapses.",
              "Require a recognized security certification (CompTIA Security+, GIAC GSEC, or equivalent) for your most privileged admins. Update training content when new attack techniques emerge. Test knowledge retention with practical exercises.",
            ],
          },
        ],
      },
      {
        id: "PR.DS",
        name: "Data Security",
        subcategories: [
          {
            id: "PR.DS-01",
            nistRef: "PR.DS-01",
            description: "Is data at rest protected using appropriate safeguards (e.g., encryption)?",
            tiers: [
              "No encryption or protection of data at rest",
              "Sensitive data encrypted informally or partially",
              "All sensitive data encrypted at rest per policy",
              "Encryption enforced and monitored; key management is automated and audited",
            ],
            stepRemediations: [
              "Enable full-disk encryption on all laptops and workstations today: BitLocker on Windows and FileVault on Mac are built-in and free. This takes under an hour per device and protects against physical theft.",
              "Encrypt all sensitive data stores: cloud storage buckets, databases, and file servers holding classified data. Define a data-at-rest encryption policy specifying which data types require encryption.",
              "Implement formal key management: rotate encryption keys on a defined schedule, audit key access, and use a key management service (AWS KMS, Azure Key Vault, or HashiCorp Vault). Monitor for unauthorized decryption attempts.",
            ],
          },
          {
            id: "PR.DS-02",
            nistRef: "PR.DS-02",
            description: "Is data in transit protected using appropriate safeguards (e.g., encryption)?",
            tiers: [
              "No encryption of data in transit",
              "Encryption used inconsistently",
              "All data in transit encrypted using current standards (TLS 1.2+)",
              "Encryption enforced everywhere; certificates monitored for expiration and strength",
            ],
            stepRemediations: [
              "Test your public-facing web properties at SSL Labs (ssllabs.com/ssltest — free). Fix any failing grades. Redirect all HTTP traffic to HTTPS. This is the most visible data-in-transit gap.",
              "Enforce TLS 1.2+ everywhere: disable TLS 1.0 and 1.1 on all systems, enforce HTTPS for all internal web apps, and require TLS for all database connections and API calls.",
              "Implement continuous certificate monitoring: automate renewals (Let's Encrypt), monitor for weak cipher suites, and alert on certificate expiry or unexpected changes. Enforce HSTS headers on all web properties.",
            ],
          },
          {
            id: "PR.DS-10",
            nistRef: "PR.DS-10",
            description: "Is data in use protected from unauthorized access and disclosure?",
            tiers: [
              "No controls on data in use",
              "Informal controls for highly sensitive data",
              "DLP or similar controls restrict data in use",
              "Continuous monitoring of data in use; automated enforcement and alerting",
            ],
            stepRemediations: [
              "Identify your highest-risk data-in-use scenario: employees emailing sensitive data externally, copying files to USB drives, or pasting data into unauthorized apps. Address that one scenario first.",
              "Configure basic DLP rules in your email gateway and cloud productivity suite: warn or block when sensitive data patterns (SSNs, credit card numbers, CUI) are sent externally. Microsoft Purview and Google Workspace have built-in DLP.",
              "Deploy comprehensive DLP with endpoint agents, cloud monitoring, and network inspection. Set up continuous monitoring and automated enforcement. Alert on policy violations and review trends monthly.",
            ],
          },
          {
            id: "PR.DS-11",
            nistRef: "PR.DS-11",
            description: "Are backups of data created, maintained, and tested for recovery?",
            tiers: [
              "No backups exist",
              "Backups taken occasionally without testing",
              "Regular backups with periodic recovery tests",
              "Automated backups; continuous recovery testing; immutable backup copies maintained",
            ],
            stepRemediations: [
              "Implement basic automated backups for your most critical data today. Cloud solutions (AWS S3, Azure Backup, Backblaze) are inexpensive and require minimal setup. Having any backup is dramatically better than none.",
              "Apply the 3-2-1 rule: 3 copies, 2 different media, 1 offsite. Automate daily backups. Test recovery quarterly by actually restoring data to a test environment — untested backups are not backups.",
              "Implement immutable backup storage (write-once, cannot be encrypted by ransomware). Automate recovery testing. Define and test your RTO and RPO. Monitor backup job success/failure and alert on failures immediately.",
            ],
          },
        ],
      },
      {
        id: "PR.PS",
        name: "Platform Security",
        subcategories: [
          {
            id: "PR.PS-01",
            nistRef: "PR.PS-01",
            description: "Are IT assets configured using secure baselines (hardening standards)?",
            tiers: [
              "No hardening standards applied",
              "Hardening applied informally for critical systems",
              "Documented hardening baselines applied to all systems",
              "Baselines enforced via automation; configuration drift automatically detected and remediated",
            ],
            stepRemediations: [
              "Download the CIS Benchmark Level 1 for your primary OS (free at cisecurity.org). Apply the top 10 recommendations to your most critical server or workstation image. Focus on: disabling unused services, password policies, firewall, and audit logging.",
              "Apply CIS Level 1 baselines to all system types in your environment. Document the baseline configuration. Include baseline checks in your new system deployment process.",
              "Enforce baselines via automation: use Group Policy, Ansible, or your MDM to apply and maintain configurations. Implement continuous compliance monitoring (OpenSCAP is free). Alert on configuration drift and auto-remediate where possible.",
            ],
          },
          {
            id: "PR.PS-02",
            nistRef: "PR.PS-02",
            description: "Is software maintained and patched on a regular basis?",
            tiers: [
              "Patching done only when systems break",
              "Critical patches applied reactively",
              "Defined patch management process with SLA for critical patches",
              "Automated patching; patch compliance reported continuously to leadership",
            ],
            stepRemediations: [
              "Enable automatic OS and application updates on all end-user devices today. For servers, subscribe to vendor security bulletins and patch critical vulnerabilities within 7 days of release.",
              "Define a formal patch management policy with SLAs: critical CVEs patched within 7 days, high within 30 days, medium within 90 days. Track compliance per asset. Report on overdue patches weekly.",
              "Automate patching using Windows Update for Business, Jamf (Mac), or a unified patch management platform (NinjaRMM, Automox). Report patch compliance rates to leadership monthly. Integrate with your vulnerability scanner to prioritize by exploitability.",
            ],
          },
          {
            id: "PR.PS-03",
            nistRef: "PR.PS-03",
            description: "Are hardware assets maintained and protected throughout their lifecycle?",
            tiers: [
              "No hardware maintenance process",
              "Hardware maintained reactively",
              "Scheduled maintenance with end-of-life tracking",
              "Automated hardware lifecycle management; end-of-life assets automatically flagged",
            ],
            stepRemediations: [
              "Add end-of-life (EOL) dates to your hardware inventory. Flag any device already past vendor support. Make a list of what needs to be replaced in the next 12 months.",
              "Create a hardware maintenance schedule: annual firmware updates, warranty renewals for critical hardware, and a replacement budget for EOL devices. Include these in your annual IT budget planning.",
              "Automate lifecycle tracking: your MDM or asset management tool should flag EOL devices automatically and trigger a replacement workflow 6–12 months in advance. Track hardware refresh rates as a security metric.",
            ],
          },
          {
            id: "PR.PS-04",
            nistRef: "PR.PS-04",
            description: "Are logs from security systems and applications generated and retained?",
            tiers: [
              "No logging in place",
              "Logs generated but not reviewed or retained",
              "Logs retained per policy; reviewed periodically",
              "Centralized SIEM; logs reviewed continuously; retention meets compliance requirements",
            ],
            stepRemediations: [
              "Enable logging on your three most critical systems: Windows Event Logs (authentication + privilege use), firewall deny logs, and cloud access logs (AWS CloudTrail or Azure Monitor). Confirm logs are being generated.",
              "Define a log retention policy (90 days minimum, 1 year for regulated environments). Centralize logs in one place (even a cloud storage bucket is better than distributed local logs). Review logs weekly for anomalies.",
              "Deploy a SIEM (Elastic Stack is free self-hosted, Microsoft Sentinel is pay-as-you-go). Create correlation rules for your top attack scenarios. Set up automated alerting. Report on log coverage and review compliance monthly.",
            ],
          },
          {
            id: "PR.PS-05",
            nistRef: "PR.PS-05",
            description: "Are installation and execution of unauthorized software prevented?",
            tiers: [
              "Any software can be installed by anyone",
              "Users discouraged from installing software but not blocked",
              "Application allowlisting or MDM prevents unauthorized software",
              "Automated enforcement; unauthorized software attempts are logged and alerted",
            ],
            stepRemediations: [
              "Remove local administrator rights from standard user accounts. Users should not be able to install software without IT approval. This single control blocks a significant percentage of malware installation vectors.",
              "Deploy an MDM solution (Microsoft Intune, Jamf) to enforce software installation policies. Create an approved software list and a process for requesting new software additions.",
              "Implement application allowlisting on high-risk systems: only explicitly approved executables can run. Log and alert on all blocked execution attempts. Review block logs weekly to identify attack attempts and adjust the allowlist.",
            ],
          },
          {
            id: "PR.PS-06",
            nistRef: "PR.PS-06",
            description: "Is secure software development practice used when building or modifying software?",
            tiers: [
              "No secure development practices",
              "Developers informally follow basic security hygiene",
              "Formal SDLC policy with required security gates (SAST, code review)",
              "DevSecOps pipeline enforces security at every stage; findings tracked to closure",
            ],
            stepRemediations: [
              "Require mandatory code review (at least one peer reviewer) before any code merges to your main branch. This single practice catches a significant percentage of security issues at zero tool cost.",
              "Add two automated security gates to your CI pipeline: SAST scanning (Semgrep free tier, CodeQL for GitHub repos, or Snyk) and dependency vulnerability scanning (`npm audit`, `pip-audit`, or Snyk). Block merges with critical findings.",
              "Implement a full DevSecOps pipeline: SAST, DAST, SCA, secrets scanning, and container image scanning. Track all findings in your vulnerability management system. Define SLAs for fixing security findings. Require security sign-off for high-risk releases.",
            ],
          },
        ],
      },
      {
        id: "PR.IR",
        name: "Technology Infrastructure Resilience",
        subcategories: [
          {
            id: "PR.IR-01",
            nistRef: "PR.IR-01",
            description: "Are networks and environments segmented to limit the impact of a security event?",
            tiers: [
              "No network segmentation",
              "Basic segmentation between IT and user networks",
              "Formal segmentation based on data sensitivity and business function",
              "Zero trust architecture; microsegmentation enforced and continuously monitored",
            ],
            stepRemediations: [
              "Separate your network into at least two zones using your existing firewall: user workstations on one VLAN, servers on another. Block direct workstation-to-server traffic that isn't explicitly needed.",
              "Implement formal segmentation into at least three zones: user, server/data, and guest/IoT. Add a DMZ for internet-facing systems. Document firewall rules and remove any 'allow all' rules.",
              "Implement zero trust network architecture: no implicit trust based on network location. All access requires authentication and authorization. Use microsegmentation to limit lateral movement. Monitor all east-west traffic.",
            ],
          },
          {
            id: "PR.IR-02",
            nistRef: "PR.IR-02",
            description: "Are critical systems protected against denial-of-service (DoS) attacks?",
            tiers: [
              "No DoS protection",
              "Basic rate limiting or firewall rules",
              "DDoS mitigation service in place for critical systems",
              "Adaptive DoS protection with automatic traffic scrubbing and incident response integration",
            ],
            stepRemediations: [
              "Enable rate limiting on your firewall and any public-facing services. Block known malicious IP ranges using free threat intelligence feeds. Configure your firewall to drop malformed packets.",
              "Put Cloudflare (free tier) or your CDN's DDoS protection in front of all public-facing web properties. For critical internal services, confirm your ISP offers upstream scrubbing.",
              "Implement adaptive DDoS protection with automatic traffic scrubbing and capacity on-demand. Integrate DDoS alerts with your incident response process. Test your protection annually with a controlled simulation.",
            ],
          },
          {
            id: "PR.IR-03",
            nistRef: "PR.IR-03",
            description: "Are mechanisms in place to achieve adequate system and service resilience?",
            tiers: [
              "Single points of failure exist; no redundancy",
              "Redundancy for some critical systems",
              "Redundancy and failover tested for all critical systems",
              "Continuous resilience testing; recovery objectives met consistently",
            ],
            stepRemediations: [
              "Identify your biggest single point of failure: the one system whose outage would most damage the business. Document the impact and initiate a plan to add redundancy for that system first.",
              "Add redundancy (hot standby, load balancing, or geographic failover) to all High-criticality systems. Define RTO and RPO for each. Test failover at least annually by actually cutting over to the secondary.",
              "Implement continuous resilience testing using chaos engineering principles. Run regular failover drills. Track whether RTOs and RPOs are consistently met. Use test results to drive infrastructure investment decisions.",
            ],
          },
          {
            id: "PR.IR-04",
            nistRef: "PR.IR-04",
            description: "Are systems and networks designed for adequate capacity to maintain availability?",
            tiers: [
              "No capacity planning",
              "Capacity managed reactively when performance degrades",
              "Capacity planning performed periodically; thresholds monitored",
              "Automated capacity scaling; predictive analytics prevent capacity issues",
            ],
            stepRemediations: [
              "Set up basic resource monitoring (CPU, memory, disk, network) with alerting at 80% utilization. Use free tools: Prometheus + Grafana, CloudWatch, or Azure Monitor. Alert before systems fail, not after.",
              "Conduct annual capacity planning: review growth trends, project future needs, and plan infrastructure investments. Set monitoring thresholds that trigger capacity reviews, not just alerts.",
              "Implement automated capacity scaling for cloud workloads (auto-scaling groups, serverless where appropriate). Use predictive analytics to forecast capacity needs. Track availability SLAs and report to leadership.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "DE",
    name: "Detect",
    categories: [
      {
        id: "DE.CM",
        name: "Continuous Monitoring",
        subcategories: [
          {
            id: "DE.CM-01",
            nistRef: "DE.CM-01",
            description: "Are networks monitored to detect potential cybersecurity events?",
            tiers: [
              "No network monitoring",
              "Manual, periodic review of firewall or router logs",
              "IDS/IPS in place with alert response procedures",
              "Continuous network monitoring with automated threat detection and response",
            ],
            stepRemediations: [
              "Enable logging on your firewall and review it once a week. Look for: repeated failed connections, unexpected outbound connections to unusual countries, and port scans. Document anything suspicious.",
              "Deploy an IDS/IPS (Suricata or Zeek are free and open source) and define alert response procedures: who gets the alert, what they do with it, and what escalation looks like.",
              "Implement continuous network monitoring with automated threat detection: integrate your network monitoring with a SIEM, enable ML-based anomaly detection, and automate containment responses for high-confidence threats.",
            ],
          },
          {
            id: "DE.CM-02",
            nistRef: "DE.CM-02",
            description: "Is the physical environment monitored to detect potential cybersecurity events?",
            tiers: [
              "No physical environment monitoring",
              "CCTV without cybersecurity integration",
              "Physical access events logged and reviewed",
              "Physical and cyber events correlated; anomalies trigger automated alerts",
            ],
            stepRemediations: [
              "Install CCTV covering server rooms, data center entrances, and main entry points. Retain footage for at least 30 days. Review when a security event occurs.",
              "Log all physical access events (badge reader logs, visitor sign-ins). Review them after any security incident. Create a process to immediately revoke physical access when employees leave.",
              "Integrate physical access logs with your security monitoring platform. Correlate physical and cyber events: a badge access event followed immediately by unusual network activity is a high-priority alert. Automate anomaly detection.",
            ],
          },
          {
            id: "DE.CM-03",
            nistRef: "DE.CM-03",
            description: "Is personnel activity monitored to detect potential cybersecurity events?",
            tiers: [
              "No user activity monitoring",
              "Basic access logs reviewed after incidents",
              "User activity monitored; insider threat policy in place",
              "UBA/UEBA tools in place; anomalous behavior triggers automated investigation",
            ],
            stepRemediations: [
              "Enable audit logging for privileged user activity: admin logins, file access by admins, and permission changes. Review these logs immediately for any terminated employee's last 30 days of activity.",
              "Define an insider threat monitoring policy: what activity is monitored, how it's reviewed, and what triggers an investigation. Ensure staff are aware that activity on company systems is subject to monitoring per your acceptable use policy.",
              "Deploy User and Entity Behavior Analytics (UEBA) to baseline normal behavior and detect anomalies: unusual data access volumes, login from unexpected locations, large file downloads before resignation. Alert on high-confidence anomalies.",
            ],
          },
          {
            id: "DE.CM-06",
            nistRef: "DE.CM-06",
            description: "Are external service provider activities monitored to detect potential cybersecurity events?",
            tiers: [
              "No monitoring of external provider activity",
              "Providers report incidents at their discretion",
              "Access by providers is logged and reviewed",
              "Automated monitoring of provider activity; anomalies trigger immediate alerts",
            ],
            stepRemediations: [
              "Require all vendors with system access to use named individual accounts — no shared credentials. Confirm you can see their activity in your logs. If you can't, work with the vendor to fix it.",
              "Log all vendor access sessions. Review vendor access logs quarterly and immediately when a vendor engagement ends. Revoke access within 24 hours of engagement completion.",
              "Implement automated monitoring of vendor access: alert on access outside agreed hours, from unexpected locations, or involving unusual data volumes. Use privileged access management (PAM) tools to record vendor sessions.",
            ],
          },
          {
            id: "DE.CM-09",
            nistRef: "DE.CM-09",
            description: "Are computing hardware and software monitored to detect potential cybersecurity events?",
            tiers: [
              "No endpoint monitoring",
              "Antivirus on endpoints without centralized visibility",
              "EDR deployed on all endpoints with centralized dashboard",
              "EDR with automated threat hunting; zero-day detection capabilities",
            ],
            stepRemediations: [
              "Ensure every device has antivirus/antimalware software installed and up to date. Confirm definitions are current. Verify all devices are covered — no exceptions for executives or contractors.",
              "Deploy EDR (Endpoint Detection and Response) on all endpoints. Microsoft Defender for Endpoint (included in M365 Business Premium) or CrowdStrike Falcon Go are SME-accessible. Centralize visibility in a single dashboard.",
              "Enable EDR's advanced threat hunting capabilities: automated investigation, behavioral detection, and threat intelligence integration. Set up automated responses for high-confidence detections (isolate host, block hash). Review hunting queries monthly.",
            ],
          },
        ],
      },
      {
        id: "DE.AE",
        name: "Adverse Event Analysis",
        subcategories: [
          {
            id: "DE.AE-02",
            nistRef: "DE.AE-02",
            description: "Are potentially adverse events analyzed to understand attack targets, methods, and patterns?",
            tiers: [
              "Events not analyzed beyond basic triage",
              "Informal analysis by IT staff",
              "Formal event analysis with documented procedures",
              "Automated analysis with threat intelligence correlation; attack patterns catalogued",
            ],
            stepRemediations: [
              "When the next security alert fires, spend 15 minutes documenting: what triggered it, what systems were involved, and what the attacker appeared to be attempting. This creates your first incident record.",
              "Create a formal event analysis procedure: who analyzes events, what information they document, and how findings are escalated. Build an incident log to track patterns over time.",
              "Automate event analysis: integrate threat intelligence feeds to automatically enrich events with context (attacker TTPs, related IOCs, affected CVEs). Catalogue attack patterns over time and use them to improve detection rules.",
            ],
          },
          {
            id: "DE.AE-03",
            nistRef: "DE.AE-03",
            description: "Is event data from multiple sources aggregated and correlated?",
            tiers: [
              "Events from different sources reviewed independently",
              "Manual correlation by experienced staff",
              "SIEM or log aggregation tool correlates events",
              "Automated SIEM with ML-based anomaly detection and cross-source correlation",
            ],
            stepRemediations: [
              "Identify your three most important log sources (firewall, authentication, endpoint). Manually compare them after the next security event. Looking at all three together tells a more complete story than any one source alone.",
              "Set up a central log aggregation tool. Elastic Stack (self-hosted, free) or a cloud-native option (Microsoft Sentinel, AWS Security Hub) centralizes logs and enables cross-source searching. Migrate your key log sources.",
              "Implement a full SIEM with ML-based anomaly detection. Create correlation rules for your top attack scenarios. Tune rules to reduce false positives. Track mean time to detect (MTTD) as a KPI.",
            ],
          },
          {
            id: "DE.AE-04",
            nistRef: "DE.AE-04",
            description: "Are the estimated impacts and scope of adverse events understood?",
            tiers: [
              "Impact not assessed during events",
              "Impact assessed informally by responding staff",
              "Defined impact assessment procedure used during incidents",
              "Automated impact scoring; blast radius estimated in real time",
            ],
            stepRemediations: [
              "During your next security event, answer three questions before taking any action: Which systems are affected? Is there evidence of data access or exfiltration? How many users could be impacted? Write the answers down.",
              "Create an impact assessment checklist: affected systems, potentially compromised data, estimated user count, downtime hours, and regulatory notification triggers. Use it within the first hour of every declared incident.",
              "Implement automated blast radius analysis in your SIEM/EDR: when an incident is declared, automatically map affected assets, identify connected systems, and estimate data exposure. Produce a real-time impact report for the response team.",
            ],
          },
          {
            id: "DE.AE-06",
            nistRef: "DE.AE-06",
            description: "Are alerts from detection tools investigated?",
            tiers: [
              "Alerts not consistently investigated",
              "Critical alerts investigated when staff are available",
              "All alerts reviewed with SLA; severity-based prioritization",
              "Automated alert triage; SOAR playbooks handle low-severity alerts automatically",
            ],
            stepRemediations: [
              "Designate a primary and backup person responsible for reviewing security alerts daily. Set up a simple process: critical alerts get a same-day response, others are reviewed in the morning standup.",
              "Define formal alert SLAs: Critical = respond within 1 hour, High = 4 hours, Medium = 24 hours. Track all alerts in a ticketing system. Report on overdue alerts weekly.",
              "Implement automated alert triage using a SOAR platform or your SIEM's automation features. Low-fidelity alerts are handled by playbooks automatically; human analysts focus on high-confidence detections. Track analyst workload and false positive rates.",
            ],
          },
          {
            id: "DE.AE-07",
            nistRef: "DE.AE-07",
            description: "Is cyber threat intelligence used in adversarial event analysis?",
            tiers: [
              "Threat intelligence not used in analysis",
              "Staff informally reference threat reports",
              "Threat intelligence formally integrated into event analysis procedures",
              "Real-time threat intelligence feeds integrated with SIEM; IOCs automatically matched",
            ],
            stepRemediations: [
              "When investigating an alert, check the suspicious IPs, domains, and file hashes against free threat intel sources: VirusTotal, AbuseIPDB, and CISA's Known Exploited Vulnerabilities catalog. Document your findings.",
              "Integrate threat intelligence into your analysis procedure: every significant event analysis must include a threat intel lookup. Subscribe to your industry ISAC's indicator feeds and check them during investigations.",
              "Automate threat intelligence integration: ingest IOC feeds directly into your SIEM so indicators are automatically matched against incoming events. Use MISP or a commercial TIP for feed management. Track how often TI produces actionable detections.",
            ],
          },
          {
            id: "DE.AE-08",
            nistRef: "DE.AE-08",
            description: "Are incidents declared based on established criteria?",
            tiers: [
              "No criteria for declaring an incident",
              "Incidents declared based on individual judgment",
              "Formal incident declaration criteria documented",
              "Automated incident declaration based on predefined thresholds and event correlation",
            ],
            stepRemediations: [
              "Define three concrete examples that would always be called an incident at your organization: any confirmed unauthorized access, any detected ransomware execution, any evidence of data leaving your environment without authorization.",
              "Document formal incident declaration criteria covering your likely attack scenarios. Specify who has the authority to declare an incident and who must be notified immediately upon declaration.",
              "Automate incident declaration: configure your SIEM to automatically create and escalate an incident ticket when predefined thresholds or event patterns are met. Ensure automated declarations trigger your IR playbooks immediately.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "RS",
    name: "Respond",
    categories: [
      {
        id: "RS.MA",
        name: "Incident Management",
        subcategories: [
          {
            id: "RS.MA-01",
            nistRef: "RS.MA-01",
            description: "Is an incident response plan established and maintained?",
            tiers: [
              "No incident response plan",
              "Informal response steps known to IT staff",
              "Documented IR plan approved by leadership; updated annually",
              "IR plan continuously updated; exercises performed quarterly; playbooks for all major threat types",
            ],
            stepRemediations: [
              "Write a one-page 'what to do if we get hacked' document. Include: who to call first, how to isolate an affected system, and who has authority to make decisions. Share it with IT and leadership. An imperfect plan you have beats a perfect plan you're still writing.",
              "Formalize the plan using NIST SP 800-61 or CISA's IR plan template (both free). Cover: preparation, detection, containment, eradication, recovery, and lessons learned. Get leadership sign-off. Update it annually.",
              "Build playbooks for your top 3–5 threat scenarios (ransomware, phishing compromise, data exfiltration). Run quarterly tabletop exercises to test and improve the plan. Update within 2 weeks of every real incident or exercise.",
            ],
          },
          {
            id: "RS.MA-02",
            nistRef: "RS.MA-02",
            description: "Are incidents triaged and validated to confirm they are actual incidents?",
            tiers: [
              "All alerts treated as incidents without triage",
              "Informal triage by IT staff",
              "Formal triage process with documented criteria",
              "Automated triage with human review for confirmed incidents; false positive rate tracked",
            ],
            stepRemediations: [
              "Define a two-question triage test: (1) Is there evidence of unauthorized access or malicious activity? (2) Is there evidence of data access or system compromise? If yes to either, escalate. Document the decision either way.",
              "Create a formal triage checklist with decision criteria and document it in your IR plan. Require a triage log entry for every security alert, even those that don't escalate. Review triage decisions in post-incident reviews.",
              "Automate triage: configure your SIEM/EDR to score alerts by confidence and impact. Low-confidence alerts go to a queue for human review; high-confidence alerts automatically create incidents. Track false positive rates and tune detection rules monthly.",
            ],
          },
          {
            id: "RS.MA-03",
            nistRef: "RS.MA-03",
            description: "Are incidents categorized and prioritized?",
            tiers: [
              "No categorization or prioritization",
              "Severity informally assigned",
              "Defined severity matrix; incidents categorized and prioritized consistently",
              "Automated categorization using threat intelligence; dynamic re-prioritization during incidents",
            ],
            stepRemediations: [
              "Define three severity levels today and communicate them to your team: P1 (active breach or ransomware — all hands now), P2 (suspected compromise — respond within 4 hours), P3 (policy violation or anomaly — respond within 24 hours).",
              "Document a severity matrix: define criteria for each level based on data impact, system criticality, and business disruption. Apply it consistently. Include response SLAs and required notifications for each severity.",
              "Automate incident categorization based on asset criticality, data classification, and threat intelligence context. Implement dynamic re-prioritization: if new evidence emerges during an incident that raises its severity, automatically escalate notifications and resources.",
            ],
          },
          {
            id: "RS.MA-04",
            nistRef: "RS.MA-04",
            description: "Are incidents escalated when they exceed your organization's response capabilities?",
            tiers: [
              "No escalation process",
              "Escalation happens informally when staff feel overwhelmed",
              "Defined escalation criteria and contacts (e.g., MSSP, legal, law enforcement)",
              "Escalation automated by incident severity; external contacts pre-contracted and exercised",
            ],
            stepRemediations: [
              "Identify the name, phone number, and email for: your cyber insurance provider, your outside legal counsel, and your MSSP (if applicable). Write these down and put them in your IR plan. Have them ready before you need them.",
              "Define escalation criteria: which incident types or severity levels require external help? Create a decision tree. Pre-notify your cyber insurance carrier that you may need IR support if a P1 incident occurs.",
              "Pre-contract IR retainer services so external help can be engaged in minutes, not days. Test the escalation process annually: contact each external party and confirm their current engagement process. Automate P1 incident notifications to pre-designated external contacts.",
            ],
          },
          {
            id: "RS.MA-05",
            nistRef: "RS.MA-05",
            description: "Are incidents with external parties (partners, customers, regulators) coordinated?",
            tiers: [
              "No external coordination",
              "External parties contacted ad-hoc",
              "Defined process for external notification and coordination",
              "Pre-agreed communication plans; legal and PR involved; regulatory timelines tracked",
            ],
            stepRemediations: [
              "Look up your notification obligations now, before you have an incident: HIPAA (60 days), DFARS (72 hours), your state's breach notification law (varies). Write the timelines and notification contacts into your IR plan.",
              "Create an external notification checklist: which parties to notify, by whom, in what format, and within what timeline. Designate who is authorized to communicate externally. Legal must review any external communication before it goes out.",
              "Pre-draft notification templates for your most likely scenarios (ransomware, data breach) with legal review. Establish pre-agreed communication protocols with key partners. Automate regulatory timeline tracking when an incident is declared.",
            ],
          },
        ],
      },
      {
        id: "RS.AN",
        name: "Incident Analysis",
        subcategories: [
          {
            id: "RS.AN-03",
            nistRef: "RS.AN-03",
            description: "Are root causes of incidents determined?",
            tiers: [
              "Root cause analysis not performed",
              "Root cause discussed informally after major incidents",
              "Formal RCA performed for all significant incidents; findings documented",
              "Automated RCA tooling; findings feed directly into risk register and remediation roadmap",
            ],
            stepRemediations: [
              "After your next incident, ask 'why did this happen?' five times — the 5 Whys technique. Write down the chain of answers. You'll usually arrive at a systemic issue, not just a technical one.",
              "Conduct a formal post-incident RCA within 5 business days of every P1 and P2 incident. Document root cause, contributing factors, and one systemic fix. Add the fix to your remediation tracker.",
              "Automate RCA support: use your SIEM and forensic tools to automatically reconstruct attack timelines. Feed RCA findings directly into the risk register. Track whether implementing a fix prevents recurrence of similar incidents.",
            ],
          },
          {
            id: "RS.AN-06",
            nistRef: "RS.AN-06",
            description: "Are the actions taken during a response documented?",
            tiers: [
              "No documentation of response actions",
              "Informal notes taken during incidents",
              "Formal incident log maintained during all responses",
              "Automated timeline capture; incident log integrated with SIEM and ticketing system",
            ],
            stepRemediations: [
              "During your next security event, keep a running note — even on paper or in a shared doc: timestamp, who did what, and what they observed. This log is essential for post-incident review and any legal or regulatory inquiry.",
              "Create an incident log template and require it for all declared incidents: timestamp, actor, action, observation, and decision. Store logs in a centralized system. Treat the incident log as evidence — do not edit or delete entries.",
              "Automate timeline capture: configure your SIEM, EDR, and ticketing system to automatically record response actions with timestamps. Generate a forensic timeline report at incident close. Integrate logs with your legal hold process.",
            ],
          },
          {
            id: "RS.AN-07",
            nistRef: "RS.AN-07",
            description: "Are incidents estimated for magnitude and impact?",
            tiers: [
              "Magnitude not assessed",
              "Informal impact estimation",
              "Defined impact assessment framework applied to all incidents",
              "Quantitative impact modeling; financial and operational impact estimated in real time",
            ],
            stepRemediations: [
              "For every declared incident, estimate three numbers: how many user accounts may be affected, how many hours of system downtime occurred, and how many records may have been exposed. Even rough estimates help with prioritization and communication.",
              "Use a defined impact framework: affected system count, data record count, downtime hours, estimated cost (downtime × hourly revenue), and regulatory notification trigger assessment. Document these for every P1 and P2 incident.",
              "Build quantitative impact models for your most likely incident types. Feed actual incident data into the models to improve accuracy over time. Produce real-time impact estimates during active incidents to guide resource allocation decisions.",
            ],
          },
          {
            id: "RS.AN-08",
            nistRef: "RS.AN-08",
            description: "Are stakeholders informed about incidents appropriately and in a timely manner?",
            tiers: [
              "No stakeholder communication during incidents",
              "Key stakeholders notified ad-hoc",
              "Communication plan with defined notification timelines",
              "Automated status updates to stakeholders; regulatory notification tracked automatically",
            ],
            stepRemediations: [
              "During your next incident, send a one-paragraph update to leadership within the first hour: what happened, what's affected, and what you're doing about it. Even a brief update prevents leadership from feeling blindsided.",
              "Create a stakeholder notification checklist: who must be notified (CEO, legal, affected department heads), through what channel, and within what timeframe for each severity level. Document this in your IR plan.",
              "Automate status updates: set up automated stakeholder notifications when an incident is declared and at defined milestones (contained, data confirmed/ruled out, systems restored). Track regulatory notification deadlines automatically.",
            ],
          },
        ],
      },
      {
        id: "RS.CO",
        name: "Incident Response Reporting and Communication",
        subcategories: [
          {
            id: "RS.CO-02",
            nistRef: "RS.CO-02",
            description: "Are incidents reported to internal and external stakeholders based on established criteria?",
            tiers: [
              "No reporting criteria defined",
              "Reporting decided case by case",
              "Reporting criteria documented; reports generated for significant incidents",
              "Automated reporting triggered by incident classification; reports meet regulatory requirements",
            ],
            stepRemediations: [
              "Map your reporting obligations: CISA (voluntary), your cyber insurance carrier (required), state breach notification laws (required if PII affected), HIPAA/DFARS if applicable. Write the contacts and timelines in your IR plan.",
              "Document internal and external reporting criteria: what types of incident trigger which reports, who writes each report, and who approves before it's sent. Create a report template for each report type.",
              "Automate reporting triggers: when an incident is classified at a certain severity, automatically create draft reports using incident data. Track reporting SLAs and alert when deadlines are approaching. Integrate with your legal hold process.",
            ],
          },
          {
            id: "RS.CO-03",
            nistRef: "RS.CO-03",
            description: "Is information shared with designated internal and external parties?",
            tiers: [
              "Information not shared",
              "Sharing happens informally",
              "Defined information sharing process and contacts",
              "Automated sharing with ISACs and trusted partners; TLP classifications applied",
            ],
            stepRemediations: [
              "After your next incident, report it to CISA (cisa.gov/report) — it's voluntary, free, and helps the broader community. Get comfortable with the reporting process before it's mandatory.",
              "Join your industry's ISAC. Define an information sharing process: what indicators and findings you share, with whom, in what format, and subject to what confidentiality. Apply Traffic Light Protocol (TLP) labels to all shared information.",
              "Automate threat intelligence sharing: integrate with your ISAC's automated indicator sharing platform (STIX/TAXII). Share indicators of compromise within hours of an incident. Track the quality and timeliness of your contributions.",
            ],
          },
        ],
      },
      {
        id: "RS.MI",
        name: "Incident Mitigation",
        subcategories: [
          {
            id: "RS.MI-01",
            nistRef: "RS.MI-01",
            description: "Are incidents contained to limit their impact?",
            tiers: [
              "No containment actions taken",
              "Containment actions taken informally",
              "Defined containment playbooks for common incident types",
              "Automated containment triggered by incident type; SOAR executes containment actions",
            ],
            stepRemediations: [
              "Know how to isolate a system from your network before you need to do it: disconnect the network cable, disable the network adapter, or segment via firewall rule. Practice it on a non-critical system so it's muscle memory during an incident.",
              "Write a one-page containment playbook for ransomware (your most likely high-impact scenario): isolate affected hosts, identify blast radius, block C2 IPs at firewall, preserve forensic evidence, notify leadership. Test it in a tabletop.",
              "Implement automated containment via SOAR or your EDR's automated response features: when ransomware or a high-confidence breach is detected, automatically isolate the affected host, revoke active sessions, and create an incident ticket. Human review follows automated containment.",
            ],
          },
          {
            id: "RS.MI-02",
            nistRef: "RS.MI-02",
            description: "Are the effects of incidents eradicated?",
            tiers: [
              "Eradication not performed; systems restored from backup only",
              "Informal eradication by IT staff",
              "Formal eradication process with verification steps",
              "Automated eradication with forensic validation; indicators of compromise removed and blocked",
            ],
            stepRemediations: [
              "After containing an incident, search for persistence mechanisms before restoring: new user accounts, scheduled tasks, registry run keys, and startup scripts added during the attack window. Removing the malware but not the persistence means the attacker returns.",
              "Create a formal eradication checklist: (1) identify all affected systems, (2) remove malware and persistence mechanisms, (3) patch the exploited vulnerability, (4) reset all potentially compromised credentials, (5) verify with a fresh scan before returning to production.",
              "Implement automated eradication with forensic validation: use your EDR to automatically remove identified threats across all affected endpoints simultaneously. Run post-eradication forensic checks to confirm no persistence remains. Block all identified IOCs at network and endpoint level.",
            ],
          },
        ],
      },
    ],
  },
  {
    id: "RC",
    name: "Recover",
    categories: [
      {
        id: "RC.RP",
        name: "Incident Recovery Plan Execution",
        subcategories: [
          {
            id: "RC.RP-01",
            nistRef: "RC.RP-01",
            description: "Is a recovery plan executed during or after an incident to restore affected systems?",
            tiers: [
              "No recovery plan; recovery is improvised",
              "Informal recovery steps known to key IT staff",
              "Documented recovery plan executed and tested annually",
              "Recovery plan continuously updated; automated recovery for common scenarios; RTO/RPO tracked",
            ],
            stepRemediations: [
              "Write recovery steps for your most critical system: where is the backup, who has access to it, what does the restoration procedure look like step by step? If you lose your primary sysadmin, can a second person recover it using your documentation?",
              "Formalize recovery plans for all High-criticality systems. Define RTO (how long can it be down?) and RPO (how much data can you lose?). Test recovery annually by actually restoring from backup to a test environment.",
              "Implement automated recovery for common scenarios (ransomware, hardware failure). Continuously track whether RTO and RPO targets are met during drills and actual incidents. Update the plan within 2 weeks of any recovery event.",
            ],
          },
          {
            id: "RC.RP-02",
            nistRef: "RC.RP-02",
            description: "Are recovery actions selected and scoped based on the incident and organizational priorities?",
            tiers: [
              "Recovery actions not tailored to incident",
              "Actions determined informally during the incident",
              "Decision framework guides recovery action selection",
              "Automated recovery action recommendations based on incident classification and asset priority",
            ],
            stepRemediations: [
              "Decide now, before an incident: if you had to choose between recovering your customer-facing application or your internal file server first, which would you choose and why? Document the answer — this is the seed of your recovery prioritization.",
              "Add a prioritization decision tree to your recovery plan based on your business impact analysis: customer-facing before internal, revenue-generating before support, High-criticality before Medium. Document the rationale.",
              "Automate recovery action recommendations: when an incident is declared, your ITSM or recovery orchestration tool should suggest the recovery sequence based on affected assets and business impact data. Track whether recommended sequences perform better than improvised ones.",
            ],
          },
          {
            id: "RC.RP-03",
            nistRef: "RC.RP-03",
            description: "Are recovery activities communicated to relevant stakeholders?",
            tiers: [
              "No communication during recovery",
              "Ad-hoc updates to key stakeholders",
              "Defined communication plan for recovery status updates",
              "Automated status dashboard for stakeholders; updates sent at defined milestones",
            ],
            stepRemediations: [
              "Assign one person as the recovery communication owner during incidents. Their only job is stakeholder updates — this frees the technical team to focus on recovery. Send updates at least hourly to leadership.",
              "Create a recovery communication plan: who gets updates, through what channel, at what milestones (incident contained, restoration started, system restored, full recovery). Use a status page or shared doc so stakeholders can self-serve.",
              "Automate status updates: configure your ITSM or incident management platform to send automatic updates to stakeholder groups at defined milestones. Deploy a real-time status page accessible to internal stakeholders during incidents.",
            ],
          },
          {
            id: "RC.RP-04",
            nistRef: "RC.RP-04",
            description: "Are the integrity and security of recovered systems confirmed before returning to operation?",
            tiers: [
              "Systems restored without security validation",
              "Basic checks performed by IT staff before restoration",
              "Formal validation checklist completed before systems go live",
              "Automated integrity checks; security posture verified against baseline before restoration",
            ],
            stepRemediations: [
              "Before returning any recovered system to production, answer three questions: Is the restored backup from before the compromise? Have we confirmed the attack vector is patched? Are all credentials that touched this system rotated?",
              "Create a formal pre-production validation checklist: backup integrity check (hash verification), vulnerability scan, persistence mechanism check, credential rotation confirmation, and logging verification. Require sign-off before going live.",
              "Automate pre-production validation: run automated integrity checks, compliance scans, and behavioral baselining before any recovered system goes live. Block production return if checks fail. Generate a validation report for the incident record.",
            ],
          },
          {
            id: "RC.RP-05",
            nistRef: "RC.RP-05",
            description: "Are recovery activities and lessons learned incorporated into updates to the recovery plan?",
            tiers: [
              "Recovery plan never updated after incidents",
              "Updates made informally after major incidents",
              "Formal post-incident review updates the recovery plan",
              "Continuous improvement cycle; plan updated after every incident with tracked changes",
            ],
            stepRemediations: [
              "After your next recovery operation, answer: What slowed us down? What was missing from the plan? Update the plan with one improvement before the next incident. Small, consistent improvements compound.",
              "Hold a formal retrospective within 5 business days of every recovery. Document findings and required plan updates. Assign an owner to each update with a due date. Track plan version history.",
              "Implement a continuous improvement cycle: every incident or drill automatically triggers a plan review task. Track mean time to update the plan after an incident. Measure whether RTO/RPO performance improves over time as a direct result.",
            ],
          },
        ],
      },
      {
        id: "RC.CO",
        name: "Incident Recovery Communication",
        subcategories: [
          {
            id: "RC.CO-03",
            nistRef: "RC.CO-03",
            description: "Are public communications about incidents managed to restore trust?",
            tiers: [
              "No public communication strategy",
              "Communications made ad-hoc when required",
              "PR and legal plan for incident communications exists",
              "Pre-approved communication templates; media relations process; reputation monitoring in place",
            ],
            stepRemediations: [
              "Designate who is authorized to speak publicly about a security incident — typically the CEO or a designated spokesperson. Everyone else should direct media inquiries to that person. Communicate this internally before an incident occurs.",
              "Work with legal to draft a breach notification template and a holding statement ('We are investigating a security incident and will provide updates as more information becomes available.'). Have both reviewed and ready to use.",
              "Pre-approve communication templates for your most likely scenarios. Establish a media relations process. Deploy a status page for public-facing service incidents. Set up reputation monitoring (Google Alerts, social media monitoring) to detect when your organization is mentioned in the context of a breach.",
            ],
          },
          {
            id: "RC.CO-04",
            nistRef: "RC.CO-04",
            description: "Are recovery activities communicated to internal and external stakeholders?",
            tiers: [
              "No recovery communication",
              "Key stakeholders informed informally",
              "Defined recovery communication process with stakeholder list",
              "Automated recovery status updates; stakeholder portal shows real-time recovery progress",
            ],
            stepRemediations: [
              "After your next incident, send a final 'all clear' message to all affected stakeholders when recovery is complete: what happened, what you did about it, what you're doing to prevent recurrence. This closes the communication loop.",
              "Create a recovery communication checklist: internal (all staff, affected departments, leadership), external (affected customers, partners, regulators), and through what channel at what milestones.",
              "Deploy a stakeholder communication portal with real-time recovery status. Automate milestone-based updates. Send a formal post-incident report to all affected stakeholders within 2 weeks of incident close, describing the incident, impact, response, and preventive measures.",
            ],
          },
        ],
      },
    ],
  },
];
