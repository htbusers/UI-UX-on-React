import {
  RegulatoryAlert,
  RecentQuery,
  SavedBrief,
  DocumentNode,
  ProvisionMetadata,
  ResearchCitation,
  ResearchFinding,
  ReviewQueueItem,
  GraphNode,
  GraphLink,
} from '../types';

export const mockAlerts: RegulatoryAlert[] = [
  {
    id: 'alert-1',
    title: 'EU AI Act Implementation Timeline',
    summary: 'European Commission released updated compliance dates for high-risk systems.',
    timeAgo: '2h ago',
    dotColor: 'error',
    jurisdiction: 'European Union',
    category: 'Artificial Intelligence',
    severity: 'high',
    documentRef: 'eu-ai-act-art-5',
  },
  {
    id: 'alert-2',
    title: 'SEC Cybersecurity Disclosure Updates',
    summary: 'New interpretive guidance on material incident reporting under Item 1.05 Form 8-K.',
    timeAgo: '5h ago',
    dotColor: 'secondary',
    jurisdiction: 'United States',
    category: 'Cybersecurity',
    severity: 'medium',
    documentRef: 'sec-cyber-2024',
  },
  {
    id: 'alert-3',
    title: 'UK FCA Consumer Duty Guidance',
    summary: 'Consultation paper CP23/24 open for comments regarding pricing models and fair value assessments.',
    timeAgo: '1d ago',
    dotColor: 'surface-tint',
    jurisdiction: 'United Kingdom',
    category: 'Consumer Protection',
    severity: 'low',
    documentRef: 'fca-cp23-24',
  },
  {
    id: 'alert-4',
    title: 'State Bank of Pakistan Digital Lending Guidelines',
    summary: 'Mandatory escrow mechanisms and biometric customer verification mandated for micro-fintechs.',
    timeAgo: '1d ago',
    dotColor: 'secondary',
    jurisdiction: 'Pakistan',
    category: 'Fintech & Banking',
    severity: 'medium',
  },
  {
    id: 'alert-5',
    title: 'Singapore MAS Quantum Security Advisory',
    summary: 'Financial institutions urged to formulate migration pathways to post-quantum cryptography.',
    timeAgo: '2d ago',
    dotColor: 'surface-tint',
    jurisdiction: 'Singapore',
    category: 'Cryptography & Tech',
    severity: 'low',
  },
];

export const mockRecentQueries: RecentQuery[] = [
  {
    id: 'q-1',
    query: 'Data localization requirements in Indonesia',
    timestamp: 'Yesterday',
    category: 'Data Privacy',
  },
  {
    id: 'q-2',
    query: 'Cross-border data transfer mechanisms post-Schrems II',
    timestamp: '2 days ago',
    category: 'GDPR Compliance',
  },
  {
    id: 'q-3',
    query: 'What are the current AML obligations for fintechs in Pakistan?',
    timestamp: '3 days ago',
    category: 'AML/CFT',
  },
  {
    id: 'q-4',
    query: 'Compare GDPR Article 17 with CCPA deletion rights',
    timestamp: '4 days ago',
    category: 'Comparative Law',
  },
];

export const mockSavedBriefs: SavedBrief[] = [
  {
    id: 'sb-1',
    title: 'APAC Crypto Regulations',
    updated: 'Oct 24',
    jurisdiction: 'APAC (SG, HK, JP)',
    summary: 'Comparative analysis of VASP licensing regimes in MAS, SFC, and JFSA frameworks.',
  },
  {
    id: 'sb-2',
    title: 'ESG Reporting Standards',
    updated: 'Oct 22',
    jurisdiction: 'EU & Global',
    summary: 'CSRD Scope 3 emissions reporting and ESRS disclosure mandate timelines.',
  },
  {
    id: 'sb-3',
    title: 'Global Open Banking Protocols',
    updated: 'Oct 19',
    jurisdiction: 'UK, US & MEA',
    summary: 'CFPB Rule 1033 vs UK OBIE API standard harmonizations.',
  },
];

