
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
  personaType?: 'investor' | 'product' | 'sales' | 'researcher';
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
    backgroundColor: '#DCFCE7',
    color: '#166534',
  },
  productBadge: {
    backgroundColor: '#DBEAFE',
    color: '#1E40AF',
  },
  salesBadge: {
    backgroundColor: '#F3E8FF',
    color: '#6B21A8',
  },
  researcherBadge: {
    backgroundColor: '#FEF3C7',
    color: '#92400E',
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
});

export const BattlecardPDF: React.FC<BattlecardPDFProps> = ({ feedName, findings, takeaways, personaType }) => {
  // Add actions for the PDF
  const actions = [
    { title: "Strategic Opportunity", content: "Launch targeted campaign highlighting our superior features within 30 days", priority: "high" },
    { title: "Risk Mitigation", content: "Develop compliance automation tools to protect market share against regulatory changes", priority: "medium" },
  ];

  // Add persona-specific insights based on personaType
  const getPersonaInsights = () => {
    switch (personaType) {
      case 'investor':
        return {
          title: "Investment Insights",
          metrics: [
            { label: "Market Share Growth", value: "+4.2% QoQ" },
            { label: "Competitor Valuation", value: "$3.8B (-2.1% YoY)" },
            { label: "Risk Assessment", value: "Medium-Low" },
            { label: "Market Penetration", value: "23.7%" },
          ],
          recommendations: [
            "Prioritize long-term stability over short-term gains",
            "Consider strategic partnerships to offset competitive threats",
            "Monitor regulatory changes closely as they impact valuation"
          ]
        };
      case 'product':
        return {
          title: "Product Strategy Insights",
          metrics: [
            { label: "Feature Gap Analysis", value: "8 missing features" },
            { label: "Customer Sentiment", value: "7.8/10 (+0.5)" },
            { label: "Time to Market", value: "3.2 months" },
            { label: "Product-Market Fit", value: "High (85%)" },
          ],
          recommendations: [
            "Focus on UX improvements in core workflows",
            "Accelerate roadmap for API integrations",
            "Consider pricing simplification to compete effectively"
          ]
        };
      case 'sales':
        return {
          title: "Sales Enablement Insights",
          metrics: [
            { label: "Competitive Win Rate", value: "62% (+5%)" },
            { label: "Avg. Deal Value", value: "$86K" },
            { label: "Sales Cycle", value: "47 days (-3)" },
            { label: "Objection Frequency", value: "-12% MoM" },
          ],
          recommendations: [
            "Emphasize our superior support in competitive deals",
            "Highlight security certifications when displacing Competitor A",
            "Leverage implementation speed as key differentiator"
          ]
        };
      case 'researcher':
        return {
          title: "Market Research Insights",
          metrics: [
            { label: "Data Points Analyzed", value: "47,200+" },
            { label: "Trend Confidence", value: "92%" },
            { label: "Segment Growth", value: "Enterprise: +18%" },
            { label: "Market Maturity", value: "Early Majority" },
          ],
          recommendations: [
            "Focus research on emerging Eastern European markets",
            "Conduct detailed analysis of SMB adoption patterns",
            "Investigate correlation between pricing models and retention"
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
      case 'sales':
        return styles.salesBadge;
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
        return "Investment Analysis";
      case 'product':
        return "Product Strategy";
      case 'sales':
        return "Sales Intelligence";
      case 'researcher':
        return "Market Research";
      default:
        return "";
    }
  };

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
