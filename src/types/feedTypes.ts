
// Define feed-related types for the application
export type Feed = {
  id: string;
  name: string;
  query: string;
  type: string;
  status: string;
  createdAt: string;
  lastActivity: string;
  snippet: string;
  sourceMix?: {
    web: number;
    docs: number;
    other: number;
  };
  alertsCount?: number;
  documentsCount?: number;
  outputConfig?: {
    format?: string;
    frequency?: string;
    channel?: string;
  };
  connectedApps?: string[];
  personaType?: 'investor' | 'product' | 'researcher';
};

export type Alert = {
  id: string;
  feedId: string;
  feedName: string;
  title: string;
  summary: string;
  importance: 'high' | 'medium' | 'low';
  read: boolean;
  timestamp: string;
  source: {
    type: 'web' | 'document';
    name: string;
    url: string | null;
  };
};

export type SetupState = {
  selectedPersona?: string;
  setupQuery?: string;
  selectedSources?: string[];
  outputFormat?: string;
  feedName?: string;
  connectedApps?: string[];
  personaType?: 'investor' | 'product' | 'researcher';
  outputConfig?: {
    alerts?: boolean;
    summaries?: boolean;
    channels?: string[];
    frequency?: string;
    lookbackRange?: number;
  };
};

export type FilterOptions = {
  company?: string;
  market?: string;
  importance?: string;
};

export type SavedView = {
  id: string;
  name: string;
  filters: FilterOptions;
};

export type PersonaInsight = {
  title: string;
  description: string;
  actionItems: string[];
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
  recommendations: string[];
};

// Energy trader-specific types
export type EnergyTraderData = {
  commodityPrices: {
    name: string;
    price: number;
    change: number;
    changePercent: number;
  }[];
  marketVolatility: {
    period: string;
    value: number;
    trend: 'up' | 'down' | 'neutral';
  }[];
  supplyDemandMetrics: {
    metric: string;
    value: string;
    status: 'surplus' | 'deficit' | 'balanced';
  }[];
  geopoliticalRisks: {
    region: string;
    riskLevel: 'low' | 'moderate' | 'high' | 'severe';
    impact: string;
  }[];
};

// Junior analyst-specific types
export type AnalystData = {
  financialMetrics: {
    metric: string;
    value: string;
    changePercent: number;
    industry: string;
  }[];
  analystRatings: {
    firm: string;
    rating: string;
    priceTarget: number;
    previousTarget: number;
    date: string;
  }[];
  earningsData: {
    period: string;
    estimated: number;
    actual: number;
    surprise: number;
  }[];
  peerComparison: {
    company: string;
    metric: string;
    value: number;
    industryAvg: number;
  }[];
};

// Researcher-specific types
export type ResearcherData = {
  regulatoryUpdates: {
    jurisdiction: string;
    title: string;
    summary: string;
    effectiveDate: string;
    impactLevel: 'low' | 'moderate' | 'high';
  }[];
  technologyTrends: {
    name: string;
    adoptionStage: string;
    growthRate: number;
    keyPlayers: string[];
  }[];
  academicResearch: {
    title: string;
    authors: string[];
    publication: string;
    publicationDate: string;
    keyFindings: string;
  }[];
  patentActivity: {
    organization: string;
    filings: number;
    growthRate: number;
    keyAreas: string[];
  }[];
};