export const mockDocumentTree: DocumentNode[] = [
  {
    id: 'title-1',
    title: 'Title I: General Provisions',
    type: 'title',
    children: [
      { id: 'art-1', title: 'Article 1: Subject matter', type: 'article' },
      { id: 'art-2', title: 'Article 2: Scope', type: 'article' },
      { id: 'art-3', title: 'Article 3: Definitions', type: 'article' },
      { id: 'art-4', title: 'Article 4: AI literacy', type: 'article' },
    ],
  },
  {
    id: 'title-2',
    title: 'Title II: Prohibited AI Practices',
    type: 'title',
    children: [
      { id: 'art-5', title: 'Article 5: Prohibited AI Practices', type: 'article' },
    ],
  },
  {
    id: 'title-3',
    title: 'Title III: High-Risk AI Systems',
    type: 'title',
    children: [
      { id: 'art-6', title: 'Article 6: Classification rules for high-risk AI systems', type: 'article' },
      { id: 'art-7', title: 'Article 7: Amendments to Annex III', type: 'article' },
      { id: 'art-8', title: 'Article 8: Compliance with requirements', type: 'article' },
      { id: 'art-9', title: 'Article 9: Risk management system', type: 'article' },
      { id: 'art-10', title: 'Article 10: Data and data governance', type: 'article' },
    ],
  },
  {
    id: 'title-4',
    title: 'Title IV: Transparency Obligations',
    type: 'title',
    children: [
      { id: 'art-50', title: 'Article 50: Transparency obligations for certain AI systems', type: 'article' },
    ],
  },
];

export const mockProvisionMetadata: ProvisionMetadata = {
  citation: 'Art. 5(1) AI Act',
  authority: 'European Parliament & Council',
  status: 'In Force',
  effectiveDate: 'Aug 1, 2024 (Prohibitions active Feb 2, 2025)',
  jurisdiction: 'European Union (Regulation 2024/1689)',
  relationships: [
    {
      type: 'Defines Penalty',
      title: 'Article 71: Penalties',
      description: 'Non-compliance with Art 5 is subject to administrative fines up to €35,000,000 or 7% of total worldwide annual turnover.',
      targetId: 'art-71',
    },
    {
      type: 'Cross-Reference',
      title: 'Recital 16',
      description: 'Regarding the prohibition of subliminal and manipulative practices impairing autonomous decision-making.',
      targetId: 'recital-16',
    },
    {
      type: 'Implementing Regulation',
      title: 'Article 96: AI Office Enforcement',
      description: 'Guidelines to be issued by the AI Office on biometric categorisation and emotion recognition exceptions.',
      targetId: 'art-96',
    },
  ],
  amendmentHistory: [
    {
      version: 'v2.0 - Final Text (Current)',
      name: 'Plenary Vote & Official Journal Publication',
      date: 'May 2024 • Enacted 2024/1689',
      isCurrent: true,
    },
    {
      version: 'v1.4 - Trilogues Provisional',
      name: 'Council & Parliament Agreement',
      date: 'Dec 2023 • Council Agreement',
    },
    {
      version: 'v1.0 - Commission Proposal',
      name: 'European Commission Initial Draft',
      date: 'Apr 2021 • Initial Draft COM(2021) 206',
    },
  ],
};

