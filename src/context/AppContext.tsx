import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { mockFeeds, mockAlerts } from '../utils/mockData';
import type { Feed, Alert } from '../types/appTypes';

// Define Filter Options Type
export type FilterOptions = {
  importance?: string;
  market?: string;
  company?: string;
  [key: string]: any;
};

export type SavedView = {
  id: string;
  name: string;
  filters: FilterOptions;
};

export type SetupState = {
  [key: string]: any;
};

// Create context with default values
export interface AppState {
  isLoggedIn: boolean;
  user: any;
  isLoading: boolean;
  userFeeds: Feed[];
  savedViews: SavedView[];
  currentFilters: FilterOptions;
  selectedFeedId: string | null;
  selectedFeed?: Feed | null;
  alerts: Alert[];
  isAlertsModalOpen: boolean;
  setupState: SetupState;
  connectedApps: string[];
}

const initialState: AppState = {
  isLoggedIn: false,
  user: null,
  isLoading: false,
  userFeeds: [],
  savedViews: [],
  currentFilters: {},
  selectedFeedId: null,
  selectedFeed: null,
  alerts: [],
  isAlertsModalOpen: false,
  setupState: {},
  connectedApps: []
};

// Define context interface
interface AppContextType {
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
  updateFeed: (feed: Feed) => void;
  createFeed: (feed: Partial<Feed>) => void;
  deleteFeed: (id: string) => void;
}

const AppContext = createContext<AppContextType>({
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
  createFeed: () => {},
  deleteFeed: () => {},
});

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
  CREATE_FEED = 'CREATE_FEED',
  DELETE_FEED = 'DELETE_FEED',
}

// Type for actions
type Action = 
  | { type: ActionTypes.LOGIN_SUCCESS; payload: any }
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
  | { type: ActionTypes.UPDATE_FEED; payload: Feed }
  | { type: ActionTypes.CREATE_FEED; payload: Partial<Feed> }
  | { type: ActionTypes.DELETE_FEED; payload: string };

// Reducer function to handle state updates
const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
        userFeeds: [],
        savedViews: []
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case ActionTypes.SET_FILTERS:
      return {
        ...state,
        currentFilters: action.payload
      };
    case ActionTypes.ADD_SAVED_VIEW:
      const newView: SavedView = {
        id: uuidv4(),
        name: action.payload.name,
        filters: state.currentFilters
      };
      return {
        ...state,
        savedViews: [...state.savedViews, newView]
      };
    case ActionTypes.REMOVE_SAVED_VIEW:
      return {
        ...state,
        savedViews: state.savedViews.filter(view => view.id !== action.payload)
      };
    case ActionTypes.SELECT_FEED:
      const selectedFeed = action.payload 
        ? state.userFeeds.find(feed => feed.id === action.payload)
        : null;
      
      return {
        ...state,
        selectedFeedId: action.payload,
        selectedFeed: selectedFeed || null,
        isAlertsModalOpen: action.payload !== null
      };
    case ActionTypes.MARK_ALERT_READ:
      return {
        ...state,
        alerts: state.alerts.map(alert =>
          alert.id === action.payload ? { ...alert, read: true } : alert
        )
      };
    case ActionTypes.MARK_ALL_ALERTS_READ:
      return {
        ...state,
        alerts: state.alerts.map(alert => ({ ...alert, read: true }))
      };
    case ActionTypes.LOAD_INITIAL_DATA:
      const enhancedMockFeeds = mockFeeds.map(feed => ({
        ...feed,
        lastActivity: feed.lastActivity || feed.createdAt
      }));
      
      return {
        ...state,
        userFeeds: enhancedMockFeeds,
        alerts: mockAlerts
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
      const newFeed: Feed = {
        id: uuidv4(),
        name: action.payload.name || '',
        query: action.payload.query || '',
        type: action.payload.type || 'custom',
        status: action.payload.status || 'active',
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        snippet: action.payload.snippet || '',
        sourceMix: action.payload.sourceMix,
        alertsCount: action.payload.alertsCount || 0,
        documentsCount: action.payload.documentsCount || 0,
        outputConfig: action.payload.outputConfig
      };
      return {
        ...state,
        userFeeds: [...state.userFeeds, newFeed]
      };
    case ActionTypes.CREATE_FEED:
      const createdFeed: Feed = {
        id: uuidv4(),
        name: action.payload.name || '',
        query: action.payload.query || '',
        type: action.payload.type || 'custom',
        status: action.payload.status || 'active',
        createdAt: new Date().toISOString(),
        lastActivity: new Date().toISOString(),
        snippet: action.payload.snippet || '',
        sourceMix: action.payload.sourceMix,
        alertsCount: action.payload.alertsCount || 0,
        documentsCount: action.payload.documentsCount || 0,
        outputConfig: action.payload.outputConfig
      };
      return {
        ...state,
        userFeeds: [...state.userFeeds, createdFeed]
      };
    case ActionTypes.REMOVE_FEED:
      return {
        ...state,
        userFeeds: state.userFeeds.filter(feed => feed.id !== action.payload),
        selectedFeed: state.selectedFeed?.id === action.payload ? null : state.selectedFeed
      };
    case ActionTypes.DELETE_FEED:
      return {
        ...state,
        userFeeds: state.userFeeds.filter(feed => feed.id !== action.payload),
        selectedFeed: state.selectedFeed?.id === action.payload ? null : state.selectedFeed
      };
    case ActionTypes.UPDATE_FEED:
      return {
        ...state,
        userFeeds: state.userFeeds.map(feed => 
          feed.id === action.payload.id 
            ? { ...feed, ...action.payload } 
            : feed
        ),
        selectedFeed: state.selectedFeed?.id === action.payload.id 
          ? { ...state.selectedFeed, ...action.payload }
          : state.selectedFeed
      };
    default:
      return state;
  }
};

