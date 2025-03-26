
import React, { useEffect, useState } from 'react';
import { 
  Bar, 
  BarChart, 
  CartesianGrid, 
  Cell, 
  Legend, 
  Pie, 
  PieChart, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';

type AnalyticsData = {
  // Overall metrics
  totalProductClicks: number;
  totalProviderClicks: number;
  totalConversions: number;
  conversionRate: number;
  
  // Product engagement
  productEngagement: {
    productId: string;
    productName: string;
    clicks: number;
    conversions: number;
  }[];
  
  // Provider engagement
  providerEngagement: {
    providerId: string;
    providerName: string;
    clicks: number;
    conversions: number;
  }[];
  
  // Time-based metrics
  dailyEngagement: {
    date: string;
    productClicks: number;
    providerClicks: number;
    conversions: number;
  }[];
};

export const AnalyticsPanel = () => {
  const { events } = useUser();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'7days' | '30days' | '90days'>('30days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Process the events to create analytics data
    const processAnalytics = () => {
      if (!events || events.length === 0) {
        // Create sample data if no real events
        setAnalyticsData(generateSampleAnalyticsData());
        setIsLoading(false);
        return;
      }

      // Get date range
      const now = new Date();
      let startDate = new Date();
      if (timeRange === '7days') {
        startDate.setDate(now.getDate() - 7);
      } else if (timeRange === '30days') {
        startDate.setDate(now.getDate() - 30);
      } else {
        startDate.setDate(now.getDate() - 90);
      }

      // Filter events by date range
      const filteredEvents = events.filter(event => {
        const eventDate = new Date(event.timestamp);
        return eventDate >= startDate && eventDate <= now;
      });

      // Process product clicks
      const productClicks = filteredEvents.filter(event => 
        event.eventType === 'product_click'
      );
      
      // Process provider clicks
      const providerClicks = filteredEvents.filter(event => 
        event.eventType === 'provider_click'
      );
      
      // Process conversions (could be a specific event type in your app)
      const conversions = filteredEvents.filter(event => 
        event.eventType === 'conversion' || event.eventType === 'user_info_submitted'
      );

      // Aggregate product engagement
      const productMap = new Map();
      productClicks.forEach(event => {
        if (event.productId && event.productName) {
          const id = event.productId;
          if (!productMap.has(id)) {
            productMap.set(id, {
              productId: id,
              productName: event.productName,
              clicks: 0,
              conversions: 0
            });
          }
          const product = productMap.get(id);
          product.clicks += 1;
          productMap.set(id, product);
        }
      });
      
      // Aggregate provider engagement
      const providerMap = new Map();
      providerClicks.forEach(event => {
        if (event.providerId && event.providerName) {
          const id = event.providerId;
          if (!providerMap.has(id)) {
            providerMap.set(id, {
              providerId: id,
              providerName: event.providerName,
              clicks: 0,
              conversions: 0
            });
          }
          const provider = providerMap.get(id);
          provider.clicks += 1;
          providerMap.set(id, provider);
        }
      });

      // Process daily engagement
      const dailyData = new Map();
      filteredEvents.forEach(event => {
        const date = new Date(event.timestamp).toISOString().split('T')[0];
        if (!dailyData.has(date)) {
          dailyData.set(date, {
            date: date,
            productClicks: 0,
            providerClicks: 0,
            conversions: 0
          });
        }
        
        const dayData = dailyData.get(date);
        if (event.eventType === 'product_click') {
          dayData.productClicks += 1;
        } else if (event.eventType === 'provider_click') {
          dayData.providerClicks += 1;
        } else if (event.eventType === 'conversion' || event.eventType === 'user_info_submitted') {
          dayData.conversions += 1;
        }
        
        dailyData.set(date, dayData);
      });

      // Calculate overall metrics
      const totalProductClicks = productClicks.length;
      const totalProviderClicks = providerClicks.length;
      const totalConversions = conversions.length;
      const totalClicks = totalProductClicks + totalProviderClicks;
      const conversionRate = totalClicks > 0 ? (totalConversions / totalClicks) * 100 : 0;

      // Set analytics data
      setAnalyticsData({
        totalProductClicks,
        totalProviderClicks,
        totalConversions,
        conversionRate,
        productEngagement: Array.from(productMap.values()),
        providerEngagement: Array.from(providerMap.values()),
        dailyEngagement: Array.from(dailyData.values()).sort((a, b) => a.date.localeCompare(b.date))
      });

      setIsLoading(false);
    };

    processAnalytics();
  }, [events, timeRange]);

  const generateSampleAnalyticsData = (): AnalyticsData => {
    // Generate random dates within the selected time range
    const getDates = () => {
      const dates = [];
      const now = new Date();
      const days = timeRange === '7days' ? 7 : timeRange === '30days' ? 30 : 90;
      
      for (let i = 0; i < days; i++) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
      }
      return dates.sort();
    };
    
    const dates = getDates();
    
    // Sample product data
    const products = [
      { productId: 'prod1', productName: 'Ring Video Doorbell 4', clicks: 0, conversions: 0 },
      { productId: 'prod2', productName: 'Nest Learning Thermostat', clicks: 0, conversions: 0 },
      { productId: 'prod3', productName: 'Philips Hue Starter Kit', clicks: 0, conversions: 0 },
      { productId: 'prod4', productName: 'Amazon Echo Show 10', clicks: 0, conversions: 0 }
    ];
    
    // Sample provider data
    const providers = [
      { providerId: 'prov1', providerName: 'Bell Smart Home', clicks: 0, conversions: 0 },
      { providerId: 'prov2', providerName: 'Rogers Smart Home Monitoring', clicks: 0, conversions: 0 }
    ];
    
    // Generate random clicks for products and providers
    products.forEach(product => {
      product.clicks = Math.floor(Math.random() * 100) + 20;
      product.conversions = Math.floor(product.clicks * (Math.random() * 0.3 + 0.1));
    });
    
    providers.forEach(provider => {
      provider.clicks = Math.floor(Math.random() * 80) + 10;
      provider.conversions = Math.floor(provider.clicks * (Math.random() * 0.3 + 0.1));
    });
    
    // Generate daily engagement
    const dailyEngagement = dates.map(date => {
      const randomFactor = Math.random() * 0.5 + 0.5;
      const productClicks = Math.floor(Math.random() * 10 * randomFactor);
      const providerClicks = Math.floor(Math.random() * 5 * randomFactor);
      const conversions = Math.floor((productClicks + providerClicks) * (Math.random() * 0.3 + 0.1));
      
      return {
        date,
        productClicks,
        providerClicks,
        conversions
      };
    });
    
    // Calculate totals
    const totalProductClicks = products.reduce((sum, p) => sum + p.clicks, 0);
    const totalProviderClicks = providers.reduce((sum, p) => sum + p.clicks, 0);
    const totalConversions = products.reduce((sum, p) => sum + p.conversions, 0) + 
                             providers.reduce((sum, p) => sum + p.conversions, 0);
    const conversionRate = ((totalConversions / (totalProductClicks + totalProviderClicks)) * 100) || 0;
    
    return {
      totalProductClicks,
      totalProviderClicks,
      totalConversions,
      conversionRate,
      productEngagement: products,
      providerEngagement: providers,
      dailyEngagement
    };
  };

  const exportAnalyticsData = () => {
    try {
      if (!analyticsData) return;
      
      const dataStr = JSON.stringify(analyticsData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'approvu-analytics-data.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('Analytics data exported successfully');
    } catch (error) {
      console.error('Error exporting analytics data:', error);
      toast.error('Failed to export analytics data');
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#FF6B6B'];

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-pulse text-center">
          <div className="h-6 w-40 bg-secondary rounded mx-auto mb-2"></div>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No analytics data available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Analytics Dashboard</h2>
        <div className="flex gap-4">
          <Select 
            value={timeRange} 
            onValueChange={(value) => setTimeRange(value as typeof timeRange)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Last 7 days</SelectItem>
              <SelectItem value="30days">Last 30 days</SelectItem>
              <SelectItem value="90days">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline"
            className="flex items-center gap-2"
            onClick={exportAnalyticsData}
          >
            <Download size={16} />
            Export Data
          </Button>
        </div>
      </div>
      
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Product Clicks</CardTitle>
            <CardDescription>Total product engagements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.totalProductClicks}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Provider Clicks</CardTitle>
            <CardDescription>Total provider engagements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.totalProviderClicks}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversions</CardTitle>
            <CardDescription>User info submissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.totalConversions}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Conversion Rate</CardTitle>
            <CardDescription>Click to conversion ratio</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{analyticsData.conversionRate.toFixed(1)}%</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Engagement over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Engagement Over Time</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analyticsData.dailyEngagement}
                margin={{ top: 20, right: 30, left: 20, bottom: 65 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  angle={-45} 
                  textAnchor="end" 
                  height={60} 
                  tick={{ fontSize: 12 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="productClicks" fill="#0088FE" name="Product Clicks" />
                <Bar dataKey="providerClicks" fill="#00C49F" name="Provider Clicks" />
                <Bar dataKey="conversions" fill="#FF8042" name="Conversions" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      {/* Product Engagement vs Provider Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Product Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.productEngagement}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="clicks"
                    nameKey="productName"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.productEngagement.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Provider Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={analyticsData.providerEngagement}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    dataKey="clicks"
                    nameKey="providerName"
                    label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {analyticsData.providerEngagement.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Product Engagement Table */}
      <Card>
        <CardHeader>
          <CardTitle>Product Engagement Details</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Conversions</TableHead>
                <TableHead className="text-right">Conversion Rate</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analyticsData.productEngagement.map((product) => (
                <TableRow key={product.productId}>
                  <TableCell className="font-medium">{product.productName}</TableCell>
                  <TableCell className="text-right">{product.clicks}</TableCell>
                  <TableCell className="text-right">{product.conversions}</TableCell>
                  <TableCell className="text-right">
                    {product.clicks > 0 ? ((product.conversions / product.clicks) * 100).toFixed(1) : 0}%
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
