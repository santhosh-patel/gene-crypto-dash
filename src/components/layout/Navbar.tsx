
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, DownloadIcon, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import AppLogo from "@/components/common/AppLogo";

const navLinks = [
  { name: "Dashboard", path: "/" },
  { name: "Reports", path: "/reports" },
  { name: "Cryptocurrency", path: "/cryptocurrency" },
  { name: "Exchange", path: "/exchange" },
  { name: "Community", path: "/community" },
  { name: "TradingView", path: "/tradingview" },
];

interface NavbarProps {
  onDateRangeChange: (dateRange: { from: Date; to: Date }) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onDateRangeChange }) => {
  const location = useLocation();
  const [date, setDate] = React.useState<{
    from: Date;
    to: Date;
  }>({
    from: new Date(2024, 0, 1), // January 2024
    to: new Date(2024, 4, 31), // May 2024
  });

  React.useEffect(() => {
    onDateRangeChange(date);
  }, [date, onDateRangeChange]);

  const userData = {
    name: "Nasir",
    email: "nasir@gmail.com",
    image: "public/lovable-uploads/8d28f839-6a85-4e94-9b81-5b308b07e52a.png",
  };

  const handleDownload = () => {
    // In a real application, this would call an API endpoint to generate a report
    console.log("Downloading report for date range:", date);
  };

  return (
    <header className="border-b border-gray-800 bg-background">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center">
            <AppLogo className="h-8 w-auto" />
          </Link>
          
          <nav className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={cn(
                  "px-3 py-2 text-sm transition-colors hover:text-primary",
                  location.pathname === link.path
                    ? "text-primary border-b-2 border-success"
                    : "text-muted-foreground"
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className="hidden md:inline-flex border-gray-700 bg-transparent hover:bg-gray-800"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {format(date.from, "MMM yyyy")} - {format(date.to, "MMM yyyy")}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="end">
              <CalendarComponent
                initialFocus
                mode="range"
                defaultMonth={date.from}
                selected={{
                  from: date.from,
                  to: date.to,
                }}
                onSelect={(newDate) => {
                  if (newDate?.from && newDate?.to) {
                    setDate({ from: newDate.from, to: newDate.to });
                  }
                }}
                className="p-3 pointer-events-auto"
              />
            </PopoverContent>
          </Popover>

          <Button 
            variant="outline"
            className="hidden md:flex items-center border-gray-700 bg-transparent hover:bg-gray-800"
            onClick={handleDownload}
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Download Report
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-9 w-9 p-0 rounded-full">
                <Avatar className="h-9 w-9">
                  <AvatarImage src={userData.image} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-gray-900 border-gray-800">
              <DropdownMenuLabel>
                <div>
                  <p className="font-medium text-sm">{userData.name}</p>
                  <p className="text-xs text-muted-foreground">{userData.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to="/profile">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer" asChild>
                <Link to="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-800" />
              <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