// Create AppProvider component to wrap the app
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: user
        });
        dispatch({
          type: ActionTypes.LOAD_INITIAL_DATA
        });
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = async (email: string, password: string) => {
    dispatch({
      type: ActionTypes.SET_LOADING,
      payload: true
    });
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: uuidv4(),
        email,
        name: email.split('@')[0],
        role: 'user' as const
      };
      
      localStorage.setItem('user', JSON.stringify(user));
      
      dispatch({
        type: ActionTypes.LOGIN_SUCCESS,
        payload: user
      });
      
      dispatch({
        type: ActionTypes.LOAD_INITIAL_DATA
      });
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed', {
        description: 'Please check your credentials and try again'
      });
      throw error;
    } finally {
      dispatch({
        type: ActionTypes.SET_LOADING,
        payload: false
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('user');
    dispatch({
      type: ActionTypes.LOGOUT
    });
    toast.info('You have been logged out');
  };

  const setFilters = (filters: FilterOptions) => {
    dispatch({
      type: ActionTypes.SET_FILTERS,
      payload: filters
    });
  };

  const addSavedView = (name: string) => {
    dispatch({
      type: ActionTypes.ADD_SAVED_VIEW,
      payload: { name }
    });
  };

  const removeSavedView = (id: string) => {
    dispatch({
      type: ActionTypes.REMOVE_SAVED_VIEW,
      payload: id
    });
  };

  const selectFeed = (id: string | null) => {
    dispatch({
      type: ActionTypes.SELECT_FEED,
      payload: id
    });
  };

  const markAlertRead = (id: string) => {
    dispatch({
      type: ActionTypes.MARK_ALERT_READ,
      payload: id
    });
  };

  const markAllAlertsRead = () => {
    dispatch({
      type: ActionTypes.MARK_ALL_ALERTS_READ
    });
  };

  const loadInitialData = () => {
    dispatch({
      type: ActionTypes.LOAD_INITIAL_DATA
    });
  };

  const toggleAlertsModal = () => {
    dispatch({
      type: ActionTypes.TOGGLE_ALERTS_MODAL
    });
  };

  const updateSetupState = (updates: Partial<SetupState>) => {
    dispatch({
      type: ActionTypes.UPDATE_SETUP_STATE,
      payload: updates
    });
  };

  const resetSetupState = () => {
    dispatch({
      type: ActionTypes.RESET_SETUP_STATE
    });
  };

  const toggleConnectedApp = (appId: string) => {
    dispatch({
      type: ActionTypes.TOGGLE_CONNECTED_APP,
      payload: appId
    });
  };

  const addFeed = (feed: Partial<Feed>) => {
    dispatch({
      type: ActionTypes.ADD_FEED,
      payload: feed
    });
  };

  const removeFeed = (id: string) => {
    dispatch({
      type: ActionTypes.REMOVE_FEED,
      payload: id
    });
  };

  const updateFeed = (feed: Feed) => {
    dispatch({
      type: ActionTypes.UPDATE_FEED,
      payload: feed
    });
  };

  const createFeed = (feed: Partial<Feed>) => {
    dispatch({
      type: ActionTypes.CREATE_FEED,
      payload: feed
    });
  };

  const deleteFeed = (id: string) => {
    dispatch({
      type: ActionTypes.DELETE_FEED,
      payload: id
    });
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
        createFeed,
        deleteFeed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
