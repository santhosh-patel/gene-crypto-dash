
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface CryptoHighlightProps {
  name: string;
  symbol: string;
  price: string;
  change: number;
  rewardRate: number;
  iconClassName?: string;
}

const CryptoHighlight: React.FC<CryptoHighlightProps> = ({ 
  name, 
  symbol, 
  price, 
  change, 
  rewardRate, 
  iconClassName 
}) => {
  const isPositive = change > 0;
  
  return (
    <Card className="bg-card border-gray-800">
      <CardContent className="p-4">
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            iconClassName || "bg-bitcoin"
          )}>
            {symbol === "BTC" ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.5 6.5V17.5M14.5 6.5V17.5M5 9.5H19M5 14.5H19M7 19.5H17C18.1046 19.5 19 18.6046 19 17.5V6.5C19 5.39543 18.1046 4.5 17 4.5H7C5.89543 4.5 5 5.39543 5 6.5V17.5C5 18.6046 5.89543 19.5 7 19.5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            ) : (
              symbol.substring(0, 1)
            )}
          </div>
          
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-xs text-muted-foreground">{symbol}</div>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="text-2xl font-semibold">{price}</div>
          <div className="flex items-center mt-1">
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
              {isPositive ? "+" : ""}{change}%
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-800">
          <div className="text-xs text-muted-foreground">Reward Rate</div>
          <div className="text-gradient font-semibold text-xl mt-1">{rewardRate}%</div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoHighlight;
