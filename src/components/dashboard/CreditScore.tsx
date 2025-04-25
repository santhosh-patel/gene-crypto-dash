
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

interface CreditScoreProps {
  score: number;
  percentage: number;
  change: number;
  lastChecked: string;
}

const CreditScore: React.FC<CreditScoreProps> = ({ score, percentage, change, lastChecked }) => {
  const isGoodScore = score >= 660;
  const circumference = 2 * Math.PI * 85; // 85 is the radius of the circle
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <Card className="bg-card border-gray-800">
      <CardHeader className="pt-4 px-4 pb-0">
        <CardTitle className="text-lg font-medium">Your credit score</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex flex-col items-center justify-center">
        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 180 180">
            <circle 
              cx="90" 
              cy="90" 
              r="85" 
              fill="none" 
              stroke="#333" 
              strokeWidth="6"
            />
            {/* Progress circle */}
            <circle 
              cx="90" 
              cy="90" 
              r="85" 
              fill="none" 
              stroke={isGoodScore ? "#C7EB12" : "#EF4444"} 
              strokeWidth="6"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              style={{
                transition: "stroke-dashoffset 1s ease-in-out",
              }}
            />
          </svg>
          
          {/* Text in the center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-bold">{score}</span>
            <div 
              className={cn(
                "flex items-center text-xs mt-1",
                isGoodScore ? "text-success" : "text-danger"
              )}
            >
              <TrendingUp className="mr-1 h-3 w-3" />
              +{change}%
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground mb-1">Last Check on {lastChecked}</p>
          <p className="text-sm text-muted-foreground">
            Your credit score is {isGoodScore ? "above" : "below"} average
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreditScore;
