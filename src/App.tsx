
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import UseCases from "./pages/UseCases";
import Step1 from "./pages/Setup/Step1";
import Step2 from "./pages/Setup/Step2";
import Step3 from "./pages/Setup/Step3";
import Dashboard from "./pages/Dashboard";
import Battlecard from "./pages/Battlecard";
import ManageFeeds from "./pages/ManageFeeds";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AppProvider>
        <Toaster />
        <Sonner />
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
            
            {/* Protected Routes */}
            <Route 
              path="/" 
              element={
                <Navigate to="/landing" />
              } 
            />
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
                  <Dashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/alerts" 
              element={
                <Navigate to="/dashboard" />
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
