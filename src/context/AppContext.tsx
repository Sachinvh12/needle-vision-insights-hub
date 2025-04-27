
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { mockFeeds, mockAlerts } from '../utils/mockData';

// Define App Context State and Types
export type User = {
  id: string;
  email: string;
  name: string;
  role: string;
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
};

export type SavedView = {
  id: string;
  name: string;
  filters: FilterOptions;
};

export type FilterOptions = {
  company?: string;
  market?: string;
  importance?: string;
};

export type SetupState = {
  selectedPersona?: string;
  setupQuery?: string;
  selectedSources?: string[];
  outputFormat?: string;
};

type AppState = {
  isLoggedIn: boolean;
  user: User | null;
  isLoading: boolean;
  userFeeds: Feed[];
  savedViews: SavedView[];
  currentFilters: FilterOptions;
  selectedFeedId: string | null;
  alerts: Alert[];
  isAlertsModalOpen: boolean;
  setupState: SetupState;
  connectedApps: string[];
};

enum ActionTypes {
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGOUT = 'LOGOUT',
  SET_LOADING = 'SET_LOADING',
  SET_FILTERS = 'SET_FILTERS',
  ADD_SAVED_VIEW = 'ADD_SAVED_VIEW',
  REMOVE_SAVED_VIEW = 'REMOVE_SAVED_VIEW',
  SELECT_FEED = 'SELECT_FEED',
  MARK_ALERT_READ = 'MARK_ALERT_READ',
  MARK_ALL_ALERTS_READ = 'MARK_ALL_ALERTS_READ',
  LOAD_INITIAL_DATA = 'LOAD_INITIAL_DATA',
  TOGGLE_ALERTS_MODAL = 'TOGGLE_ALERTS_MODAL',
  UPDATE_SETUP_STATE = 'UPDATE_SETUP_STATE',
  RESET_SETUP_STATE = 'RESET_SETUP_STATE',
  TOGGLE_CONNECTED_APP = 'TOGGLE_CONNECTED_APP',
  ADD_FEED = 'ADD_FEED',
  REMOVE_FEED = 'REMOVE_FEED',
  UPDATE_FEED = 'UPDATE_FEED',
}

type Action =
  | { type: ActionTypes.LOGIN_SUCCESS; payload: User }
  | { type: ActionTypes.LOGOUT }
  | { type: ActionTypes.SET_LOADING; payload: boolean }
  | { type: ActionTypes.SET_FILTERS; payload: FilterOptions }
  | { type: ActionTypes.ADD_SAVED_VIEW; payload: { name: string } }
  | { type: ActionTypes.REMOVE_SAVED_VIEW; payload: string }
  | { type: ActionTypes.SELECT_FEED; payload: string | null }
  | { type: ActionTypes.MARK_ALERT_READ; payload: string }
  | { type: ActionTypes.MARK_ALL_ALERTS_READ }
  | { type: ActionTypes.LOAD_INITIAL_DATA }
  | { type: ActionTypes.TOGGLE_ALERTS_MODAL }
  | { type: ActionTypes.UPDATE_SETUP_STATE; payload: Partial<SetupState> }
  | { type: ActionTypes.RESET_SETUP_STATE }
  | { type: ActionTypes.TOGGLE_CONNECTED_APP; payload: string }
  | { type: ActionTypes.ADD_FEED; payload: Partial<Feed> }
  | { type: ActionTypes.REMOVE_FEED; payload: string }
  | { type: ActionTypes.UPDATE_FEED; payload: { id: string, updates: Partial<Feed> } };

// Create context with default values
const initialState: AppState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  userFeeds: [],
  savedViews: [],
  currentFilters: {},
  selectedFeedId: null,
  alerts: [],
  isAlertsModalOpen: false,
  setupState: {},
  connectedApps: [],
};

const AppContext = createContext<{
  state: AppState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setFilters: (filters: FilterOptions) => void;
  addSavedView: (name: string) => void;
  removeSavedView: (id: string) => void;
  selectFeed: (id: string | null) => void;
  markAlertRead: (id: string) => void;
  markAllAlertsRead: () => void;
  loadInitialData: () => void;
  toggleAlertsModal: () => void;
  updateSetupState: (updates: Partial<SetupState>) => void;
  resetSetupState: () => void;
  toggleConnectedApp: (appId: string) => void;
  addFeed: (feed: Partial<Feed>) => void;
  removeFeed: (id: string) => void;
  updateFeed: (id: string, updates: Partial<Feed>) => void;
}>({
  state: initialState,
  login: async () => {},
  logout: () => {},
  setFilters: () => {},
  addSavedView: () => {},
  removeSavedView: () => {},
  selectFeed: () => {},
  markAlertRead: () => {},
  markAllAlertsRead: () => {},
  loadInitialData: () => {},
  toggleAlertsModal: () => {},
  updateSetupState: () => {},
  resetSetupState: () => {},
  toggleConnectedApp: () => {},
  addFeed: () => {},
  removeFeed: () => {},
  updateFeed: () => {},
});

