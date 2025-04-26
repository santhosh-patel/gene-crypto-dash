import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChartBarIcon, CreditCard, TrendingUp, MessageCircle, FileText } from "lucide-react";
import AppLogo from "@/components/common/AppLogo";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-foreground">
      {/* Navbar */}
      <nav className="border-b border-gray-800 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center">
            <AppLogo className="h-8 w-auto" />
            <span className="ml-2 text-xl font-bold text-primary">CrypGene</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/dashboard">Log In</Link>
            </Button>
            <Button variant="default" className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4">
        <div className="container mx-auto text-center">
          <div className="flex justify-center mb-6">
            <AppLogo className="h-16 w-auto" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            Master Your Crypto Game.
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Track investments, analyze trends, manage your credit, and connect with crypto minds – all in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8" asChild>
              <Link to="/dashboard">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-500/10" asChild>
              <Link to="/dashboard">Log In</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-900/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            Features that empower your crypto journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <ChartBarIcon className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Crypto Dashboard</h3>
                <p className="text-gray-400">
                  View live Bitcoin and Ethereum trends, track your portfolio performance, and monitor market movements in real-time.
                </p>
              </CardContent>
            </Card>

            {/* Feature 2 */}
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Credit Score Insights</h3>
                <p className="text-gray-400">
                  Track your financial health with personalized credit scoring, improvement tips, and historical tracking.
                </p>
              </CardContent>
            </Card>

            {/* Feature 3 */}
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Market Analytics</h3>
                <p className="text-gray-400">
                  Access in-depth market analysis, historical data, and predictive indicators to make informed trading decisions.
                </p>
              </CardContent>
            </Card>

            {/* Feature 4 */}
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <MessageCircle className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community</h3>
                <p className="text-gray-400">
                  Connect with fellow crypto enthusiasts, share insights, and stay updated on the latest trends and discussions.
                </p>
              </CardContent>
            </Card>

            {/* Feature 5 */}
            <Card className="border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:border-purple-500/50 transition-colors">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-full flex items-center justify-center mb-4">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Reports</h3>
                <p className="text-gray-400">
                  Generate comprehensive reports on your investments, with detailed breakdowns and exportable analytics.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-purple-900/30 to-gray-900/80">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to take control of your crypto journey?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are mastering their crypto investments with CrypGene.
          </p>
          <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8" asChild>
            <Link to="/dashboard">Start Now</Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <AppLogo className="h-6 w-auto" />
              <span className="ml-2 text-lg font-bold text-primary">CrypGene</span>
            </div>
            <div className="text-sm text-gray-400">
              <span>CrypGene © 2025 | </span>
              <Link to="#" className="text-gray-400 hover:text-purple-400 mx-2">Privacy Policy</Link> |
              <Link to="#" className="text-gray-400 hover:text-purple-400 mx-2">Terms of Service</Link> |
              <Link to="#" className="text-gray-400 hover:text-purple-400 mx-2">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
