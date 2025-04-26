
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from "sonner";
import { mockFeeds, mockAlerts, mockSavedViews } from '../utils/mockData';

// Types
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Feed {
  id: string;
  name: string;
  query: string;
  type: 'market' | 'competitor' | 'trend' | 'custom';
  connectedApps: string[];
  outputConfig: {
    alerts: boolean;
    summaries: boolean;
    channels: string[];
    frequency?: string;
    lookbackRange?: number;
  };
  createdAt: Date;
  lastActivity?: Date;
  status: 'active' | 'paused' | 'error';
  sourceMix?: {
    web: number;
    docs: number;
    other: number;
  };
  snippet?: string;
  documentsCount?: number;
  alertsCount?: number;
}

export interface SavedView {
  id: string;
  name: string;
  filters: {
    company?: string;
    market?: string;
    dateRange?: { start: Date; end: Date };
    importance?: string;
    keywords?: string[];
  };
}

export interface Filters {
  company?: string;
  market?: string;
  dateRange?: { start: Date; end: Date };
  importance?: string;
  keywords?: string[];
}

export interface Alert {
  id: string;
  feedId: string;
  feedName: string;
  title: string;
  summary: string;
  importance: 'low' | 'medium' | 'high';
  source: {
    type: 'web' | 'document';
    name: string;
    url?: string;
  };
  timestamp: Date;
  read: boolean;
}

export interface AppState {
  isLoggedIn: boolean;
  user: User | null;
  userFeeds: Feed[];
  connectedApps: string[];
  currentFilters: Filters;
  savedViews: SavedView[];
  selectedFeedId: string | null;
  isAlertsModalOpen: boolean;
  alerts: Alert[];
  setupState: {
    selectedPersona?: string;
    setupQuery: string;
    feedName: string;
    connectedApps: string[];
    outputConfig: {
      alerts: boolean;
      summaries: boolean;
      channels: string[];
      frequency?: string;
      lookbackRange?: number;
    };
  };
}

// Initial state
const initialState: AppState = {
  isLoggedIn: false,
  user: null,
  userFeeds: [],
  connectedApps: [],
  currentFilters: {},
  savedViews: [],
  selectedFeedId: null,
  isAlertsModalOpen: false,
  alerts: [],
  setupState: {
    setupQuery: '',
    feedName: '',
    connectedApps: [],
    outputConfig: {
      alerts: true,
      summaries: false,
      channels: ['email'],
    },
  },
};

// Action types
type ActionType =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER_FEEDS'; payload: Feed[] }
  | { type: 'ADD_FEED'; payload: Feed }
  | { type: 'REMOVE_FEED'; payload: string }
  | { type: 'UPDATE_FEED'; payload: Feed }
  | { type: 'SET_CONNECTED_APPS'; payload: string[] }
  | { type: 'ADD_CONNECTED_APP'; payload: string }
  | { type: 'REMOVE_CONNECTED_APP'; payload: string }
  | { type: 'SET_CURRENT_FILTERS'; payload: Filters }
  | { type: 'SET_SAVED_VIEWS'; payload: SavedView[] }
  | { type: 'ADD_SAVED_VIEW'; payload: SavedView }
  | { type: 'REMOVE_SAVED_VIEW'; payload: string }
  | { type: 'SET_SELECTED_FEED_ID'; payload: string | null }
  | { type: 'TOGGLE_ALERTS_MODAL' }
  | { type: 'SET_ALERTS'; payload: Alert[] }
  | { type: 'MARK_ALERT_READ'; payload: string }
  | { type: 'MARK_ALL_ALERTS_READ' }
  | { type: 'SET_SETUP_STATE'; payload: Partial<AppState['setupState']> }
  | { type: 'RESET_SETUP_STATE' }
  | { type: 'LOAD_INITIAL_DATA' };

