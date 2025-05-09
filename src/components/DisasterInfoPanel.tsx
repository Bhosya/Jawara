import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlertTriangle, Users, Package, Info, MapPin } from "lucide-react";

interface District {
  name: string;
  affected: number;
  evacuated: number;
  missing: number;
}

interface OperationalNeed {
  item: string;
  quantity: number;
  current: number;
  priority: "Urgent" | "High" | "Medium";
}

interface DisasterInfoPanelProps {
  disasterName: string;
  location: string;
  districts: District[];
  operationalNeeds: OperationalNeed[];
  totalVictims: number;
}

const priorityConfig = {
  Urgent: {
    color: "bg-red-500",
    icon: AlertTriangle,
    tooltip: "Immediate action required",
  },
  High: {
    color: "bg-orange-500",
    icon: AlertTriangle,
    tooltip: "High priority needs",
  },
  Medium: {
    color: "bg-yellow-500",
    icon: Info,
    tooltip: "Medium priority needs",
  },
};

const DisasterInfoPanel: React.FC<DisasterInfoPanelProps> = ({
  disasterName,
  location,
  districts,
  operationalNeeds,
  totalVictims,
}) => {
  return (
    <Card className="w-full bg-white dark:bg-slate-800 shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-8">
        {/* Header with Disaster Info */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-jawara-blue" />
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {disasterName}
              </h2>
            </div>
            <p className="text-slate-600 dark:text-slate-400 pl-7">
              {location}
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/50 px-4 py-3 rounded-lg">
            <Users className="w-6 h-6 text-jawara-blue" />
            <div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                {totalVictims.toLocaleString()}
              </span>
              <p className="text-sm text-slate-500">Total Victims</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Affected Victims Section */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Users className="w-5 h-5 text-jawara-blue" />
              Affected Victims by District
            </h3>
            <div className="space-y-4">
              {districts.map((district) => (
                <div
                  key={district.name}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-slate-900 dark:text-white">
                      {district.name}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-slate-50 dark:bg-slate-900"
                    >
                      {district.affected.toLocaleString()} affected
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
                      <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                        {district.evacuated.toLocaleString()}
                      </div>
                      <div className="text-sm text-green-600/80 dark:text-green-400/80">
                        Evacuated
                      </div>
                    </div>
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
                      <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                        {district.missing.toLocaleString()}
                      </div>
                      <div className="text-sm text-red-600/80 dark:text-red-400/80">
                        Missing
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Operational Needs Section */}
          <div className="bg-slate-50 dark:bg-slate-900/50 rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5 text-jawara-blue" />
              Operational Needs
            </h3>
            <div className="space-y-4">
              {operationalNeeds.map((need) => {
                const priority = priorityConfig[need.priority];
                const percentage = Math.round(
                  (need.current / need.quantity) * 100
                );

                return (
                  <div
                    key={need.item}
                    className="bg-white dark:bg-slate-800 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-slate-900 dark:text-white">
                          {need.item}
                        </span>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <priority.icon
                                className={`w-4 h-4 ${priority.color}`}
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{priority.tooltip}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                      <Badge className={priority.color}>{need.priority}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600 dark:text-slate-400">
                          {need.current.toLocaleString()} /{" "}
                          {need.quantity.toLocaleString()}
                        </span>
                        <span className="font-medium text-slate-900 dark:text-white">
                          {percentage}%
                        </span>
                      </div>
                      <div className="relative">
                        <Progress
                          value={percentage}
                          className={`h-2 ${priority.color}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisasterInfoPanel;
