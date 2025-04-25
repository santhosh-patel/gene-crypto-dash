
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// This component will embed TradingView widget for Bitcoin chart
const BitcoinChart: React.FC = () => {
  React.useEffect(() => {
    // Create and append the TradingView widget script
    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      "autosize": true,
      "symbol": "COINBASE:BTCUSD",
      "interval": "D",
      "timezone": "Etc/UTC",
      "theme": "dark",
      "style": "1",
      "locale": "en",
      "enable_publishing": false,
      "hide_top_toolbar": true,
      "hide_legend": false,
      "save_image": false,
      "calendar": false,
      "hide_volume": false,
      "support_host": "https://www.tradingview.com"
    });
    
    const container = document.getElementById("tradingview-widget");
    if (container) {
      // Clear any existing content in the container
      container.innerHTML = "";
      
      // Create the TradingView widget container
      const widgetContainer = document.createElement("div");
      widgetContainer.className = "tradingview-widget-container";
      
      const widget = document.createElement("div");
      widget.className = "tradingview-widget-container__widget";
      widget.style.height = "400px";
      
      widgetContainer.appendChild(widget);
      widgetContainer.appendChild(script);
      container.appendChild(widgetContainer);
    }
    
    return () => {
      // Clean up
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  return (
    <Card className="bg-card border-gray-800 col-span-2">
      <CardHeader className="pt-4 px-4 pb-0">
        <CardTitle className="text-lg font-medium">Bitcoin Chart</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div id="tradingview-widget" className="h-[400px]"></div>
      </CardContent>
    </Card>
  );
};

export default BitcoinChart;
