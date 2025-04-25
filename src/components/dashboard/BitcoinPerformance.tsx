
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  TooltipProps
} from "recharts";

// Sample data for Bitcoin performance
const performanceData = [
  { month: "Jan", value: 42000 },
  { month: "Feb", value: 45000 },
  { month: "Mar", value: 58000 },
  { month: "Apr", value: 50000 },
  { month: "May", value: 52000 },
  { month: "Jun", value: 45000 },
];

interface CustomTooltipProps extends TooltipProps<number, string> {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-effect p-3 rounded-md">
        <p className="text-xs text-white/70 mb-1">{label}</p>
        <p className="text-sm font-medium">${payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  
  return null;
};

const BitcoinPerformance: React.FC = () => {
  return (
    <Card className="bg-card border-gray-800">
      <CardHeader className="pt-4 px-4 pb-0">
        <CardTitle className="text-lg font-medium">Bitcoin Performance</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={performanceData}
              margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="#222" strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="month" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
                tickFormatter={(value) => `$${value/1000}k`}
                domain={[30000, 'dataMax + 5000']}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#10B981" 
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 0, fill: '#10B981' }}
                activeDot={{ r: 6, fill: '#10B981', stroke: '#000', strokeWidth: 2 }}
                fillOpacity={1}
                fill="url(#colorGradient)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BitcoinPerformance;
