
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, Share2, Mail, ChevronDown, ChevronUp, ExternalLink, Clock, Calendar, Tag, Target, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useApp } from '../context/AppContext';
import { useToast } from '@/hooks/use-toast';
import MainHeader from '../components/MainHeader';
import PageTransition from '../components/PageTransition';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const Battlecard: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { state } = useApp();
  const { toast } = useToast();
  const [activeSources, setActiveSources] = useState<number[]>([]);
  const [loading, setLoading] = useState({
    pdf: false,
    email: false
  });

  // Get the feed data based on the ID parameter
  const feed = state.userFeeds.find(feed => feed.id === id);
  // Ensure feedType is one of the allowed types
  const feedType = feed?.type as 'competitor' | 'market' | 'trend' | 'custom' || 'competitor';

  // Redirect if feed not found
  useEffect(() => {
    if (!feed && !loading.pdf) {
      navigate('/intelligence-hub');
    }
  }, [feed, navigate, loading.pdf]);

  if (!feed) return null;

  // Handle expanding/collapsing source details
  const toggleSource = (index: number) => {
    if (activeSources.includes(index)) {
      setActiveSources(activeSources.filter(i => i !== index));
    } else {
      setActiveSources([...activeSources, index]);
    }
  };

  // Handle downloading the battlecard as PDF
  const handleDownload = async () => {
    setLoading(prev => ({ ...prev, pdf: true }));

    try {
      const element = document.getElementById('battlecard-content');
      if (!element) throw new Error("Battlecard content not found");
      
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: "#ffffff",
      });
      
      const imgData = canvas.toDataURL('image/png');
      
      // Create PDF with appropriate dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      const ratio = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
      
      const imgX = (pageWidth - imgWidth * ratio) / 2;
      const imgY = 20;
      
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
      pdf.save(`battlecard-${feed.name.toLowerCase().replace(/\s+/g, '-')}.pdf`);
      
      // Use toast.success instead of toast directly
      toast.success("Success!", {
        description: "Battlecard downloaded as PDF"
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      // Use toast.error instead of toast directly
      toast.error("Error", {
        description: "Failed to generate PDF"
      });
    } finally {
      setLoading(prev => ({ ...prev, pdf: false }));
    }
  };

  // Handle sharing via email
  const handleShare = () => {
    setLoading(prev => ({ ...prev, email: true }));
    
    setTimeout(() => {
      const subject = encodeURIComponent(`Needl.ai Battlecard: ${feed.name}`);
      const body = encodeURIComponent(`I'd like to share this intelligence battlecard on ${feed.name} with you.`);
      window.open(`mailto:?subject=${subject}&body=${body}`);
      
      // Use toast.success instead of toast directly
      toast.success("Email client opened", {
        description: "Ready to share your battlecard"
      });
      
      setLoading(prev => ({ ...prev, email: false }));
    }, 500);
  };

  // Custom variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Feed type specific content
  const getFeedSpecificContent = () => {
    switch (feedType) {
      case 'competitor':
        return {
          title: 'Competitive Intelligence',
          sections: [
            {
              title: 'Competitor Overview',
              content: 'Analysis of their market position, strengths, and weaknesses'
            },
            {
              title: 'Product Comparison',
              content: 'Detailed comparison of features, pricing, and value propositions'
            },
            {
              title: 'Market Tactics',
              content: 'Their go-to-market strategy and customer acquisition approaches'
            }
          ]
        };
      case 'market':
        return {
          title: 'Market Intelligence',
          sections: [
            {
              title: 'Market Trends',
              content: 'Analysis of emerging patterns and directional shifts'
            },
            {
              title: 'Growth Opportunities',
              content: 'Identification of untapped segments and expansion possibilities'
            },
            {
              title: 'Regulatory Landscape',
              content: 'Overview of relevant regulations and compliance requirements'
            }
          ]
        };
      case 'trend':
        return {
          title: 'Trend Intelligence',
          sections: [
            {
              title: 'Trend Analysis',
              content: 'Detailed breakdown of emerging patterns and their implications'
            },
            {
              title: 'User Impact',
              content: 'How these trends affect user behavior and expectations'
            },
            {
              title: 'Future Outlook',
              content: 'Projected evolution and strategic importance'
            }
          ]
        };
      default:
        return {
          title: 'Intelligence Battlecard',
          sections: [
            {
              title: 'Key Insights',
              content: 'Critical findings and actionable intelligence'
            },
            {
              title: 'Strategic Implications',
              content: 'How these insights impact your business decisions'
            },
            {
              title: 'Recommended Actions',
              content: 'Suggested next steps based on the intelligence gathered'
            }
          ]
        };
    }
  };

  const specificContent = getFeedSpecificContent();

  return (
    <div className="min-h-screen bg-gray-50">
      <MainHeader showAlertIcon={true} />
      
      <PageTransition>
        <main className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div>
              <motion.h1 
                className="text-2xl md:text-3xl font-bold text-gray-900"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {feed.name} Battlecard
              </motion.h1>
              <motion.p 
                className="text-gray-500 mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                {specificContent.title} | Last updated: {new Date().toLocaleDateString()}
              </motion.p>
            </div>
            
            <motion.div 
              className="flex space-x-3 mt-4 md:mt-0"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Button 
                variant="outline" 
                className="flex items-center space-x-2" 
                onClick={handleShare}
                disabled={loading.email}
              >
                {loading.email ? (
                  <span className="animate-spin mr-2">◌</span>
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                <span>Share</span>
              </Button>
              
              <Button 
                variant="default" 
                className="bg-needl-primary hover:bg-needl-dark flex items-center space-x-2" 
                onClick={handleDownload}
                disabled={loading.pdf}
              >
                {loading.pdf ? (
                  <span className="animate-spin mr-2">◌</span>
                ) : (
                  <Download className="w-4 h-4 mr-2" />
                )}
                <span>Download</span>
              </Button>
            </motion.div>
          </div>
          
          <div id="battlecard-content" className="mb-8">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="w-full justify-start mb-6 bg-white border border-gray-200 rounded-lg p-1">
                <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
                <TabsTrigger value="insights" className="text-sm">Key Insights</TabsTrigger>
                <TabsTrigger value="sources" className="text-sm">Intelligence Sources</TabsTrigger>
                <TabsTrigger value="action-plan" className="text-sm">Action Plan</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-0 space-y-4">
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <motion.div variants={itemVariants}>
                    <Card className="overflow-hidden border-0 shadow-md bg-white relative">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-needl-primary to-blue-500"></div>
                      <CardHeader className="pb-4">
                        <CardTitle className="text-xl md:text-2xl flex items-center">
                          <span className="bg-gradient-to-r from-needl-primary to-blue-500 bg-clip-text text-transparent">
                            {feed.name} Overview
                          </span>
                        </CardTitle>
                        <CardDescription>
                          Comprehensive analysis and strategic positioning
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="pb-2">
                        <div className="flex flex-wrap gap-3 mb-4">
                          <Badge variant="outline" className="flex items-center gap-1 bg-blue-50 text-blue-700 border-blue-200">
                            <Target className="w-3 h-3" />
                            {feedType === 'competitor' ? 'Competitor' : feedType === 'market' ? 'Market' : feedType === 'trend' ? 'Trend' : 'Custom'}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1 bg-amber-50 text-amber-700 border-amber-200">
                            <Calendar className="w-3 h-3" />
                            Tracked since {new Date(feed.createdAt).toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1 bg-purple-50 text-purple-700 border-purple-200">
                            <Tag className="w-3 h-3" />
                            {feedType}
                          </Badge>
                          <Badge variant="outline" className="flex items-center gap-1 bg-green-50 text-green-700 border-green-200">
                            <Clock className="w-3 h-3" />
                            Daily updates
                          </Badge>
                        </div>
                        
                        <div className="prose prose-sm max-w-none text-gray-700">
                          <p className="mb-3">{`This battlecard provides comprehensive intelligence on ${feed.name}, offering strategic insights and actionable recommendations based on our continuous monitoring and analysis.`}</p>
                          
                          <h3 className="text-lg font-semibold text-gray-900 mt-6 mb-3">Key Focus Areas</h3>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            {specificContent.sections.map((section, i) => (
                              <Card key={i} className="bg-gray-50 border border-gray-100">
                                <CardContent className="p-4">
                                  <h4 className="font-medium text-needl-primary mb-2">{section.title}</h4>
                                  <p className="text-sm text-gray-600">{section.content}</p>
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={itemVariants} className="mt-6">
                    <Card className="overflow-hidden border-0 shadow-md bg-white">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">Critical Metrics & Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Market Share</div>
                            <div className="text-2xl font-bold text-needl-dark">23.5%</div>
                            <div className="text-xs text-green-600 flex items-center mt-1">
                              <span className="text-green-500 mr-1">↑</span> +2.1% growth
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Engagement</div>
                            <div className="text-2xl font-bold text-needl-dark">76.8%</div>
                            <div className="text-xs text-amber-600 flex items-center mt-1">
                              <span className="text-amber-500 mr-1">→</span> Stable
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Innovation Index</div>
                            <div className="text-2xl font-bold text-needl-dark">8.4/10</div>
                            <div className="text-xs text-green-600 flex items-center mt-1">
                              <span className="text-green-500 mr-1">↑</span> +0.3 points
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                            <div className="text-sm text-gray-500 mb-1">Customer Sentiment</div>
                            <div className="text-2xl font-bold text-needl-dark">91%</div>
                            <div className="text-xs text-green-600 flex items-center mt-1">
                              <span className="text-green-500 mr-1">↑</span> Positive trend
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>
              
              <TabsContent value="insights" className="mt-0">
                <Card className="overflow-hidden border-0 shadow-md bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle>Strategic Insights</CardTitle>
                    <CardDescription>
                      Critical intelligence derived from multiple sources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                          <h3 className="font-semibold text-gray-900 mb-2">
                            {[
                              "Market Positioning Strategy",
                              "Product Development Focus",
                              "Customer Acquisition Approach",
                              "Competitive Advantage Analysis"
                            ][index]}
                          </h3>
                          <p className="text-gray-600 mb-3">
                            {[
                              `${feed.name} is targeting the enterprise segment with a renewed focus on security and compliance features.`,
                              `Their R&D investments are heavily weighted toward AI integration and automation capabilities.`,
                              `They've pivoted to a product-led growth strategy with extended free trials and transparent pricing.`,
                              `Their main differentiation comes from specialized industry-specific solutions rather than competing on price.`
                            ][index]}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-needl-lighter text-needl-primary">
                              {["Strategy", "R&D", "Marketing", "Competitive"][index]}
                            </Badge>
                            <Badge variant="outline" className="text-gray-500">
                              {["High", "Medium", "Very High", "High"][index]} confidence
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="sources" className="mt-0">
                <Card className="overflow-hidden border-0 shadow-md bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle>Intelligence Sources</CardTitle>
                    <CardDescription>
                      Data points that inform our analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                      <div 
                        key={index}
                        className="mb-4 border border-gray-100 rounded-lg overflow-hidden transition-all duration-300"
                      >
                        <div 
                          className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors"
                          onClick={() => toggleSource(index)}
                        >
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-needl-lighter flex items-center justify-center mr-3">
                              <ExternalLink className="w-4 h-4 text-needl-primary" />
                            </div>
                            <div>
                              <h3 className="font-medium text-gray-900">
                                {[
                                  "Quarterly Report Analysis",
                                  "Product Launch Press Release",
                                  "Industry Conference Presentation",
                                  "Social Media Sentiment Analysis",
                                  "Customer Feedback Aggregation"
                                ][index]}
                              </h3>
                              <p className="text-xs text-gray-500">
                                {["Financial Document", "Press Release", "Presentation", "Social Listening", "Customer Feedback"][index]}
                              </p>
                            </div>
                          </div>
                          <div>
                            {activeSources.includes(index) ? (
                              <ChevronUp className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            )}
                          </div>
                        </div>
                        
                        {activeSources.includes(index) && (
                          <div className="p-4 border-t border-gray-100">
                            <p className="text-gray-600 mb-3">
                              {[
                                `Detailed analysis of ${feed.name}'s latest quarterly financial performance, highlighting revenue streams, growth areas, and strategic investments.`,
                                `Official announcement of their new flagship product, including key features, target market, and competitive positioning.`,
                                `Presentation slides and recorded insights from their keynote at the annual industry conference, revealing roadmap and strategic vision.`,
                                `Aggregated sentiment analysis from Twitter, LinkedIn, and other platforms regarding recent product changes and company announcements.`,
                                `Synthesis of customer feedback from review sites, support tickets, and satisfaction surveys, identifying pain points and improvement areas.`
                              ][index]}
                            </p>
                            <div className="flex justify-between items-center">
                              <div className="text-xs text-gray-500">
                                {new Date(Date.now() - index * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'short', 
                                  day: 'numeric' 
                                })}
                              </div>
                              <a 
                                href="#" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-sm text-needl-primary hover:underline flex items-center"
                              >
                                View Source
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="action-plan" className="mt-0">
                <Card className="overflow-hidden border-0 shadow-md bg-white">
                  <CardHeader className="pb-2">
                    <CardTitle>Strategic Action Plan</CardTitle>
                    <CardDescription>
                      Recommended steps based on intelligence analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="border-b border-gray-100 last:border-0 pb-5 last:pb-0">
                          <div className="flex items-start mb-3">
                            <div className="bg-needl-lighter text-needl-primary rounded-full w-8 h-8 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 mb-1">
                                {[
                                  "Strengthen Product Differentiation",
                                  "Adjust Marketing Messaging",
                                  "Enhance Customer Retention Strategy",
                                  "Explore Partnership Opportunities"
                                ][index]}
                              </h3>
                              <p className="text-gray-600 mb-3">
                                {[
                                  `Develop and highlight unique features that directly address gaps in ${feed.name}'s offering, particularly in areas where customer feedback indicates dissatisfaction.`,
                                  `Refine messaging to emphasize our strengths in areas where competitor analysis shows ${feed.name} is weak or receiving negative feedback.`,
                                  `Implement proactive retention programs targeting customer segments most vulnerable to ${feed.name}'s recent market initiatives.`,
                                  `Identify strategic partners who complement our offerings and help differentiate from ${feed.name}'s ecosystem.`
                                ][index]}
                              </p>
                              
                              <div className="bg-needl-lighter/50 p-3 rounded-lg">
                                <h4 className="text-sm font-medium text-needl-primary mb-2">Expected Outcomes</h4>
                                <ul className="text-sm text-gray-600 space-y-2">
                                  {[
                                    ["Improved competitive positioning", "Higher conversion rates", "Reduced feature comparison losses"],
                                    ["Increased market differentiation", "Improved prospect education", "Better sales enablement"],
                                    ["Reduced churn rate", "Increased customer lifetime value", "Improved brand loyalty"],
                                    ["Expanded ecosystem value", "New market access", "Diversified revenue streams"]
                                  ][index].map((outcome, i) => (
                                    <li key={i} className="flex items-start">
                                      <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                      <span>{outcome}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div className="flex items-center mt-4">
                                <div className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                  {["High Priority", "Medium Priority", "High Priority", "Medium Priority"][index]}
                                </div>
                                <div className="text-xs text-gray-500 ml-4">
                                  Timeframe: {["1-2 Months", "Immediate", "3 Months", "4-6 Months"][index]}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default Battlecard;
