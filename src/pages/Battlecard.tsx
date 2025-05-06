
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Download, Link as LinkIcon, Copy, Mail, ChevronRight, ChevronDown, Info, FileText, Globe } from 'lucide-react';
import MainHeader from '../components/MainHeader';
import PageTransition from '../components/PageTransition';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useApp } from '../context/AppContext';
import { mockBattlecard } from '../utils/mockData';
import { toast } from '@/hooks/use-toast';

const Battlecard: React.FC = () => {
  const { feedId } = useParams<{ feedId: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  const { userFeeds } = state;
  const [expandedSources, setExpandedSources] = useState<string[]>([]);
  const [downloading, setDownloading] = useState(false);
  const [sharing, setSharing] = useState(false);
  
  const feed = userFeeds.find(f => f.id === feedId);
  
  if (!feed) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
        <MainHeader />
        <PageTransition className="flex-1">
          <div className="container py-8 px-4 flex flex-col items-center justify-center">
            <Card className="max-w-md w-full border-none shadow-md">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-xl">Feed Not Found</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-6">
                <p className="text-gray-500 mb-6">The intelligence feed you're looking for doesn't exist or has been removed.</p>
                <Button onClick={() => navigate('/intelligence-hub')} className="gap-2 bg-needl-primary hover:bg-needl-dark">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Intelligence Hub
                </Button>
              </CardContent>
            </Card>
          </div>
        </PageTransition>
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
    toast({
      title: "Copied to clipboard",
      description: "Battlecard content has been copied to your clipboard.",
      variant: "default",
    });
  };
  
  const handleShareByEmail = () => {
    setSharing(true);
    
    // Simulate email sending process
    setTimeout(() => {
      setSharing(false);
      toast({
        title: "Shared successfully",
        description: "Battlecard has been sent to your email.",
        variant: "default",
      });
    }, 1500);
  };
  
  const handleDownload = () => {
    setDownloading(true);
    
    // Simulate downloading process
    setTimeout(() => {
      setDownloading(false);
      
      // In a real implementation, we would generate a PDF and download it
      // For now, we'll just show a toast
      toast({
        title: "Download complete",
        description: `${feed.name} battlecard has been downloaded.`,
        variant: "default",
      });
    }, 1500);
  };
  
  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high':
        return <Badge className="bg-red-500 hover:bg-red-600">High</Badge>;
      case 'medium':
        return <Badge className="bg-amber-500 hover:bg-amber-600">Medium</Badge>;
      case 'low':
        return <Badge className="bg-green-500 hover:bg-green-600">Low</Badge>;
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

  // Get feed-specific content based on feed type
  const getFeedSpecificTakeaways = () => {
    const baseTakeaways = [...mockBattlecard.keyTakeaways];
    
    // Add feed-specific takeaways based on feed type
    if (feed.type === 'competitor') {
      baseTakeaways.push("Competitor is showing weakness in their supply chain that we can capitalize on.");
      baseTakeaways.push("Their new product launch timeline suggests a 2-month market opportunity window.");
    } else if (feed.type === 'market') {
      baseTakeaways.push("Market conditions suggest favorable timing for our Q3 expansion strategy.");
      baseTakeaways.push("New regulations will create compliance challenges for smaller players.");
    } else if (feed.type === 'trend') {
      baseTakeaways.push("This trend shows strong momentum with a 23% month-over-month increase in adoption.");
      baseTakeaways.push("Early adoption will position us ahead of 78% of the market.");
    }
    
    return baseTakeaways;
  };
  
  // Get feed-specific findings based on feed type
  const getFeedSpecificFindings = () => {
    const baseFindings = [...mockBattlecard.findings];
    
    if (feed.type === 'competitor') {
      // Modify first finding to be competitor-specific
      if (baseFindings[0]) {
        baseFindings[0].title = "Competitive Advantage Analysis";
        baseFindings[0].summary = `Analysis of ${feed.name}'s market position reveals vulnerabilities in their customer retention strategy. Their churn rate increased by 12% this quarter, creating an opportunity for targeted acquisition campaigns.`;
      }
    } else if (feed.type === 'market') {
      // Modify first finding to be market-specific
      if (baseFindings[0]) {
        baseFindings[0].title = "Market Growth Projection";
        baseFindings[0].summary = `The ${feed.name} market is projected to grow 18% annually through 2026, with the enterprise segment showing the strongest demand signals. Focusing resources on this segment could yield 2.3x ROI.`;
      }
    } else if (feed.type === 'trend') {
      // Modify first finding to be trend-specific
      if (baseFindings[0]) {
        baseFindings[0].title = "Trend Adoption Curve";
        baseFindings[0].summary = `The ${feed.name} trend is entering mainstream adoption phase. Early adopters are reporting 31% efficiency gains. Our competitors have typically lagged 6-9 months in embracing similar innovations.`;
      }
    }
    
    return baseFindings;
  };
  
  const customizedFindings = getFeedSpecificFindings();
  const customizedTakeaways = getFeedSpecificTakeaways();
  
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-blue-50/30">
      <MainHeader showAlertIcon />
      
      <PageTransition>
        <main className="flex-1 container py-6 px-4">
          <div className="mb-5 flex justify-between items-center">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                variant="outline"
                onClick={() => navigate('/intelligence-hub')}
                className="gap-2 border-needl-primary/20 hover:bg-needl-lighter hover:border-needl-primary"
              >
                <ArrowLeft className="h-4 w-4 text-needl-primary" />
                <span>Back to Hub</span>
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex gap-2"
            >
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleShareByEmail}
                disabled={sharing}
                className="gap-1 border-needl-primary/20 hover:bg-needl-lighter hover:border-needl-primary"
              >
                <Mail className={`h-4 w-4 ${sharing ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Share</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCopyToClipboard}
                className="gap-1 border-needl-primary/20 hover:bg-needl-lighter hover:border-needl-primary"
              >
                <Copy className="h-4 w-4" />
                <span className="hidden sm:inline">Copy</span>
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleDownload}
                disabled={downloading}
                className="gap-1 border-needl-primary/20 hover:bg-needl-lighter hover:border-needl-primary"
              >
                <Download className={`h-4 w-4 ${downloading ? 'animate-spin' : ''}`} />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6"
          >
            <Card className="overflow-hidden border-none shadow-md">
              <div className={`h-1.5 w-full ${feed.type === 'competitor' ? 'bg-red-500' : feed.type === 'market' ? 'bg-blue-500' : feed.type === 'trend' ? 'bg-amber-500' : 'bg-purple-500'}`} />
              <CardHeader className="pb-3 bg-white flex flex-col md:flex-row md:items-center md:justify-between space-y-0">
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
                  <CardTitle className="text-2xl font-bold bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent">
                    {feed.name}
                  </CardTitle>
                </div>
                <div className="text-sm text-gray-500 mt-0">
                  <div className="flex items-center bg-gray-50 py-1 px-3 rounded-full">
                    <span className="mr-2">Updated:</span>
                    <span className="font-medium">{new Date(feed.lastActivity || feed.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}</span>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0 pb-4 bg-white">
                <p className="text-gray-600">{feed.query}</p>
              </CardContent>
            </Card>
          </motion.div>
          
          <Tabs defaultValue="findings" className="mb-8">
            <TabsList className="bg-white shadow-sm border mb-4 rounded-xl overflow-hidden">
              <TabsTrigger value="findings" className="px-8 data-[state=active]:bg-needl-primary data-[state=active]:text-white transition-all duration-300">
                Key Findings
              </TabsTrigger>
              <TabsTrigger value="takeaways" className="px-8 data-[state=active]:bg-needl-primary data-[state=active]:text-white transition-all duration-300">
                Key Takeaways
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="findings" className="pt-2 space-y-6">
              {customizedFindings.map((finding, index) => (
                <motion.div
                  key={finding.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow duration-300">
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
                              <Card key={idx} className="border border-gray-200 overflow-hidden hover:border-needl-primary/30 transition-colors">
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
                                  <motion.div
                                    animate={{ rotate: isExpanded ? 90 : 0 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                  </motion.div>
                                </div>
                                
                                <AnimatePresence>
                                  {isExpanded && (
                                    <motion.div 
                                      initial={{ opacity: 0, height: 0 }}
                                      animate={{ opacity: 1, height: 'auto' }}
                                      exit={{ opacity: 0, height: 0 }}
                                      transition={{ duration: 0.2 }}
                                      className="border-t"
                                    >
                                      <div className="p-3 bg-gray-50">
                                        <p className="text-sm text-gray-600 mb-3 italic border-l-2 border-needl-primary/30 pl-3 py-1">
                                          "{finding.summary.substring(0, 120)}..."
                                        </p>
                                        
                                        {source.type === 'web' ? (
                                          <a 
                                            href={source.url || '#'} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-needl-primary hover:underline flex items-center gap-1 text-sm"
                                          >
                                            <LinkIcon className="h-3 w-3" /> View Original Source
                                          </a>
                                        ) : (
                                          <span 
                                            className="text-needl-primary hover:underline flex items-center gap-1 cursor-pointer text-sm"
                                            onClick={() => toast({
                                              title: "Opening Document",
                                              description: `Opening ${source.name} in document viewer`,
                                            })}
                                          >
                                            <LinkIcon className="h-3 w-3" /> View Document
                                          </span>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </AnimatePresence>
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
            
            <TabsContent value="takeaways" className="pt-2">
              <Card className="border-none shadow-md">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50/50 pb-3">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Badge className="bg-needl-primary h-6 px-3">Key</Badge>
                    <span className="bg-gradient-to-r from-needl-dark to-needl-primary bg-clip-text text-transparent">
                      Strategic Takeaways for {feed.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-white pt-4">
                  <ul className="space-y-4">
                    {customizedTakeaways.map((takeaway, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="flex items-start gap-3 p-3 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors rounded-md"
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
                    className="gap-2 border-needl-primary/20 hover:bg-needl-lighter hover:border-needl-primary"
                    onClick={handleCopyToClipboard}
                  >
                    <Copy className="h-4 w-4" />
                    Copy Takeaways
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </PageTransition>
    </div>
  );
};

export default Battlecard;