// Reducer
const appReducer = (state: AppState, action: ActionType): AppState => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'SET_USER_FEEDS':
      return {
        ...state,
        userFeeds: action.payload,
      };
    case 'ADD_FEED':
      return {
        ...state,
        userFeeds: [...state.userFeeds, action.payload],
      };
    case 'REMOVE_FEED':
      return {
        ...state,
        userFeeds: state.userFeeds.filter((feed) => feed.id !== action.payload),
      };
    case 'UPDATE_FEED':
      return {
        ...state,
        userFeeds: state.userFeeds.map((feed) =>
          feed.id === action.payload.id ? action.payload : feed
        ),
      };
    case 'SET_CONNECTED_APPS':
      return {
        ...state,
        connectedApps: action.payload,
      };
    case 'ADD_CONNECTED_APP':
      return {
        ...state,
        connectedApps: [...state.connectedApps, action.payload],
      };
    case 'REMOVE_CONNECTED_APP':
      return {
        ...state,
        connectedApps: state.connectedApps.filter((app) => app !== action.payload),
      };
    case 'SET_CURRENT_FILTERS':
      return {
        ...state,
        currentFilters: action.payload,
      };
    case 'SET_SAVED_VIEWS':
      return {
        ...state,
        savedViews: action.payload,
      };
    case 'ADD_SAVED_VIEW':
      return {
        ...state,
        savedViews: [...state.savedViews, action.payload],
      };
    case 'REMOVE_SAVED_VIEW':
      return {
        ...state,
        savedViews: state.savedViews.filter((view) => view.id !== action.payload),
      };
    case 'SET_SELECTED_FEED_ID':
      return {
        ...state,
        selectedFeedId: action.payload,
        isAlertsModalOpen: action.payload !== null,
      };
    case 'TOGGLE_ALERTS_MODAL':
      return {
        ...state,
        isAlertsModalOpen: !state.isAlertsModalOpen,
      };
    case 'SET_ALERTS':
      return {
        ...state,
        alerts: action.payload,
      };
    case 'MARK_ALERT_READ':
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          alert.id === action.payload ? { ...alert, read: true } : alert
        ),
      };
    case 'MARK_ALL_ALERTS_READ':
      return {
        ...state,
        alerts: state.alerts.map((alert) => ({ ...alert, read: true })),
      };
    case 'SET_SETUP_STATE':
      return {
        ...state,
        setupState: {
          ...state.setupState,
          ...action.payload,
        },
      };
    case 'RESET_SETUP_STATE':
      return {
        ...state,
        setupState: {
          setupQuery: '',
          feedName: '',
          connectedApps: [],
          outputConfig: {
            alerts: true,
            summaries: false,
            channels: ['email'],
          },
        },
      };
    case 'LOAD_INITIAL_DATA':
      return {
        ...state,
        userFeeds: mockFeeds,
        alerts: mockAlerts,
        savedViews: mockSavedViews,
      };
    default:
      return state;
  }
};

