
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  change?: {
    value: number;
    label?: string;
  };
  additionalValue?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, additionalValue }) => {
  const isPositive = change ? change.value > 0 : false;
  
  return (
    <Card className="bg-card border-gray-800 overflow-hidden">
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground uppercase font-medium tracking-wide">
          {title}
        </div>
        <div className="mt-1 font-semibold text-xl md:text-2xl">{value}</div>
        
        {change && (
          <div className="mt-2 flex items-center">
            <div
              className={cn(
                "flex items-center text-xs font-medium",
                isPositive ? "text-success" : "text-danger"
              )}
            >
              {isPositive ? (
                <TrendingUp className="mr-1 h-3 w-3" />
              ) : (
                <TrendingDown className="mr-1 h-3 w-3" />
              )}
              {isPositive ? "+" : ""}{change.value}%
              {change.label && <span className="ml-1 text-muted-foreground">{change.label}</span>}
            </div>
            
            {additionalValue && (
              <>
                <Separator orientation="vertical" className="mx-2 h-3 bg-gray-700" />
                <div className="text-xs text-muted-foreground">{additionalValue}</div>
              </>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
