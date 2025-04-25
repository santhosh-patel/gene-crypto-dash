
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import StatsCard from "@/components/dashboard/StatsCard";
import CreditChart from "@/components/dashboard/CreditChart";
import CreditScore from "@/components/dashboard/CreditScore";
import CryptoHighlight from "@/components/dashboard/CryptoHighlight";
import PaymentHistory from "@/components/dashboard/PaymentHistory";
import BitcoinChart from "@/components/dashboard/BitcoinChart";
import BitcoinPerformance from "@/components/dashboard/BitcoinPerformance";
import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";

const Index: React.FC = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1), // January 2024
    to: new Date(2024, 4, 31), // May 2024
  });

  const handleDateRangeChange = (newDateRange: { from: Date; to: Date }) => {
    setDateRange(newDateRange);
    // In a real application, this would trigger data fetching for the new date range
    console.log("Date range changed:", newDateRange);
  };

  const handleDownload = () => {
    // In a real application, this would call an API endpoint to generate a report
    console.log("Downloading report for date range:", dateRange);
  };

  // User data (would come from API in a real application)
  const userData = {
    name: "Nasir",
    stats: {
      spentThisMonth: "$5,950.64",
      change24h: 2.34,
      volume24h: "$84.42B",
      marketCap: "$804.42B",
      growthMonthly: "$804.42B"
    },
    creditScore: {
      score: 660,
      percentage: 80,
      change: 2.34,
      lastChecked: "21 Apr"
    },
    bitcoinPrice: "$52,291",
    bitcoinChange: 0.28,
    bitcoinRewardRate: 14.7
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        {/* Navbar */}
        <Navbar onDateRangeChange={handleDateRangeChange} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {/* Welcome Section */}
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Welcome back, {userData.name}</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Here's take a look at your performance and analytics.
            </p>
          </div>
          
          {/* Mobile Download Button */}
          <div className="mb-6 lg:hidden">
            <Button 
              variant="outline" 
              className="w-full border-gray-700 bg-gray-800/50"
              onClick={handleDownload}
            >
              <DownloadIcon className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <StatsCard 
              title="SPENT THIS MONTH" 
              value={userData.stats.spentThisMonth} 
              change={{ value: userData.stats.change24h, label: "24hr CHANGE" }}
            />
            <StatsCard 
              title="VOLUME (24H)" 
              value={userData.stats.volume24h} 
            />
            <StatsCard 
              title="MARKET CAP" 
              value={userData.stats.marketCap} 
            />
            <StatsCard 
              title="AVG MONTHLY GROWING" 
              value={userData.stats.growthMonthly} 
            />
          </div>
          
          {/* Credit Charts and Score */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <CreditChart />
            <CreditScore 
              score={userData.creditScore.score}
              percentage={userData.creditScore.percentage}
              change={userData.creditScore.change}
              lastChecked={userData.creditScore.lastChecked}
            />
          </div>
          
          {/* Bitcoin Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <BitcoinChart />
            <div className="flex flex-col gap-4">
              <CryptoHighlight 
                name="Bitcoin" 
                symbol="BTC" 
                price={userData.bitcoinPrice}
                change={userData.bitcoinChange}
                rewardRate={userData.bitcoinRewardRate}
                iconClassName="bg-bitcoin"
              />
              <BitcoinPerformance />
            </div>
          </div>
          
          {/* Payment History */}
          <div className="mb-6">
            <PaymentHistory />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
