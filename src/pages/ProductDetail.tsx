import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { toast } from 'sonner';
import { useUser } from '@/context/UserContext';
import UserInfoForm from '@/components/UserInfoForm';
import { SmartHomeProduct } from '@/data/smartHomeProducts';
import ProductBreadcrumbs, { ProductNotFound } from '@/components/product/ProductBreadcrumbs';
import ProductImageDisplay from '@/components/product/ProductImageDisplay';
import ProductInfo from '@/components/product/ProductInfo';
import ProductFeatures from '@/components/product/ProductFeatures';
import ProductDetailSkeleton from '@/components/product/ProductDetailSkeleton';

type Product = SmartHomeProduct;

const productsData: Product[] = [
  {
    id: 'prod1',
    name: 'Ring Video Doorbell 4',
    category: 'security',
    subCategory: 'video-doorbells',
    description: 'Advanced security with color video preview and improved motion detection. The Ring Video Doorbell 4 features enhanced motion detection, color Pre-Roll technology, and customizable privacy settings.',
    price: 199.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    brand: 'Ring',
    features: [
      { name: 'Quick Reply - pre-set responses for when you can\'t answer the door' },
      { name: 'Color Pre-Roll - captures 4 seconds of color video before motion is detected' },
      { name: 'Dual-band Wi-Fi - connects to both 2.4GHz and 5GHz networks' },
      { name: 'Improved motion detection with customizable motion zones' },
      { name: 'Live view and two-way talk from your phone, tablet, or PC' },
      { name: 'Works with Alexa for voice control and notifications' }
    ],
    compatibility: ['Alexa', 'IFTTT'],
    rating: 4.7,
    reviewCount: 1245,
    recommended: true,
    recommendationReasons: ['Top rated', 'Easy installation'],
    affiliateUrl: 'https://example.com/ring-doorbell-4',
    commissionRate: 8,
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
  },
  {
    id: 'prod2',
    name: 'Nest Learning Thermostat',
    category: 'climate',
    subCategory: 'thermostats',
    description: 'Smart thermostat that learns your schedule and programs itself. The Nest Learning Thermostat adapts to your lifestyle, saving energy when you\'re away and maintaining comfort when you\'re home.',
    price: 249.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    brand: 'Google Nest',
    features: [
      { name: 'Auto-Schedule - learns the temperatures you like and creates a schedule' },
      { name: 'Home/Away Assist - adjusts temperature when you\'re away to save energy' },
      { name: 'Energy History - see how much energy you\'ve used and why' },
      { name: 'Remote control - adjust temperature from your phone, tablet, or laptop' },
      { name: 'Works with most HVAC systems' },
      { name: 'Farsight - lights up when it spots you across the room' }
    ],
    compatibility: ['Google Assistant', 'Alexa', 'IFTTT'],
    rating: 4.9,
    reviewCount: 1823,
    recommended: true,
    recommendationReasons: ['Energy efficient', 'Easy to use'],
    affiliateUrl: 'https://example.com/nest-thermostat',
    commissionRate: 7,
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
  },
  {
    id: 'prod3',
    name: 'Philips Hue Starter Kit',
    category: 'lighting',
    subCategory: 'light-bulbs',
    description: 'Smart lighting system with voice control and custom scenes. The Philips Hue system lets you control your lights via app or voice, set schedules, and create personalized lighting scenes.',
    price: 179.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    brand: 'Philips',
    features: [
      { name: 'Control lights via app or voice assistant' },
      { name: 'Create custom lighting scenes and routines' },
      { name: 'Set wake up and go to sleep schedules' },
      { name: 'Includes Bridge hub and three color-changing bulbs' },
      { name: '16 million colors and shades of white light' },
      { name: 'Syncs with music, games, and movies' }
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit', 'Samsung SmartThings'],
    rating: 4.5,
    reviewCount: 2340,
    recommended: true,
    recommendationReasons: ['Versatile', 'Wide compatibility'],
    affiliateUrl: 'https://example.com/philips-hue',
    commissionRate: 6,
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
  },
  {
    id: 'prod4',
    name: 'Amazon Echo Show 10',
    category: 'entertainment',
    subCategory: 'smart-speakers',
    description: 'Smart display with motion tracking and premium sound. The Echo Show 10 features a 10.1" HD screen that automatically rotates to face you, premium sound, and a built-in Zigbee hub.',
    price: 249.99,
    priceRange: 'premium',
    featuredImage: '/placeholder.svg',
    brand: 'Amazon',
    features: [
      { name: 'Motion tracking display that follows you as you move' },
      { name: 'Premium directional sound with dual front-firing tweeters and a powerful woofer' },
      { name: 'Built-in 13MP camera for video calls and home monitoring' },
      { name: 'Zigbee hub for connecting compatible smart home devices' },
      { name: 'Stream Netflix, Prime Video, music services, and more' },
      { name: 'Enhanced privacy controls including mic/camera off button and camera shutter' }
    ],
    compatibility: ['Alexa', 'Zigbee'],
    rating: 4.6,
    reviewCount: 983,
    recommended: true,
    recommendationReasons: ['Premium sound', 'Motion tracking'],
    affiliateUrl: 'https://example.com/echo-show-10',
    commissionRate: 8,
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
  }
];

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUserInfoForm, setShowUserInfoForm] = useState(false);
  
  const { trackEvent } = useUser();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('smartHomeUserData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
    
    console.log("ProductDetail mounted, loading product ID:", productId);
    
    const foundProduct = productsData.find(p => p.id === productId) || null;
    console.log("Found product:", foundProduct ? foundProduct.name : "Not found");
    
    setProduct(foundProduct);
    setLoading(false);
    
    if (foundProduct) {
      trackEvent({
        eventType: 'product_detail_view',
        productId: foundProduct.id,
        productName: foundProduct.name,
        source: 'product_detail_page',
        url: window.location.href
      });
    }
  }, [productId, trackEvent]);

  const handleCTAClick = () => {
    if (!product) return;
    
    trackEvent({
      eventType: 'product_click',
      productId: product.id,
      productName: product.name,
      source: 'product_detail_page',
      url: product.affiliateUrl || '',
    });
    
    toast.success(`Tracking click for ${product.name}`);
    
    setShowUserInfoForm(true);
  };

  const handleUserFormComplete = () => {
    setShowUserInfoForm(false);
    
    if (userData && product?.affiliateUrl) {
      window.open(product.affiliateUrl, '_blank');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-10">
        {loading ? (
          <ProductDetailSkeleton />
        ) : !product ? (
          <div className="container-custom">
            <ProductNotFound />
          </div>
        ) : (
          <div className="container-custom">
            <ProductBreadcrumbs productName={product.name} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
              <ProductImageDisplay image={product.featuredImage} name={product.name} />
              <ProductInfo product={product} onCTAClick={handleCTAClick} />
            </div>
            
            <ProductFeatures features={product.features} />
          </div>
        )}
      </main>
      
      <Footer />
      
      {showUserInfoForm && (
        <UserInfoForm
          onClose={() => setShowUserInfoForm(false)}
          onComplete={handleUserFormComplete}
          productName={product?.name}
          affiliateUrl={product?.affiliateUrl}
        />
      )}
    </div>
  );
};

export default ProductDetail;
