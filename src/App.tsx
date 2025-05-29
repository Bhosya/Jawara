import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DisasterMonitoring from "./pages/DisasterMonitoring";
import DisasterDetails from "./pages/DisasterDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import DisasterManagement from "./pages/DisasterManagement";
import VictimManagement from "./pages/VictimManagement";
import AidManagement from "./pages/AidManagement";
import VolunteerManagement from "./pages/VolunteerManagement";
import OperationalNeedsManagement from "./pages/OperationalNeedsManagement";
import UserManagement from "./pages/UserManagement";
import UserApproval from "./pages/UserApproval";
import ProtectedRoute from "@/components/ProtectedRoute";

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/disaster-monitoring"
              element={<DisasterMonitoring />}
            />
            <Route
              path="/disaster-monitoring/:id"
              element={<DisasterDetails />}
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/disaster-management"
              element={
                <ProtectedRoute>
                  <DisasterManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/victim-management"
              element={
                <ProtectedRoute>
                  <VictimManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/aid-management"
              element={
                <ProtectedRoute>
                  <AidManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/volunteer-management"
              element={
                <ProtectedRoute>
                  <VolunteerManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/operational-needs"
              element={
                <ProtectedRoute>
                  <OperationalNeedsManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user-management"
              element={
                <ProtectedRoute requireSuperAdmin={true}>
                  <UserManagement />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/user-approval"
              element={
                <ProtectedRoute requireSuperAdmin>
                  <UserApproval />
                </ProtectedRoute>
              }
            />

            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
