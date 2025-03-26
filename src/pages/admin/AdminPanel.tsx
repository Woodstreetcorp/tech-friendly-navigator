
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { ProductsManager } from '@/components/admin/ProductsManager';
import { ProvidersManager } from '@/components/admin/ProvidersManager';
import { UserDataManager } from '@/components/admin/UserDataManager';
import { AnalyticsPanel } from '@/components/admin/AnalyticsPanel';

type AdminSession = {
  isAuthenticated: boolean;
  username: string;
  loginTime: string;
};

const AdminPanel = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<AdminSession | null>(null);

  // Check for admin session
  useEffect(() => {
    const adminSession = localStorage.getItem('admin_session');
    
    if (!adminSession) {
      navigate('/admin');
      return;
    }
    
    try {
      const parsedSession = JSON.parse(adminSession) as AdminSession;
      
      if (!parsedSession.isAuthenticated) {
        navigate('/admin');
        return;
      }
      
      setSession(parsedSession);
    } catch (error) {
      console.error('Error parsing admin session:', error);
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_session');
    navigate('/admin');
  };

  if (!session) {
    // You could return a loading component here
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">ApprOVU Admin</h1>
            <span className="text-muted-foreground">
              Logged in as <span className="font-medium">{session.username}</span>
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="products">
          <TabsList className="mb-6">
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="providers">Service Providers</TabsTrigger>
            <TabsTrigger value="users">User Data</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="products">
            <ProductsManager />
          </TabsContent>
          
          <TabsContent value="providers">
            <ProvidersManager />
          </TabsContent>
          
          <TabsContent value="users">
            <UserDataManager />
          </TabsContent>
          
          <TabsContent value="analytics">
            <AnalyticsPanel />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
