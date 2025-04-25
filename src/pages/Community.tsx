
import React from "react";
import Navbar from "@/components/layout/Navbar";
import Sidebar from "@/components/layout/Sidebar";

const Community = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar />
      <div className="flex-1 flex flex-col ml-0 lg:ml-16">
        <Navbar onDateRangeChange={() => {}} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Community</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Connect with other crypto enthusiasts.
            </p>
          </div>
          
          {/* Add community content here */}
          <div className="grid gap-4">
            <div className="p-6 rounded-lg border border-gray-800 bg-card">
              <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
              <p className="text-muted-foreground">
                Community features are under development. Check back soon!
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Community;
