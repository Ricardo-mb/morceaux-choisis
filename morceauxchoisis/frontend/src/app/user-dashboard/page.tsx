"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const router = useRouter();
  const [user, setUser] = useState<{ id: string; name?: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user') || '{}');
    
    if (!token || !userData.id) {
      router.push('/login');
    } else {
      setUser(userData);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="w-full p-8 space-y-6">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold">Welcome, {user?.name}</h2>
              <p className="text-muted-foreground">Your Dashboard</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Dashboard content cards */}
              <Card className="p-6">
                <h3 className="text-xl font-semibold">Profile</h3>
                <p className="text-muted-foreground">{user?.email}</p>
              </Card>
              
              {/* Add more dashboard sections */}
            </div>

            <Button 
              onClick={() => {
                localStorage.clear();
                router.push('/login');
              }}
              className="mt-4"
            >
              Logout
            </Button>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};
export default Dashboard;