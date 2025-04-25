
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, TooltipProps } from "recharts";
import { cn } from "@/lib/utils";

// Sample data for the credit chart
const creditData = [
  { time: '2:00pm', btc: 8000, eth: 6000 },
  { time: '3:00pm', btc: 7800, eth: 6200 },
  { time: '4:00pm', btc: 8200, eth: 6400 },
  { time: '5:00pm', btc: 9000, eth: 6300 },
  { time: '6:00pm', btc: 8400, eth: 6500 },
  { time: '7:00pm', btc: 12000, eth: 6700 },
  { time: '8:00pm', btc: 14000, eth: 9000 },
  { time: '9:00pm', btc: 12500, eth: 8000 }
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
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
            <span className="text-xs font-medium">{entry.name === 'btc' ? 'BTC' : 'ETH'}</span>
            <span className="text-xs">${entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  
  return null;
};

const CreditChart: React.FC = () => {
  const [chartData, setChartData] = useState(() => {
    // Initial state is our sample data
    return creditData;
  });

  return (
    <Card className="bg-card border-gray-800 overflow-hidden col-span-2">
      <CardHeader className="pb-0 pt-4 px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">Active credit</CardTitle>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-bitcoin"></div>
              <span className="text-xs text-muted-foreground">1 BTC</span>
              <span className="text-xs font-medium">$8,420.04</span>
            </div>
            <Separator orientation="vertical" className="h-4 bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-chart-ethereum"></div>
              <span className="text-xs text-muted-foreground">1 ETH</span>
              <span className="text-xs font-medium">$2,980.81</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 pt-2">
        <div className="h-[300px] w-full px-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={chartData}
              margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
            >
              <CartesianGrid stroke="#222" strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="time" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false}
                tick={{ fontSize: 10, fill: '#888' }}
                tickFormatter={(value) => `$${value}`}
                domain={[2000, 'dataMax + 2000']}
                ticks={[2000, 4000, 6000, 8000, 10000, 12000, 14000]}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="btc" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 0, fill: '#10B981' }}
                activeDot={{ r: 6, fill: '#10B981', stroke: '#000', strokeWidth: 2 }}
              />
              <Line 
                type="monotone" 
                dataKey="eth" 
                stroke="#C7EB12" 
                strokeWidth={2} 
                dot={{ r: 4, strokeWidth: 0, fill: '#C7EB12' }}
                activeDot={{ r: 6, fill: '#C7EB12', stroke: '#000', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditChart;
