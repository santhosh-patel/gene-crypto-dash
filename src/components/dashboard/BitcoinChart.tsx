
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Maximize } from "lucide-react";

const BitcoinChart: React.FC = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

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
      "enable_publishing": !isFullscreen,
      "hide_top_toolbar": false,
      "hide_legend": false,
      "save_image": true,
      "calendar": true,
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
      widget.style.height = isFullscreen ? "100vh" : "400px";
      
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
  }, [isFullscreen]);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <Card className={`bg-card border-gray-800 ${isFullscreen ? 'fixed inset-0 z-50' : 'col-span-2'}`}>
      <CardHeader className="pt-4 px-4 pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Bitcoin Chart</CardTitle>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="hover:bg-gray-800"
        >
          <Maximize className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <div id="tradingview-widget" className={isFullscreen ? "h-[calc(100vh-80px)]" : "h-[400px]"}></div>
      </CardContent>
    </Card>
  );
};

export default BitcoinChart;
