export type NavTab = 
  | 'dashboard' 
  | 'research' 
  | 'documents' 
  | 'graph' 
  | 'monitoring' 
  | 'workspace' 
  | 'uploads' 
  | 'api' 
  | 'review' 
  | 'settings';

export interface RegulatoryAlert {
  id: string;
  title: string;
  summary: string;
  timeAgo: string;
  dotColor: 'error' | 'secondary' | 'surface-tint' | 'success';
  jurisdiction: string;
  category: string;
  severity: 'high' | 'medium' | 'low';
  documentRef?: string;
}

export interface RecentQuery {
  id: string;
  query: string;
  timestamp: string;
  category: string;
}

export interface SavedBrief {
  id: string;
  title: string;
  updated: string;
  jurisdiction: string;
  summary: string;
}

export interface DocumentNode {
  id: string;
  title: string;
  type: 'title' | 'chapter' | 'article' | 'recital';
  number?: string;
  children?: DocumentNode[];
}

export interface DiffClause {
  id: string;
  clauseId: string;
  type: 'added' | 'removed' | 'modified' | 'unchanged';
  previousText?: string;
  currentText?: string;
  note?: string;
}

export interface ProvisionMetadata {
  citation: string;
  authority: string;
  status: 'In Force' | 'Draft' | 'Repealed' | 'Proposed';
  effectiveDate: string;
  jurisdiction: string;
  relationships: {
    type: 'Defines Penalty' | 'Cross-Reference' | 'Delegated Act' | 'Implementing Regulation';
    title: string;
    description: string;
    targetId: string;
  }[];
  amendmentHistory: {
    version: string;
    name: string;
    date: string;
    isCurrent?: boolean;
  }[];
}

export interface ResearchCitation {
  id: string;
  number: number;
  label: string;
  authority: string;
  document: string;
  version: string;
  location: string;
  sourceExtract: string;
  url?: string;
}

export interface ResearchFinding {
  number: number;
  title: string;
  content: string;
  citationId: string;
}

export interface ReviewQueueItem {
  id: string;
  type: 'Classification' | 'Amendment' | 'Entity Extraction';
  severity: 'HIGH' | 'MED' | 'LOW';
  title: string;
  subtitle: string;
  aiConfidence: number;
  reasoning: string;
  reasoningQuote: string;
  proposedCategory: string;
  tokens: string[];
  evidenceText: {
    title: string;
    subtitle: string;
    paragraphs: {
      id: string;
      heading?: string;
      text: string;
      isHighlighted?: boolean;
      highlightType?: 'error' | 'warning' | 'secondary';
    }[];
  };
}

export interface GraphNode {
  id: string;
  label: string;
  type: 'jurisdiction' | 'regulation' | 'authority' | 'obligation' | 'penalty' | 'concept';
  group: number;
  description?: string;
}

export interface GraphLink {
  source: string;
  target: string;
  label: string;
}
