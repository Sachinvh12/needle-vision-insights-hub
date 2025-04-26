
import { Feed, Alert, SavedView } from '../context/AppContext';

// Mock feeds data
export const mockFeeds: Feed[] = [
  {
    id: 'feed-1',
    name: 'Competitor Analysis - TechCorp',
    query: 'TechCorp market share product launch',
    type: 'competitor',
    connectedApps: ['google-drive', 'dropbox'],
    outputConfig: {
      alerts: true,
      summaries: true,
      channels: ['email', 'slack'],
      frequency: 'daily',
      lookbackRange: 7,
    },
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 6 * 60 * 60 * 1000),
    status: 'active',
    sourceMix: {
      web: 65,
      docs: 30,
      other: 5,
    },
    snippet: 'TechCorp announced a new product line that could disrupt...',
  },
  {
    id: 'feed-2',
    name: 'Market Trends - AI in Healthcare',
    query: 'artificial intelligence healthcare innovation trends',
    type: 'market',
    connectedApps: ['onedrive', 'google-drive'],
    outputConfig: {
      alerts: true,
      summaries: true,
      channels: ['email'],
      frequency: 'weekly',
      lookbackRange: 30,
    },
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 12 * 60 * 60 * 1000),
    status: 'active',
    sourceMix: {
      web: 70,
      docs: 25,
      other: 5,
    },
    snippet: 'New research suggests AI diagnostics could be more accurate than...',
  },
  {
    id: 'feed-3',
    name: 'Regulatory Changes - Financial Sector',
    query: 'financial regulation compliance banking laws',
    type: 'trend',
    connectedApps: ['dropbox'],
    outputConfig: {
      alerts: true,
      summaries: false,
      channels: ['email', 'slack'],
      frequency: 'daily',
      lookbackRange: 14,
    },
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    lastActivity: new Date(Date.now() - 24 * 60 * 60 * 1000),
    status: 'paused',
    sourceMix: {
      web: 55,
      docs: 40,
      other: 5,
    },
    snippet: 'New SEC guidelines expected to impact reporting requirements...',
  },
];

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    feedId: 'feed-1',
    feedName: 'Competitor Analysis - TechCorp',
    title: 'TechCorp Announces New Product Line',
    summary: 'TechCorp unveiled a new suite of AI-powered products that could potentially disrupt the market and affect our positioning.',
    importance: 'high',
    source: {
      type: 'web',
      name: 'TechCorp Press Release',
      url: 'https://example.com/techcorp-press',
    },
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'alert-2',
    feedId: 'feed-2',
    feedName: 'Market Trends - AI in Healthcare',
    title: 'New Research on AI Diagnostics Accuracy',
    summary: 'Latest research published in Medical Journal shows AI diagnostic tools outperforming human doctors in certain areas by 15%.',
    importance: 'medium',
    source: {
      type: 'document',
      name: 'Medical Journal Research Paper.pdf',
    },
    timestamp: new Date(Date.now() - 10 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'alert-3',
    feedId: 'feed-1',
    feedName: 'Competitor Analysis - TechCorp',
    title: 'TechCorp Market Share Increase',
    summary: 'Q2 financial reports show TechCorp increasing market share by 5.3% in our core segments.',
    importance: 'high',
    source: {
      type: 'web',
      name: 'Financial Times',
      url: 'https://example.com/financial-news',
    },
    timestamp: new Date(Date.now() - 16 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'alert-4',
    feedId: 'feed-3',
    feedName: 'Regulatory Changes - Financial Sector',
    title: 'SEC Announces New Compliance Rules',
    summary: 'SEC will implement new financial reporting requirements starting next quarter, affecting all publicly traded companies.',
    importance: 'medium',
    source: {
      type: 'document',
      name: 'SEC-Guidelines-2023.pdf',
    },
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'alert-5',
    feedId: 'feed-2',
    feedName: 'Market Trends - AI in Healthcare',
    title: 'Startup Raises $200M for AI Diagnostics',
    summary: 'HealthAI secures $200M Series C funding to expand AI diagnostic tools to hospitals nationwide.',
    importance: 'low',
    source: {
      type: 'web',
      name: 'TechCrunch',
      url: 'https://example.com/techcrunch-news',
    },
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
    read: false,
  },
];

