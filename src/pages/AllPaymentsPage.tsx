import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  Filter, 
  Download, 
  Calendar,
  Search
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

// Mock data for transactions
const transactions = [
  {
    id: "1",
    coinName: "Bitcoin",
    symbol: "BTC",
    date: "15 Jun, 2024",
    amount: "$24,560.45",
    transactionType: "Buy",
    currentValue: "$25,890.30",
    status: "success",
    gainLoss: 5.42,
    background: "bg-bitcoin"
  },
  {
    id: "2",
    coinName: "Ethereum",
    symbol: "ETH",
    date: "10 Jun, 2024",
    amount: "$3,456.78",
    transactionType: "Buy",
    currentValue: "$3,211.45",
    status: "success",
    gainLoss: -7.1,
    background: "bg-ethereum"
  },
  {
    id: "3",
    coinName: "Cardano",
    symbol: "ADA",
    date: "16 May, 2024",
    amount: "$432.20",
    transactionType: "Buy",
    currentValue: "$522.89",
    status: "success",
    gainLoss: 21.0,
    background: "bg-cardano"
  },
  {
    id: "4",
    coinName: "Solana",
    symbol: "SOL",
    date: "05 May, 2024",
    amount: "$1,245.67",
    transactionType: "Sell",
    currentValue: "$0.00",
    status: "success",
    gainLoss: 15.3,
    background: "bg-purple-500"
  },
  {
    id: "5",
    coinName: "Ripple",
    symbol: "XRP",
    date: "21 Apr, 2024",
    amount: "$312.45",
    transactionType: "Buy",
    currentValue: "$299.22",
    status: "success",
    gainLoss: -4.2,
    background: "bg-blue-500"
  },
  {
    id: "6",
    coinName: "Polkadot",
    symbol: "DOT",
    date: "18 Apr, 2024",
    amount: "$512.33",
    transactionType: "Buy",
    currentValue: "$590.11",
    status: "success",
    gainLoss: 15.2,
    background: "bg-pink-500"
  },
  {
    id: "7",
    coinName: "Dogecoin",
    symbol: "DOGE",
    date: "02 Apr, 2024",
    amount: "$122.54",
    transactionType: "Buy",
    currentValue: "$98.32",
    status: "success",
    gainLoss: -19.8,
    background: "bg-yellow-500"
  },
  {
    id: "8",
    coinName: "Achain",
    symbol: "ACT",
    date: "28 Mar, 2024",
    amount: "$223.75",
    transactionType: "Sell",
    currentValue: "$0.00",
    status: "failed",
    gainLoss: 0,
    background: "bg-purple-500"
  },
];

// Data for the pie chart
const pieData = [
  { name: "Bitcoin", value: 24560.45, fill: "#F7931A" },
  { name: "Ethereum", value: 3456.78, fill: "#627EEA" },
  { name: "Cardano", value: 432.20, fill: "#0033AD" },
  { name: "Ripple", value: 312.45, fill: "#23292F" },
  { name: "Polkadot", value: 512.33, fill: "#E6007A" },
  { name: "Dogecoin", value: 122.54, fill: "#C2A633" },
];

// Data for the monthly investment chart
const monthlyInvestmentData = [
  { name: "Jan", amount: 2100 },
  { name: "Feb", amount: 3200 },
  { name: "Mar", amount: 1900 },
  { name: "Apr", amount: 2780 },
  { name: "May", amount: 4890 },
  { name: "Jun", amount: 2390 },
];

// Top and worst performing coins
const topPerformers = [
  { name: "Cardano", symbol: "ADA", gainLoss: 21.0, background: "bg-cardano" },
  { name: "Solana", symbol: "SOL", gainLoss: 15.3, background: "bg-purple-500" },
  { name: "Polkadot", symbol: "DOT", gainLoss: 15.2, background: "bg-pink-500" },
];

const worstPerformers = [
  { name: "Dogecoin", symbol: "DOGE", gainLoss: -19.8, background: "bg-yellow-500" },
  { name: "Ethereum", symbol: "ETH", gainLoss: -7.1, background: "bg-ethereum" },
  { name: "Ripple", symbol: "XRP", gainLoss: -4.2, background: "bg-blue-500" },
];

