
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { PlusCircle, Pencil, Trash2, Tag, BadgePercent } from 'lucide-react';

// Types for bundle offers
type ServiceProvider = {
  id: string;
  name: string;
};

type ProductCategory = {
  id: string;
  name: string;
};

type BundleOffer = {
  id: string;
  name: string;
  description: string;
  serviceProvider: string;
  requiredServices: string[];
  eligibleProductCategories: string[];
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  active: boolean;
  startDate: string;
  endDate: string;
  termsAndConditions: string;
  promoCode?: string;
};

// Sample data
const sampleProviders: ServiceProvider[] = [
  { id: 'telus', name: 'TELUS' },
  { id: 'bell', name: 'Bell' },
  { id: 'rogers', name: 'Rogers' },
  { id: 'shaw', name: 'Shaw' },
  { id: 'videotron', name: 'Videotron' }
];

const sampleServiceTypes = [
  { id: 'internet', name: 'Home Internet' },
  { id: 'tv', name: 'TV Services' },
  { id: 'phone', name: 'Home Phone' },
  { id: 'mobile', name: 'Mobile Phone' },
  { id: 'security', name: 'Home Security' }
];

const sampleProductCategories: ProductCategory[] = [
  { id: 'security', name: 'Security' },
  { id: 'climate', name: 'Climate Control' },
  { id: 'lighting', name: 'Lighting' },
  { id: 'entertainment', name: 'Entertainment' },
  { id: 'cleaning', name: 'Cleaning' }
];

const sampleBundleOffers: BundleOffer[] = [
  {
    id: 'bundle1',
    name: 'TELUS Complete Home Security Bundle',
    description: 'Save on smart home security devices when you have TELUS Home Internet and Mobile services.',
    serviceProvider: 'telus',
    requiredServices: ['internet', 'mobile'],
    eligibleProductCategories: ['security'],
    discountType: 'percentage',
    discountValue: 15,
    active: true,
    startDate: '2023-10-01',
    endDate: '2024-12-31',
    termsAndConditions: 'Must be an active TELUS Home Internet and Mobile customer. Cannot be combined with other offers.'
  },
  {
    id: 'bundle2',
    name: 'Rogers Smart Home Starter Bundle',
    description: 'Get a discount on smart home entertainment products when you have Rogers TV and Internet.',
    serviceProvider: 'rogers',
    requiredServices: ['internet', 'tv'],
    eligibleProductCategories: ['entertainment'],
    discountType: 'fixed',
    discountValue: 50,
    active: true,
    startDate: '2023-11-15',
    endDate: '2024-11-15',
    termsAndConditions: 'Requires Rogers Ignite TV and Internet services. One-time discount only.',
    promoCode: 'ROGERS50'
  }
];