// Mock saved views
export const mockSavedViews: SavedView[] = [
  {
    id: 'view-1',
    name: 'High Importance Competitor Updates',
    filters: {
      importance: 'high',
      keywords: ['competitor', 'market share'],
    },
  },
  {
    id: 'view-2',
    name: 'Healthcare AI Trends',
    filters: {
      market: 'healthcare',
      keywords: ['ai', 'innovation'],
    },
  },
  {
    id: 'view-3',
    name: 'Recent Financial Regulations',
    filters: {
      dateRange: {
        start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        end: new Date(),
      },
      keywords: ['regulation', 'compliance'],
    },
  },
];

// Mock battlecard data
export const mockBattlecard = {
  id: 'battlecard-1',
  feedId: 'feed-1',
  title: 'TechCorp Competitive Analysis',
  lastUpdated: new Date(Date.now() - 6 * 60 * 60 * 1000),
  findings: [
    {
      id: 'finding-1',
      title: 'TechCorp New Product Launch',
      summary: 'TechCorp is launching a new AI-powered analytics platform that targets our core enterprise customers.',
      importance: 'high',
      sources: [
        {
          type: 'web',
          name: 'TechCorp Press Release',
          url: 'https://example.com/techcorp-press',
        },
        {
          type: 'document',
          name: 'TechCorp-Product-Roadmap.pdf',
        },
      ],
    },
    {
      id: 'finding-2',
      title: 'Market Share Shifts',
      summary: 'TechCorp has gained 5.3% market share in the enterprise segment, primarily taking from SmallTech Inc.',
      importance: 'medium',
      sources: [
        {
          type: 'web',
          name: 'Financial Times Analysis',
          url: 'https://example.com/market-analysis',
        },
        {
          type: 'document',
          name: 'Q2-Market-Report.xlsx',
        },
      ],
    },
    {
      id: 'finding-3',
      title: 'Executive Team Changes',
      summary: 'TechCorp hired Sarah Johnson, former VP of Product at DataCorp, as their new Chief Product Officer.',
      importance: 'low',
      sources: [
        {
          type: 'web',
          name: 'LinkedIn Announcement',
          url: 'https://example.com/linkedin-post',
        },
      ],
    },
  ],
  keyTakeaways: [
    'TechCorp is aggressively expanding into our core market segments',
    'Their new product launch directly competes with our flagship offering',
    'They are investing heavily in AI capabilities to differentiate',
    'Key talent acquisition suggests a renewed focus on product innovation'
  ],
};

// Mock user personas
export const mockPersonas = [
  {
    id: 'persona-1',
    title: 'Investment Analyst',
    description: 'Track market movements, competitor activities, and financial performance for investment decisions.',
    icon: '📈',
    defaultQuery: 'Market trends financial performance stock movements for Company X and their competitors',
  },
  {
    id: 'persona-2',
    title: 'Product Manager',
    description: 'Monitor competitor product launches, feature updates, and customer feedback.',
    icon: '🔍',
    defaultQuery: 'Product features competitor analysis customer feedback for our market segment',
  },
  {
    id: 'persona-3',
    title: 'Sales Development',
    description: 'Gather intelligence on prospect companies, identify triggers, and build battlecards.',
    icon: '🤝',
    defaultQuery: 'Sales triggers organizational changes funding rounds for target accounts',
  },
  {
    id: 'persona-4',
    title: 'Market Researcher',
    description: 'Track industry trends, regulatory changes, and emerging technologies.',
    icon: '📊',
    defaultQuery: 'Industry trends regulatory changes innovation for our market sector',
  },
];

// Mock connector apps
export const mockConnectors = [
  {
    id: 'google-drive',
    name: 'Google Drive',
    icon: '📁',
    description: 'Connect your Google Drive to analyze documents',
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    icon: '📦',
    description: 'Connect Dropbox to analyze stored files',
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    icon: '☁️',
    description: 'Connect Microsoft OneDrive for document analysis',
  },
  {
    id: 'upload',
    name: 'Upload Files',
    icon: '📤',
    description: 'Upload files directly for analysis',
  },
];