export const mockResearchFindings: {
  title: string;
  summary: string;
  findings: ResearchFinding[];
  citations: Record<string, ResearchCitation>;
} = {
  title: 'Current AML Obligations for Fintechs (Pakistan)',
  summary:
    'Under the current regulatory framework enforced by the State Bank of Pakistan (SBP), Electronic Money Institutions (EMIs) and non-banking fintechs are subject to stringent Anti-Money Laundering (AML) and Combating the Financing of Terrorism (CFT) requirements.',
  findings: [
    {
      number: 1,
      title: 'Mandatory Customer Due Diligence (CDD)',
      content:
        'Fintechs must implement risk-based CDD measures. Enhanced Due Diligence (EDD) is explicitly required for High-Risk categories, including politically exposed persons (PEPs) and cross-border transactions.',
      citationId: 'cite-1',
    },
    {
      number: 2,
      title: 'Transaction Monitoring & Reporting',
      content:
        'Automated transaction monitoring systems are mandatory. Suspicious Transaction Reports (STRs) must be filed with the Financial Monitoring Unit (FMU) within 7 days of forming a suspicion.',
      citationId: 'cite-2',
    },
    {
      number: 3,
      title: 'Threshold Reporting & CTR Thresholds',
      content:
        'Currency Transaction Reports (CTRs) must be lodged automatically for all single or aggregate linked transactions exceeding PKR 2.0 Million or foreign currency equivalent within 3 business days.',
      citationId: 'cite-3',
    },
  ],
  citations: {
    'cite-1': {
      id: 'cite-1',
      number: 1,
      label: '[1] SBP AML/CFT Regs Sec. 12',
      authority: 'State Bank of Pakistan',
      document: 'AML/CFT Regulations',
      version: 'Current (2023)',
      location: 'Section 12, Page 45',
      sourceExtract:
        '"12. (1) Every RE shall formulate and implement a comprehensive Customer Due Diligence (CDD) program... (4) For high-risk customers, including PEPs, the RE shall apply Enhanced Due Diligence (EDD) measures."',
    },
    'cite-2': {
      id: 'cite-2',
      number: 2,
      label: '[2] AML Act Sec. 18',
      authority: 'Financial Monitoring Unit (FMU) / SBP',
      document: 'Anti-Money Laundering Act 2010 (as amended 2020)',
      version: 'Consolidated Enacted',
      location: 'Section 18, Subsection (2)',
      sourceExtract:
        '"18. (2) Every reporting entity shall file a Suspicious Transaction Report (STR) with the Financial Monitoring Unit (FMU) immediately, but not later than seven days, after forming suspicion that transaction involves proceeds of crime."',
    },
    'cite-3': {
      id: 'cite-3',
      number: 3,
      label: '[3] SBP Regulation G-4',
      authority: 'State Bank of Pakistan - BPRD',
      document: 'Guidelines on Transaction Thresholds',
      version: 'Circular No. 04 of 2023',
      location: 'Paragraph 4(a)',
      sourceExtract:
        '"4. (a) All Electronic Money Institutions (EMIs) shall configure rule-based triggers to identify structured transfers designed to circumvent CTR reporting ceilings."',
    },
  },
};

