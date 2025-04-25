
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { BarChart2, LineChart as LineChartIcon, FileText, Download, ArrowDown, ArrowUp } from "lucide-react";

const Reports = () => {
  const [reportType, setReportType] = useState("monthly");
  const [token, setToken] = useState("all");
  const [timeframe, setTimeframe] = useState("3m");
  const [sortOrder, setSortOrder] = useState("desc");

  // Sample data for demonstration
  const monthlyData = [
    { name: 'Jan', Bitcoin: 4000, Ethereum: 2400, Solana: 1600, amt: 2400 },
    { name: 'Feb', Bitcoin: 3000, Ethereum: 1398, Solana: 2210, amt: 2210 },
    { name: 'Mar', Bitcoin: 2000, Ethereum: 9800, Solana: 2290, amt: 2290 },
    { name: 'Apr', Bitcoin: 2780, Ethereum: 3908, Solana: 2000, amt: 2000 },
    { name: 'May', Bitcoin: 1890, Ethereum: 4800, Solana: 2181, amt: 2181 },
  ];

  const performanceData = [
    { name: 'Week 1', Portfolio: 4000, Market: 2400, amt: 2400 },
    { name: 'Week 2', Portfolio: 3000, Market: 1398, amt: 2210 },
    { name: 'Week 3', Portfolio: 2000, Market: 9800, amt: 2290 },
    { name: 'Week 4', Portfolio: 2780, Market: 3908, amt: 2000 },
    { name: 'Week 5', Portfolio: 1890, Market: 4800, amt: 2181 },
  ];

  const holdingsData = [
    { token: 'Bitcoin (BTC)', amount: '0.453 BTC', value: '$22,432.15', change: '+3.2%', positive: true },
    { token: 'Ethereum (ETH)', amount: '4.785 ETH', value: '$13,765.23', change: '-1.7%', positive: false },
    { token: 'Solana (SOL)', amount: '58.21 SOL', value: '$5,432.56', change: '+5.6%', positive: true },
    { token: 'Cardano (ADA)', amount: '2,489.45 ADA', value: '$2,765.32', change: '+0.9%', positive: true },
    { token: 'Polkadot (DOT)', amount: '125.65 DOT', value: '$1,987.43', change: '-2.3%', positive: false },
  ];

  const sortedHoldings = [...holdingsData].sort((a, b) => {
    const valA = parseFloat(a.value.replace('$', '').replace(',', ''));
    const valB = parseFloat(b.value.replace('$', '').replace(',', ''));
    return sortOrder === 'desc' ? valB - valA : valA - valB;
  });

  const handleDownload = (format) => {
    console.log(`Downloading ${reportType} report in ${format} format`);
    // In a real application, this would generate and download the report
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Reports</h1>
              <p className="text-sm text-muted-foreground mt-1">
                View and download your crypto performance reports.
              </p>
            </div>
            <Button onClick={() => handleDownload('pdf')} className="hidden md:flex">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card border-gray-800 col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Report Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Report Type</label>
                    <Select value={reportType} onValueChange={setReportType}>
                      <SelectTrigger className="w-full bg-background border-gray-700">
                        <SelectValue placeholder="Select Report Type" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="monthly">Monthly Report</SelectItem>
                        <SelectItem value="yearly">Yearly Report</SelectItem>
                        <SelectItem value="performance">Performance Report</SelectItem>
                        <SelectItem value="investment">Investment Report</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Token</label>
                    <Select value={token} onValueChange={setToken}>
                      <SelectTrigger className="w-full bg-background border-gray-700">
                        <SelectValue placeholder="Select Token" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="all">All Tokens</SelectItem>
                        <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                        <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                        <SelectItem value="sol">Solana (SOL)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-muted-foreground mb-1 block">Timeframe</label>
                    <Select value={timeframe} onValueChange={setTimeframe}>
                      <SelectTrigger className="w-full bg-background border-gray-700">
                        <SelectValue placeholder="Select Timeframe" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-900 border-gray-800">
                        <SelectItem value="1m">Last Month</SelectItem>
                        <SelectItem value="3m">Last 3 Months</SelectItem>
                        <SelectItem value="6m">Last 6 Months</SelectItem>
                        <SelectItem value="1y">Last Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" className="w-[48%] border-gray-700" onClick={() => handleDownload('pdf')}>
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button variant="outline" className="w-[48%] border-gray-700" onClick={() => handleDownload('csv')}>
                      <FileText className="h-4 w-4 mr-2" />
                      CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-gray-800 col-span-1 lg:col-span-2">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="chart">
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger value="chart" className="flex items-center space-x-2">
                      <LineChartIcon className="h-4 w-4" />
                      <span>Chart</span>
                    </TabsTrigger>
                    <TabsTrigger value="table" className="flex items-center space-x-2">
                      <BarChart2 className="h-4 w-4" />
                      <span>Table</span>
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="chart" className="pt-4">
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={performanceData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                        <XAxis dataKey="name" stroke="#999" />
                        <YAxis stroke="#999" />
                        <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333' }} />
                        <Legend />
                        <Line type="monotone" dataKey="Portfolio" stroke="#8884d8" activeDot={{ r: 8 }} />
                        <Line type="monotone" dataKey="Market" stroke="#82ca9d" />
                      </LineChart>
                    </ResponsiveContainer>
                  </TabsContent>
                  <TabsContent value="table" className="pt-4">
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Period</TableHead>
                            <TableHead>Portfolio</TableHead>
                            <TableHead>Market</TableHead>
                            <TableHead>Difference</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {performanceData.map((item) => (
                            <TableRow key={item.name}>
                              <TableCell>{item.name}</TableCell>
                              <TableCell>${item.Portfolio.toLocaleString()}</TableCell>
                              <TableCell>${item.Market.toLocaleString()}</TableCell>
                              <TableCell className={item.Portfolio > item.Market ? "text-green-500" : "text-red-500"}>
                                {item.Portfolio > item.Market ? "+" : "-"}${Math.abs(item.Portfolio - item.Market).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <Card className="bg-card border-gray-800 mb-6">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-medium">Asset Holdings</CardTitle>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleSortOrder} 
                  title={`Sort ${sortOrder === 'desc' ? 'ascending' : 'descending'}`}
                >
                  {sortOrder === 'desc' ? <ArrowDown className="h-4 w-4" /> : <ArrowUp className="h-4 w-4" />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Token</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Value (USD)</TableHead>
                      <TableHead>24h Change</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedHoldings.map((item) => (
                      <TableRow key={item.token}>
                        <TableCell className="font-medium">{item.token}</TableCell>
                        <TableCell>{item.amount}</TableCell>
                        <TableCell>{item.value}</TableCell>
                        <TableCell className={item.positive ? "text-green-500" : "text-red-500"}>
                          {item.change}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-card border-gray-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" />
                  <YAxis stroke="#999" />
                  <Tooltip contentStyle={{ backgroundColor: '#1A1F2C', borderColor: '#333' }} />
                  <Legend />
                  <Bar dataKey="Bitcoin" fill="#f7931a" />
                  <Bar dataKey="Ethereum" fill="#627eea" />
                  <Bar dataKey="Solana" fill="#00ffbd" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
