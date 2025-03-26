
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Check, ExternalLink, Star } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import UserInfoForm from '@/components/UserInfoForm';
import { Product } from '@/components/ProductCard';

// Sample product data - in a real app, this would come from an API or database
const productsData: Product[] = [
  {
    id: 'prod1',
    name: 'Ring Video Doorbell 4',
    category: 'Security',
    subCategory: 'Video Doorbells',
    description: 'Advanced security with color video preview and improved motion detection. The Ring Video Doorbell 4 features enhanced motion detection, color Pre-Roll technology, and customizable privacy settings.',
    price: 199.99,
    featuredImage: '/placeholder.svg',
    brand: 'Ring',
    features: [
      'Quick Reply - pre-set responses for when you can\'t answer the door',
      'Color Pre-Roll - captures 4 seconds of color video before motion is detected',
      'Dual-band Wi-Fi - connects to both 2.4GHz and 5GHz networks',
      'Improved motion detection with customizable motion zones',
      'Live view and two-way talk from your phone, tablet, or PC',
      'Works with Alexa for voice control and notifications'
    ],
    compatibility: ['Alexa', 'Ring App', 'IFTTT'],
    ecosystems: ['Amazon Alexa'],
    rating: 4.7,
    reviewCount: 1245,
    recommended: true,
    recommendationReasons: ['Top rated', 'Easy installation'],
    affiliateUrl: 'https://example.com/ring-doorbell-4',
    commissionRate: 8,
  },
  {
    id: 'prod2',
    name: 'Nest Learning Thermostat',
    category: 'Climate Control',
    subCategory: 'Smart Thermostats',
    description: 'Smart thermostat that learns your schedule and programs itself. The Nest Learning Thermostat adapts to your lifestyle, saving energy when you\'re away and maintaining comfort when you\'re home.',
    price: 249.99,
    featuredImage: '/placeholder.svg',
    brand: 'Google Nest',
    features: [
      'Auto-Schedule - learns the temperatures you like and creates a schedule',
      'Home/Away Assist - adjusts temperature when you\'re away to save energy',
      'Energy History - see how much energy you\'ve used and why',
      'Remote control - adjust temperature from your phone, tablet, or laptop',
      'Works with most HVAC systems',
      'Farsight - lights up when it spots you across the room'
    ],
    compatibility: ['Google Assistant', 'Amazon Alexa', 'IFTTT'],
    ecosystems: ['Google Home', 'Amazon Alexa'],
    rating: 4.9,
    reviewCount: 1823,
    recommended: true,
    recommendationReasons: ['Energy efficient', 'Easy to use'],
    affiliateUrl: 'https://example.com/nest-thermostat',
    commissionRate: 7,
  },
  {
    id: 'prod3',
    name: 'Philips Hue Starter Kit',
    category: 'Lighting',
    subCategory: 'Smart Lighting Systems',
    description: 'Smart lighting system with voice control and custom scenes. The Philips Hue system lets you control your lights via app or voice, set schedules, and create personalized lighting scenes.',
    price: 179.99,
    featuredImage: '/placeholder.svg',
    brand: 'Philips',
    features: [
      'Control lights via app or voice assistant',
      'Create custom lighting scenes and routines',
      'Set wake up and go to sleep schedules',
      'Includes Bridge hub and three color-changing bulbs',
      '16 million colors and shades of white light',
      'Syncs with music, games, and movies'
    ],
    compatibility: ['Amazon Alexa', 'Google Assistant', 'Apple HomeKit', 'Samsung SmartThings'],
    ecosystems: ['Philips Hue', 'Amazon Alexa', 'Google Home', 'Apple HomeKit'],
    rating: 4.5,
    reviewCount: 2340,
    recommended: true,
    recommendationReasons: ['Versatile', 'Wide compatibility'],
    affiliateUrl: 'https://example.com/philips-hue',
    commissionRate: 6,
  },
  {
    id: 'prod4',
    name: 'Amazon Echo Show 10',
    category: 'Smart Speakers',
    subCategory: 'Smart Displays',
    description: 'Smart display with motion tracking and premium sound. The Echo Show 10 features a 10.1" HD screen that automatically rotates to face you, premium sound, and a built-in Zigbee hub.',
    price: 249.99,
    featuredImage: '/placeholder.svg',
    brand: 'Amazon',
    features: [
      'Motion tracking display that follows you as you move',
      'Premium directional sound with dual front-firing tweeters and a powerful woofer',
      'Built-in 13MP camera for video calls and home monitoring',
      'Zigbee hub for connecting compatible smart home devices',
      'Stream Netflix, Prime Video, music services, and more',
      'Enhanced privacy controls including mic/camera off button and camera shutter'
    ],
    compatibility: ['Amazon Alexa', 'Zigbee', 'Ring'],
    ecosystems: ['Amazon Alexa'],
    rating: 4.6,
    reviewCount: 983,
    recommended: true,
    recommendationReasons: ['Premium sound', 'Motion tracking'],
    affiliateUrl: 'https://example.com/echo-show-10',
    commissionRate: 8,
  }
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  
  const { trackEvent, isUserDataCollected } = useUser();

  useEffect(() => {
    // Simulate API call to fetch product details
    setLoading(true);
    setTimeout(() => {
      const foundProduct = productsData.find(p => p.id === productId) || null;
      setProduct(foundProduct);
      setLoading(false);
      
      // Track page view
      if (foundProduct) {
        trackEvent({
          eventType: 'product_detail_view',
          productId: foundProduct.id,
          productName: foundProduct.name,
          source: 'product_detail_page',
          url: window.location.href
        });
      }
    }, 500);
  }, [productId, trackEvent]);

  const handleCTAClick = () => {
    if (!product) return;
    
    trackEvent({
      eventType: 'product_click',
      productId: product.id,
      productName: product.name,
      source: 'product_detail_page',
      url: product.affiliateUrl,
    });
    
    toast.success(`Tracking click for ${product.name}`);
    
    // If user data is already collected, proceed to affiliate link
    if (isUserDataCollected && product.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank');
    } else {
      // Show user info form
      setShowUserInfoForm(true);
    }
  };

  const handleUserFormComplete = () => {
    setShowUserInfoForm(false);
    // The form component will handle redirecting to the affiliate URL
  };

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container-custom py-10">
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-pulse">
              <div className="h-8 w-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-64 w-full max-w-2xl bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow container-custom py-10">
          <div className="flex flex-col items-center justify-center py-20">
            <h2 className="text-2xl font-semibold mb-4">Product Not Found</h2>
            <p className="text-muted-foreground mb-6">The product you're looking for doesn't exist or has been removed.</p>
            <Link to="/recommendations" className="btn-primary">
              <ArrowLeft size={18} className="mr-2" />
              Browse Other Products
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10">
        <div className="container-custom">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center mb-6 text-sm">
            <Link to="/" className="text-muted-foreground hover:text-primary">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/recommendations" className="text-muted-foreground hover:text-primary">Recommendations</Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{product.name}</span>
          </div>
          
          {/* Product Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
            {/* Product Image */}
            <div className="glass-card p-6 flex items-center justify-center">
              <img 
                src={product.featuredImage} 
                alt={product.name} 
                className="w-full max-w-md h-auto object-contain"
              />
            </div>
            
            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center mb-2">
                  <span className="text-sm font-medium text-muted-foreground">{product.brand}</span>
                  <span className="mx-2">•</span>
                  <span className="text-sm font-medium text-muted-foreground">{product.category}</span>
                  {product.subCategory && (
                    <>
                      <span className="mx-2">•</span>
                      <span className="text-sm font-medium text-muted-foreground">{product.subCategory}</span>
                    </>
                  )}
                </div>
                <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex items-center mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={`${i < Math.floor(product.rating) ? 'text-amber-500 fill-amber-500' : 'text-gray-300 fill-gray-300'}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="mx-1">•</span>
                  <span className="text-sm text-muted-foreground">{product.reviewCount} reviews</span>
                </div>
                
                <p className="text-muted-foreground">{product.description}</p>
              </div>
              
              <div className="pt-4 border-t border-border">
                <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
              </div>
              
              {product.recommended && product.recommendationReasons && (
                <div className="flex flex-wrap gap-2">
                  {product.recommendationReasons.map((reason, idx) => (
                    <span 
                      key={idx} 
                      className="inline-flex items-center py-1 px-2 rounded-md text-xs font-medium bg-primary/10 text-primary"
                    >
                      <Check size={12} className="mr-1" />
                      {reason}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="pt-4">
                <Button 
                  onClick={handleCTAClick}
                  className="w-full md:w-auto bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all duration-200"
                >
                  <ExternalLink size={18} className="mr-2" />
                  Get Best Deal
                </Button>
              </div>
              
              {/* Compatibility */}
              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold mb-2">Compatible with</h3>
                <div className="flex flex-wrap gap-1">
                  {product.compatibility.map((item, index) => (
                    <span 
                      key={index}
                      className="inline-flex items-center py-1 px-2 rounded-md text-xs font-medium bg-secondary text-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Features Section */}
          <div className="glass-card p-8 mb-16">
            <h2 className="text-2xl font-semibold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check size={20} className="mr-2 text-primary mt-0.5 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* User info collection form */}
      {showUserInfoForm && (
        <UserInfoForm
          onClose={() => setShowUserInfoForm(false)}
          onComplete={handleUserFormComplete}
          productName={product.name}
          affiliateUrl={product.affiliateUrl}
        />
      )}
    </div>
  );
};

export default ProductDetail;
