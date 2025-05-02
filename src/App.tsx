import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";
import AnimatedBackground from "./components/AnimatedBackground";

// Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import UseCases from "./pages/UseCases";
import Step1 from "./pages/Setup/Step1";
import Step2 from "./pages/Setup/Step2";
import Step3 from "./pages/Setup/Step3";
import IntelligenceHub from "./pages/IntelligenceHub";
import Battlecard from "./pages/Battlecard";
import ManageFeeds from "./pages/ManageFeeds";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        {/* Global animated background */}
        <AnimatedBackground variant="network" color="needl-primary" density="medium" />
        
        {/* Single Toaster component for the entire app */}
        <Toaster position="top-right" closeButton richColors />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            
            {/* Root Route */}
            <Route 
              path="/" 
              element={<Index />} 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/landing" 
              element={
                <ProtectedRoute>
                  <Landing />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/use-cases" 
              element={
                <ProtectedRoute>
                  <UseCases />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/setup/step1" 
              element={
                <ProtectedRoute>
                  <Step1 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/setup/step2" 
              element={
                <ProtectedRoute>
                  <Step2 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/setup/step3" 
              element={
                <ProtectedRoute>
                  <Step3 />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <Navigate to="/intelligence-hub" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/intelligence-hub" 
              element={
                <ProtectedRoute>
                  <IntelligenceHub />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/alerts" 
              element={
                <ProtectedRoute>
                  <Navigate to="/intelligence-hub?tab=alerts" />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/battlecard/:feedId" 
              element={
                <ProtectedRoute>
                  <Battlecard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/manage-feeds" 
              element={
                <ProtectedRoute>
                  <ManageFeeds />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
