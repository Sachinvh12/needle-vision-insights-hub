
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Link as LinkIcon, Copy, Mail, ChevronRight, ChevronDown, Info, FileText, Globe } from 'lucide-react';
import Header from '../components/Header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  const [expandedSources, setExpandedSources] = useState<string[]>([]);
  
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

  const toggleSourceExpansion = (id: string) => {
    if (expandedSources.includes(id)) {
      setExpandedSources(expandedSources.filter(sourceId => sourceId !== id));
    } else {
      setExpandedSources([...expandedSources, id]);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
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
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="mb-6 overflow-hidden border-none shadow-md">
            <div className={`h-1.5 w-full ${feed.type === 'competitor' ? 'bg-red-500' : feed.type === 'market' ? 'bg-blue-500' : feed.type === 'trend' ? 'bg-amber-500' : 'bg-purple-500'}`} />
            <CardHeader className="pb-3 bg-white">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
                <div>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                    <Badge 
                      variant={feed.status === 'active' ? 'default' : feed.status === 'paused' ? 'outline' : 'destructive'}
                      className={feed.status === 'active' ? 'bg-green-500 text-xs h-5' : 'text-xs h-5'}
                    >
                      {feed.status === 'active' ? 'Active' : feed.status === 'paused' ? 'Paused' : 'Error'}
                    </Badge>
                    <span className="capitalize">{feed.type} Intelligence</span>
                  </div>
                  <CardTitle className="text-2xl font-bold">{feed.name}</CardTitle>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(feed.lastActivity || feed.createdAt).toLocaleString()}
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 pb-4 bg-white">
              <p className="text-gray-600">{feed.query}</p>
            </CardContent>
          </Card>
        </motion.div>
        
        <Tabs defaultValue="findings" className="mb-8">
          <TabsList className="bg-white shadow-sm border">
            <TabsTrigger value="findings" className="data-[state=active]:bg-needl-primary data-[state=active]:text-white">Key Findings</TabsTrigger>
            <TabsTrigger value="takeaways" className="data-[state=active]:bg-needl-primary data-[state=active]:text-white">Key Takeaways</TabsTrigger>
          </TabsList>
          
          <TabsContent value="findings" className="pt-4 space-y-6">
            {mockBattlecard.findings.map((finding, index) => (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-none shadow-md">
                  <div className={`h-1 w-full ${finding.importance === 'high' ? 'bg-red-500' : finding.importance === 'medium' ? 'bg-amber-500' : 'bg-green-500'}`} />
                  <div className="flex items-center justify-between p-4 border-b bg-white">
                    <h3 className="font-semibold text-lg">{finding.title}</h3>
                    {getImportanceBadge(finding.importance)}
                  </div>
                  <CardContent className="pt-4 bg-white">
                    <p className="text-gray-700 mb-6 text-base leading-relaxed">{finding.summary}</p>
                    
                    <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Info className="h-4 w-4" />
                        Sources:
                      </h4>
                      <div className="space-y-2">
                        {finding.sources.map((source, idx) => {
                          const isExpanded = expandedSources.includes(`${finding.id}-${idx}`);
                          
                          return (
                            <Card key={idx} className="border border-gray-200 overflow-hidden">
                              <div 
                                className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                                onClick={() => toggleSourceExpansion(`${finding.id}-${idx}`)}
                              >
                                <div className="flex items-center gap-2">
                                  {source.type === 'web' ? (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                      <Globe className="h-4 w-4 text-blue-600" />
                                    </div>
                                  ) : (
                                    <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center">
                                      <FileText className="h-4 w-4 text-amber-600" />
                                    </div>
                                  )}
                                  <div>
                                    <p className="text-sm font-medium">{source.name}</p>
                                    <p className="text-xs text-gray-500">{source.type === 'web' ? 'Web Source' : 'Document'}</p>
                                  </div>
                                </div>
                                <div>
                                  {isExpanded ? (
                                    <ChevronDown className="h-5 w-5 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                  )}
                                </div>
                              </div>
                              
                              {isExpanded && (
                                <div className="p-3 border-t bg-gray-50">
                                  <p className="text-sm text-gray-600 mb-3">
                                    "{finding.summary}" - Referenced from this source
                                  </p>
                                  
                                  {source.type === 'web' ? (
                                    <a 
                                      href={source.url || '#'} 
                                      target="_blank" 
                                      rel="noopener noreferrer"
                                      className="text-needl-primary hover:underline flex items-center gap-1 text-sm"
                                    >
                                      <LinkIcon className="h-3 w-3" /> View Source
                                    </a>
                                  ) : (
                                    <span 
                                      className="text-needl-primary hover:underline flex items-center gap-1 cursor-pointer text-sm"
                                      onClick={() => toast.info(`Opening ${source.name}...`)}
                                    >
                                      <LinkIcon className="h-3 w-3" /> View Document
                                    </span>
                                  )}
                                </div>
                              )}
                            </Card>
                          );
                        })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </TabsContent>
          
          <TabsContent value="takeaways" className="pt-4">
            <Card className="border-none shadow-md">
              <CardHeader className="bg-gray-50">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Badge className="bg-needl-primary h-6">Key</Badge>
                  Strategic Takeaways
                </CardTitle>
              </CardHeader>
              <CardContent className="bg-white">
                <ul className="space-y-4">
                  {mockBattlecard.keyTakeaways.map((takeaway, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-needl-primary/20 text-needl-primary flex items-center justify-center mt-0.5">
                        <span className="text-sm font-semibold">{index + 1}</span>
                      </div>
                      <p className="text-gray-700">{takeaway}</p>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="bg-white flex justify-end pt-0 pb-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="text-needl-primary"
                  onClick={handleCopyToClipboard}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Takeaways
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Battlecard;
