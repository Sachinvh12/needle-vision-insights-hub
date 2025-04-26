
import React from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Link as LinkIcon, Copy, Mail } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '../context/AppContext';
import { mockBattlecard } from '../utils/mockData';
import { toast } from 'sonner';

const Battlecard: React.FC = () => {
  const { feedId } = useParams<{ feedId: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  const { userFeeds } = state;
  
  const feed = userFeeds.find(f => f.id === feedId);
  
  if (!feed) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header showAlertIcon />
        <div className="flex-1 container py-8 px-4 flex flex-col items-center justify-center">
          <h2 className="text-xl font-medium mb-4">Feed not found</h2>
          <Button onClick={() => navigate('/dashboard')} className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }
  
  const handleCopyToClipboard = () => {
    const battlecardText = `
      BATTLECARD: ${feed.name}
      
      KEY FINDINGS:
      ${mockBattlecard.findings.map(f => `- ${f.title}: ${f.summary}`).join('\n')}
      
      KEY TAKEAWAYS:
      ${mockBattlecard.keyTakeaways.map(t => `- ${t}`).join('\n')}
    `;
    
    navigator.clipboard.writeText(battlecardText);
    toast.success('Battlecard copied to clipboard');
  };
  
  const handleShareByEmail = () => {
    // In a real app, this would open an email dialog or send via API
    toast.success('Sharing via email...');
  };
  
  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    toast.success('Downloading battlecard...');
  };
  
  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500">Low</Badge>;
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header showAlertIcon />
      
      <main className="flex-1 container py-8 px-4">
        <div className="mb-6 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShareByEmail} className="gap-1">
              <Mail className="h-4 w-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="gap-1">
              <Copy className="h-4 w-4" />
              <span className="hidden sm:inline">Copy</span>
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownload} className="gap-1">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>
        
        <Card className="mb-6">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
              <CardTitle className="text-2xl font-bold">{feed.name}</CardTitle>
              <div className="text-sm text-gray-500">
                Last updated: {new Date(feed.lastActivity || feed.createdAt).toLocaleString()}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{feed.query}</p>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="findings" className="mb-8">
          <TabsList>
            <TabsTrigger value="findings">Key Findings</TabsTrigger>
            <TabsTrigger value="takeaways">Key Takeaways</TabsTrigger>
          </TabsList>
          
          <TabsContent value="findings" className="pt-4">
            <div className="space-y-6">
              {mockBattlecard.findings.map((finding, index) => (
                <motion.div
                  key={finding.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden">
                    <div className="flex items-center justify-between p-4 border-b">
                      <h3 className="font-semibold">{finding.title}</h3>
                      {getImportanceBadge(finding.importance)}
                    </div>
                    <CardContent className="pt-4">
                      <p className="text-gray-700 mb-4">{finding.summary}</p>
                      
                      <div className="space-y-3">
                        <h4 className="text-sm font-medium text-gray-500">Sources:</h4>
                        <div className="space-y-2">
                          {finding.sources.map((source, idx) => (
                            <div key={idx} className="flex items-center text-sm">
                              {source.type === 'web' ? (
                                <>
                                  <span className="flex items-center gap-1">
                                    <span className="text-base">🌐</span> Source: {source.name}
                                  </span>
                                  <Separator orientation="vertical" className="mx-2 h-4" />
                                  <a 
                                    href={source.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-needl-primary hover:underline flex items-center gap-1"
                                  >
                                    <LinkIcon className="h-3 w-3" /> View Source
                                  </a>
                                </>
                              ) : (
                                <>
                                  <span className="flex items-center gap-1">
                                    <span className="text-base">📄</span> Source: {source.name}
                                  </span>
                                  <Separator orientation="vertical" className="mx-2 h-4" />
                                  <span 
                                    className="text-needl-primary hover:underline flex items-center gap-1 cursor-pointer"
                                    onClick={() => toast.info(`Opening ${source.name}...`)}
                                  >
                                    <LinkIcon className="h-3 w-3" /> View Document
                                  </span>
                                </>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="takeaways" className="pt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Key Takeaways</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {mockBattlecard.keyTakeaways.map((takeaway, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-2"
                    >
                      <span className="text-needl-primary font-bold mt-1">•</span>
                      <span>{takeaway}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Battlecard;