export const mockReviewQueue: ReviewQueueItem[] = [
  {
    id: 'RC-2024-891A',
    type: 'Classification',
    severity: 'HIGH',
    title: 'Doc: 2024-EU-AI-Act-Draft-v3.pdf',
    subtitle: 'AI Confidence: 62%',
    aiConfidence: 62,
    proposedCategory: 'Binding Statutory Act',
    reasoning:
      "The document exhibits structural markers typical of a Binding Statutory Act (e.g., 'Article X', formal enactment clauses). However, the preamble references ongoing consultative processes, suggesting it may be a draft or Regulatory Guideline.",
    reasoningQuote:
      "Model classified as Binding Statutory Act primarily due to keyword density of 'shall' (n=452) and presence of penalty provisions in Section IV.",
    tokens: ['Jurisdiction: EU', 'Sector: Technology', 'Effective: Pending'],
    evidenceText: {
      title: 'Draft Artificial Intelligence Act',
      subtitle: '... continued from page 12',
      paragraphs: [
        {
          id: 'p1',
          heading: 'Article 5. Prohibited Artificial Intelligence Practices',
          text: '1. The following artificial intelligence practices shall be prohibited:\n(a) the placing on the market, putting into service or use of an AI system that deploys subliminal techniques beyond a person’s consciousness in order to materially distort a person’s behaviour in a manner that causes or is likely to cause that person or another person physical or psychological harm;',
          isHighlighted: true,
          highlightType: 'error',
        },
        {
          id: 'p2',
          text: '(b) the placing on the market, putting into service or use of an AI system that exploits any of the vulnerabilities of a specific group of persons due to their age, physical or mental disability, with the objective or effect of materially distorting behaviour...',
        },
        {
          id: 'p3',
          heading: 'Section IV: Penalties',
          text: 'Member States shall lay down the rules on penalties applicable to infringements of this Regulation and shall take all measures necessary to ensure that they are properly and effectively implemented.',
          isHighlighted: true,
          highlightType: 'secondary',
        },
      ],
    },
  },
  {
    id: 'RC-2024-892B',
    type: 'Amendment',
    severity: 'MED',
    title: 'Securities Act 1933 - Sec 4(a)(2)',
    subtitle: 'Conflicting sources in private placement safe harbors',
    aiConfidence: 71,
    proposedCategory: 'Statutory Amendment',
    reasoning:
      'Regulation D Rule 506(c) general solicitation guidelines conflict with SEC staff no-action letter interpretations regarding pre-existing substantive relationships.',
    reasoningQuote:
      'Detected divergent citations between SEC Release No. 33-10771 and 2nd Circuit Appellate rulings.',
    tokens: ['Jurisdiction: US', 'Agency: SEC', 'Exemption: Reg D'],
    evidenceText: {
      title: 'Securities Act Private Offering Safe Harbor',
      subtitle: '15 U.S. Code § 77d - Exempted transactions',
      paragraphs: [
        {
          id: 'p1',
          heading: 'Section 4(a)(2)',
          text: 'The provisions of section 77e of this title shall not apply to transactions by an issuer not involving any public offering.',
          isHighlighted: true,
          highlightType: 'warning',
        },
      ],
    },
  },
  {
    id: 'RC-2024-893C',
    type: 'Entity Extraction',
    severity: 'MED',
    title: 'Financial Conduct Authority Policy Statement PS23/16',
    subtitle: 'Missing required metadata regarding operational resilience deadline',
    aiConfidence: 68,
    proposedCategory: 'Regulatory Guideline',
    reasoning:
      'The policy statement introduces dual transition periods for Dual-Regulated firms (PRA/FCA) which was parsed as a single unified compliance deadline.',
    reasoningQuote:
      'Extracted entity "March 31, 2025" requires disambiguation for Annex 2 third-party mapping dependencies.',
    tokens: ['Jurisdiction: UK', 'Regulator: FCA', 'Topic: Operational Resilience'],
    evidenceText: {
      title: 'FCA Policy Statement PS23/16',
      subtitle: 'Building Operational Resilience in Financial Services',
      paragraphs: [
        {
          id: 'p1',
          heading: 'Chapter 3: Implementation Timeframes',
          text: 'Firms must ensure that by no later than 31 March 2025, they have performed mapping and testing for each important business service...',
          isHighlighted: true,
          highlightType: 'secondary',
        },
      ],
    },
  },
  {
    id: 'RC-2024-894D',
    type: 'Classification',
    severity: 'LOW',
    title: 'Internal Memo: Compliance Training 2024',
    subtitle: 'AI Confidence: 78%',
    aiConfidence: 78,
    proposedCategory: 'Internal Compliance Policy',
    reasoning:
      'Document classified as internal guideline rather than regulatory decree due to corporate letterhead, absence of external legal enforceability clauses, and reference to internal HR workflows.',
    reasoningQuote:
      'Confidence is 78% due to presence of employee code-of-conduct mentions.',
    tokens: ['Scope: Internal', 'Department: Legal/Risk', 'Status: Approved'],
    evidenceText: {
      title: 'Internal Compliance Directive 2024',
      subtitle: 'Global Risk Management Committee',
      paragraphs: [
        {
          id: 'p1',
          text: 'All employees interacting with client onboarding portals must complete the annual refresher certification by Q3 2024.',
        },
      ],
    },
  },
];