// COLORS for the pie chart
const COLORS = ["#F7931A", "#627EEA", "#0033AD", "#23292F", "#E6007A", "#C2A633"];

const AllPaymentsPage: React.FC = () => {
  const navigate = useNavigate();
  const [filterCoin, setFilterCoin] = useState<string>("all");
  const [filterGainLoss, setFilterGainLoss] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(2024, 0, 1),
    to: new Date(),
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Filter transactions based on selected filters
  const filteredTransactions = transactions.filter(transaction => {
    // Filter by coin name if not "all"
    if (filterCoin !== "all" && transaction.symbol.toLowerCase() !== filterCoin.toLowerCase()) {
      return false;
    }
    
    // Filter by gain/loss
    if (filterGainLoss === "gain" && transaction.gainLoss <= 0) {
      return false;
    }
    if (filterGainLoss === "loss" && transaction.gainLoss >= 0) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery && 
        !transaction.coinName.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !transaction.symbol.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const handleExport = (format: 'pdf' | 'csv') => {
    console.log(`Exporting data in ${format} format...`);
    // In a real app, this would generate and download the file
  };

  const handleDateRangeChange = (newDateRange: { from: Date; to: Date }) => {
    setDateRange(newDateRange);
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <Button 
                variant="outline" 
                onClick={() => navigate("/")}
                className="border-gray-700 mb-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-2xl md:text-3xl font-bold">Payments & Analytics</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Comprehensive view of your transaction history and investment analytics
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                className="border-gray-700"
                onClick={() => handleExport('pdf')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </Button>
              <Button 
                variant="outline" 
                className="border-gray-700"
                onClick={() => handleExport('csv')}
              >
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
          
          {/* Filters Section */}
          <Card className="mb-6 bg-card border-gray-800">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="w-full md:w-auto">
                    <Input
  placeholder="Search by coin name or symbol"
  className="bg-gray-800/50 border-gray-700"
  value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
  prefix="🔍" // Use a string, like an emoji or text
/>
                  </div>
                  
                  <Select value={filterCoin} onValueChange={setFilterCoin}>
                    <SelectTrigger className="w-full md:w-[180px] bg-gray-800/50 border-gray-700">
                      <SelectValue placeholder="Filter by Coin" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="all">All Coins</SelectItem>
                      <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                      <SelectItem value="ada">Cardano (ADA)</SelectItem>
                      <SelectItem value="sol">Solana (SOL)</SelectItem>
                      <SelectItem value="xrp">Ripple (XRP)</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Select value={filterGainLoss} onValueChange={setFilterGainLoss}>
                    <SelectTrigger className="w-full md:w-[180px] bg-gray-800/50 border-gray-700">
                      <SelectValue placeholder="Filter by Gain/Loss" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-900 border-gray-800">
                      <SelectItem value="all">All Transactions</SelectItem>
                      <SelectItem value="gain">Gains Only</SelectItem>
                      <SelectItem value="loss">Losses Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full md:w-auto border-gray-700 bg-gray-800/50">
                      <Calendar className="h-4 w-4 mr-2" />
                      {format(dateRange.from, "P")} - {format(dateRange.to, "P")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-gray-900 border-gray-800" align="end">
                    <CalendarComponent
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange.from}
                      selected={dateRange}
                      onSelect={(newDateRange: DateRange | undefined) => {
                        if (newDateRange?.from && newDateRange?.to) {
                          setDateRange({
                            from: newDateRange.from,
                            to: newDateRange.to
                          });
                        }
                      }}
                      className="p-3"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>
          
          {/* Analytics Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Coin Investment Pie Chart */}
            <Card className="bg-card border-gray-800 lg:col-span-1">
              <CardHeader className="pt-4 px-4 pb-0">
                <CardTitle className="text-lg font-medium">Coin Investment Breakdown</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill || COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Monthly Investment Trends */}
            <Card className="bg-card border-gray-800 lg:col-span-2">
              <CardHeader className="pt-4 px-4 pb-0">
                <CardTitle className="text-lg font-medium">Monthly Investment Trends</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div style={{ width: '100%', height: 250 }}>
                  <ResponsiveContainer>
                    <BarChart data={monthlyInvestmentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                      <XAxis dataKey="name" stroke="#888" />
                      <YAxis stroke="#888" tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value) => `$${value}`} />
                      <Bar dataKey="amount" fill="#9b87f5" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Performance Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Top Performing Coins */}
            <Card className="bg-card border-gray-800">
              <CardHeader className="pt-4 px-4 pb-0">
                <CardTitle className="text-lg font-medium">Top Performing Coins</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {topPerformers.map((coin, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div className="flex items-center">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white mr-3", coin.background)}>
                          {coin.symbol.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                        </div>
                      </div>
                      <div className="text-success font-medium">+{coin.gainLoss}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Worst Performing Coins */}
            <Card className="bg-card border-gray-800">
              <CardHeader className="pt-4 px-4 pb-0">
                <CardTitle className="text-lg font-medium">Worst Performing Coins</CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-4">
                  {worstPerformers.map((coin, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-md">
                      <div className="flex items-center">
                        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white mr-3", coin.background)}>
                          {coin.symbol.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium">{coin.name}</p>
                          <p className="text-xs text-muted-foreground">{coin.symbol}</p>
                        </div>
                      </div>
                      <div className="text-danger font-medium">{coin.gainLoss}%</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Transactions Table */}
          <Card className="mb-6 bg-card border-gray-800">
            <CardHeader className="pt-4 px-4 pb-0">
              <CardTitle className="text-lg font-medium">
                Transaction History
                <span className="text-sm font-normal text-muted-foreground ml-2">
                  ({filteredTransactions.length} transactions)
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 overflow-auto">
              <div className="rounded-md border border-gray-800">
                <div className="grid grid-cols-12 border-b border-gray-800 bg-secondary/30 py-2 px-4 text-xs font-medium text-muted-foreground">
                  <div className="col-span-3">COIN</div>
                  <div className="col-span-2">DATE</div>
                  <div className="col-span-2">AMOUNT</div>
                  <div className="col-span-1">TYPE</div>
                  <div className="col-span-2">CURRENT VALUE</div>
                  <div className="col-span-1">STATUS</div>
                  <div className="col-span-1 text-right">GAIN/LOSS</div>
                </div>
                
                <div className="max-h-[500px] overflow-auto">
                  {filteredTransactions.length > 0 ? (
                    filteredTransactions.map((transaction) => (
                      <div key={transaction.id} className="grid grid-cols-12 items-center py-3 px-4 hover:bg-secondary/10 transition-colors border-b border-gray-800/50 last:border-b-0">
                        <div className="col-span-3 flex items-center gap-3">
                          <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-white", transaction.background)}>
                            {transaction.symbol.charAt(0)}
                          </div>
                          <div>
                            <div className="font-medium">{transaction.coinName}</div>
                            <div className="text-xs text-muted-foreground">{transaction.symbol}</div>
                          </div>
                        </div>
                        
                        <div className="col-span-2 text-sm">
                          {transaction.date}
                        </div>
                        
                        <div className="col-span-2 font-medium">
                          {transaction.amount}
                        </div>
                        
                        <div className="col-span-1 text-sm">
                          <span className={cn(
                            "px-2 py-1 rounded-full text-xs",
                            transaction.transactionType === "Buy" ? "bg-success/20 text-success" : "bg-danger/20 text-danger"
                          )}>
                            {transaction.transactionType}
                          </span>
                        </div>
                        
                        <div className="col-span-2 font-medium">
                          {transaction.currentValue}
                        </div>
                        
                        <div className="col-span-1">
                          {transaction.status === "success" ? (
                            <div className="flex items-center gap-1 text-success text-xs">
                              <CheckCircle className="h-3 w-3" />
                              <span>Success</span>
                            </div>
                          ) : (
                            <div className="flex items-center gap-1 text-danger text-xs">
                              <XCircle className="h-3 w-3" />
                              <span>Failed</span>
                            </div>
                          )}
                        </div>
                        
                        <div className={cn(
                          "col-span-1 text-right font-medium",
                          transaction.gainLoss > 0 ? "text-success" : transaction.gainLoss < 0 ? "text-danger" : "text-muted-foreground"
                        )}>
                          {transaction.gainLoss > 0 ? "+" : ""}{transaction.gainLoss}%
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-8 text-center text-muted-foreground">
                      No transactions found matching your filters.
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AllPaymentsPage;
