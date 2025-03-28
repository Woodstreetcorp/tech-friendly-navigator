export type ProductFeature = {
  name: string;
  description?: string;
}

export type ProductCompatibility = 
  'Alexa' | 'Google Assistant' | 'Apple HomeKit' | 'Samsung SmartThings' | 
  'Z-Wave' | 'Zigbee' | 'IFTTT' | 'Thread' | 'Matter' | 'Hubitat' | 
  'Home Assistant' | 'Wink' | 'Control4' | 'Crestron' | 'Bluetooth' | 
  'Wi-Fi' | 'Vera' | 'Insteon';

export type ProductCategory = 
  'security' | 'locks' | 'lighting' | 'climate' | 'entertainment' | 
  'appliances' | 'energy' | 'hubs' | 'automation' | 'outdoor';

export type ProductSubCategory = 
  'alarm-systems' | 'video-doorbells' | 'security-cameras' | 'motion-sensors' | 'glass-break' | 
  'door-window' | 'smoke-co' | 'door-locks' | 'garage-openers' | 'keyless-entry' | 
  'light-bulbs' | 'light-switches' | 'smart-plugs' | 'thermostats' | 'ac-fans' | 
  'humidifiers' | 'air-purifiers' | 'smart-tvs' | 'streaming-devices' | 'smart-speakers' | 
  'soundbars' | 'vacuum-cleaners' | 'dishwashers' | 'washing-machines' | 'ovens-microwaves' | 
  'refrigerators' | 'leak-detectors' | 'sprinkler-systems' | 'power-strips' | 'home-hubs' | 
  'remote-controls' | 'automation-platforms' | 'smart-sensors' | 'outdoor-cameras' | 
  'outdoor-lights' | 'lawn-mowers';

export type SmartHomeProduct = {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory;
  subCategory: ProductSubCategory;
  description: string;
  price: number;
  priceRange: 'budget' | 'mid-range' | 'premium';
  featuredImage: string;
  installationType: 'DIY' | 'Professional' | 'Both';
  contractRequired: boolean;
  contractLength?: number; // in months
  monthlySubscription?: number;
  monthlySubscriptionRequired: boolean;
  features: ProductFeature[];
  compatibility: ProductCompatibility[];
  rating: number;
  reviewCount: number;
  recommended?: boolean;
  recommendationReasons?: string[];
  affiliateUrl?: string;
  commissionRate?: number;
  serviceProvider?: string;
};

