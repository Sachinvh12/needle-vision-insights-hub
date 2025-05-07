
import React from 'react';
import { Document, Page, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

interface BattlecardPDFProps {
  feedName: string;
  findings: Array<{
    id: string;
    title: string;
    summary: string;
    importance: string;
  }>;
  takeaways: string[];
  personaType?: 'investor' | 'product' | 'researcher';
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    paddingBottom: 10,
    borderBottom: '1 solid #DDDDDD',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 15,
    color: '#555555',
  },
  personaBadge: {
    fontSize: 10,
    backgroundColor: '#F3F4F6',
    color: '#4B5563',
    padding: 5,
    borderRadius: 3,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  investorBadge: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
  },
  productBadge: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
  },
  researcherBadge: {
    backgroundColor: '#F3E8FF',
    color: '#6B21A8',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444444',
    backgroundColor: '#F5F5F5',
    padding: 5,
  },
  findingCard: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    border: '1 solid #EEEEEE',
    backgroundColor: '#FAFAFA',
  },
  findingTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333333',
  },
  findingImportance: {
    fontSize: 10,
    marginBottom: 5,
    color: '#FFFFFF',
    padding: 3,
    borderRadius: 3,
    alignSelf: 'flex-start',
  },
  importanceHigh: {
    backgroundColor: '#EF4444',
  },
  importanceMedium: {
    backgroundColor: '#F59E0B',
  },
  importanceLow: {
    backgroundColor: '#10B981',
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    color: '#555555',
    lineHeight: 1.5,
  },
  takeawayItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  takeawayBullet: {
    width: 15,
    fontSize: 12,
  },
  takeawayText: {
    flex: 1,
    fontSize: 12,
    color: '#555555',
    lineHeight: 1.5,
  },
  footer: {
    marginTop: 30,
    paddingTop: 10,
    borderTop: '1 solid #DDDDDD',
    fontSize: 10,
    color: '#999999',
    textAlign: 'center',
  },
  actionSection: {
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    border: '1 solid #EEEEEE',
    backgroundColor: '#F8F9FA',
  },
  actionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#444444',
  },
  actionItem: {
    marginBottom: 8,
    paddingLeft: 10,
  },
  priorityTag: {
    fontSize: 9,
    padding: 2,
    borderRadius: 2,
    color: '#FFFFFF',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  highPriority: {
    backgroundColor: '#EF4444',
  },
  mediumPriority: {
    backgroundColor: '#F59E0B',
  },
  logo: {
    width: 100,
    height: 30,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  colorBar: {
    height: 3,
    marginBottom: 10,
  },
  redGradient: {
    backgroundColor: '#EF4444',
  },
  blueGradient: {
    backgroundColor: '#3B82F6',
  },
  amberGradient: {
    backgroundColor: '#F59E0B',
  },
  purpleGradient: {
    backgroundColor: '#8B5CF6',
  },
  metricsSection: {
    marginTop: 10,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 5,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    padding: 5,
  },
  metricLabel: {
    fontSize: 10,
    color: '#6B7280',
    width: '50%',
  },
  metricValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#111827',
  },
  personaInsightsSection: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 5,
  },
  personaInsightTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 8,
  },
  highlightBox: {
    marginTop: 15,
    marginBottom: 10,
    padding: 8,
    borderRadius: 5,
    backgroundColor: '#FFEDD5',
  },
  highlightTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#92400E',
    marginBottom: 5,
  },
  personaSpecificSection: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#F0FDF4',
    borderRadius: 5,
    marginBottom: 15,
  },
});

