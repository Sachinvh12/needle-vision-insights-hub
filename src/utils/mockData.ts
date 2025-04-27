import { v4 as uuidv4 } from 'uuid';
import { Feed, Alert, SavedView } from '../types/appTypes';

// Mock feeds data
export const mockFeeds: Feed[] = [
  {
    id: uuidv4(),
    name: "OPEC Monitoring",
    query: "opec oil production changes saudi arabia",
    type: "trend",
    status: "active",
    createdAt: new Date("2023-06-01").toISOString(),
    lastActivity: new Date("2023-06-12").toISOString(),
    snippet: "Track OPEC+ production quotas and actual outputs from member countries, with a focus on Saudi Arabia's leadership position.",
    sourceMix: {
      web: 70,
      docs: 25,
      other: 5
    },
    alertsCount: 14,
    documentsCount: 28,
    outputConfig: {
      format: "dashboard",
      frequency: "daily",
      channel: "email"
    }
  },
  {
    id: uuidv4(),
    name: "Energy Market Overview",
    query: "global energy market trends renewable fossil",
    type: "market",
    status: "active",
    createdAt: new Date("2023-05-15").toISOString(),
    lastActivity: new Date("2023-06-10").toISOString(),
    snippet: "General overview of global energy markets including transition trends, pricing models, and regional demand shifts.",
    sourceMix: {
      web: 65,
      docs: 30,
      other: 5
    },
    alertsCount: 8,
    documentsCount: 17,
    outputConfig: {
      format: "alert",
      frequency: "weekly",
      channel: "app"
    }
  },
  {
    id: uuidv4(),
    name: "ExxonMobil Intelligence",
    query: "exxonmobil strategy investment portfolio",
    type: "competitor",
    status: "active",
    createdAt: new Date("2023-04-20").toISOString(),
    lastActivity: new Date("2023-06-11").toISOString(),
    snippet: "Track ExxonMobil's strategic moves, investments, executive statements, and performance metrics against industry benchmarks.",
    sourceMix: {
      web: 55,
      docs: 40,
      other: 5
    },
    alertsCount: 11,
    documentsCount: 23,
    outputConfig: {
      format: "report",
      frequency: "monthly",
      channel: "both"
    }
  },
  {
    id: uuidv4(),
    name: "Harvard Hospitality Reports",
    query: "harvard business school hospitality research tourism",
    type: "custom",
    status: "paused",
    createdAt: new Date("2023-03-10").toISOString(),
    lastActivity: new Date("2023-05-30").toISOString(),
    snippet: "Aggregate research from Harvard Business School related to hospitality industry trends, case studies, and market forecasts.",
    sourceMix: {
      web: 30,
      docs: 65,
      other: 5
    },
    alertsCount: 6,
    documentsCount: 32,
    outputConfig: {
      format: "dashboard",
      frequency: "weekly",
      channel: "email"
    }
  },
  {
    id: uuidv4(),
    name: "Private Equity in Real Estate",
    query: "private equity real estate investment hospitality commercial",
    type: "trend",
    status: "active",
    createdAt: new Date("2023-02-15").toISOString(),
    lastActivity: new Date("2023-06-09").toISOString(),
    snippet: "Monitor private equity flows into commercial real estate with emphasis on hospitality sector acquisitions and developments.",
    sourceMix: {
      web: 45,
      docs: 45,
      other: 10
    },
    alertsCount: 9,
    documentsCount: 21,
    outputConfig: {
      format: "alert",
      frequency: "daily",
      channel: "app"
    }
  },
  {
    id: uuidv4(),
    name: "Global Oil Pricing",
    query: "brent crude wti oil price forecast",
    type: "market",
    status: "error",
    createdAt: new Date("2023-01-05").toISOString(),
    lastActivity: new Date("2023-05-28").toISOString(),
    snippet: "Track Brent crude and WTI oil price movements, including forecasts, geopolitical impacts, and market sentiment analysis.",
    sourceMix: {
      web: 75,
      docs: 20,
      other: 5
    },
    alertsCount: 16,
    documentsCount: 19,
    outputConfig: {
      format: "report",
      frequency: "weekly",
      channel: "both"
    }
  }
];

