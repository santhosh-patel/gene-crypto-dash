
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const TradingViewDashboard = () => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold mb-6">TradingView Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Advanced Real-Time Chart */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Advanced Real-Time Chart</CardTitle>
          </CardHeader>
          <CardContent className="h-[600px]">
            <div className="tradingview-widget-container h-full">
              <iframe 
                src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_5f057&symbol=BINANCE%3ABTCUSDT&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=exchange"
                className="w-full h-full"
                title="Advanced Real-Time Chart"
              />
            </div>
          </CardContent>
        </Card>

        {/* Symbol Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Symbol Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="tradingview-widget-container h-full">
              <iframe
                src="https://s.tradingview.com/embed-widget/symbol-overview/?locale=en#%7B%22symbols%22%3A%5B%5B%22BINANCE%3ABTCUSDT%7C1D%22%5D%2C%5B%22BINANCE%3AETHUSDT%7C1D%22%5D%5D%2C%22chartOnly%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22colorTheme%22%3A%22dark%22%7D"
                className="w-full h-full"
                title="Symbol Overview"
              />
            </div>
          </CardContent>
        </Card>

        {/* Market Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Market Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <div className="tradingview-widget-container h-full">
              <iframe
                src="https://s.tradingview.com/embed-widget/market-overview/?locale=en#%7B%22colorTheme%22%3A%22dark%22%2C%22dateRange%22%3A%2212M%22%2C%22showChart%22%3Atrue%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22largeChartUrl%22%3A%22%22%7D"
                className="w-full h-full"
                title="Market Overview"
              />
            </div>
          </CardContent>
        </Card>

        {/* Crypto Heatmap */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Crypto Heatmap</CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <div className="tradingview-widget-container h-full">
              <iframe
                src="https://s.tradingview.com/embed-widget/crypto-coins-heatmap/?locale=en#%7B%22dataSource%22%3A%22Crypto%22%2C%22blockSize%22%3A%22market_cap_calc%22%2C%22blockColor%22%3A%22change%22%2C%22colorTheme%22%3A%22dark%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%7D"
                className="w-full h-full"
                title="Crypto Heatmap"
              />
            </div>
          </CardContent>
        </Card>

        {/* Cryptocurrency Market */}
        <Card className="col-span-1 lg:col-span-2">
          <CardHeader>
            <CardTitle>Cryptocurrency Market</CardTitle>
          </CardHeader>
          <CardContent className="h-[500px]">
            <div className="tradingview-widget-container h-full">
              <iframe
                src="https://s.tradingview.com/embed-widget/crypto-mkt-screener/?locale=en#%7B%22width%22%3A%22100%25%22%2C%22height%22%3A%22100%25%22%2C%22defaultColumn%22%3A%22performance%22%2C%22screener_type%22%3A%22crypto_mkt%22%2C%22displayCurrency%22%3A%22USD%22%2C%22colorTheme%22%3A%22dark%22%2C%22market%22%3A%22crypto%22%7D"
                className="w-full h-full"
                title="Cryptocurrency Market"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TradingViewDashboard;
