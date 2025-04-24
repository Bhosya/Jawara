
import { Link } from "react-router-dom";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone, AlertTriangle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-jawara-dark/90 border-t border-slate-200 dark:border-slate-800 py-12 md:py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-jawara-red" />
              <span className="text-lg font-semibold tracking-tight">JAWARA</span>
            </Link>
            <p className="text-sm text-slate-600 dark:text-slate-400 max-w-xs">
              Jawa Tengah Rescue Aid - providing early disaster warning, monitoring, and relief coordination for Central Java.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-500 hover:text-jawara-blue transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-jawara-blue transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-slate-500 hover:text-jawara-blue transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/disaster-monitoring"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  Disaster Monitoring
                </Link>
              </li>
              <li>
                <Link
                  to="/victim-tracking"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  Victim Tracking
                </Link>
              </li>
              <li>
                <Link
                  to="/aid-monitoring"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  Aid Needs
                </Link>
              </li>
              <li>
                <Link
                  to="/volunteer"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  Volunteer
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  Preparedness Guide
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  Emergency Contacts
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  Evacuation Routes
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-sm text-slate-600 dark:text-slate-400 hover:text-jawara-blue dark:hover:text-jawara-blue transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-jawara-blue mt-0.5" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Central Java Disaster Management Agency, Jl. Pahlawan No. 10, Semarang
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-jawara-blue" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  +62 24 1234 5678
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-jawara-blue" />
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  info@jawara.go.id
                </span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 dark:border-slate-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} JAWARA. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              to="#"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-jawara-blue transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              to="#"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-jawara-blue transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              to="#"
              className="text-xs text-slate-500 dark:text-slate-400 hover:text-jawara-blue transition-colors"
            >
              Data Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
