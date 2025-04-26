
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Info, Award, Shield, AlertTriangle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CreditScorePage = () => {
  // Credit score data
  const creditData = {
    score: 660,
    percentage: 80,
    change: 2.34,
    lastChecked: "21 Apr",
    history: [
      { month: "Jan", score: 620 },
      { month: "Feb", score: 635 },
      { month: "Mar", score: 645 },
      { month: "Apr", score: 660 }
    ],
    factors: [
      { name: "Payment History", score: 90, impact: "high", status: "good" },
      { name: "Credit Utilization", score: 70, impact: "high", status: "fair" },
      { name: "Credit Age", score: 60, impact: "medium", status: "fair" },
      { name: "Account Mix", score: 85, impact: "medium", status: "good" },
      { name: "Recent Inquiries", score: 95, impact: "low", status: "excellent" }
    ],
    tips: [
      "Pay bills on time to maintain good payment history",
      "Keep credit card balances below 30% of your limit",
      "Don't close old credit accounts, even if unused",
      "Limit applications for new credit"
    ]
  };

  // Determine score category
  const getScoreCategory = (score: number) => {
    if (score >= 750) return { category: "Excellent", color: "text-emerald-500" };
    if (score >= 700) return { category: "Good", color: "text-green-500" };
    if (score >= 650) return { category: "Fair", color: "text-yellow-500" };
    if (score >= 600) return { category: "Poor", color: "text-orange-500" };
    return { category: "Very Poor", color: "text-red-500" };
  };

  const scoreCategory = getScoreCategory(creditData.score);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        {/* Navbar */}
        <Navbar onDateRangeChange={() => {}} />
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Credit Score</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and improve your financial health
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Main score card */}
            <Card className="lg:col-span-1 bg-card border-gray-800">
              <CardHeader className="pt-4 px-4 pb-0">
                <CardTitle className="text-lg font-medium">Your Credit Score</CardTitle>
              </CardHeader>
              <CardContent className="p-6 flex flex-col items-center justify-center">
                <div className="relative w-48 h-48 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
                    <circle 
                      cx="90" 
                      cy="90" 
                      r="85" 
                      fill="none" 
                      stroke="#333" 
                      strokeWidth="6"
                    />
                    <circle 
                      cx="90" 
                      cy="90" 
                      r="85" 
                      fill="none" 
                      stroke={creditData.score >= 660 ? "#C7EB12" : "#EF4444"} 
                      strokeWidth="6"
                      strokeDasharray={2 * Math.PI * 85}
                      strokeDashoffset={2 * Math.PI * 85 - (creditData.percentage / 100) * (2 * Math.PI * 85)}
                      strokeLinecap="round"
                    />
                  </svg>
                  
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl font-bold">{creditData.score}</span>
                    <span className={`text-lg font-medium ${scoreCategory.color}`}>{scoreCategory.category}</span>
                    <div className={`flex items-center text-xs mt-1 ${creditData.change > 0 ? "text-success" : "text-danger"}`}>
                      {creditData.change > 0 ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
                      {creditData.change > 0 ? "+" : ""}{creditData.change}%
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <p className="text-xs text-muted-foreground mb-1">Last Check on {creditData.lastChecked}</p>
                  <p className="text-sm text-muted-foreground">
                    Your credit score is {creditData.score >= 660 ? "above" : "below"} average
                  </p>
                </div>
              </CardContent>
            </Card>
            
            {/* Score history */}
            <Card className="lg:col-span-2 bg-card border-gray-800">
              <CardHeader className="pt-4 px-4 pb-0">
                <CardTitle className="text-lg font-medium">Score History</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-end justify-between h-40 mb-2">
                  {creditData.history.map((month, index) => (
                    <div key={index} className="flex flex-col items-center w-1/4">
                      <div 
                        className="bg-purple-600 rounded-t-md w-12" 
                        style={{ 
                          height: `${(month.score / 850) * 100}%`,
                          opacity: index === creditData.history.length - 1 ? 1 : 0.7
                        }}
                      ></div>
                      <span className="text-xs mt-2">{month.month}</span>
                      <span className="text-xs text-muted-foreground">{month.score}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 grid grid-cols-4 gap-2">
                  <div className="text-xs text-muted-foreground">Poor<br/>300-579</div>
                  <div className="text-xs text-muted-foreground">Fair<br/>580-669</div>
                  <div className="text-xs text-muted-foreground">Good<br/>670-739</div>
                  <div className="text-xs text-muted-foreground">Excellent<br/>740-850</div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Factors affecting score */}
          <Card className="mb-6 bg-card border-gray-800">
            <CardHeader className="pt-4 px-4 pb-0">
              <CardTitle className="text-lg font-medium">Factors Affecting Your Score</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {creditData.factors.map((factor, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="font-medium">{factor.name}</span>
                        <span className={`ml-2 text-xs px-2 py-0.5 rounded-full ${
                          factor.impact === "high" ? "bg-purple-500/20 text-purple-300" : 
                          factor.impact === "medium" ? "bg-blue-500/20 text-blue-300" : 
                          "bg-green-500/20 text-green-300"
                        }`}>
                          {factor.impact.charAt(0).toUpperCase() + factor.impact.slice(1)} Impact
                        </span>
                      </div>
                      <span className={`text-sm ${
                        factor.status === "excellent" ? "text-emerald-500" :
                        factor.status === "good" ? "text-green-500" :
                        factor.status === "fair" ? "text-yellow-500" :
                        "text-red-500" 
                      }`}>
                        {factor.status.charAt(0).toUpperCase() + factor.status.slice(1)}
                      </span>
                    </div>
                    <Progress value={factor.score} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Improvement tips */}
          <Card className="mb-6 bg-card border-gray-800">
            <CardHeader className="pt-4 px-4 pb-0">
              <CardTitle className="text-lg font-medium">Tips to Improve Your Score</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {creditData.tips.map((tip, index) => (
                  <div key={index} className="flex items-start p-3 bg-gray-800/50 rounded-md">
                    <Award className="h-5 w-5 mr-2 text-purple-400 shrink-0 mt-0.5" />
                    <span className="text-sm">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Information cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-card border-gray-800">
              <CardContent className="p-4 flex items-center">
                <Info className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <h3 className="font-medium mb-1">Score Updates</h3>
                  <p className="text-xs text-muted-foreground">Your score is updated monthly based on your financial activity</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-gray-800">
              <CardContent className="p-4 flex items-center">
                <Shield className="h-8 w-8 text-green-400 mr-3" />
                <div>
                  <h3 className="font-medium mb-1">Security First</h3>
                  <p className="text-xs text-muted-foreground">Your financial data is encrypted and protected</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-card border-gray-800">
              <CardContent className="p-4 flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-400 mr-3" />
                <div>
                  <h3 className="font-medium mb-1">Credit Alerts</h3>
                  <p className="text-xs text-muted-foreground">We'll notify you of significant changes to your credit report</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreditScorePage;