// Create context
type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<ActionType>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addFeed: (feed: Omit<Feed, 'id' | 'createdAt' | 'status'>) => void;
  removeFeed: (feedId: string) => void;
  updateFeed: (feed: Feed) => void;
  toggleConnectedApp: (appName: string) => void;
  setFilters: (filters: Filters) => void;
  addSavedView: (name: string) => void;
  removeSavedView: (viewId: string) => void;
  selectFeed: (feedId: string | null) => void;
  toggleAlertsModal: () => void;
  markAlertRead: (alertId: string) => void;
  markAllAlertsRead: () => void;
  updateSetupState: (setupState: Partial<AppState['setupState']>) => void;
  resetSetupState: () => void;
  loadInitialData: () => void;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Try to get state from localStorage
  const getSavedState = (): AppState => {
    const savedState = localStorage.getItem('needl_app_state');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        // Convert date strings back to Date objects
        if (parsedState.userFeeds) {
          parsedState.userFeeds = parsedState.userFeeds.map((feed: any) => ({
            ...feed,
            createdAt: new Date(feed.createdAt),
            lastActivity: feed.lastActivity ? new Date(feed.lastActivity) : undefined,
          }));
        }
        if (parsedState.currentFilters && parsedState.currentFilters.dateRange) {
          parsedState.currentFilters.dateRange = {
            start: new Date(parsedState.currentFilters.dateRange.start),
            end: new Date(parsedState.currentFilters.dateRange.end),
          };
        }
        if (parsedState.alerts) {
          parsedState.alerts = parsedState.alerts.map((alert: any) => ({
            ...alert,
            timestamp: new Date(alert.timestamp),
          }));
        }
        return parsedState;
      } catch (error) {
        console.error('Error parsing saved state:', error);
        return initialState;
      }
    }
    return initialState;
  };

  const [state, dispatch] = useReducer(appReducer, getSavedState());

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('needl_app_state', JSON.stringify(state));
  }, [state]);

  // Helper functions
  const login = async (email: string, password: string) => {
    try {
      // Mock login request
      if (email && password) {
        // Simulate successful login
        setTimeout(() => {
          const mockUser: User = {
            id: '1',
            name: 'Demo User',
            email: email,
          };
          dispatch({ type: 'LOGIN', payload: mockUser });
          
          // Load initial data when user logs in
          loadInitialData();
          
          toast.success("Login successful!");
        }, 1000);
      } else {
        throw new Error('Please enter email and password');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    }
  };

  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast("Logged out successfully", {
      description: "You've been successfully logged out of your account."
    });
  };

  const loadInitialData = () => {
    dispatch({ type: 'LOAD_INITIAL_DATA' });
    // Don't show a toast for initial data loading
  };

  const addFeed = (feed: Omit<Feed, 'id' | 'createdAt' | 'status'>) => {
    const newFeed: Feed = {
      ...feed,
      id: `feed-${Date.now()}`,
      createdAt: new Date(),
      status: 'active',
    };
    dispatch({ type: 'ADD_FEED', payload: newFeed });
    toast.success(`Feed "${feed.name}" created!`);
  };

  const removeFeed = (feedId: string) => {
    const feed = state.userFeeds.find((f) => f.id === feedId);
    dispatch({ type: 'REMOVE_FEED', payload: feedId });
    if (feed) {
      toast.success(`Feed "${feed.name}" removed`);
    }
  };

  const updateFeed = (feed: Feed) => {
    dispatch({ type: 'UPDATE_FEED', payload: feed });
    toast.success(`Feed "${feed.name}" updated`);
  };

  const toggleConnectedApp = (appName: string) => {
    if (state.connectedApps.includes(appName)) {
      dispatch({ type: 'REMOVE_CONNECTED_APP', payload: appName });
      toast(`Disconnected from ${appName}`, {
        description: `Your ${appName} account has been disconnected successfully.`
      });
    } else {
      dispatch({ type: 'ADD_CONNECTED_APP', payload: appName });
      toast.success(`Connected to ${appName}`, {
        description: `Your ${appName} account has been successfully connected.`
      });
    }
  };

  const setFilters = (filters: Filters) => {
    dispatch({ type: 'SET_CURRENT_FILTERS', payload: filters });
  };

  const addSavedView = (name: string) => {
    const newView: SavedView = {
      id: `view-${Date.now()}`,
      name,
      filters: state.currentFilters,
    };
    dispatch({ type: 'ADD_SAVED_VIEW', payload: newView });
    toast.success(`Board "${name}" saved`, {
      description: "Your current view has been saved as a board."
    });
  };

  const removeSavedView = (viewId: string) => {
    const view = state.savedViews.find((v) => v.id === viewId);
    dispatch({ type: 'REMOVE_SAVED_VIEW', payload: viewId });
    if (view) {
      toast.success(`Board "${view.name}" removed`);
    }
  };

  const selectFeed = (feedId: string | null) => {
    dispatch({ type: 'SET_SELECTED_FEED_ID', payload: feedId });
  };

  const toggleAlertsModal = () => {
    dispatch({ type: 'TOGGLE_ALERTS_MODAL' });
  };

  const markAlertRead = (alertId: string) => {
    dispatch({ type: 'MARK_ALERT_READ', payload: alertId });
  };

  const markAllAlertsRead = () => {
    dispatch({ type: 'MARK_ALL_ALERTS_READ' });
    toast.success("All alerts marked as read");
  };

  const updateSetupState = (setupState: Partial<AppState['setupState']>) => {
    dispatch({ type: 'SET_SETUP_STATE', payload: setupState });
  };

  const resetSetupState = () => {
    dispatch({ type: 'RESET_SETUP_STATE' });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        login,
        logout,
        addFeed,
        removeFeed,
        updateFeed,
        toggleConnectedApp,
        setFilters,
        addSavedView,
        removeSavedView,
        selectFeed,
        toggleAlertsModal,
        markAlertRead,
        markAllAlertsRead,
        updateSetupState,
        resetSetupState,
        loadInitialData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
