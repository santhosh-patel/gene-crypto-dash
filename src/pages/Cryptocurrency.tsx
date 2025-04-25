
import React, { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Search, Eye, TrendingUp, TrendingDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Cryptocurrency = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { toast } = useToast();

  // Sample data for demonstration
  const sampleCoins = [
    { 
      id: 'bitcoin', 
      rank: 1, 
      name: 'Bitcoin', 
      symbol: 'BTC', 
      price: 52291.43, 
      market_cap: 1025435678901, 
      volume_24h: 28564356789, 
      change_24h: 2.35, 
      categories: ['store-of-value', 'layer-1'],
      sentiment: 78,
      social_mentions: 12453,
      risk_level: 'Medium',
      watchlisted: false,
    },
    { 
      id: 'ethereum', 
      rank: 2, 
      name: 'Ethereum', 
      symbol: 'ETH', 
      price: 2843.19, 
      market_cap: 342156789023, 
      volume_24h: 12656789023, 
      change_24h: 1.24, 
      categories: ['smart-contract', 'layer-1', 'defi'],
      sentiment: 82,
      social_mentions: 9876,
      risk_level: 'Medium',
      watchlisted: false,
    },
    { 
      id: 'solana', 
      rank: 3, 
      name: 'Solana', 
      symbol: 'SOL', 
      price: 143.78, 
      market_cap: 65876543210, 
      volume_24h: 5467891234, 
      change_24h: 4.56, 
      categories: ['smart-contract', 'layer-1'],
      sentiment: 76,
      social_mentions: 7832,
      risk_level: 'High',
      watchlisted: false,
    },
    {
      id: 'cardano',
      rank: 4,
      name: 'Cardano',
      symbol: 'ADA',
      price: 0.567,
      market_cap: 19876543210,
      volume_24h: 789456123,
      change_24h: -0.78,
      categories: ['smart-contract', 'layer-1'],
      sentiment: 65,
      social_mentions: 4321,
      risk_level: 'Medium',
      watchlisted: false,
    },
    {
      id: 'uniswap',
      rank: 5,
      name: 'Uniswap',
      symbol: 'UNI',
      price: 8.56,
      market_cap: 5123456789,
      volume_24h: 678912345,
      change_24h: -2.15,
      categories: ['defi', 'dex'],
      sentiment: 70,
      social_mentions: 3214,
      risk_level: 'High',
      watchlisted: false,
    },
    {
      id: 'chainlink',
      rank: 6,
      name: 'Chainlink',
      symbol: 'LINK',
      price: 15.43,
      market_cap: 8769123456,
      volume_24h: 345678912,
      change_24h: 1.87,
      categories: ['oracle', 'defi'],
      sentiment: 73,
      social_mentions: 2987,
      risk_level: 'Medium',
      watchlisted: false,
    },
    {
      id: 'axie',
      rank: 7,
      name: 'Axie Infinity',
      symbol: 'AXS',
      price: 7.89,
      market_cap: 2345678901,
      volume_24h: 123456789,
      change_24h: 3.45,
      categories: ['gaming', 'nft'],
      sentiment: 68,
      social_mentions: 5431,
      risk_level: 'High',
      watchlisted: false,
    },
    {
      id: 'aave',
      rank: 8,
      name: 'Aave',
      symbol: 'AAVE',
      price: 98.72,
      market_cap: 1456789012,
      volume_24h: 87654321,
      change_24h: -1.23,
      categories: ['defi', 'lending'],
      sentiment: 72,
      social_mentions: 1896,
      risk_level: 'High',
      watchlisted: false,
    }
  ];

  const [cryptoData, setCryptoData] = useState(sampleCoins);
  
  // Price chart data for selected coin
  const generateChartData = () => {
    const data = [];
    let base = 50000;
    if (selectedCoin) {
      base = selectedCoin.price;
    }
    
    for (let i = 30; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      
      // Random fluctuation based on the day
      const randomChange = (Math.random() - 0.5) * base * 0.03;
      const value = base + randomChange * (30 - i) / 15;
      
      data.push({
        date: date.toLocaleDateString('en-US', {month: 'short', day: 'numeric'}),
        price: parseFloat(value.toFixed(2))
      });
    }
    return data;
  };

  const chartData = generateChartData();

  // Filter coins based on search term and category
  const filteredCoins = cryptoData.filter(coin => {
    const matchesSearch = coin.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           coin.symbol.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
                           coin.categories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  // Toggle watchlist status for a coin
  const toggleWatchlist = (coinId) => {
    setCryptoData(prevData => 
      prevData.map(coin => 
        coin.id === coinId 
          ? {...coin, watchlisted: !coin.watchlisted} 
          : coin
      )
    );
    
    const coin = cryptoData.find(c => c.id === coinId);
    
    toast({
      title: coin.watchlisted 
        ? `${coin.name} removed from watchlist` 
        : `${coin.name} added to watchlist`,
      description: coin.watchlisted 
        ? "You will no longer receive updates about this coin" 
        : "You will now receive updates about this coin",
      duration: 3000,
    });
  };

  // Select a coin for detailed view
  const viewCoinDetails = (coin) => {
    setSelectedCoin(coin);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Cryptocurrency</h1>
              <p className="text-sm text-muted-foreground mt-1">
                Track and analyze cryptocurrency markets.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                  type="search" 
                  placeholder="Search coins..." 
                  className="pl-9 bg-background border-gray-700"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              <Button 
                variant={selectedCategory === 'all' ? "default" : "outline"} 
                className="border-gray-700"
                onClick={() => setSelectedCategory('all')}
              >
                All
              </Button>
              <Button 
                variant={selectedCategory === 'layer-1' ? "default" : "outline"} 
                className="border-gray-700"
                onClick={() => setSelectedCategory('layer-1')}
              >
                Layer 1
              </Button>
              <Button 
                variant={selectedCategory === 'defi' ? "default" : "outline"} 
                className="border-gray-700"
                onClick={() => setSelectedCategory('defi')}
              >
                DeFi
              </Button>
              <Button 
                variant={selectedCategory === 'nft' ? "default" : "outline"} 
                className="border-gray-700"
                onClick={() => setSelectedCategory('nft')}
              >
                NFTs
              </Button>
              <Button 
                variant={selectedCategory === 'gaming' ? "default" : "outline"} 
                className="border-gray-700"
                onClick={() => setSelectedCategory('gaming')}
              >
                Gaming
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-gray-800 col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Market Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Rank</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>24h Change</TableHead>
                        <TableHead>Market Cap</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredCoins.map((coin) => (
                        <TableRow key={coin.id} className="cursor-pointer hover:bg-gray-800/50">
                          <TableCell>{coin.rank}</TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="font-medium">{coin.name}</div>
                              <Badge variant="outline" className="ml-2 text-xs">{coin.symbol}</Badge>
                            </div>
                          </TableCell>
                          <TableCell>${coin.price.toLocaleString()}</TableCell>
                          <TableCell className={coin.change_24h >= 0 ? "text-green-500" : "text-red-500"}>
                            <div className="flex items-center">
                              {coin.change_24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                              {coin.change_24h}%
                            </div>
                          </TableCell>
                          <TableCell>${(coin.market_cap / 1e9).toFixed(2)}B</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                onClick={() => viewCoinDetails(coin)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant={coin.watchlisted ? "default" : "outline"} 
                                size="sm"
                                className={coin.watchlisted ? "bg-primary" : "border-gray-700"}
                                onClick={() => toggleWatchlist(coin.id)}
                              >
                                {coin.watchlisted ? "Watching" : "Watch"}
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-gray-800 col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  {selectedCoin ? `${selectedCoin.name} (${selectedCoin.symbol})` : 'Coin Details'}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCoin ? (
                  <div className="space-y-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-2xl font-bold">${selectedCoin.price.toLocaleString()}</p>
                        <p className={`text-sm ${selectedCoin.change_24h >= 0 ? "text-green-500" : "text-red-500"}`}>
                          {selectedCoin.change_24h >= 0 ? "+" : ""}{selectedCoin.change_24h}% (24h)
                        </p>
                      </div>
                      <Button
                        variant={selectedCoin.watchlisted ? "default" : "outline"}
                        className={selectedCoin.watchlisted ? "bg-primary" : "border-gray-700"}
                        onClick={() => toggleWatchlist(selectedCoin.id)}
                      >
                        {selectedCoin.watchlisted ? "Watching" : "Add to Watchlist"}
                      </Button>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Price Chart (30 Days)</h3>
                      <ResponsiveContainer width="100%" height={200}>
                        <LineChart data={chartData}>
                          <XAxis 
                            dataKey="date" 
                            stroke="#999" 
                            tick={{ fontSize: 10 }}
                            tickFormatter={(tick) => tick.split(' ')[0]}
                          />
                          <YAxis 
                            domain={['auto', 'auto']}
                            stroke="#999"
                            tick={{ fontSize: 10 }}
                            tickFormatter={(tick) => `$${(tick / 1000).toFixed(1)}k`}
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333' }}
                            formatter={(value) => [`$${value.toLocaleString()}`, 'Price']}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="price" 
                            stroke={selectedCoin.change_24h >= 0 ? "#10B981" : "#EF4444"}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div>
                        <p className="text-xs text-muted-foreground">Market Cap</p>
                        <p className="font-medium">${(selectedCoin.market_cap / 1e9).toFixed(2)}B</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Volume (24h)</p>
                        <p className="font-medium">${(selectedCoin.volume_24h / 1e9).toFixed(2)}B</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Sentiment Score</p>
                        <p className="font-medium">{selectedCoin.sentiment}/100</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Social Mentions</p>
                        <p className="font-medium">{selectedCoin.social_mentions.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Risk Level</p>
                        <p className="font-medium">{selectedCoin.risk_level}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Categories</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedCoin.categories.map(category => (
                            <Badge key={category} variant="secondary" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-muted-foreground">
                    <Eye className="h-12 w-12 mb-2 opacity-20" />
                    <p>Select a coin to view details</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Cryptocurrency;
