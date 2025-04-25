
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ArrowUp, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

const data = [
  { month: "Jan", score: 620 },
  { month: "Feb", score: 635 },
  { month: "Mar", score: 648 },
  { month: "Apr", score: 660 },
  { month: "May", score: 660 },
];

const factors = [
  { factor: "Payment History", impact: "Very High", score: 95 },
  { factor: "Credit Utilization", impact: "High", score: 85 },
  { factor: "Credit Age", impact: "Medium", score: 75 },
  { factor: "Total Accounts", impact: "Low", score: 88 },
  { factor: "Credit Inquiries", impact: "Low", score: 92 },
];

const CreditScorePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Credit Score Overview</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Monitor and improve your financial health
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2 bg-card border-gray-800">
              <CardHeader>
                <CardTitle>Score History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[500, 850]} />
                      <Tooltip />
                      <Line type="monotone" dataKey="score" stroke="#C7EB12" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle>Improvement Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="font-semibold mb-2">Keep Credit Utilization Low</h3>
                    <p className="text-sm text-muted-foreground">Try to keep your credit card balances below 30% of their limits.</p>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="font-semibold mb-2">Make Timely Payments</h3>
                    <p className="text-sm text-muted-foreground">Set up automatic payments to avoid missing due dates.</p>
                  </div>
                  <div className="p-4 bg-gray-800/30 rounded-lg">
                    <h3 className="font-semibold mb-2">Limit New Credit Applications</h3>
                    <p className="text-sm text-muted-foreground">Too many hard inquiries can negatively impact your score.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <Card className="bg-card border-gray-800">
              <CardHeader>
                <CardTitle>Credit Score Factors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {factors.map((item) => (
                    <div key={item.factor} className="p-4 bg-gray-800/30 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{item.factor}</h3>
                        <span className={`text-sm ${item.score >= 80 ? 'text-green-500' : 'text-yellow-500'}`}>
                          {item.score}%
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Impact: {item.impact}</p>
                    </div>
                  ))}
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
