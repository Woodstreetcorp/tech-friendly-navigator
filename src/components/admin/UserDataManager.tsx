
import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Trash2, Search } from 'lucide-react';
import { toast } from 'sonner';

type UserData = {
  email: string;
  name?: string;
  phone?: string;
  postalCode?: string;
  consentToMarketing: boolean;
  timestamp: string;
};

export const UserDataManager = () => {
  const [userData, setUserData] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user data
  useEffect(() => {
    // Simulating API call to get user data
    setTimeout(() => {
      // In a real app, you would fetch this from your backend
      const storedUserData = localStorage.getItem('approvu_user_data');
      let parsedData: UserData[] = [];
      
      if (storedUserData) {
        try {
          const data = JSON.parse(storedUserData);
          // Convert single user data to array if needed
          parsedData = Array.isArray(data) ? data : [{ ...data, timestamp: new Date().toISOString() }];
        } catch (error) {
          console.error('Error parsing user data:', error);
        }
      }
      
      // Add some mock data if none exists
      if (parsedData.length === 0) {
        parsedData = [
          {
            email: 'johndoe@example.com',
            name: 'John Doe',
            phone: '647-555-1234',
            postalCode: 'M5V 2H1',
            consentToMarketing: true,
            timestamp: '2023-09-15T14:30:00Z'
          },
          {
            email: 'janedoe@example.com',
            name: 'Jane Doe',
            phone: '416-555-6789',
            postalCode: 'M4W 2G8',
            consentToMarketing: false,
            timestamp: '2023-09-16T09:45:00Z'
          },
          {
            email: 'samsmith@example.com',
            name: 'Sam Smith',
            phone: '905-555-4321',
            postalCode: 'L6H 2Z9',
            consentToMarketing: true,
            timestamp: '2023-09-17T11:20:00Z'
          }
        ];
      }
      
      setUserData(parsedData);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDeleteUser = (email: string) => {
    if (confirm('Are you sure you want to delete this user data?')) {
      const updatedUserData = userData.filter(user => user.email !== email);
      setUserData(updatedUserData);
      toast.success('User data deleted successfully');
      
      // In a real app, you'd make an API call to delete the user data
    }
  };

  const exportUserData = () => {
    try {
      const dataStr = JSON.stringify(userData, null, 2);
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      
      const exportFileDefaultName = 'approvu-user-data.json';
      
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      toast.success('User data exported successfully');
    } catch (error) {
      console.error('Error exporting user data:', error);
      toast.error('Failed to export user data');
    }
  };

  const filteredUserData = userData.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (user.name && user.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (user.phone && user.phone.includes(searchTerm)) ||
    (user.postalCode && user.postalCode.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">User Data Management</h2>
        <Button 
          className="flex items-center gap-2"
          onClick={exportUserData}
        >
          <Download size={16} />
          Export User Data
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8"
        />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-pulse text-center">
            <div className="h-6 w-32 bg-secondary rounded mx-auto mb-2"></div>
            <p className="text-muted-foreground">Loading user data...</p>
          </div>
        </div>
      ) : filteredUserData.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No user data found{searchTerm ? ' matching your search' : ''}.</p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Postal Code</TableHead>
              <TableHead>Marketing Consent</TableHead>
              <TableHead>Date Collected</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUserData.map((user) => (
              <TableRow key={user.email}>
                <TableCell className="font-medium">{user.email}</TableCell>
                <TableCell>{user.name || '-'}</TableCell>
                <TableCell>{user.phone || '-'}</TableCell>
                <TableCell>{user.postalCode || '-'}</TableCell>
                <TableCell>{user.consentToMarketing ? 'Yes' : 'No'}</TableCell>
                <TableCell>{new Date(user.timestamp).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="destructive" 
                    size="icon"
                    onClick={() => handleDeleteUser(user.email)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
