
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 py-16 text-center max-w-2xl">
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center animate-pulse">
                <AlertTriangle className="h-12 w-12 text-jawara-red" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-jawara-red rounded-full flex items-center justify-center text-white font-bold">
                404
              </div>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Please check the URL or return to the home page.
          </p>
          
          <Button asChild size="lg" className="bg-jawara-blue hover:bg-jawara-blue/90">
            <Link to="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