// Mock alerts data
export const mockAlerts: Alert[] = [
  {
    id: uuidv4(),
    feedId: mockFeeds[0].id,
    feedName: "OPEC Monitoring",
    title: "Crude Oil Faces Supply Surge",
    summary: "OPEC+ weighs June output increase amid market volatility. Saudi Arabia signals potential production boost to stabilize prices after recent fluctuations.",
    importance: "high",
    read: false,
    timestamp: new Date("2023-06-12T09:47:00").toISOString(),
    source: {
      type: "web",
      name: "Bloomberg Energy",
      url: "https://www.bloomberg.com/energy"
    }
  },
  {
    id: uuidv4(),
    feedId: mockFeeds[3].id,
    feedName: "Harvard Hospitality Reports",
    title: "Private Equity Deals Spike",
    summary: "Harvard, Prestige Hospitality, Max Estates drive liquidity shifts in the market. New research indicates growing investor confidence in premium hospitality assets.",
    importance: "medium",
    read: false,
    timestamp: new Date("2023-06-11T14:23:00").toISOString(),
    source: {
      type: "document",
      name: "Harvard Business Review Q2 Report",
      url: null
    }
  },
  {
    id: uuidv4(),
    feedId: mockFeeds[3].id,
    feedName: "Harvard Hospitality Reports",
    title: "Hospitality Sector Heats Up",
    summary: "New IPOs and acquisitions open fresh sales opportunities across the hospitality sector, with record number of deals closing in Q2 2023.",
    importance: "medium",
    read: true,
    timestamp: new Date("2023-06-10T11:32:00").toISOString(),
    source: {
      type: "web",
      name: "Hotel Business Review",
      url: "https://www.hotelbusiness.com"
    }
  },
  {
    id: uuidv4(),
    feedId: mockFeeds[5].id,
    feedName: "Global Oil Pricing",
    title: "Global Oil Markets Under Pressure",
    summary: "Geopolitical shifts and oversupply concerns impact forecasts for Q3. Analysts predict potential 15% price fluctuation in coming months.",
    importance: "high",
    read: true,
    timestamp: new Date("2023-06-09T08:15:00").toISOString(),
    source: {
      type: "web",
      name: "Energy Intelligence Weekly",
      url: "https://www.energyintel.com"
    }
  },
  {
    id: uuidv4(),
    feedId: mockFeeds[1].id,
    feedName: "Energy Market Overview",
    title: "Renewable Integration Challenges",
    summary: "New study highlights grid infrastructure limitations for renewable energy adoption in developing markets. Storage solutions becoming critical priority.",
    importance: "low",
    read: false,
    timestamp: new Date("2023-06-08T16:47:00").toISOString(),
    source: {
      type: "document",
      name: "Global Energy Review 2023",
      url: null
    }
  },
  {
    id: uuidv4(),
    feedId: mockFeeds[2].id,
    feedName: "ExxonMobil Intelligence",
    title: "ExxonMobil Announces Strategic Pivot",
    summary: "Company unveils new carbon capture investments while maintaining core fossil fuel portfolio. $3.2B allocated to new green initiatives.",
    importance: "high",
    read: false,
    timestamp: new Date("2023-06-07T10:30:00").toISOString(),
    source: {
      type: "web",
      name: "Reuters Business",
      url: "https://www.reuters.com/business"
    }
  },
  {
    id: uuidv4(),
    feedId: mockFeeds[4].id,
    feedName: "Private Equity in Real Estate",
    title: "Blackstone Acquires Luxury Hotel Chain",
    summary: "Private equity giant completes $4.8B acquisition of premium hospitality brand with 32 properties across 15 countries.",
    importance: "medium",
    read: true,
    timestamp: new Date("2023-06-06T13:15:00").toISOString(),
    source: {
      type: "web",
      name: "Financial Times",
      url: "https://www.ft.com"
    }
  }
];

// Mock saved views
export const mockSavedViews: SavedView[] = [
  {
    id: 'view-1',
    name: 'High Importance Competitor Updates',
    filters: {
      importance: 'high'
    }
  },
  {
    id: 'view-2',
    name: 'Healthcare AI Trends',
    filters: {
      market: 'healthcare'
    }
  },
  {
    id: 'view-3',
    name: 'Recent Financial Regulations',
    filters: {
      company: 'financial'
    }
  }
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
    title: 'Energy Trader',
    description: 'Track market movements, competitor activities, and financial performance for investment decisions.',
    icon: '📈',
    defaultQuery: 'Market trends financial performance stock movements for Company X and their competitors',
  },
  {
    id: 'persona-2',
    title: 'Junior Analyst',
    description: 'Monitor competitor product launches, feature updates, and customer feedback.',
    icon: '🔍',
    defaultQuery: 'Product features competitor analysis customer feedback for our market segment',
  },
  {
    id: 'persona-3',
    title: 'SDR',
    description: 'Gather intelligence on prospect companies, identify triggers, and build battlecards.',
    icon: '🤝',
    defaultQuery: 'Sales triggers organizational changes funding rounds for target accounts',
  },
  {
    id: 'persona-4',
    title: 'Researcher',
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