export const BundleOffersManager = () => {
  const [bundleOffers, setBundleOffers] = useState<BundleOffer[]>(sampleBundleOffers);
  const [currentOffer, setCurrentOffer] = useState<BundleOffer | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleCreateOffer = (offer: BundleOffer) => {
    const newOffer = {
      ...offer,
      id: `bundle${Date.now()}`,
    };
    
    setBundleOffers([...bundleOffers, newOffer]);
    setIsAddDialogOpen(false);
    toast.success('Bundle offer created successfully');
  };

  const handleUpdateOffer = (offer: BundleOffer) => {
    const updatedOffers = bundleOffers.map(o => 
      o.id === offer.id ? offer : o
    );
    
    setBundleOffers(updatedOffers);
    setIsEditDialogOpen(false);
    toast.success('Bundle offer updated successfully');
  };

  const handleDeleteOffer = (offerId: string) => {
    if (confirm('Are you sure you want to delete this bundle offer?')) {
      const updatedOffers = bundleOffers.filter(offer => offer.id !== offerId);
      setBundleOffers(updatedOffers);
      toast.success('Bundle offer deleted successfully');
    }
  };

  const toggleOfferStatus = (offerId: string) => {
    const updatedOffers = bundleOffers.map(offer => 
      offer.id === offerId ? { ...offer, active: !offer.active } : offer
    );
    
    setBundleOffers(updatedOffers);
    toast.success(`Offer ${updatedOffers.find(o => o.id === offerId)?.active ? 'activated' : 'deactivated'} successfully`);
  };

  const filteredOffers = activeTab === 'all' 
    ? bundleOffers 
    : activeTab === 'active' 
      ? bundleOffers.filter(offer => offer.active) 
      : bundleOffers.filter(offer => !offer.active);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Bundle Offers Management</h2>
        <BundleOfferDialog 
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onSave={handleCreateOffer}
          title="Create Bundle Offer"
          buttonText="Create Offer"
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All Offers</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          {filteredOffers.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center p-6 text-center">
                <div className="rounded-full bg-muted p-3 mb-3">
                  <Tag className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-1">No bundle offers found</h3>
                <p className="text-muted-foreground mb-4">
                  {activeTab === 'all' 
                    ? 'Create your first bundle offer to help customers save on smart home products.' 
                    : activeTab === 'active' 
                      ? 'No active offers at the moment.' 
                      : 'No inactive offers at the moment.'}
                </p>
                <Button onClick={() => setIsAddDialogOpen(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Bundle Offer
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Offer Name</TableHead>
                    <TableHead>Provider</TableHead>
                    <TableHead>Discount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expiry</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOffers.map((offer) => {
                    const provider = sampleProviders.find(p => p.id === offer.serviceProvider)?.name || offer.serviceProvider;
                    const isExpired = new Date(offer.endDate) < new Date();
                    
                    return (
                      <TableRow key={offer.id}>
                        <TableCell>
                          <div className="font-medium">{offer.name}</div>
                          <div className="text-xs text-muted-foreground">{offer.description.substring(0, 60)}...</div>
                        </TableCell>
                        <TableCell>{provider}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <BadgePercent className="h-4 w-4 mr-1 text-primary" />
                            {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `$${offer.discountValue.toFixed(2)}`}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <div className={`h-2 w-2 rounded-full mr-2 ${isExpired ? 'bg-destructive' : offer.active ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                            <span>
                              {isExpired ? 'Expired' : offer.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>{new Date(offer.endDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setCurrentOffer(offer);
                                setIsEditDialogOpen(true);
                              }}
                            >
                              <Pencil className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toggleOfferStatus(offer.id)}
                              className={offer.active ? 'text-amber-500 hover:text-amber-600' : 'text-emerald-500 hover:text-emerald-600'}
                              disabled={isExpired}
                            >
                              {offer.active ? 'Deactivate' : 'Activate'}
                              <span className="sr-only">{offer.active ? 'Deactivate' : 'Activate'}</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteOffer(offer.id)}
                              className="text-destructive hover:text-destructive/90"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {currentOffer && (
        <BundleOfferDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          onSave={handleUpdateOffer}
          title="Edit Bundle Offer"
          buttonText="Update Offer"
          initialData={currentOffer}
        />
      )}
    </div>
  );
};

interface BundleOfferDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (offer: BundleOffer) => void;
  title: string;
  buttonText: string;
  initialData?: BundleOffer;
}

const BundleOfferDialog: React.FC<BundleOfferDialogProps> = ({
  isOpen,
  onOpenChange,
  onSave,
  title,
  buttonText,
  initialData
}) => {
  const defaultOffer: BundleOffer = {
    id: initialData?.id || '',
    name: '',
    description: '',
    serviceProvider: '',
    requiredServices: [],
    eligibleProductCategories: [],
    discountType: 'percentage',
    discountValue: 0,
    active: true,
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)).toISOString().split('T')[0],
    termsAndConditions: '',
    promoCode: ''
  };

  const [offer, setOffer] = useState<BundleOffer>(initialData || defaultOffer);
  const [currentServiceToAdd, setCurrentServiceToAdd] = useState('');
  const [currentCategoryToAdd, setCurrentCategoryToAdd] = useState('');
  const [activeTab, setActiveTab] = useState('basic');

  React.useEffect(() => {
    if (initialData) {
      setOffer(initialData);
    } else {
      setOffer(defaultOffer);
    }
  }, [initialData, isOpen]);

  const handleChange = (field: keyof BundleOffer, value: any) => {
    setOffer({ ...offer, [field]: value });
  };

  const handleAddService = () => {
    if (currentServiceToAdd && !offer.requiredServices.includes(currentServiceToAdd)) {
      handleChange('requiredServices', [...offer.requiredServices, currentServiceToAdd]);
      setCurrentServiceToAdd('');
    }
  };

  const handleRemoveService = (service: string) => {
    handleChange('requiredServices', offer.requiredServices.filter(s => s !== service));
  };

  const handleAddCategory = () => {
    if (currentCategoryToAdd && !offer.eligibleProductCategories.includes(currentCategoryToAdd)) {
      handleChange('eligibleProductCategories', [...offer.eligibleProductCategories, currentCategoryToAdd]);
      setCurrentCategoryToAdd('');
    }
  };

  const handleRemoveCategory = (category: string) => {
    handleChange('eligibleProductCategories', offer.eligibleProductCategories.filter(c => c !== category));
  };

  const handleSubmit = () => {
    // Basic validation
    if (!offer.name || !offer.serviceProvider || offer.requiredServices.length === 0 || 
        offer.eligibleProductCategories.length === 0 || offer.discountValue <= 0) {
      toast.error('Please fill in all required fields');
      return;
    }

    onSave(offer);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button onClick={() => onOpenChange(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          New Bundle Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Create bundle offers to provide discounts based on customer's existing services.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="eligibility">Eligibility</TabsTrigger>
            <TabsTrigger value="details">Details & Terms</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-4">
            <div className="space-y-4">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Offer Name *</Label>
                  <Input
                    id="name"
                    value={offer.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="e.g., TELUS Complete Home Security Bundle"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={offer.description}
                    onChange={(e) => handleChange('description', e.target.value)}
                    placeholder="Briefly describe the bundle offer and its benefits"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="serviceProvider">Service Provider *</Label>
                  <Select
                    value={offer.serviceProvider}
                    onValueChange={(value) => handleChange('serviceProvider', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a provider" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleProviders.map((provider) => (
                        <SelectItem key={provider.id} value={provider.id}>
                          {provider.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date *</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={offer.startDate}
                      onChange={(e) => handleChange('startDate', e.target.value)}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date *</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={offer.endDate}
                      onChange={(e) => handleChange('endDate', e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="active"
                    checked={offer.active}
                    onCheckedChange={(checked) => handleChange('active', checked)}
                  />
                  <Label htmlFor="active">Active</Label>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="eligibility" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Required Services *</Label>
                <p className="text-sm text-muted-foreground">
                  Select services that customers must have with the provider to qualify for this offer.
                </p>
                
                <div className="flex gap-2 items-center">
                  <Select
                    value={currentServiceToAdd}
                    onValueChange={setCurrentServiceToAdd}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleServiceTypes
                        .filter(service => !offer.requiredServices.includes(service.id))
                        .map((service) => (
                          <SelectItem key={service.id} value={service.id}>
                            {service.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    type="button"
                    onClick={handleAddService}
                    disabled={!currentServiceToAdd}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {offer.requiredServices.map((serviceId) => {
                    const service = sampleServiceTypes.find(s => s.id === serviceId);
                    return (
                      <div key={serviceId} className="inline-flex items-center bg-secondary/50 rounded-md px-2 py-1">
                        <span className="text-sm">{service?.name || serviceId}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveService(serviceId)}
                          className="ml-2 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Eligible Product Categories *</Label>
                <p className="text-sm text-muted-foreground">
                  Select product categories that will receive a discount with this bundle.
                </p>
                
                <div className="flex gap-2 items-center">
                  <Select
                    value={currentCategoryToAdd}
                    onValueChange={setCurrentCategoryToAdd}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {sampleProductCategories
                        .filter(category => !offer.eligibleProductCategories.includes(category.id))
                        .map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  
                  <Button
                    type="button"
                    onClick={handleAddCategory}
                    disabled={!currentCategoryToAdd}
                    variant="outline"
                  >
                    Add
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  {offer.eligibleProductCategories.map((categoryId) => {
                    const category = sampleProductCategories.find(c => c.id === categoryId);
                    return (
                      <div key={categoryId} className="inline-flex items-center bg-secondary/50 rounded-md px-2 py-1">
                        <span className="text-sm">{category?.name || categoryId}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveCategory(categoryId)}
                          className="ml-2 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="space-y-4">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="discountType">Discount Type *</Label>
                  <Select
                    value={offer.discountType}
                    onValueChange={(value: 'percentage' | 'fixed') => handleChange('discountType', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select discount type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount ($)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="discountValue">
                    Discount Value *
                    {offer.discountType === 'percentage' ? ' (%)' : ' ($)'}
                  </Label>
                  <Input
                    id="discountValue"
                    type="number"
                    min="0"
                    step={offer.discountType === 'percentage' ? '1' : '0.01'}
                    max={offer.discountType === 'percentage' ? '100' : '10000'}
                    value={offer.discountValue}
                    onChange={(e) => handleChange('discountValue', parseFloat(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="promoCode">Promo Code (Optional)</Label>
                <Input
                  id="promoCode"
                  value={offer.promoCode || ''}
                  onChange={(e) => handleChange('promoCode', e.target.value)}
                  placeholder="e.g., SUMMER2023"
                />
                <p className="text-xs text-muted-foreground">
                  If this offer requires a promo code, enter it here.
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="termsAndConditions">Terms & Conditions *</Label>
                <Textarea
                  id="termsAndConditions"
                  value={offer.termsAndConditions}
                  onChange={(e) => handleChange('termsAndConditions', e.target.value)}
                  placeholder="Enter the terms and conditions for this offer"
                  rows={4}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
