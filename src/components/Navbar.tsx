import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, AlertTriangle, Bell, Moon, Sun, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import NotificationPopup from "./NotificationPopup";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Update localStorage and document class when theme changes
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleNotifications = () => setShowNotifications(!showNotifications);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "py-2 bg-white/80 dark:bg-jawara-dark/90 backdrop-blur-lg shadow-sm" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 group"
          >
            <AlertTriangle 
              className="w-6 h-6 text-jawara-red group-hover:animate-pulse-soft transition-all" 
            />
            <span className="text-xl font-medium tracking-tight transition-all group-hover:text-jawara-blue">
              JAWARA
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium hover:text-jawara-blue transition-colors">
              Home
            </Link>
            <Link to="/disaster-monitoring" className="text-sm font-medium hover:text-jawara-blue transition-colors">
              Disaster Monitoring
            </Link>
            <Link to="/victim-tracking" className="text-sm font-medium hover:text-jawara-blue transition-colors">
              Victim Tracking
            </Link>
            <Link to="/aid-monitoring" className="text-sm font-medium hover:text-jawara-blue transition-colors">
              Aid Needs
            </Link>
            <Link to="/volunteer" className="text-sm font-medium hover:text-jawara-blue transition-colors">
              Volunteer
            </Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleTheme}
              className="rounded-full"
            >
              {isDark ? (
                <Sun className="h-[1.2rem] w-[1.2rem]" />
              ) : (
                <Moon className="h-[1.2rem] w-[1.2rem]" />
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full relative"
              onClick={toggleNotifications}
            >
              <Bell className="h-[1.2rem] w-[1.2rem]" />
              <span className="absolute top-0 right-0 h-2 w-2 bg-jawara-red rounded-full" />
              <span className="sr-only">Notifications</span>
            </Button>
            
            <Link to="/login" className="hidden md:flex items-center space-x-2">
              <Button
                className="hidden md:flex"
                variant="default"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Button>
            </Link>
            
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-0 z-50 bg-background transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col p-8 h-full">
          <div className="flex justify-between items-center mb-8">
            <Link 
              to="/" 
              className="flex items-center space-x-2"
              onClick={() => setIsOpen(false)}
            >
              <AlertTriangle className="w-6 h-6 text-jawara-red" />
              <span className="text-xl font-medium tracking-tight">JAWARA</span>
            </Link>
            <button onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          <nav className="flex flex-col space-y-6">
            <Link 
              to="/" 
              className="text-lg font-medium hover:text-jawara-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/disaster-monitoring" 
              className="text-lg font-medium hover:text-jawara-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Disaster Monitoring
            </Link>
            <Link 
              to="/victim-tracking" 
              className="text-lg font-medium hover:text-jawara-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Victim Tracking
            </Link>
            <Link 
              to="/aid-monitoring" 
              className="text-lg font-medium hover:text-jawara-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Aid Needs
            </Link>
            <Link 
              to="/volunteer" 
              className="text-lg font-medium hover:text-jawara-blue transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Volunteer
            </Link>
          </nav>
          
          <div className="mt-auto flex flex-col space-y-4">
            <Button className="w-full" variant="default">
              Sign In
            </Button>
            <Button className="w-full" variant="outline">
              Register
            </Button>
          </div>
        </div>
      </div>
      {showNotifications && <NotificationPopup onClose={toggleNotifications} />}
    </header>
  );
};

export default Navbar;
