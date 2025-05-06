
import React from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

interface BattlecardPDFProps {
  feedName: string;
  findings: Array<{
    id: string;
    title: string;
    summary: string;
    importance: string;
  }>;
  takeaways: string[];
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
});

export const BattlecardPDF: React.FC<BattlecardPDFProps> = ({ feedName, findings, takeaways }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{feedName} Battlecard</Text>
        <Text style={styles.subtitle}>Intelligence Report | Generated on {new Date().toLocaleDateString()}</Text>
      </View>

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

      <Text style={styles.footer}>Confidential and Proprietary | For Internal Use Only</Text>
    </Page>
  </Document>
);
