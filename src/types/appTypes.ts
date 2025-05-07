
// Define all shared types for the application

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Feed {
  id: string;
  name: string;
  query: string;
  type: 'competitor' | 'market' | 'trend' | 'custom';
  status: 'active' | 'paused' | 'error';
  createdAt: string;
  lastActivity: string; 
  snippet?: string;
  sourceMix?: {
    web: number;
    docs: number;
    other: number;
  };
  alertsCount?: number;
  documentsCount?: number;
  outputConfig?: {
    format: 'dashboard' | 'report' | 'alert';
    frequency: 'daily' | 'weekly' | 'monthly';
    channel: 'email' | 'app' | 'both';
  };
  personaType?: 'investor' | 'product' | 'sales' | 'researcher';
}

export interface Alert {
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
}

export interface SavedView {
  id: string;
  name: string;
  filters: {
    importance?: string;
    market?: string;
    company?: string;
    [key: string]: any;
  };
}

export interface PersonaInsight {
  title: string;
  description: string;
  actionItems: string[];
  metrics: {
    label: string;
    value: string;
    trend?: 'up' | 'down' | 'neutral';
  }[];
}

export interface AppState {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  userFeeds: Feed[];
  savedViews: SavedView[];
  currentFilters: {
    importance?: string;
    market?: string;
    company?: string;
    [key: string]: any;
  };
  selectedFeedId: string | null;
  alerts: Alert[];
  isAlertsModalOpen: boolean;
  setupState: any;
  connectedApps: string[];
}
