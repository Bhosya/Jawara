import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AlertTriangle, Mail, Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { authApi } from "@/services/api";

interface Admin {
  id: string;
  name: string;
  email: string;
}

interface LoginResponse {
  token: string;
  admin: Admin;
  message?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If there's a redirect path in location state, use it
      const from = (location.state as any)?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    }
  }, [navigate, location]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const data = await authApi.login(email, password);

      // Store the JWT token
      localStorage.setItem("token", data.token);

      // Store admin info if needed
      if (data.admin) {
        localStorage.setItem("admin", JSON.stringify(data.admin));
      }

      // Show success message
      toast({
        title: "Login successful",
        description: data.admin?.name
          ? `Welcome back, ${data.admin.name}!`
          : "Welcome back!",
      });

      // Redirect to the attempted page or admin dashboard
      const from = (location.state as any)?.from?.pathname || "/admin";
      navigate(from, { replace: true });
    } catch (err: any) {
      console.error("Login error:", err); // Add error logging
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "An error occurred during login";
      setError(errorMessage);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: errorMessage,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-jawara-dark p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-200 mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <Card>
          <CardHeader className="space-y-1">
            <div className="flex items-center justify-center mb-4">
              <AlertTriangle className="w-8 h-8 text-jawara-red" />
            </div>
            <CardTitle className="text-2xl text-center">
              Welcome to JAWARA
            </CardTitle>
            <CardDescription className="text-center">
              Sign in to access the disaster monitoring system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>
              {error && (
                <div className="text-sm text-red-500 text-center">{error}</div>
              )}
              <Button
                type="submit"
                className="w-full bg-jawara-blue hover:bg-jawara-blue/90"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="text-center">
                <Link
                  to="/forgot-password"
                  className="text-jawara-blue hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="text-center">
                <span className="text-slate-600 dark:text-slate-400">
                  Don't have an account?{" "}
                </span>
                <Link
                  to="/register"
                  className="text-jawara-blue hover:underline"
                >
                  Register here
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