// Security - Alarm Systems
const alarmSystems: SmartHomeProduct[] = [
  {
    id: 'simplisafe-alarm',
    name: 'SimpliSafe Home Security System',
    brand: 'SimpliSafe',
    category: 'security',
    subCategory: 'alarm-systems',
    description: 'Easy-to-install DIY home security system with optional professional monitoring and no long-term contracts.',
    price: 249.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscription: 14.99,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'DIY installation in under 30 minutes' },
      { name: 'Optional professional monitoring for $14.99-$24.99/month' },
      { name: 'No long-term contracts required' },
      { name: 'Environmental monitoring for smoke/CO/leaks' },
      { name: 'Cellular backup included' },
      { name: 'Battery backup during power outages' },
      { name: 'Mobile app control' },
      { name: 'Works with Alexa and Google Assistant' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.8,
    reviewCount: 12850,
    recommended: true,
    recommendationReasons: ['No contracts required', 'Easy DIY installation', 'Affordable monitoring'],
    affiliateUrl: 'https://example.com/simplisafe',
    commissionRate: 7,
  },
  {
    id: 'ring-alarm',
    name: 'Ring Alarm Security System',
    brand: 'Ring',
    category: 'security',
    subCategory: 'alarm-systems',
    description: 'Affordable DIY security system that integrates seamlessly with Ring cameras and video doorbells.',
    price: 199.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscription: 20.00,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'Easy DIY installation' },
      { name: 'Optional professional monitoring for $20/month' },
      { name: 'No long-term contracts' },
      { name: 'Fully integrates with Ring cameras and doorbells' },
      { name: 'Works with Alexa for voice control' },
      { name: 'Cellular backup included with Ring Protect Plus' },
      { name: 'Battery backup during power outages' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.7,
    reviewCount: 9870,
    recommended: true,
    recommendationReasons: ['Seamless Ring ecosystem', 'No contracts', 'Affordable pricing'],
    affiliateUrl: 'https://example.com/ring-alarm',
    commissionRate: 8,
  },
  {
    id: 'adt-control',
    name: 'ADT Command and Control Security System',
    brand: 'ADT',
    category: 'security',
    subCategory: 'alarm-systems',
    description: 'Professional security system with 24/7 monitoring and advanced home automation features.',
    price: 599.99,
    priceRange: 'premium',
    featuredImage: '/placeholder.svg',
    installationType: 'Professional',
    contractRequired: true,
    contractLength: 36,
    monthlySubscription: 45.99,
    monthlySubscriptionRequired: true,
    features: [
      { name: 'Professional installation included' },
      { name: '24/7 professional monitoring' },
      { name: 'Advanced home automation features' },
      { name: 'Touchscreen control panel' },
      { name: 'Video surveillance integration' },
      { name: 'Environmental monitoring for smoke/CO/floods' },
      { name: 'Remote arm/disarm via mobile app' }
    ],
    compatibility: ['Alexa', 'Z-Wave'],
    rating: 4.6,
    reviewCount: 7560,
    recommended: false,
    affiliateUrl: 'https://example.com/adt-security',
    commissionRate: 10,
  }
];

