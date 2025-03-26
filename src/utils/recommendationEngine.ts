import type { Product } from '../components/ProductCard';

// Sample product data - in a real app, this would come from a database or API
export const productData: Product[] = [
  {
    id: 'ring-alarm',
    name: 'Ring Alarm Security System',
    category: 'Security',
    subCategory: 'Smart Alarms',
    description: 'A comprehensive DIY security system with easy setup and optional professional monitoring.',
    price: 249.99,
    featuredImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Ring',
    features: [
      'DIY installation',
      'Optional professional monitoring',
      'Motion detection',
      'Door/window sensors',
      'Mobile app control'
    ],
    compatibility: ['Alexa', 'IFTTT'],
    rating: 4.5,
    reviewCount: 1243,
    ecosystems: ['amazon'],
    affiliateUrl: 'https://www.amazon.ca/dp/B07QPKGXZG',
    commissionRate: 5,
  },
  {
    id: 'nest-secure',
    name: 'Google Nest Secure Alarm System',
    category: 'Security',
    subCategory: 'Smart Alarms',
    description: 'A sleek, integrated security system with Nest Detect sensors and Google Assistant integration.',
    price: 399.99,
    featuredImage: 'https://images.unsplash.com/photo-1585367854901-b0672ded7e10?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Google',
    features: [
      'Integrated with Google ecosystem',
      'Nest Detect sensors for doors and windows',
      'Motion detection',
      'Voice control via Google Assistant',
      'Cellular backup'
    ],
    compatibility: ['Google Home', 'Nest'],
    ecosystems: ['google'],
    rating: 4.2,
    reviewCount: 892,
    affiliateUrl: 'https://store.google.com/ca/product/nest_secure_alarm_system',
    commissionRate: 4,
  },
  {
    id: 'ecobee-smart',
    name: 'ecobee SmartThermostat with Voice Control',
    category: 'Climate Control',
    subCategory: 'Smart Thermostats',
    description: 'Energy-saving smart thermostat with built-in Alexa and remote sensors for room-specific temperature control.',
    price: 249.99,
    featuredImage: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'ecobee',
    features: [
      'Room sensors for hot/cold spot detection',
      'Energy-saving features',
      'Built-in Alexa voice service',
      'HVAC monitoring',
      'Smart Home/Away detection'
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit', 'SmartThings'],
    ecosystems: ['amazon', 'google', 'apple'],
    rating: 4.7,
    reviewCount: 1589,
    affiliateUrl: 'https://www.amazon.ca/dp/B07NQVWRR3',
    commissionRate: 6,
  },
  {
    id: 'philips-hue',
    name: 'Philips Hue White and Color Ambiance Starter Kit',
    category: 'Lighting',
    subCategory: 'Smart Bulbs',
    description: 'Smart lighting system with wireless dimming and millions of colors to transform your home atmosphere.',
    price: 199.99,
    featuredImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Philips',
    features: [
      'Millions of colors and shades of white light',
      'App and voice control',
      'Create custom scenes',
      'Set timers and routines',
      'Control up to 10 lights with the included bridge'
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit', 'SmartThings'],
    ecosystems: ['amazon', 'google', 'apple'],
    rating: 4.8,
    reviewCount: 2345,
    affiliateUrl: 'https://www.amazon.ca/dp/B07QV9XLTK',
    commissionRate: 7,
  },
  {
    id: 'bell-smart-home',
    name: 'Bell Smart Home Security System',
    category: 'Security',
    subCategory: 'Smart Alarms',
    description: 'Professional installation and monitoring with integrated cameras and sensors for complete home protection.',
    price: 499.99,
    featuredImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Bell',
    features: [
      'Professional installation',
      '24/7 monitoring',
      'HD security cameras',
      'Door/window sensors',
      'Mobile app control',
      'Home automation integration'
    ],
    compatibility: ['Bell Smart Home App'],
    ecosystems: ['other'],
    rating: 4.1,
    reviewCount: 756,
    serviceProvider: 'bell',
  },
  {
    id: 'arlo-pro',
    name: 'Arlo Pro 4 Wireless Security Camera System',
    category: 'Security',
    subCategory: 'Smart Security Cameras',
    description: 'Wire-free HD security cameras with advanced features like 2K video, color night vision, and spotlight.',
    price: 549.99,
    featuredImage: 'https://images.unsplash.com/photo-1596207498818-c9572589cf53?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Arlo',
    features: [
      'Wire-free setup',
      '2K HDR video',
      'Color night vision',
      'Built-in spotlight',
      '160-degree viewing angle',
      'Two-way audio'
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit', 'IFTTT'],
    ecosystems: ['amazon', 'google', 'apple'],
    rating: 4.6,
    reviewCount: 1023,
    affiliateUrl: 'https://www.amazon.ca/dp/B08L7HVKP4',
    commissionRate: 8,
  },
  {
    id: 'august-smart-lock',
    name: 'August Wi-Fi Smart Lock',
    category: 'Security',
    subCategory: 'Smart Locks',
    description: 'Secure, keyless entry for your home with remote access and auto-lock/unlock features.',
    price: 229.99,
    featuredImage: 'https://images.unsplash.com/photo-1563466266967-21efbf9c0e09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'August',
    features: [
      'Auto-lock and unlock',
      'Remote access via Wi-Fi',
      'Activity monitoring',
      'Keyless entry',
      'Works with existing deadbolt',
      'DoorSense technology'
    ],
    compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit', 'SmartThings'],
    ecosystems: ['amazon', 'google', 'apple'],
    rating: 4.4,
    reviewCount: 879,
    affiliateUrl: 'https://www.amazon.ca/dp/B086HLZHPJ',
    commissionRate: 5,
  },
  {
    id: 'simplisafe',
    name: 'SimpliSafe Home Security System',
    category: 'Security',
    subCategory: 'Smart Alarms',
    description: 'Easy-to-install wireless security system with no long-term contracts and optional professional monitoring.',
    price: 299.99,
    featuredImage: 'https://images.unsplash.com/photo-1555954571-c87eda03be4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'SimpliSafe',
    features: [
      'DIY installation',
      'Optional professional monitoring',
      'No long-term contracts',
      'Cellular connection',
      'Battery backup',
      'Mobile app control'
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    ecosystems: ['amazon', 'google'],
    rating: 4.3,
    reviewCount: 1567,
    affiliateUrl: 'https://www.amazon.ca/dp/B08RZ1JNGT',
    commissionRate: 6,
  },
  {
    id: 'nest-thermostat',
    name: 'Google Nest Learning Thermostat',
    category: 'Climate Control',
    subCategory: 'Smart Thermostats',
    description: 'Self-learning thermostat that adapts to your schedule and preferences for optimal comfort and energy savings.',
    price: 329.99,
    featuredImage: 'https://images.unsplash.com/photo-1567789884554-0b844b597180?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Google',
    features: [
      'Learning capabilities',
      'Auto-schedule',
      'Energy history tracking',
      'Remote control via app',
      'Integrates with Nest ecosystem',
      'HVAC system monitoring'
    ],
    compatibility: ['Google Home', 'Nest', 'Alexa'],
    ecosystems: ['google', 'amazon'],
    rating: 4.6,
    reviewCount: 2789,
    affiliateUrl: 'https://www.amazon.ca/dp/B0131RG6VK',
    commissionRate: 5,
  },
  {
    id: 'sonos-one',
    name: 'Sonos One Smart Speaker',
    category: 'Entertainment',
    subCategory: 'Smart Speakers',
    description: 'Compact smart speaker with rich, room-filling sound and built-in voice assistants.',
    price: 249.99,
    featuredImage: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Sonos',
    features: [
      'Rich, full-spectrum sound',
      'Multi-room audio capabilities',
      'Voice control with Alexa or Google Assistant',
      'Humidity resistant for bathroom use',
      'Compact design'
    ],
    compatibility: ['Alexa', 'Google Assistant', 'AirPlay 2', 'Spotify Connect'],
    ecosystems: ['amazon', 'google', 'apple'],
    rating: 4.7,
    reviewCount: 1456,
    affiliateUrl: 'https://www.amazon.ca/dp/B075SGYYMN',
    commissionRate: 4,
  },
  {
    id: 'tp-link-kasa',
    name: 'TP-Link Kasa Smart Plug (4-Pack)',
    category: 'Power Management',
    subCategory: 'Smart Plugs',
    description: 'Turn any appliance into a smart device with these easy-to-use Wi-Fi plugs that require no hub.',
    price: 59.99,
    featuredImage: 'https://images.unsplash.com/photo-1633521161781-64dc4a95abb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'TP-Link',
    features: [
      'No hub required',
      'Schedule devices to turn on/off',
      'Away mode to simulate occupancy',
      'Voice control integration',
      'Energy monitoring'
    ],
    compatibility: ['Alexa', 'Google Assistant', 'SmartThings'],
    ecosystems: ['amazon', 'google'],
    rating: 4.5,
    reviewCount: 3245,
    affiliateUrl: 'https://www.amazon.ca/dp/B083J8RP6W',
    commissionRate: 7,
  },
  {
    id: 'roomba-i7',
    name: 'iRobot Roomba i7+',
    category: 'Cleaning',
    subCategory: 'Robot Vacuums',
    description: 'Self-emptying robot vacuum with advanced mapping and powerful suction for hassle-free cleaning.',
    price: 799.99,
    featuredImage: 'https://images.unsplash.com/photo-1546726747-421c6d69c929?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'iRobot',
    features: [
      'Automatic dirt disposal',
      'Smart mapping technology',
      'High-efficiency filter for allergies',
      'Scheduled cleaning',
      'Zone cleaning capability',
      'Voice control'
    ],
    compatibility: ['Alexa', 'Google Assistant'],
    ecosystems: ['amazon', 'google'],
    rating: 4.4,
    reviewCount: 1876,
    affiliateUrl: 'https://www.amazon.ca/dp/B07GNPDMRP',
    commissionRate: 5,
  },
  {
    id: 'rogers-smart-home',
    name: 'Rogers Smart Home Monitoring',
    category: 'Security',
    subCategory: 'Professional Systems',
    description: 'Comprehensive home security and monitoring solution with professional installation and 24/7 monitoring.',
    price: 599.99,
    featuredImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'Rogers',
    features: [
      'Professional installation',
      '24/7 monitoring',
      'Video surveillance',
      'Remote access and control',
      'Custom security packages',
      'Integration with other smart devices'
    ],
    compatibility: ['Rogers Smart Home App'],
    ecosystems: ['other'],
    rating: 4.0,
    reviewCount: 652,
    serviceProvider: 'rogers',
  },
  {
    id: 'telus-smarthome',
    name: 'TELUS SmartHome Security',
    category: 'Security',
    subCategory: 'Professional Systems',
    description: 'Integrated security and home automation with professional monitoring and maintenance.',
    price: 549.99,
    featuredImage: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    brand: 'TELUS',
    features: [
      'Professional installation',
      '24/7 monitoring',
      'Mobile app control',
      'Customizable security packages',
      'Video surveillance',
      'Smart home integration'
    ],
    compatibility: ['TELUS SmartHome App'],
    ecosystems: ['other'],
    rating: 4.2,
    reviewCount: 589,
    serviceProvider: 'telus',
  }
];

// Define product categories with subcategories for better organization
export const productCategories = {
  hubs: {
    name: 'Smart Hubs & Controllers',
    subcategories: ['Smart Home Hubs', 'Voice Assistants', 'Smart Displays']
  },
  lighting: {
    name: 'Smart Lighting',
    subcategories: ['Smart Bulbs', 'Smart Light Switches', 'Smart Light Strips']
  },
  security: {
    name: 'Smart Security',
    subcategories: ['Smart Security Cameras', 'Smart Doorbells', 'Smart Locks', 'Smart Alarms', 'Smart Sensors', 'Professional Systems']
  },
  climate: {
    name: 'Climate Control',
    subcategories: ['Smart Thermostats', 'Smart Air Conditioners', 'Smart Ceiling Fans', 'Smart Air Purifiers']
  },
  kitchen: {
    name: 'Smart Kitchen',
    subcategories: ['Smart Refrigerators', 'Smart Ovens', 'Smart Dishwashers', 'Smart Coffee Makers', 'Smart Microwaves']
  },
  cleaning: {
    name: 'Smart Cleaning',
    subcategories: ['Robot Vacuums', 'Robot Mops', 'Smart Washing Machines']
  },
  entertainment: {
    name: 'Smart Entertainment',
    subcategories: ['Smart TVs', 'Streaming Devices', 'Smart Speakers', 'Smart Projectors']
  },
  power: {
    name: 'Power Management',
    subcategories: ['Smart Plugs', 'Smart Power Strips']
  },
  blinds: {
    name: 'Smart Blinds & Curtains',
    subcategories: ['Smart Blinds', 'Smart Curtain Controllers']
  },
  garden: {
    name: 'Smart Garden',
    subcategories: ['Smart Sprinkler Systems', 'Smart Plant Sensors']
  },
  health: {
    name: 'Smart Health',
    subcategories: ['Smart Scales', 'Smart Air Quality Monitors', 'Smart Blood Pressure Monitors']
  },
  energy: {
    name: 'Energy Management',
    subcategories: ['Smart Meters', 'Smart Water Heaters', 'Smart Solar Panels']
  }
};

// Service providers data with detailed package information
export const serviceProviders = [
  {
    id: 'bell',
    name: 'Bell Smart Home',
    description: 'Professional home security and automation solutions with 24/7 monitoring.',
    locations: ['toronto', 'montreal', 'vancouver', 'calgary'],
    services: ['security', 'automation', 'professional-installation', 'monitoring'],
    website: 'https://bell.ca/smart-home',
    packages: [
      {
        name: 'Essential Security',
        price: 39.99,
        description: 'Basic security system with monitoring',
        features: [
          'Door/window sensors',
          '24/7 monitoring',
          'Mobile app access',
          'Motion sensor'
        ]
      },
      {
        name: 'Smart Security Plus',
        price: 49.99,
        description: 'Enhanced security with smart home integration',
        features: [
          'All Essential Security features',
          'Smart doorbell',
          'Smart lock compatibility',
          'Voice assistant integration'
        ]
      },
      {
        name: 'Total Home',
        price: 69.99,
        description: 'Complete security and automation package',
        features: [
          'All Smart Security Plus features',
          'Indoor/outdoor cameras',
          'Smart thermostat',
          'Smart lighting control',
          'Video monitoring'
        ]
      }
    ],
    compatibleEcosystems: ['amazon', 'google'],
    requiresContract: true,
    contractLength: 24, // months
    installationFee: 99.99
  },
  {
    id: 'rogers',
    name: 'Rogers Smart Home Monitoring',
    description: 'Integrated security and home automation with professional installation and monitoring.',
    locations: ['toronto', 'vancouver', 'calgary'],
    services: ['security', 'automation', 'professional-installation', 'monitoring'],
    website: 'https://rogers.com/home-security',
    packages: [
      {
        name: 'Starter',
        price: 34.99,
        description: 'Entry-level security system',
        features: [
          'Basic motion sensor',
          'Door/window sensors',
          'Mobile app access',
          '24/7 monitoring'
        ]
      },
      {
        name: 'Select',
        price: 44.99,
        description: 'Mid-tier security with added features',
        features: [
          'All Starter features',
          'Video doorbell',
          'Indoor camera',
          'Smart home integration'
        ]
      },
      {
        name: 'Premier',
        price: 59.99,
        description: 'Premium security and automation',
        features: [
          'All Select features',
          'Outdoor cameras',
          'Smart thermostat',
          'Smoke/CO detection',
          'Water leak detection'
        ]
      }
    ],
    compatibleEcosystems: ['amazon', 'google'],
    requiresContract: true,
    contractLength: 36, // months
    installationFee: 149.99
  },
  {
    id: 'telus',
    name: 'TELUS SmartHome Security',
    description: 'Comprehensive home security and automation services for Canadian homeowners.',
    locations: ['vancouver', 'calgary', 'toronto'],
    services: ['security', 'automation', 'professional-installation', 'monitoring'],
    website: 'https://telus.com/smarthome-security',
    packages: [
      {
        name: 'Secure',
        price: 32.99,
        description: 'Basic home security package',
        features: [
          'Control panel',
          'Door/window sensors',
          'Motion detector',
          '24/7 monitoring'
        ]
      },
      {
        name: 'Secure+',
        price: 42.99,
        description: 'Advanced security with video',
        features: [
          'All Secure features',
          'Indoor camera',
          'Video doorbell',
          'Mobile app control'
        ]
      },
      {
        name: 'Control',
        price: 52.99,
        description: 'Full security and home automation',
        features: [
          'All Secure+ features',
          'Smart lock integration',
          'Smart thermostat',
          'Lighting control',
          'Voice assistant compatibility'
        ]
      }
    ],
    compatibleEcosystems: ['amazon', 'google', 'apple'],
    requiresContract: true,
    contractLength: 36, // months
    installationFee: 99.99
  },
  {
    id: 'best-buy',
    name: 'Best Buy Home Advisor',
    description: 'Expert consultation and installation services for DIY smart home products.',
    locations: ['toronto', 'montreal', 'vancouver', 'calgary', 'other'],
    services: ['consultation', 'professional-installation', 'diy-products'],
    website: 'https://bestbuy.ca/en-ca/smart-home',
    packages: [
      {
        name: 'Smart Home Consultation',
        price: 49.99,
        description: 'Expert advice on smart home setup',
        features: [
          'In-home consultation',
          'Product recommendations',
          'System design',
          'Integration planning'
        ]
      },
      {
        name: 'Basic Installation',
        price: 99.99,
        description: 'Professional installation of basic devices',
        features: [
          'Installation of up to 5 devices',
          'Basic setup and configuration',
          'Network connectivity',
          'App setup assistance'
        ]
      },
      {
        name: 'Complete Smart Home Setup',
        price: 249.99,
        description: 'Full setup of a complete smart home system',
        features: [
          'Installation of up to 15 devices',
          'Advanced configuration',
          'Ecosystem integration',
          'User training',
          '30-day support'
        ]
      }
    ],
    compatibleEcosystems: ['amazon', 'google', 'apple', 'other'],
    requiresContract: false,
    contractLength: 0, // no contract
    installationFee: 0 // included in package prices
  },
];

export type UserAnswers = Record<string, any>;

export type RecommendationResult = {
  products: Product[];
  serviceProviders: typeof serviceProviders;
  quizAnswers: UserAnswers;
};

// Enhanced mapping of user goals to relevant product categories and subcategories
const goalToProductMapping: Record<string, {categories: string[], subcategories: string[]}> = {
  'security': {
    categories: ['Security'],
    subcategories: ['Smart Security Cameras', 'Smart Doorbells', 'Smart Locks', 'Smart Alarms', 'Smart Sensors', 'Professional Systems']
  },
  'energy': {
    categories: ['Climate Control', 'Lighting', 'Power Management', 'Energy Management'],
    subcategories: ['Smart Thermostats', 'Smart Light Switches', 'Smart Bulbs', 'Smart Meters', 'Smart Plugs']
  },
  'convenience': {
    categories: ['Hubs & Controllers', 'Security', 'Power Management'],
    subcategories: ['Smart Home Hubs', 'Voice Assistants', 'Smart Locks', 'Smart Plugs', 'Smart Light Switches']
  },
  'entertainment': {
    categories: ['Entertainment'],
    subcategories: ['Smart TVs', 'Streaming Devices', 'Smart Speakers', 'Smart Projectors']
  },
  'monitoring': {
    categories: ['Security', 'Climate Control', 'Health'],
    subcategories: ['Smart Security Cameras', 'Smart Sensors', 'Smart Air Quality Monitors']
  },
  'family-safety': {
    categories: ['Security', 'Health'],
    subcategories: ['Smart Alarms', 'Smart Security Cameras', 'Smart Sensors', 'Smart Air Quality Monitors']
  },
  'save-money': {
    categories: ['Climate Control', 'Lighting', 'Energy Management'],
    subcategories: ['Smart Thermostats', 'Smart Bulbs', 'Smart Light Switches', 'Smart Meters', 'Smart Plugs']
  }
};

// Function to generate recommendations based on user answers with enhanced logic
export const generateRecommendations = (answers: UserAnswers): RecommendationResult => {
  // Make a deep copy of the products to avoid mutating the original data
  let recommendedProducts = [...productData];
  let recommendedProviders = [...serviceProviders];
  
  // Initialize scoring system for products
  const productScores: Record<string, number> = {};
  recommendedProducts.forEach(product => {
    productScores[product.id] = 0;
  });
  
  // Filter products based on user goals with weighted scoring
  if (answers.goals && Array.isArray(answers.goals)) {
    const userGoals = answers.goals;
    
    // Create a set of all relevant categories and subcategories based on goals
    const relevantCategories = new Set<string>();
    const relevantSubcategories = new Set<string>();
    
    for (const goal of userGoals) {
      const mapping = goalToProductMapping[goal];
      if (mapping) {
        mapping.categories.forEach(category => relevantCategories.add(category));
        mapping.subcategories.forEach(subcategory => relevantSubcategories.add(subcategory));
      }
    }
    
    // Score products based on category and subcategory matches
    recommendedProducts.forEach(product => {
      // Category match (primary relevance)
      if (relevantCategories.has(product.category)) {
        productScores[product.id] += 5;
      }
      
      // Subcategory match (more specific relevance)
      if (product.subCategory && relevantSubcategories.has(product.subCategory)) {
        productScores[product.id] += 10;
      }
      
      // Feature matches
      for (const goal of userGoals) {
        const goalKeywords = getGoalKeywords(goal);
        for (const feature of product.features) {
          for (const keyword of goalKeywords) {
            if (feature.toLowerCase().includes(keyword)) {
              productScores[product.id] += 2;
            }
          }
        }
      }
    });
  }
  
  // Filter by installation preference with stronger weighting
  if (answers.installation) {
    if (answers.installation === 'diy') {
      // Boost DIY products
      recommendedProducts.forEach(product => {
        if (product.features.some(f => 
          f.toLowerCase().includes('diy') || 
          f.toLowerCase().includes('easy setup') ||
          f.toLowerCase().includes('self-install')
        )) {
          productScores[product.id] += 15;
        }
        
        // Penalize products from service providers that require professional installation
        if (product.serviceProvider) {
          productScores[product.id] -= 10;
        }
      });
      
      // Filter service providers to exclude professional installation only
      recommendedProviders = recommendedProviders.filter(provider => 
        provider.services.includes('diy-products')
      );
    } else if (answers.installation === 'professional') {
      // Boost products with professional installation
      recommendedProducts.forEach(product => {
        if (product.features.some(f => f.toLowerCase().includes('professional installation'))) {
          productScores[product.id] += 15;
        }
        
        // Boost products from service providers
        if (product.serviceProvider) {
          productScores[product.id] += 20;
        }
      });
      
      // Prioritize service providers that offer professional installation
      recommendedProviders = recommendedProviders.filter(provider => 
        provider.services.includes('professional-installation')
      );
    }
  }
  
  // Filter by ecosystem with strong preference
  if (answers.ecosystem && answers.ecosystem !== 'none') {
    recommendedProducts.forEach(product => {
      // Direct ecosystem match via the ecosystems property
      if (product.ecosystems && product.ecosystems.includes(answers.ecosystem)) {
        productScores[product.id] += 25; // Strong boost for ecosystem match
      }
      
      // Match via compatibility strings (less precise but still relevant)
      if (product.compatibility) {
        const ecosystemTerms = getEcosystemTerms(answers.ecosystem);
        for (const term of ecosystemTerms) {
          if (product.compatibility.some(c => c.toLowerCase().includes(term))) {
            productScores[product.id] += 15;
          }
        }
      }
    });
    
    // Filter service providers by ecosystem compatibility
    recommendedProviders = recommendedProviders.filter(provider => 
      provider.compatibleEcosystems && provider.compatibleEcosystems.includes(answers.ecosystem as string)
    );
  }
  
  // Filter by budget with graduated scoring
  if (answers.budget) {
    const budget = Number(answers.budget);
    
    // Filter out products that exceed the budget by more than 15%
    recommendedProducts = recommendedProducts.filter(product => 
      product.price <= budget * 1.15
    );
    
    // Score products based on budget alignment
    recommendedProducts.forEach(product => {
      // Perfect budget match (within 90-100% of budget)
      if (product.price >= budget * 0.9 && product.price <= budget) {
        productScores[product.id] += 15;
      } 
      // Good value (60-90% of budget)
      else if (product.price >= budget * 0.6 && product.price < budget * 0.9) {
        productScores[product.id] += 10;
      }
      // Budget option (under 60% of budget)
      else if (product.price < budget * 0.6) {
        productScores[product.id] += 5;
      }
      // Slightly over budget (100-115% of budget)
      else if (product.price > budget && product.price <= budget * 1.15) {
        productScores[product.id] -= 5;
      }
    });
    
    // Filter service provider packages based on budget
    recommendedProviders = recommendedProviders.map(provider => {
      // Filter packages to those within budget
      const affordablePackages = provider.packages.filter(pkg => pkg.price <= budget);
      
      // Only keep providers with at least one affordable package
      if (affordablePackages.length > 0) {
        return {
          ...provider,
          packages: affordablePackages,
          // Add a note about the best package within budget
          bestPackage: affordablePackages.reduce((best, current) => 
            current.price > best.price ? current : best, affordablePackages[0])
        };
      }
      return null;
    }).filter(Boolean) as typeof serviceProviders;
  }
  
  // Filter service providers by location
  if (answers['postal-code']) {
    recommendedProviders = recommendedProviders.filter(provider => 
      provider.locations.includes(answers['postal-code'])
    );
  }
  
  // Apply scores to determine recommendations
  recommendedProducts.forEach(product => {
    // Mark products as recommended if they score over a threshold
    // The threshold could be absolute or relative to the highest score
    const recommendationThreshold = Math.max(...Object.values(productScores)) * 0.7; // 70% of top score
    product.recommended = productScores[product.id] >= recommendationThreshold;
  });
  
  // Sort products by score (descending)
  recommendedProducts.sort((a, b) => 
    (productScores[b.id] || 0) - (productScores[a.id] || 0)
  );
  
  // Generate explanations for recommendations
  recommendedProducts = recommendedProducts.map(product => {
    // Add custom explanation property to help users understand the recommendations
    let explanationPoints = [];
    
    // Add explanation based on goals
    if (answers.goals && Array.isArray(answers.goals)) {
      for (const goal of answers.goals) {
        if (goalToProductMapping[goal] && 
            (goalToProductMapping[goal].categories.includes(product.category) || 
             (product.subCategory && goalToProductMapping[goal].subcategories.includes(product.subCategory)))) {
          explanationPoints.push(`Matches your ${goal.replace('-', ' ')} goal`);
          break; // One goal match explanation is enough
        }
      }
    }
    
    // Add explanation for ecosystem
    if (answers.ecosystem && answers.ecosystem !== 'none' && 
        product.ecosystems && product.ecosystems.includes(answers.ecosystem)) {
      explanationPoints.push(`Compatible with your ${getEcosystemName(answers.ecosystem)} devices`);
    }
    
    // Add explanation for budget
    if (answers.budget) {
      const budget = Number(answers.budget);
      if (product.price <= budget * 0.7) {
        explanationPoints.push('Great value for your budget');
      } else if (product.price <= budget) {
        explanationPoints.push('Fits within your budget');
      }
    }
    
    // Add explanation for installation preference
    if (answers.installation === 'diy' && 
        product.features.some(f => f.toLowerCase().includes('diy') || f.toLowerCase().includes('easy setup'))) {
      explanationPoints.push('Easy DIY installation');
    } else if (answers.installation === 'professional' && 
               product.features.some(f => f.toLowerCase().includes('professional'))) {
      explanationPoints.push('Professional installation available');
    }
    
    // Limit to top 2 reasons for clarity
    return {
      ...product,
      recommendationReasons: explanationPoints.slice(0, 2)
    };
  });
  
  return {
    products: recommendedProducts,
    serviceProviders: recommendedProviders,
    quizAnswers: answers
  };
};

// Helper function to get keywords related to each goal
function getGoalKeywords(goal: string): string[] {
  switch (goal) {
    case 'security':
      return ['security', 'monitoring', 'alert', 'detection', 'sensor', 'camera', 'alarm', 'protect'];
    case 'energy':
      return ['energy', 'efficient', 'saving', 'consumption', 'electricity', 'power', 'temperature'];
    case 'convenience':
      return ['convenient', 'easy', 'automate', 'control', 'voice', 'assistant', 'schedule'];
    case 'entertainment':
      return ['entertainment', 'music', 'video', 'stream', 'play', 'watch', 'listen'];
    case 'monitoring':
      return ['monitor', 'alert', 'notification', 'track', 'detect', 'sensor', 'camera'];
    case 'family-safety':
      return ['safety', 'protect', 'family', 'children', 'smoke', 'carbon', 'emergency', 'alert'];
    case 'save-money':
      return ['save', 'cost', 'efficient', 'budget', 'reduce', 'consumption', 'bill'];
    default:
      return [];
  }
}

// Helper function to get search terms for ecosystem compatibility
function getEcosystemTerms(ecosystem: string): string[] {
  switch (ecosystem) {
    case 'google':
      return ['google', 'nest', 'google assistant', 'google home', 'android'];
    case 'alexa':
      return ['alexa', 'amazon', 'echo'];
    case 'apple':
      return ['apple', 'homekit', 'siri', 'homepod', 'ios'];
    default:
      return [];
  }
}

// Helper function to get user-friendly ecosystem names
function getEcosystemName(ecosystem: string): string {
  switch (ecosystem) {
    case 'google':
      return 'Google Home';
    case 'alexa':
      return 'Amazon Alexa';
    case 'apple':
      return 'Apple HomeKit';
    default:
      return ecosystem;
  }
}
