
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import { ProductsManager } from '@/components/admin/ProductsManager';
import { ProvidersManager } from '@/components/admin/ProvidersManager';
import { UserDataManager } from '@/components/admin/UserDataManager';
import { AnalyticsPanel } from '@/components/admin/AnalyticsPanel';
import { useAdminAuth } from '@/hooks/useAdminAuth';

const AdminPanel = () => {
  const { session, isLoading, logout } = useAdminAuth('/admin');

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!session) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold">Smart Home Advisor Admin</h1>
            <span className="text-muted-foreground">
              Logged in as <span className="font-medium">{session.username}</span>
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="flex items-center gap-2"
            onClick={logout}
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
