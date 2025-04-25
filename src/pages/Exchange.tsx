
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, LineChart } from "lucide-react";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { useToast } from "@/components/ui/use-toast";

const Exchange = () => {
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [tradingPair, setTradingPair] = useState("BTC-USDT");
  const [viewMode, setViewMode] = useState("chart");
  const { toast } = useToast();

  // Sample price data for the chart
  const chartData = [
    { time: "00:00", price: 51942.24, volume: 423.5 },
    { time: "04:00", price: 52145.71, volume: 385.2 },
    { time: "08:00", price: 52026.31, volume: 397.8 },
    { time: "12:00", price: 52364.85, volume: 524.3 },
    { time: "16:00", price: 52102.54, volume: 462.1 },
    { time: "20:00", price: 52291.43, volume: 438.7 },
    { time: "00:00", price: 52345.12, volume: 412.9 },
  ];

  // Sample order book data
  const buyOrders = [
    { price: 52250.25, amount: 0.42, total: 21945.11 },
    { price: 52200.50, amount: 0.85, total: 44370.43 },
    { price: 52150.75, amount: 1.23, total: 64145.42 },
    { price: 52100.00, amount: 2.15, total: 112015.00 },
    { price: 52050.25, amount: 3.47, total: 180614.37 },
  ];

  const sellOrders = [
    { price: 52300.00, amount: 0.32, total: 16736.00 },
    { price: 52350.50, amount: 0.76, total: 39786.38 },
    { price: 52400.75, amount: 1.14, total: 59736.86 },
    { price: 52450.00, amount: 1.87, total: 98081.50 },
    { price: 52500.25, amount: 2.53, total: 132825.63 },
  ];

  // Sample transaction history
  const recentTrades = [
    { time: "12:45", pair: "BTC-USDT", type: "buy", price: 52291.43, amount: 0.12, total: 6274.97 },
    { time: "12:42", pair: "BTC-USDT", type: "sell", price: 52285.21, amount: 0.08, total: 4182.82 },
    { time: "12:38", pair: "BTC-USDT", type: "buy", price: 52276.54, amount: 0.25, total: 13069.14 },
    { time: "12:35", pair: "BTC-USDT", type: "sell", price: 52268.37, amount: 0.15, total: 7840.26 },
    { time: "12:30", pair: "BTC-USDT", type: "buy", price: 52272.18, amount: 0.05, total: 2613.61 },
  ];

  // Wallet balances (dummy data)
  const walletBalances = {
    "BTC": 0.42,
    "ETH": 5.73,
    "USDT": 24562.18,
  };

  // Get current trading pair price
  const getCurrentPrice = () => {
    return chartData[chartData.length - 1].price;
  };

  // Handle trading pair change
  const handlePairChange = (value) => {
    setTradingPair(value);
  };

  // Calculate sell amount based on buy amount
  const handleBuyAmountChange = (e) => {
    const value = e.target.value;
    setBuyAmount(value);
    
    if (value && !isNaN(value)) {
      const currentPrice = getCurrentPrice();
      setSellAmount((parseFloat(value) * currentPrice).toFixed(2));
    } else {
      setSellAmount("");
    }
  };

  // Calculate buy amount based on sell amount
  const handleSellAmountChange = (e) => {
    const value = e.target.value;
    setSellAmount(value);
    
    if (value && !isNaN(value)) {
      const currentPrice = getCurrentPrice();
      setBuyAmount((parseFloat(value) / currentPrice).toFixed(8));
    } else {
      setBuyAmount("");
    }
  };

  // Handle swap execution
  const handleSwap = () => {
    if (!buyAmount || !sellAmount) {
      toast({
        title: "Error",
        description: "Please enter a valid amount to swap",
        variant: "destructive",
      });
      return;
    }

    // Extract currency symbols
    const [buyCurrency, sellCurrency] = tradingPair.split('-');
    
    // Check if user has enough balance
    if (parseFloat(sellAmount) > walletBalances[sellCurrency]) {
      toast({
        title: "Insufficient Balance",
        description: `You don't have enough ${sellCurrency} to complete this swap`,
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Swap Executed Successfully",
      description: `Swapped ${buyAmount} ${buyCurrency} for ${sellAmount} ${sellCurrency}`,
    });

    // Reset form
    setBuyAmount("");
    setSellAmount("");
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Exchange</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Exchange your cryptocurrencies securely.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2 flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-medium">
                      {tradingPair.replace('-', '/')} Price Chart
                    </CardTitle>
                    <CardDescription>
                      Current Price: ${getCurrentPrice().toLocaleString()}
                    </CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button 
                      variant={viewMode === "chart" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setViewMode("chart")}
                      className="border-gray-700"
                    >
                      <LineChart className="h-4 w-4 mr-1" />
                      Chart
                    </Button>
                    <Button 
                      variant={viewMode === "depth" ? "default" : "outline"} 
                      size="sm"
                      onClick={() => setViewMode("depth")}
                      className="border-gray-700"
                    >
                      <BarChart className="h-4 w-4 mr-1" />
                      Depth
                    </Button>
                    <Select value={tradingPair} onValueChange={handlePairChange}>
                      <SelectTrigger className="w-36 border-gray-700 bg-background">
                        <SelectValue placeholder="Select Pair" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="BTC-USDT">BTC/USDT</SelectItem>
                        <SelectItem value="ETH-USDT">ETH/USDT</SelectItem>
                        <SelectItem value="BTC-ETH">BTC/ETH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px]">
                    {viewMode === "chart" ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <XAxis dataKey="time" stroke="#999" />
                          <YAxis stroke="#999" domain={['auto', 'auto']} />
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333' }} 
                            formatter={(value) => [`$${value}`, 'Price']}
                          />
                          <Legend />
                          <Area 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#8884d8" 
                            fillOpacity={1} 
                            fill="url(#colorPrice)" 
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center">
                        <div className="text-center text-muted-foreground">
                          <p>Market depth visualization</p>
                          <p className="text-sm mt-2">(Simulated feature)</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Order Book</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-muted-foreground">Price</span>
                          <span className="text-muted-foreground">Amount</span>
                          <span className="text-muted-foreground">Total</span>
                        </div>
                        <div className="space-y-1">
                          {sellOrders.map((order, index) => (
                            <div key={`sell-${index}`} className="flex justify-between text-sm text-red-500">
                              <span>${order.price.toLocaleString()}</span>
                              <span>{order.amount}</span>
                              <span>${order.total.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="py-2 border-y border-gray-800">
                        <div className="text-xl font-bold text-center">
                          ${getCurrentPrice().toLocaleString()}
                        </div>
                      </div>
                      
                      <div>
                        <div className="space-y-1">
                          {buyOrders.map((order, index) => (
                            <div key={`buy-${index}`} className="flex justify-between text-sm text-green-500">
                              <span>${order.price.toLocaleString()}</span>
                              <span>{order.amount}</span>
                              <span>${order.total.toLocaleString()}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="bg-card border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Recent Trades</CardTitle>
                  </CardHeader>
                  <CardContent className="p-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Time</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {recentTrades.map((trade, index) => (
                          <TableRow key={index}>
                            <TableCell>{trade.time}</TableCell>
                            <TableCell className={trade.type === 'buy' ? 'text-green-500' : 'text-red-500'}>
                              ${trade.price}
                            </TableCell>
                            <TableCell>{trade.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <div className="col-span-1 space-y-6">
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Swap</CardTitle>
                  <CardDescription>Exchange currencies instantly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">You Pay</label>
                      <div className="flex space-x-2">
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          className="bg-background border-gray-700"
                          value={sellAmount}
                          onChange={handleSellAmountChange}
                        />
                        <Select defaultValue="USDT">
                          <SelectTrigger className="w-24 border-gray-700 bg-background">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="USDT">USDT</SelectItem>
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Balance: {walletBalances.USDT.toLocaleString()} USDT
                      </p>
                    </div>
                    
                    <div className="flex justify-center">
                      <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-muted-foreground mb-2 block">You Receive</label>
                      <div className="flex space-x-2">
                        <Input 
                          type="number" 
                          placeholder="0.00" 
                          className="bg-background border-gray-700"
                          value={buyAmount}
                          onChange={handleBuyAmountChange}
                        />
                        <Select defaultValue="BTC">
                          <SelectTrigger className="w-24 border-gray-700 bg-background">
                            <SelectValue placeholder="Currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="BTC">BTC</SelectItem>
                            <SelectItem value="ETH">ETH</SelectItem>
                            <SelectItem value="USDT">USDT</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Balance: {walletBalances.BTC} BTC
                      </p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Rate</p>
                      <p className="text-sm">1 BTC = ${getCurrentPrice().toLocaleString()} USDT</p>
                    </div>
                    
                    <Button className="w-full" onClick={handleSwap}>
                      Swap Now
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card border-gray-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium">Wallet Balances</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Bitcoin (BTC)</span>
                      <span className="font-medium">{walletBalances.BTC}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ethereum (ETH)</span>
                      <span className="font-medium">{walletBalances.ETH}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tether (USDT)</span>
                      <span className="font-medium">{walletBalances.USDT.toLocaleString()}</span>
                    </div>
                    <Button variant="outline" className="w-full border-gray-700">
                      Deposit Funds
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Exchange;
