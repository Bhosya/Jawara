import React from "react";
import { Bell, X, AlertTriangle, FileWarning, AlertCircle, Waves, CloudLightning } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock notification data
const notifications = [
  {
    id: 1,
    type: "Flood",
    title: "New Flood Warning",
    message: "Heavy rainfall expected in Semarang area in the next 2 hours.",
    time: "5 minutes ago",
    icon: Waves,
    color: "bg-blue-500",
    read: false
  },
  {
    id: 2,
    type: "Landslide",
    title: "Landslide Alert",
    message: "Soil movement detected in Temanggung hills. Residents advised to evacuate.",
    time: "15 minutes ago",
    icon: FileWarning,
    color: "bg-amber-500",
    read: false
  },
  {
    id: 3,
    type: "Volcanic",
    title: "Volcanic Activity Update",
    message: "Mt. Merapi showing increased activity. Evacuation procedures initiated.",
    time: "1 hour ago",
    icon: AlertCircle,
    color: "bg-red-500",
    read: true
  }
];

interface NotificationPopupProps {
  onClose: () => void;
}

const NotificationPopup = ({ onClose }: NotificationPopupProps) => {
  return (
    <div className="fixed right-4 top-16 z-50 w-80 md:w-96">
      <Card className="shadow-lg border-none">
        <CardContent className="p-0">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-jawara-blue" />
              <h3 className="font-semibold">Notifications</h3>
              <Badge className="ml-2 bg-jawara-blue text-white">2 New</Badge>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="max-h-[400px] overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-b-0 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors ${
                  !notification.read ? "bg-slate-50 dark:bg-slate-800/30" : ""
                }`}
              >
                <div className="flex gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${notification.color}`}>
                    <notification.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-slate-500">{notification.time}</span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                      {notification.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 border-t">
            <Button variant="outline" className="w-full text-jawara-blue border-jawara-blue hover:bg-jawara-blue/10">
              View All Notifications
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationPopup; 