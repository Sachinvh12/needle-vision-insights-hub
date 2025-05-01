import React from "react";
import MainHeader from "../components/MainHeader";
import { useApp } from "../context/AppContext";
import { AnimatePresence, motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import { toast } from "@/hooks/use-toast";
import { Feed } from "../types/feedTypes";
import { Loader2, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

const ManageFeeds: React.FC = () => {
  const { state, createFeed, deleteFeed, updateFeedSettings } = useApp();
  const { feeds, isLoading } = state;

  // Mock handlers for feed management
  const handleCreateFeed = () => {
    const newFeed = {
      id: `feed-${Date.now()}`,
      name: "New Intelligence Feed",
      description: "Start configuring this feed",
      sources: [],
      createdAt: new Date().toISOString(),
      lastUpdated: new Date().toISOString(),
      aiAnalysisEnabled: true,
      alertsEnabled: true,
      status: "idle",
    } as Feed;

    createFeed(newFeed);
    toast.success("New feed created", {
      description: "Your new intelligence feed has been created successfully.",
    });
  };

  const handleDeleteFeed = (id: string) => {
    deleteFeed(id);
    toast.success("Feed deleted", {
      description: "The intelligence feed has been permanently removed.",
    });
  };

  const handleToggleAiAnalysis = (feed: Feed) => {
    updateFeedSettings({
      ...feed,
      aiAnalysisEnabled: !feed.aiAnalysisEnabled,
    });
    toast.success("Settings updated", {
      description: `AI analysis has been ${
        !feed.aiAnalysisEnabled ? "enabled" : "disabled"
      } for this feed.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <MainHeader />
      <AnimatedBackground variant="pulse" density="low" className="opacity-40" />
      
      {/* Content would continue here... */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manage Intelligence Feeds</h1>
          <Button 
            onClick={handleCreateFeed} 
            className="bg-needl-primary hover:bg-needl-dark"
          >
            <Plus className="mr-2 h-4 w-4" /> Create New Feed
          </Button>
        </div>
        
        <div className="flex justify-center items-center h-64 text-center">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <Loader2 className="h-8 w-8 text-needl-primary animate-spin" />
              <p className="mt-4 text-gray-600">Loading your intelligence feeds...</p>
            </div>
          ) : (
            <div className="text-gray-500">
              <p className="mb-2 text-lg">Your feeds will appear here</p>
              <p className="text-sm">Click "Create New Feed" to get started</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManageFeeds;
