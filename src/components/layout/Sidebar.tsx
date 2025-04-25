
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  LayoutDashboard, 
  FileText, 
  Bitcoin, 
  RefreshCcw, 
  MessageCircle, 
  ChartPie, 
  User, 
  Settings,
} from "lucide-react";

const sidebarItems = [
  {
    icon: LayoutDashboard,
    path: "/",
    label: "Dashboard",
  },
  {
    icon: FileText,
    path: "/reports",
    label: "Reports",
  },
  {
    icon: Bitcoin,
    path: "/cryptocurrency",
    label: "Crypto",
  },
  {
    icon: RefreshCcw,
    path: "/exchange",
    label: "Exchange",
  },
  {
    icon: MessageCircle,
    path: "/community",
    label: "Community",
  },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-16 bg-sidebar hidden lg:flex flex-col items-center py-6 border-r border-gray-800">
      <div className="flex flex-col items-center justify-between h-full">
        <div className="flex flex-col items-center space-y-8">
          <div className="mb-4">
            <Link to="/" className="text-2xl font-bold text-primary">
              <div className="h-8 w-8 bg-success text-success-foreground rounded-md flex items-center justify-center">
                P
              </div>
            </Link>
          </div>
          
          <nav className="flex flex-col items-center space-y-6">
            {sidebarItems.map((item) => (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "p-2 rounded-md transition-colors relative group",
                  location.pathname === item.path
                    ? "text-success bg-gray-800"
                    : "text-muted-foreground hover:text-primary hover:bg-gray-800/50"
                )}
                title={item.label}
              >
                <item.icon size={20} />
                <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-xs whitespace-nowrap opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
                  {item.label}
                </span>
                {location.pathname === item.path && (
                  <span className="absolute left-0 w-1 h-full bg-success rounded-r-md"></span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col items-center space-y-4">
          <Link
            to="/profile"
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-gray-800/50 transition-colors relative group"
            title="Profile"
          >
            <User size={20} />
            <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-xs whitespace-nowrap opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
              Profile
            </span>
          </Link>
          <Link
            to="/settings"
            className="p-2 rounded-md text-muted-foreground hover:text-primary hover:bg-gray-800/50 transition-colors relative group"
            title="Settings"
          >
            <Settings size={20} />
            <span className="absolute left-full ml-2 px-2 py-1 rounded-md bg-gray-800 text-xs whitespace-nowrap opacity-0 invisible transition-all group-hover:opacity-100 group-hover:visible">
              Settings
            </span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