// Security - Video Doorbell Cameras
const videoDoorbells: SmartHomeProduct[] = [
  {
    id: 'ring-doorbell-4',
    name: 'Ring Video Doorbell 4',
    brand: 'Ring',
    category: 'security',
    subCategory: 'video-doorbells',
    description: 'Battery-powered video doorbell with 1080p HD video, two-way talk, and advanced motion detection.',
    price: 199.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscription: 3.99,
    monthlySubscriptionRequired: false,
    features: [
      { name: '1080p HD video with improved video quality' },
      { name: 'Color Pre-Roll captures 4 seconds before motion is detected' },
      { name: 'Dual-band WiFi connectivity' },
      { name: 'Improved motion detection with customizable motion zones' },
      { name: 'Two-way talk with noise cancellation' },
      { name: 'Quick replies with pre-selected messages' },
      { name: 'Battery-powered with optional hardwiring' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.7,
    reviewCount: 14500,
    recommended: true,
    recommendationReasons: ['Top rated', 'Reliable performance', 'Easy installation'],
    affiliateUrl: 'https://example.com/ring-doorbell',
    commissionRate: 8,
  },
  {
    id: 'nest-doorbell',
    name: 'Google Nest Doorbell (Battery)',
    brand: 'Google Nest',
    category: 'security',
    subCategory: 'video-doorbells',
    description: 'Smart doorbell with battery operation, intelligent alerts, and 3-hour event video history.',
    price: 179.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscription: 6.00,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'Battery-powered or wired installation' },
      { name: 'HD video with HDR and night vision' },
      { name: 'Intelligent alerts (person, package, animal, vehicle)' },
      { name: '3-hour event video history without subscription' },
      { name: 'Two-way audio with noise cancellation' },
      { name: 'Wireless chime compatibility' },
      { name: 'Works with Google Assistant and Nest displays' }
    ],
    compatibility: ['Google Assistant'],
    rating: 4.6,
    reviewCount: 10200,
    recommended: true,
    recommendationReasons: ['Smart AI detection', 'Free video history', 'Google ecosystem'],
    affiliateUrl: 'https://example.com/nest-doorbell',
    commissionRate: 7,
  },
  {
    id: 'eufy-doorbell',
    name: 'Eufy Security Video Doorbell',
    brand: 'Eufy',
    category: 'security',
    subCategory: 'video-doorbells',
    description: 'Wire-free video doorbell with 2K resolution and local storage (no subscription required).',
    price: 169.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
    features: [
      { name: '2K resolution for clear video quality' },
      { name: 'Local storage with no monthly fees' },
      { name: 'AI detection for humans only (reduces false alarms)' },
      { name: 'Wire-free with up to 180 days battery life' },
      { name: 'Two-way audio communication' },
      { name: 'Activity zones to focus on important areas' },
      { name: 'Works with Alexa and Google Assistant' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.5,
    reviewCount: 8750,
    recommended: true,
    recommendationReasons: ['No subscription required', 'Long battery life', '2K resolution'],
    affiliateUrl: 'https://example.com/eufy-doorbell',
    commissionRate: 6,
  }
];

// Security - Security Cameras
const securityCameras: SmartHomeProduct[] = [
  {
    id: 'ring-indoor-cam',
    name: 'Ring Indoor Cam',
    brand: 'Ring',
    category: 'security',
    subCategory: 'security-cameras',
    description: 'Compact indoor security camera with 1080p HD video, two-way talk, and night vision.',
    price: 59.99,
    priceRange: 'budget',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscription: 3.99,
    monthlySubscriptionRequired: false,
    features: [
      { name: '1080p HD video quality' },
      { name: 'Live view and two-way talk' },
      { name: 'Night vision for clear recording in darkness' },
      { name: 'Motion-activated notifications' },
      { name: 'Compatible with Ring Alarm system' },
      { name: 'Compact design fits anywhere' },
      { name: 'Plugs into standard power outlet' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.7,
    reviewCount: 9650,
    recommended: true,
    recommendationReasons: ['Affordable', 'Easy to use', 'Reliable'],
    affiliateUrl: 'https://example.com/ring-indoor',
    commissionRate: 7,
  },
  {
    id: 'arlo-pro-4',
    name: 'Arlo Pro 4 Wireless Security Camera',
    brand: 'Arlo',
    category: 'security',
    subCategory: 'security-cameras',
    description: 'Wire-free 2K HDR security camera with color night vision and 160° viewing angle.',
    price: 199.99,
    priceRange: 'premium',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscription: 9.99,
    monthlySubscriptionRequired: false,
    features: [
      { name: '2K video with HDR for enhanced clarity' },
      { name: 'Color night vision for identifying details in darkness' },
      { name: 'Wire-free installation with rechargeable battery' },
      { name: 'Built-in spotlight for color night vision' },
      { name: '160° viewing angle covers more area' },
      { name: 'Two-way audio with noise-cancelling microphone' },
      { name: 'Advanced object detection (people, vehicles, packages)' }
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit'],
    rating: 4.8,
    reviewCount: 11200,
    recommended: true,
    recommendationReasons: ['Superior video quality', 'Wide compatibility', 'Advanced AI detection'],
    affiliateUrl: 'https://example.com/arlo-pro',
    commissionRate: 9,
  },
  {
    id: 'wyze-cam-v3',
    name: 'Wyze Cam v3',
    brand: 'Wyze',
    category: 'security',
    subCategory: 'security-cameras',
    description: 'Affordable indoor/outdoor security camera with color night vision and IP65 weather resistance.',
    price: 35.99,
    priceRange: 'budget',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscription: 1.99,
    monthlySubscriptionRequired: false,
    features: [
      { name: '1080p HD video with starlight sensor' },
      { name: 'Color night vision in low light conditions' },
      { name: 'IP65 weather resistance for indoor/outdoor use' },
      { name: 'Person detection with Cam Plus subscription' },
      { name: 'Local storage via microSD card' },
      { name: '14-day free cloud storage for motion events' },
      { name: 'Two-way audio for communication' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.6,
    reviewCount: 18500,
    recommended: true,
    recommendationReasons: ['Extremely affordable', 'Color night vision', 'Indoor/outdoor use'],
    affiliateUrl: 'https://example.com/wyze-cam',
    commissionRate: 5,
  }
];

// Smart Thermostats
const smartThermostats: SmartHomeProduct[] = [
  {
    id: 'nest-thermostat',
    name: 'Google Nest Learning Thermostat',
    brand: 'Google Nest',
    category: 'climate',
    subCategory: 'thermostats',
    description: 'Smart thermostat that learns your schedule and programs itself to help save energy.',
    price: 249.99,
    priceRange: 'premium',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'Auto-Schedule learns your preferred temperatures' },
      { name: "Home/Away Assist adjusts when nobody's home" },
      { name: 'Farsight displays time, temperature or weather' },
      { name: 'Energy History shows how much energy you use' },
      { name: 'Easy setup with step-by-step guidance' },
      { name: 'Remote control via the Nest app' },
      { name: 'Guides you to energy-efficient temperatures' }
    ],
    compatibility: ['Google Assistant', 'Alexa'],
    rating: 4.7,
    reviewCount: 20500,
    recommended: true,
    recommendationReasons: ['Learning capabilities', 'Energy savings', 'Premium design'],
    affiliateUrl: 'https://example.com/nest-thermostat',
    commissionRate: 8,
  },
  {
    id: 'ecobee-smart',
    name: 'ecobee SmartThermostat with Voice Control',
    brand: 'ecobee',
    category: 'climate',
    subCategory: 'thermostats',
    description: 'WiFi thermostat with built-in Alexa voice control and includes a SmartSensor for more comfortable homes.',
    price: 249.99,
    priceRange: 'premium',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'Built-in Alexa voice control' },
      { name: 'SmartSensor included for room temperature balancing' },
      { name: 'Energy-saving eco+ features' },
      { name: 'Dual-band WiFi connectivity' },
      { name: 'Smart Home/Away detection' },
      { name: 'Spotify Connect & Bluetooth streaming' },
      { name: 'Vivid touch display with intuitive controls' }
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit'],
    rating: 4.8,
    reviewCount: 15800,
    recommended: true,
    recommendationReasons: ['Room sensors included', 'Wide compatibility', 'Built-in Alexa'],
    affiliateUrl: 'https://example.com/ecobee',
    commissionRate: 7,
  },
  {
    id: 'honeywell-t9',
    name: 'Honeywell Home T9 Smart Thermostat',
    brand: 'Honeywell',
    category: 'climate',
    subCategory: 'thermostats',
    description: 'Smart thermostat with smart room sensors to deliver the right temperature to the right room at the right time.',
    price: 199.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'Multi-room focus with smart room sensors' },
      { name: 'Room sensors detect temperature, humidity and occupancy' },
      { name: 'Geofencing automatically adjusts when you leave or arrive' },
      { name: 'Adaptive recovery learns how long to reach target temperature' },
      { name: 'ENERGY STAR certified' },
      { name: 'Flexible scheduling options' },
      { name: 'Filter change reminders' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.5,
    reviewCount: 9200,
    recommended: true,
    recommendationReasons: ['Room sensors available', 'Good value', 'Reliable performance'],
    affiliateUrl: 'https://example.com/honeywell-t9',
    commissionRate: 6,
  }
];

// Smart Lighting - Light Bulbs
const smartLightBulbs: SmartHomeProduct[] = [
  {
    id: 'philips-hue-starter',
    name: 'Philips Hue White and Color Starter Kit',
    brand: 'Philips Hue',
    category: 'lighting',
    subCategory: 'light-bulbs',
    description: 'Smart lighting system with Bridge hub and three color-changing bulbs for customizable ambiance.',
    price: 179.99,
    priceRange: 'premium',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'Full color spectrum with 16 million colors' },
      { name: 'Control via Hue app or voice assistants' },
      { name: 'Create custom scenes and routines' },
      { name: 'Set wake up and sleep schedules' },
      { name: 'Control lights away from home' },
      { name: 'Integration with entertainment systems' },
      { name: 'Hue Bridge included for full functionality' }
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit'],
    rating: 4.8,
    reviewCount: 24500,
    recommended: true,
    recommendationReasons: ['Industry leader', 'Reliable ecosystem', 'Wide integration options'],
    affiliateUrl: 'https://example.com/philips-hue',
    commissionRate: 7,
  },
  {
    id: 'lifx-color',
    name: 'LIFX Color A19 Smart Bulb',
    brand: 'LIFX',
    category: 'lighting',
    subCategory: 'light-bulbs',
    description: 'Wi-Fi enabled smart bulb with 16 million colors, no hub required.',
    price: 49.99,
    priceRange: 'mid-range',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'No hub required - connects directly to WiFi' },
      { name: '1100 lumens brightness with 16 million colors' },
      { name: 'Energy efficient (9W, equivalent to 60W)' },
      { name: 'Dimmable from 1% to 100%' },
      { name: 'Set schedules and timers' },
      { name: 'Group bulbs for synchronization' },
      { name: 'Works with voice assistants and IFTTT' }
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit'],
    rating: 4.6,
    reviewCount: 12800,
    recommended: true,
    recommendationReasons: ['No hub needed', 'Vibrant colors', 'Simple setup'],
    affiliateUrl: 'https://example.com/lifx',
    commissionRate: 6,
  },
  {
    id: 'kasa-smart-bulb',
    name: 'TP-Link Kasa Smart Light Bulb',
    brand: 'TP-Link',
    category: 'lighting',
    subCategory: 'light-bulbs',
    description: 'Affordable smart bulb with millions of colors and no hub required.',
    price: 14.99,
    priceRange: 'budget',
    featuredImage: '/placeholder.svg',
    installationType: 'DIY',
    contractRequired: false,
    monthlySubscriptionRequired: false,
    features: [
      { name: 'No hub required - connects to WiFi' },
      { name: 'Dimmable with millions of colors' },
      { name: 'Group control with other Kasa devices' },
      { name: 'Schedule lights to turn on/off automatically' },
      { name: 'Energy usage tracking via Kasa app' },
      { name: 'Voice control with Alexa and Google Assistant' },
      { name: 'Away mode randomizes light patterns' }
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    rating: 4.5,
    reviewCount: 18900,
    recommended: true,
    recommendationReasons: ['Budget-friendly', 'No hub required', 'Reliable performance'],
    affiliateUrl: 'https://example.com/kasa-bulb',
    commissionRate: 5,
  }
];

// Combining all products
export const allSmartHomeProducts: SmartHomeProduct[] = [
  ...alarmSystems,
  ...videoDoorbells,
  ...securityCameras,
  ...smartThermostats,
  ...smartLightBulbs,
  // Add others as needed
];

// Helper function to filter products by category
export const getProductsByCategory = (category: ProductCategory): SmartHomeProduct[] => {
  return allSmartHomeProducts.filter(product => product.category === category);
};

// Helper function to filter products by subcategory
export const getProductsBySubCategory = (subCategory: ProductSubCategory): SmartHomeProduct[] => {
  return allSmartHomeProducts.filter(product => product.subCategory === subCategory);
};

// Helper function to get products by compatibility
export const getProductsByCompatibility = (compatibilities: ProductCompatibility[]): SmartHomeProduct[] => {
  return allSmartHomeProducts.filter(product => 
    compatibilities.some(compatibility => product.compatibility.includes(compatibility))
  );
};

// Helper function to filter products by price range
export const getProductsByPriceRange = (min: number, max: number): SmartHomeProduct[] => {
  return allSmartHomeProducts.filter(product => product.price >= min && product.price <= max);
};

// Helper function to get recommended products
export const getRecommendedProducts = (): SmartHomeProduct[] => {
  return allSmartHomeProducts.filter(product => product.recommended);
};