export const BattlecardPDF: React.FC<BattlecardPDFProps> = ({ feedName, findings, takeaways, personaType }) => {
  // Add persona-specific insights based on personaType
  const getPersonaInsights = () => {
    switch (personaType) {
      case 'investor':
        return {
          title: "Energy Trading Intelligence",
          metrics: [
            { label: "WTI Crude Price", value: "$72.18 (+2.3%)" },
            { label: "Market Volatility", value: "32% (High)" },
            { label: "Supply Risk", value: "Moderate" },
            { label: "Sentiment", value: "Bullish (7.5/10)" },
          ],
          recommendations: [
            "Set real-time alerts for OPEC+ production announcements",
            "Monitor geopolitical tensions in key producing regions",
            "Track seasonal storage level reports for natural gas",
            "Analyze regulatory impacts across global energy markets"
          ],
          marketConditions: {
            supplyDemand: "Supply constraints in Middle East, growing demand in Asia",
            priceDrivers: "Production cuts, seasonal demand patterns, inventory levels",
            volatilityFactors: "Geopolitical tensions, weather patterns, transport disruptions"
          },
          tradingSignals: [
            { signal: "Buy", confidence: "High", timeframe: "Short-term (1-2 weeks)" },
            { signal: "Hold", confidence: "Moderate", timeframe: "Medium-term (1-3 months)" }
          ]
        };
      case 'product':
        return {
          title: "Financial Analysis Suite",
          metrics: [
            { label: "Peer Comparison", value: "93% complete" },
            { label: "Earnings Coverage", value: "Last 8 quarters" },
            { label: "Valuation Model", value: "DCF, Comps, SOTP" },
            { label: "Rating Accuracy", value: "87% (12-month)" },
          ],
          recommendations: [
            "Create alerts for SEC filings and earnings announcements",
            "Track insider transactions across target companies",
            "Monitor changes in institutional ownership percentages",
            "Analyze earnings call transcripts for sentiment shifts"
          ],
          financialHighlights: {
            keyMetrics: "Revenue CAGR, EBITDA margins, FCF yield, ROIC",
            comparisonGroups: "Industry peers, market cap range, growth profiles",
            valuationMethodologies: "Multiple analysis, DCF modeling, sum-of-parts"
          },
          catalysts: [
            { event: "Earnings announcement", impact: "High", timeline: "2 weeks" },
            { event: "Regulatory approval", impact: "Medium", timeline: "3 months" }
          ]
        };
      case 'researcher':
        return {
          title: "Market Research Intelligence",
          metrics: [
            { label: "Data Sources", value: "2,340+" },
            { label: "Research Coverage", value: "86% of sector" },
            { label: "Update Frequency", value: "4.2 hours" },
            { label: "Publication Access", value: "372 journals" },
          ],
          recommendations: [
            "Configure alerts for regulatory filings in key jurisdictions",
            "Track patent applications in emerging technology sectors",
            "Monitor academic publications across targeted research areas",
            "Analyze cross-border policy developments and harmonization"
          ],
          researchDomains: {
            regulatoryFrameworks: "Global policy landscape, compliance requirements, enforcement trends",
            emergingTechnologies: "AI/ML applications, blockchain use cases, quantum computing",
            academicPublications: "Peer-reviewed research, white papers, conference proceedings"
          },
          trendMonitoring: [
            { trend: "Regulatory shift", maturity: "Early stage", impact: "High" },
            { trend: "Technology adoption", maturity: "Growth phase", impact: "Medium" }
          ]
        };
      default:
        return null;
    }
  };

  const personaInsights = getPersonaInsights();

  // Define badge style based on persona type
  const getBadgeStyle = () => {
    switch (personaType) {
      case 'investor':
        return styles.investorBadge;
      case 'product':
        return styles.productBadge;
      case 'researcher':
        return styles.researcherBadge;
      default:
        return {};
    }
  };

  // Get persona badge text
  const getPersonaBadgeText = () => {
    switch (personaType) {
      case 'investor':
        return "Energy Trading Intelligence";
      case 'product':
        return "Financial Analysis";
      case 'researcher':
        return "Market Research";
      default:
        return "";
    }
  };

  // Get persona-specific action recommendations
  const getPersonaActions = () => {
    switch (personaType) {
      case 'investor':
        return [
          { title: "Pricing Strategy", content: "Adjust trading positions based on forecasted supply constraints over next 30 days", priority: "high" },
          { title: "Risk Management", content: "Implement hedging strategy against volatility in natural gas futures before seasonal peak", priority: "medium" }
        ];
      case 'product':
        return [
          { title: "Investment Focus", content: "Target undervalued assets in the sector with strong cash flow metrics and low leverage", priority: "high" },
          { title: "Portfolio Adjustment", content: "Rebalance exposure to companies with high regulatory risk ahead of upcoming policy changes", priority: "medium" }
        ];
      case 'researcher':
        return [
          { title: "Regulatory Monitoring", content: "Establish tracking system for cross-jurisdiction policy developments affecting target sectors", priority: "high" },
          { title: "Technology Assessment", content: "Conduct in-depth analysis of patent activity trends to identify emerging competitive threats", priority: "medium" }
        ];
      default:
        return [
          { title: "Strategic Opportunity", content: "Launch targeted campaign highlighting our superior features within 30 days", priority: "high" },
          { title: "Risk Mitigation", content: "Develop compliance automation tools to protect market share against regulatory changes", priority: "medium" }
        ];
    }
  };

  const actions = getPersonaActions();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <View style={[styles.colorBar, styles.blueGradient]} />
          <Text style={styles.title}>{feedName} Battlecard</Text>
          {personaType && (
            <Text style={[styles.personaBadge, getBadgeStyle()]}>
              {getPersonaBadgeText()}
            </Text>
          )}
          <Text style={styles.subtitle}>Intelligence Report | Generated on {new Date().toLocaleDateString()}</Text>
        </View>

        {personaType && personaInsights && (
          <View style={styles.personaInsightsSection}>
            <Text style={styles.personaInsightTitle}>{personaInsights.title}</Text>
            <View style={styles.metricsSection}>
              {personaInsights.metrics.map((metric, idx) => (
                <View key={idx} style={styles.metricRow}>
                  <Text style={styles.metricLabel}>{metric.label}:</Text>
                  <Text style={styles.metricValue}>{metric.value}</Text>
                </View>
              ))}
            </View>
            
            <Text style={[styles.sectionTitle, { backgroundColor: '#E5E7EB' }]}>Tailored Recommendations</Text>
            {personaInsights.recommendations.map((rec, idx) => (
              <View key={idx} style={styles.takeawayItem}>
                <Text style={styles.takeawayBullet}>• </Text>
                <Text style={styles.takeawayText}>{rec}</Text>
              </View>
            ))}
            
            {/* Persona-specific content */}
            {personaType === 'investor' && (
              <View style={styles.personaSpecificSection}>
                <Text style={styles.highlightTitle}>Market Conditions Overview</Text>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Supply/Demand:</Text>
                  <Text style={styles.metricValue}>{personaInsights.marketConditions.supplyDemand}</Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Price Drivers:</Text>
                  <Text style={styles.metricValue}>{personaInsights.marketConditions.priceDrivers}</Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Volatility Factors:</Text>
                  <Text style={styles.metricValue}>{personaInsights.marketConditions.volatilityFactors}</Text>
                </View>
                
                <Text style={[styles.highlightTitle, { marginTop: 10 }]}>Trading Signals</Text>
                {personaInsights.tradingSignals.map((signal, idx) => (
                  <View key={idx} style={styles.metricRow}>
                    <Text style={styles.metricLabel}>{signal.signal} ({signal.timeframe}):</Text>
                    <Text style={styles.metricValue}>{signal.confidence} Confidence</Text>
                  </View>
                ))}
              </View>
            )}
            
            {personaType === 'product' && (
              <View style={styles.personaSpecificSection}>
                <Text style={styles.highlightTitle}>Financial Analysis Framework</Text>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Key Metrics:</Text>
                  <Text style={styles.metricValue}>{personaInsights.financialHighlights.keyMetrics}</Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Comparison Groups:</Text>
                  <Text style={styles.metricValue}>{personaInsights.financialHighlights.comparisonGroups}</Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Valuation Methods:</Text>
                  <Text style={styles.metricValue}>{personaInsights.financialHighlights.valuationMethodologies}</Text>
                </View>
                
                <Text style={[styles.highlightTitle, { marginTop: 10 }]}>Upcoming Catalysts</Text>
                {personaInsights.catalysts.map((catalyst, idx) => (
                  <View key={idx} style={styles.metricRow}>
                    <Text style={styles.metricLabel}>{catalyst.event} ({catalyst.timeline}):</Text>
                    <Text style={styles.metricValue}>{catalyst.impact} Impact</Text>
                  </View>
                ))}
              </View>
            )}
            
            {personaType === 'researcher' && (
              <View style={styles.personaSpecificSection}>
                <Text style={styles.highlightTitle}>Research Domain Coverage</Text>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Regulatory:</Text>
                  <Text style={styles.metricValue}>{personaInsights.researchDomains.regulatoryFrameworks}</Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Technology:</Text>
                  <Text style={styles.metricValue}>{personaInsights.researchDomains.emergingTechnologies}</Text>
                </View>
                <View style={styles.metricRow}>
                  <Text style={styles.metricLabel}>Academic:</Text>
                  <Text style={styles.metricValue}>{personaInsights.researchDomains.academicPublications}</Text>
                </View>
                
                <Text style={[styles.highlightTitle, { marginTop: 10 }]}>Trend Monitoring Status</Text>
                {personaInsights.trendMonitoring.map((trend, idx) => (
                  <View key={idx} style={styles.metricRow}>
                    <Text style={styles.metricLabel}>{trend.trend} ({trend.maturity}):</Text>
                    <Text style={styles.metricValue}>{trend.impact} Impact</Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Findings</Text>
          {findings.map((finding, index) => (
            <View key={finding.id} style={styles.findingCard}>
              <Text style={styles.findingTitle}>{finding.title}</Text>
              <Text 
                style={[
                  styles.findingImportance,
                  finding.importance === 'high' ? styles.importanceHigh : 
                  finding.importance === 'medium' ? styles.importanceMedium : 
                  styles.importanceLow
                ]}
              >
                {finding.importance.toUpperCase()} IMPORTANCE
              </Text>
              <Text style={styles.text}>{finding.summary}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Takeaways</Text>
          {takeaways.map((takeaway, index) => (
            <View key={index} style={styles.takeawayItem}>
              <Text style={styles.takeawayBullet}>• </Text>
              <Text style={styles.takeawayText}>{takeaway}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recommended Actions</Text>
          {actions.map((action, index) => (
            <View key={index} style={styles.actionItem}>
              <Text 
                style={[
                  styles.priorityTag,
                  action.priority === 'high' ? styles.highPriority : styles.mediumPriority
                ]}
              >
                {action.priority.toUpperCase()} PRIORITY
              </Text>
              <Text style={styles.actionTitle}>{action.title}</Text>
              <Text style={styles.text}>{action.content}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.footer}>Confidential and Proprietary | For Internal Use Only</Text>
      </Page>
    </Document>
  );
};
