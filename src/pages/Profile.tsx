
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { User, Download, FileText, Clock, Eye, Bell, ShieldCheck } from "lucide-react";

const Profile = () => {
  const [activeTab, setActiveTab] = useState("info");
  
  // User profile data (would come from API in a real application)
  const userData = {
    name: "Ilona Smilquet",
    email: "ilonacut46@gmail.com",
    avatar: "public/lovable-uploads/8d28f839-6a85-4e94-9b81-5b308b07e52a.png",
    joinDate: "October 2023",
    kycStatus: "Verified",
    tradingVolume: "$152,487.25",
    transactions: 87,
    preferences: {
      theme: "Dark",
      currency: "USD",
      notifications: true,
      twoFactorAuth: true,
    }
  };
  
  // Sample transactions data
  const recentTransactions = [
    {
      id: "TX123456",
      date: "2024-05-20",
      type: "Buy",
      asset: "Bitcoin (BTC)",
      amount: "0.056 BTC",
      value: "$2,925.14",
      status: "Completed"
    },
    {
      id: "TX123455",
      date: "2024-05-18",
      type: "Sell",
      asset: "Ethereum (ETH)",
      amount: "1.25 ETH",
      value: "$3,553.98",
      status: "Completed"
    },
    {
      id: "TX123454",
      date: "2024-05-15",
      type: "Buy",
      asset: "Solana (SOL)",
      amount: "12.5 SOL",
      value: "$1,784.63",
      status: "Completed"
    },
    {
      id: "TX123453",
      date: "2024-05-10",
      type: "Withdraw",
      asset: "USDT",
      amount: "2,500 USDT",
      value: "$2,500.00",
      status: "Completed"
    },
    {
      id: "TX123452",
      date: "2024-05-05",
      type: "Deposit",
      asset: "USD",
      amount: "5,000 USD",
      value: "$5,000.00",
      status: "Completed"
    }
  ];
  
  // Sample watchlist data
  const watchlistData = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "$52,243.87",
      change24h: "+2.34%",
      isPositive: true,
      marketCap: "$1.02T"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "$2,843.19",
      change24h: "+1.24%",
      isPositive: true,
      marketCap: "$342.15B"
    },
    {
      name: "Cardano",
      symbol: "ADA",
      price: "$0.567",
      change24h: "-0.78%",
      isPositive: false,
      marketCap: "$19.87B"
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "$143.78",
      change24h: "+4.56%",
      isPositive: true,
      marketCap: "$65.87B"
    }
  ];
  
  // Sample reports data
  const savedReports = [
    {
      name: "Monthly Performance Report - April 2024",
      date: "2024-05-01",
      type: "Performance",
      format: "PDF",
      size: "1.2 MB"
    },
    {
      name: "Portfolio Growth Analysis - Q1 2024",
      date: "2024-04-15",
      type: "Analysis",
      format: "PDF",
      size: "2.4 MB"
    },
    {
      name: "Tax Report - 2023",
      date: "2024-03-20",
      type: "Tax",
      format: "PDF",
      size: "3.1 MB"
    }
  ];

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Profile</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Manage your personal information and preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-gray-800 col-span-1">
              <CardHeader className="flex flex-col items-center text-center pb-2">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={userData.avatar} alt={userData.name} />
                  <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl font-semibold">{userData.name}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">{userData.email}</CardDescription>
                <div className="flex items-center mt-2">
                  <ShieldCheck className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-sm text-green-500">KYC Verified</span>
                </div>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-gray-800/50 rounded-md">
                    <p className="text-xs text-muted-foreground">Member since</p>
                    <p className="font-medium">{userData.joinDate}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-md">
                    <p className="text-xs text-muted-foreground">Transactions</p>
                    <p className="font-medium">{userData.transactions}</p>
                  </div>
                  <div className="text-center p-3 bg-gray-800/50 rounded-md col-span-2">
                    <p className="text-xs text-muted-foreground">Trading Volume</p>
                    <p className="font-medium">{userData.tradingVolume}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button variant="outline" className="w-full border-gray-700">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </CardFooter>
            </Card>
            
            <div className="col-span-1 lg:col-span-2">
              <Tabs defaultValue="info" onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-gray-800">
                  <TabsTrigger value="info">
                    Information
                  </TabsTrigger>
                  <TabsTrigger value="transactions">
                    Transactions
                  </TabsTrigger>
                  <TabsTrigger value="security">
                    Security
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="info" className="space-y-6 mt-6">
                  <Card className="bg-card border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Watchlist</CardTitle>
                      <CardDescription>Cryptocurrencies you're monitoring</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>24h Change</TableHead>
                            <TableHead>Market Cap</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {watchlistData.map((coin) => (
                            <TableRow key={coin.symbol}>
                              <TableCell>
                                <div className="flex items-center">
                                  <div className="font-medium">{coin.name}</div>
                                  <Badge variant="outline" className="ml-2 text-xs border-gray-700">{coin.symbol}</Badge>
                                </div>
                              </TableCell>
                              <TableCell>{coin.price}</TableCell>
                              <TableCell className={coin.isPositive ? "text-green-500" : "text-red-500"}>
                                {coin.change24h}
                              </TableCell>
                              <TableCell>{coin.marketCap}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Saved Reports</CardTitle>
                      <CardDescription>Your generated reports</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {savedReports.map((report, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-800/30 rounded-md">
                            <div className="flex items-center">
                              <FileText className="h-5 w-5 mr-3 text-muted-foreground" />
                              <div>
                                <p className="font-medium text-sm">{report.name}</p>
                                <p className="text-xs text-muted-foreground">{report.date} • {report.type} • {report.size}</p>
                              </div>
                            </div>
                            <Button variant="ghost" size="icon">
                              <Download className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="transactions" className="mt-6">
                  <Card className="bg-card border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Recent Transactions</CardTitle>
                      <CardDescription>Your latest activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Asset</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Value</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentTransactions.map((tx) => (
                            <TableRow key={tx.id}>
                              <TableCell>{tx.date}</TableCell>
                              <TableCell>
                                <Badge 
                                  variant={tx.type === "Buy" ? "default" : 
                                          tx.type === "Sell" ? "destructive" : 
                                          "outline"}
                                  className={tx.type === "Deposit" ? "bg-green-600" : ""}
                                >
                                  {tx.type}
                                </Badge>
                              </TableCell>
                              <TableCell>{tx.asset}</TableCell>
                              <TableCell>{tx.amount}</TableCell>
                              <TableCell>{tx.value}</TableCell>
                              <TableCell>
                                <Badge variant="outline" className="border-green-500 text-green-500">
                                  {tx.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      
                      <Button variant="outline" className="w-full mt-4 border-gray-700">
                        <Clock className="h-4 w-4 mr-2" />
                        View All Transactions
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="security" className="space-y-6 mt-6">
                  <Card className="bg-card border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Account Security</CardTitle>
                      <CardDescription>Manage your account security settings</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <div className="font-medium">Two-Factor Authentication</div>
                            <div className="text-sm text-muted-foreground">Add an extra layer of security to your account</div>
                          </div>
                          <Badge variant={userData.preferences.twoFactorAuth ? "default" : "outline"}>
                            {userData.preferences.twoFactorAuth ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <div className="font-medium">Login Notifications</div>
                            <div className="text-sm text-muted-foreground">Receive email notifications for new logins</div>
                          </div>
                          <Badge variant={userData.preferences.notifications ? "default" : "outline"}>
                            {userData.preferences.notifications ? "Enabled" : "Disabled"}
                          </Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <div className="font-medium">API Access</div>
                            <div className="text-sm text-muted-foreground">Manage API keys for third-party services</div>
                          </div>
                          <Button variant="outline" size="sm" className="border-gray-700">
                            Manage
                          </Button>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <div className="font-medium">Account Password</div>
                            <div className="text-sm text-muted-foreground">Last changed 3 months ago</div>
                          </div>
                          <Button variant="outline" size="sm" className="border-gray-700">
                            Change
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Notification Preferences</CardTitle>
                      <CardDescription>Manage how you receive updates</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <div className="font-medium">Price Alerts</div>
                            <div className="text-sm text-muted-foreground">Get notified when coins hit your price targets</div>
                          </div>
                          <Badge variant="default">Enabled</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <div className="font-medium">Transaction Updates</div>
                            <div className="text-sm text-muted-foreground">Receive notifications for all transactions</div>
                          </div>
                          <Badge variant="default">Enabled</Badge>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <div className="space-y-0.5">
                            <div className="font-medium">Newsletter</div>
                            <div className="text-sm text-muted-foreground">Weekly market updates and insights</div>
                          </div>
                          <Badge variant="outline">Disabled</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;
