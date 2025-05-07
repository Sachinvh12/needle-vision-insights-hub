
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
  personaType?: 'investor' | 'product' | 'sales' | 'researcher';
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
  personaType?: 'investor' | 'product' | 'sales' | 'researcher';
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
