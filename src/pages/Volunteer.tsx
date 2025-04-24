import React from "react";
import { AlertTriangle, FileWarning, AlertCircle, Waves, CloudLightning, Loader, ArrowRight, Users, Package, HandHelping, UserCheck, ShieldCheck, LifeBuoy, Pill, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Volunteer = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 container mx-auto py-12 px-4 md:px-6 pt-20">
        <section className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-gray-100">
            Volunteer Registration
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Join our network of volunteers and help make a difference in disaster relief efforts.
          </p>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Volunteer Opportunity Cards */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <UserCheck className="text-green-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Medical Assistance
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Provide medical support and first aid to those affected by disasters.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <ShieldCheck className="text-blue-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Search and Rescue
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Assist in locating and rescuing individuals in disaster-stricken areas.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <LifeBuoy className="text-yellow-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Shelter Management
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Help manage and organize shelters for displaced individuals and families.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Pill className="text-red-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Healthcare Support
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Offer healthcare services and support to those in need.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>

          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <div className="flex items-center mb-4">
              <Heart className="text-pink-500 mr-2" size={20} />
              <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                Emotional Support
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Provide emotional support and counseling to victims of disasters.
            </p>
            <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Apply Now
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Volunteer;
