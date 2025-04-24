
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DisasterMonitoring from "./pages/DisasterMonitoring";
import VictimTracking from "./pages/VictimTracking";
import AidMonitoring from "./pages/AidMonitoring";
import Volunteer from "./pages/Volunteer";

const queryClient = new QueryClient();

const App = () => {
  // Page transition animation
  useEffect(() => {
    const handleNavigation = () => {
      window.scrollTo(0, 0);
    };

    // Listen for route changes and scroll to top
    window.addEventListener("popstate", handleNavigation);
    return () => window.removeEventListener("popstate", handleNavigation);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/disaster-monitoring" element={<DisasterMonitoring />} />
            <Route path="/victim-tracking" element={<VictimTracking />} />
            <Route path="/aid-monitoring" element={<AidMonitoring />} />
            <Route path="/volunteer" element={<Volunteer />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
