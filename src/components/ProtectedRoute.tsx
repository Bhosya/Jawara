import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { authApi } from "@/services/api";
import { Spinner } from "@/components/ui/spinner";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSuperAdmin?: boolean;
}

const ProtectedRoute = ({
  children,
  requireSuperAdmin = false,
}: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No authentication token found");
          setTimeout(() => {
            navigate("/login", { replace: true });
          }, 1000);
          return;
        }

        const userData = await authApi.getUserInfo();

        if (requireSuperAdmin && userData.role !== "SUPER_ADMIN") {
          setError("Access denied: SUPER_ADMIN role required");
          setTimeout(() => {
            navigate("/admin", { replace: true });
          }, 1000);
          return;
        }

        setIsAuthorized(true);
      } catch (error: any) {
        if (error.response?.status === 401) {
          setError("Session expired. Please login again.");
          setTimeout(() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate("/login", { replace: true });
          }, 1000);
        } else {
          setError(error.response?.data?.message || "An error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [navigate, requireSuperAdmin, location.pathname]);

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <Spinner className="h-8 w-8" />
        </div>
      </div>
    );
  }

  return isAuthorized ? <>{children}</> : null;
};

export default ProtectedRoute;
