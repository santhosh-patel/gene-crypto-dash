
import React, { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Settings as SettingsIcon, User, Shield, ToggleLeft, ToggleRight, Moon, Sun, Globe } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [language, setLanguage] = useState("en");
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully",
    });
  };
  
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real application, this would update the theme in the application
    toast({
      title: `${isDarkMode ? "Light" : "Dark"} Mode Enabled`,
      description: `The application theme has been switched to ${isDarkMode ? "light" : "dark"} mode`,
    });
  };
  
  const toggleTwoFactor = () => {
    if (!twoFactorEnabled) {
      // In a real application, this would open a 2FA setup flow
      toast({
        title: "Two-Factor Setup",
        description: "Follow the instructions to set up two-factor authentication",
      });
    } else {
      toast({
        title: "Two-Factor Disabled",
        description: "Two-factor authentication has been disabled for your account",
        variant: "destructive",
      });
    }
    setTwoFactorEnabled(!twoFactorEnabled);
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Settings</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Configure your account preferences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="bg-card border-gray-800 col-span-1">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Settings Menu</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button 
                    variant={activeTab === "general" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("general")}
                  >
                    <SettingsIcon className="h-4 w-4 mr-2" />
                    General Settings
                  </Button>
                  <Button 
                    variant={activeTab === "account" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("account")}
                  >
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                  <Button 
                    variant={activeTab === "security" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("security")}
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Security & Privacy
                  </Button>
                  <Button 
                    variant={activeTab === "api" ? "default" : "ghost"} 
                    className="w-full justify-start"
                    onClick={() => setActiveTab("api")}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    API Keys
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <div className="col-span-1 lg:col-span-2 space-y-6">
              {activeTab === "general" && (
                <Card className="bg-card border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">General Settings</CardTitle>
                    <CardDescription>Configure your display and regional preferences</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="theme">Theme</Label>
                          <div className="text-sm text-muted-foreground">
                            Switch between light and dark mode
                          </div>
                        </div>
                        <div className="flex items-center">
                          <Sun className="h-4 w-4 mr-2 text-muted-foreground" />
                          <Switch
                            id="theme" 
                            checked={isDarkMode}
                            onCheckedChange={toggleDarkMode}
                          />
                          <Moon className="h-4 w-4 ml-2" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="currency">Default Currency</Label>
                        <Select value={currency} onValueChange={setCurrency}>
                          <SelectTrigger id="currency" className="bg-background border-gray-700">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                            <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Select value={language} onValueChange={setLanguage}>
                          <SelectTrigger id="language" className="bg-background border-gray-700">
                            <SelectValue placeholder="Select language" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="es">Spanish</SelectItem>
                            <SelectItem value="fr">French</SelectItem>
                            <SelectItem value="de">German</SelectItem>
                            <SelectItem value="zh">Chinese</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Time Zone</Label>
                        <Select defaultValue="UTC">
                          <SelectTrigger id="timezone" className="bg-background border-gray-700">
                            <SelectValue placeholder="Select timezone" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-900 border-gray-800">
                            <SelectItem value="UTC">UTC - Coordinated Universal Time</SelectItem>
                            <SelectItem value="EST">EST - Eastern Standard Time</SelectItem>
                            <SelectItem value="CST">CST - Central Standard Time</SelectItem>
                            <SelectItem value="PST">PST - Pacific Standard Time</SelectItem>
                            <SelectItem value="IST">IST - India Standard Time</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <Button className="w-full" onClick={handleSave}>
                        Save Changes
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "account" && (
                <Card className="bg-card border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">Account Settings</CardTitle>
                    <CardDescription>Manage your account information</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          defaultValue="Ilona Smilquet"
                          className="bg-background border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input 
                          id="email" 
                          type="email"
                          defaultValue="ilonacut46@gmail.com"
                          className="bg-background border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          type="tel"
                          placeholder="Add your phone number"
                          className="bg-background border-gray-700"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bio">Bio</Label>
                        <Textarea
                          id="bio"
                          placeholder="Tell us about yourself"
                          className="bg-background border-gray-700 min-h-[100px]"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Button className="w-full">
                          Save Account Settings
                        </Button>
                        <Button variant="outline" className="w-full border-gray-700">
                          Deactivate Account
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {activeTab === "security" && (
                <div className="space-y-6">
                  <Card className="bg-card border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Security Settings</CardTitle>
                      <CardDescription>Manage your account security</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label htmlFor="2fa">Two-Factor Authentication</Label>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <div className="flex items-center">
                            {twoFactorEnabled ? 
                              <ToggleRight className="h-4 w-4 mr-2 text-success" /> : 
                              <ToggleLeft className="h-4 w-4 mr-2 text-muted-foreground" />
                            }
                            <Switch 
                              id="2fa"
                              checked={twoFactorEnabled}
                              onCheckedChange={toggleTwoFactor}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input 
                            id="current-password" 
                            type="password"
                            placeholder="Enter your current password"
                            className="bg-background border-gray-700"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-password">New Password</Label>
                          <Input 
                            id="new-password" 
                            type="password"
                            placeholder="Enter your new password"
                            className="bg-background border-gray-700"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="confirm-password">Confirm New Password</Label>
                          <Input 
                            id="confirm-password" 
                            type="password"
                            placeholder="Confirm your new password"
                            className="bg-background border-gray-700"
                          />
                        </div>
                        
                        <Button className="w-full">
                          Update Password
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card border-gray-800">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium">Privacy Settings</CardTitle>
                      <CardDescription>Control your data and privacy preferences</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Activity Status</Label>
                            <p className="text-sm text-muted-foreground">
                              Show when you're active on the platform
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Public Profile</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow others to view your profile
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Data Collection</Label>
                            <p className="text-sm text-muted-foreground">
                              Allow anonymous data collection to improve our services
                            </p>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        
                        <Button variant="outline" className="w-full border-gray-700 mt-2">
                          Download My Data
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
              
              {activeTab === "api" && (
                <Card className="bg-card border-gray-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium">API Keys</CardTitle>
                    <CardDescription>Manage API access to your account</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      <div className="bg-gray-800/50 p-4 rounded-md">
                        <div className="flex justify-between items-center mb-4">
                          <div>
                            <h3 className="font-medium">Trading Bot API Key</h3>
                            <p className="text-xs text-muted-foreground">Created on May 12, 2024</p>
                          </div>
                          <Badge>Active</Badge>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">API Key:</span>
                            <span className="text-sm font-mono">••••••••••••NX5Q</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-muted-foreground">Permissions:</span>
                            <span className="text-sm">Read, Trade</span>
                          </div>
                        </div>
                        <div className="flex justify-end space-x-2 mt-4">
                          <Button variant="outline" size="sm" className="border-gray-700">View</Button>
                          <Button variant="destructive" size="sm">Revoke</Button>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h3 className="font-medium">Create New API Key</h3>
                        
                        <div className="space-y-2">
                          <Label htmlFor="api-label">API Key Label</Label>
                          <Input 
                            id="api-label" 
                            placeholder="E.g., Trading Bot, Portfolio Tracker"
                            className="bg-background border-gray-700"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label>API Permissions</Label>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-read" className="rounded bg-background border-gray-700" />
                              <Label htmlFor="perm-read" className="text-sm">Read</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-trade" className="rounded bg-background border-gray-700" />
                              <Label htmlFor="perm-trade" className="text-sm">Trade</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-withdraw" className="rounded bg-background border-gray-700" />
                              <Label htmlFor="perm-withdraw" className="text-sm">Withdraw</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                              <input type="checkbox" id="perm-deposit" className="rounded bg-background border-gray-700" />
                              <Label htmlFor="perm-deposit" className="text-sm">Deposit</Label>
                            </div>
                          </div>
                        </div>
                        
                        <Button className="w-full">
                          Generate New API Key
                        </Button>
                      </div>
                      
                      <div className="bg-gray-800/30 p-4 rounded-md text-sm">
                        <h4 className="font-medium mb-2">API Security Tips</h4>
                        <ul className="space-y-1 list-disc pl-4 text-muted-foreground">
                          <li>Never share your API keys with anyone</li>
                          <li>Use the minimum permissions necessary</li>
                          <li>Set up IP restrictions for additional security</li>
                          <li>Rotate your API keys regularly</li>
                          <li>Monitor API activity for suspicious behavior</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Settings;