// Reducer function to handle state updates
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        userFeeds: [],
        savedViews: [],
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        currentFilters: action.payload,
      };
    case ActionTypes.ADD_SAVED_VIEW:
      const newView = {
        id: uuidv4(),
        name: action.payload.name,
        filters: state.currentFilters,
      };
      return {
        ...state,
        savedViews: [...state.savedViews, newView],
      };
    case ActionTypes.REMOVE_SAVED_VIEW:
      return {
        ...state,
        savedViews: state.savedViews.filter((view) => view.id !== action.payload),
      };
    case ActionTypes.SELECT_FEED:
      return {
        ...state,
        selectedFeedId: action.payload,
      };
    case ActionTypes.MARK_ALERT_READ:
      return {
        ...state,
        alerts: state.alerts.map((alert) =>
          alert.id === action.payload ? { ...alert, read: true } : alert
        ),
      };
    case ActionTypes.MARK_ALL_ALERTS_READ:
      return {
        ...state,
        alerts: state.alerts.map((alert) => ({ ...alert, read: true })),
      };
    case ActionTypes.LOAD_INITIAL_DATA:
      // Load mock data for demo purposes
      return {
        ...state,
        userFeeds: mockFeeds,
        alerts: mockAlerts,
      };
    case ActionTypes.TOGGLE_ALERTS_MODAL:
      return {
        ...state,
        isAlertsModalOpen: !state.isAlertsModalOpen
      };
    case ActionTypes.UPDATE_SETUP_STATE:
      return {
        ...state,
        setupState: {
          ...state.setupState,
          ...action.payload
        }
      };
    case ActionTypes.RESET_SETUP_STATE:
      return {
        ...state,
        setupState: {}
      };
    case ActionTypes.TOGGLE_CONNECTED_APP:
      const isConnected = state.connectedApps.includes(action.payload);
      return {
        ...state,
        connectedApps: isConnected 
          ? state.connectedApps.filter(app => app !== action.payload)
          : [...state.connectedApps, action.payload]
      };
    case ActionTypes.ADD_FEED:
      const newFeed = {
        id: uuidv4(),
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        status: 'active',
        alertsCount: 0,
        documentsCount: 0,
        ...action.payload
      };
      return {
        ...state,
        userFeeds: [...state.userFeeds, newFeed as Feed]
      };
    case ActionTypes.REMOVE_FEED:
      return {
        ...state,
        userFeeds: state.userFeeds.filter(feed => feed.id !== action.payload)
      };
    case ActionTypes.UPDATE_FEED:
      return {
        ...state,
        userFeeds: state.userFeeds.map(feed => 
          feed.id === action.payload.id 
            ? { ...feed, ...action.payload.updates } 
            : feed
        )
      };
    default:
      return state;
  }
};

// Create AppProvider component to wrap the app
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Check if user is already logged in (e.g., from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: user });
        dispatch({ type: ActionTypes.LOAD_INITIAL_DATA });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    dispatch({ type: ActionTypes.SET_LOADING, payload: true });
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Mock login - in a real app, validate credentials with API
      const user: User = {
        id: uuidv4(),
        email,
        name: email.split('@')[0],
        role: 'user',
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: ActionTypes.LOGIN_SUCCESS, payload: user });
      dispatch({ type: ActionTypes.LOAD_INITIAL_DATA });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed', {
        description: 'Please check your credentials and try again',
      });
      throw error;
    } finally {
      dispatch({ type: ActionTypes.SET_LOADING, payload: false });
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('user');
    dispatch({ type: ActionTypes.LOGOUT });
    toast.info('You have been logged out');
  };

  // Filter functions
  const setFilters = (filters: FilterOptions) => {
    dispatch({ type: ActionTypes.SET_FILTERS, payload: filters });
  };

  // Saved view functions
  const addSavedView = (name: string) => {
    dispatch({ type: ActionTypes.ADD_SAVED_VIEW, payload: { name } });
  };

  const removeSavedView = (id: string) => {
    dispatch({ type: ActionTypes.REMOVE_SAVED_VIEW, payload: id });
  };

  // Feed selection function
  const selectFeed = (id: string | null) => {
    dispatch({ type: ActionTypes.SELECT_FEED, payload: id });
  };

  // Alert functions
  const markAlertRead = (id: string) => {
    dispatch({ type: ActionTypes.MARK_ALERT_READ, payload: id });
  };

  const markAllAlertsRead = () => {
    dispatch({ type: ActionTypes.MARK_ALL_ALERTS_READ });
  };

  // Initial data loading function
  const loadInitialData = () => {
    dispatch({ type: ActionTypes.LOAD_INITIAL_DATA });
  };

  // Toggle alerts modal
  const toggleAlertsModal = () => {
    dispatch({ type: ActionTypes.TOGGLE_ALERTS_MODAL });
  };

  // Setup state functions
  const updateSetupState = (updates: Partial<SetupState>) => {
    dispatch({ type: ActionTypes.UPDATE_SETUP_STATE, payload: updates });
  };

  const resetSetupState = () => {
    dispatch({ type: ActionTypes.RESET_SETUP_STATE });
  };

  // Connected apps functions
  const toggleConnectedApp = (appId: string) => {
    dispatch({ type: ActionTypes.TOGGLE_CONNECTED_APP, payload: appId });
  };

  // Feed management functions
  const addFeed = (feed: Partial<Feed>) => {
    dispatch({ type: ActionTypes.ADD_FEED, payload: feed });
  };

  const removeFeed = (id: string) => {
    dispatch({ type: ActionTypes.REMOVE_FEED, payload: id });
  };

  const updateFeed = (id: string, updates: Partial<Feed>) => {
    dispatch({ type: ActionTypes.UPDATE_FEED, payload: { id, updates } });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        login,
        logout,
        setFilters,
        addSavedView,
        removeSavedView,
        selectFeed,
        markAlertRead,
        markAllAlertsRead,
        loadInitialData,
        toggleAlertsModal,
        updateSetupState,
        resetSetupState,
        toggleConnectedApp,
        addFeed,
        removeFeed,
        updateFeed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the AppContext
export const useApp = () => useContext(AppContext);
