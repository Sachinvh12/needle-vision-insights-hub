
// Define feed-related types for the application
export type Feed = {
  id: string;
  name: string;
  query: string;
  type: "market" | "competitor" | "trend" | "custom";
  status: "active" | "paused" | "error";
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
    frequency?: "daily" | "weekly" | "monthly";
    channel?: string;
  };
  connectedApps?: string[];
  notifications?: {
    slack: boolean;
    storage: boolean;
  };
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
