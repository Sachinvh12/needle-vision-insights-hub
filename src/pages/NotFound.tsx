
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import MainHeader from "../components/MainHeader";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import AnimatedBackground from "../components/AnimatedBackground";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <MainHeader />
      <AnimatedBackground variant="nodes" density="low" className="opacity-75" />
      
      <div className="flex-1 flex items-center justify-center relative z-10">
        <div className="text-center bg-white/90 backdrop-blur-sm p-8 rounded-lg shadow-sm max-w-md w-full">
          <h1 className="text-5xl font-bold mb-4 text-needl-primary">404</h1>
          <p className="text-xl text-gray-600 mb-6">Oops! Page not found</p>
          <Button 
            onClick={() => navigate('/landing')} 
            className="bg-needl-primary hover:bg-needl-dark"
          >
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