export const mockGraphNodes: GraphNode[] = [
  { id: 'eu', label: 'European Union', type: 'jurisdiction', group: 1, description: 'Single Market & EU Directives' },
  { id: 'ai-act', label: 'EU AI Act (2024/1689)', type: 'regulation', group: 2, description: 'Risk-based AI Framework' },
  { id: 'art-5', label: 'Article 5: Prohibited Practices', type: 'obligation', group: 3, description: 'Subliminal & Biometric Prohibitions' },
  { id: 'art-71', label: 'Article 71: €35M / 7% Penalties', type: 'penalty', group: 4, description: 'Maximum administrative fines' },
  { id: 'ai-office', label: 'European AI Office', type: 'authority', group: 5, description: 'Supervisory body under Commission' },
  
  { id: 'pk', label: 'Pakistan', type: 'jurisdiction', group: 1, description: 'State Bank & SECP' },
  { id: 'sbp', label: 'State Bank of Pakistan', type: 'authority', group: 5, description: 'Central Bank & Banking Regulator' },
  { id: 'aml-cft', label: 'AML/CFT Regulations 2023', type: 'regulation', group: 2, description: 'Anti-Money Laundering Framework' },
  { id: 'cdd-edd', label: 'Customer Due Diligence (CDD/EDD)', type: 'obligation', group: 3, description: 'Risk-based verification' },
  { id: 'fmu', label: 'Financial Monitoring Unit (FMU)', type: 'authority', group: 5, description: 'FIU for STRs' },
  
  { id: 'us', label: 'United States', type: 'jurisdiction', group: 1, description: 'Federal & State Regulators' },
  { id: 'sec', label: 'SEC', type: 'authority', group: 5, description: 'Securities and Exchange Commission' },
  { id: 'cyber-rule', label: 'Cybersecurity Incident Rules', type: 'regulation', group: 2, description: '4-Day Material Incident Disclosure' },
];

export const mockGraphLinks: GraphLink[] = [
  { source: 'eu', target: 'ai-act', label: 'enacted' },
  { source: 'ai-act', target: 'art-5', label: 'contains' },
  { source: 'art-5', target: 'art-71', label: 'penalized by' },
  { source: 'ai-act', target: 'ai-office', label: 'governed by' },
  
  { source: 'pk', target: 'sbp', label: 'authorizes' },
  { source: 'sbp', target: 'aml-cft', label: 'enforces' },
  { source: 'aml-cft', target: 'cdd-edd', label: 'mandates' },
  { source: 'aml-cft', target: 'fmu', label: 'reports to' },
  
  { source: 'us', target: 'sec', label: 'authorizes' },
  { source: 'sec', target: 'cyber-rule', label: 'promulgates' },
];

export const mockJurisdictions = [
  { code: 'EU', name: 'European Union', activeActs: 42, alertsToday: 3, status: 'Active', latency: '42ms' },
  { code: 'US', name: 'United States (Fed + 50 States)', activeActs: 118, alertsToday: 7, status: 'Active', latency: '38ms' },
  { code: 'UK', name: 'United Kingdom (FCA / PRA)', activeActs: 34, alertsToday: 2, status: 'Active', latency: '45ms' },
  { code: 'PK', name: 'Pakistan (SBP / SECP)', activeActs: 19, alertsToday: 1, status: 'Active', latency: '88ms' },
  { code: 'SG', name: 'Singapore (MAS / PDPC)', activeActs: 28, alertsToday: 2, status: 'Active', latency: '65ms' },
  { code: 'JP', name: 'Japan (JFSA / METI)', activeActs: 22, alertsToday: 0, status: 'Active', latency: '72ms' },
  { code: 'AE', name: 'UAE (ADGM / DIFC / CBUAE)', activeActs: 17, alertsToday: 1, status: 'Active', latency: '92ms' },
  { code: 'BR', name: 'Brazil (LGPD / BCB)', activeActs: 15, alertsToday: 0, status: 'Active', latency: '120ms' },
  { code: 'IN', name: 'India (RBI / DPDP Act)', activeActs: 26, alertsToday: 3, status: 'Active', latency: '95ms' },
  { code: 'AU', name: 'Australia (APRA / ASIC)', activeActs: 21, alertsToday: 1, status: 'Active', latency: '110ms' },
  { code: 'CA', name: 'Canada (OSFI / PIPEDA)', activeActs: 18, alertsToday: 0, status: 'Active', latency: '52ms' },
  { code: 'CH', name: 'Switzerland (FINMA / FADP)', activeActs: 14, alertsToday: 0, status: 'Active', latency: '48ms' },
  { code: 'HK', name: 'Hong Kong (HKMA / SFC)', activeActs: 20, alertsToday: 1, status: 'Active', latency: '76ms' },
  { code: 'ID', name: 'Indonesia (OJK / PDP Law)', activeActs: 12, alertsToday: 1, status: 'Active', latency: '105ms' },
];
