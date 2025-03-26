
import type { Product } from '../components/ProductCard';

// Sample product data - in a real app, this would come from a database or API
export const productData: Product[] = [
  {
    id: 'ring-alarm',
    name: 'Ring Alarm Security System',
    category: 'Security',
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
  },
  {
    id: 'nest-secure',
    name: 'Google Nest Secure Alarm System',
    category: 'Security',
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
    rating: 4.2,
    reviewCount: 892,
  },
  {
    id: 'ecobee-smart',
    name: 'ecobee SmartThermostat with Voice Control',
    category: 'Climate Control',
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
    rating: 4.7,
    reviewCount: 1589,
  },
  {
    id: 'philips-hue',
    name: 'Philips Hue White and Color Ambiance Starter Kit',
    category: 'Lighting',
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
    rating: 4.8,
    reviewCount: 2345,
  },
  {
    id: 'bell-smart-home',
    name: 'Bell Smart Home Security System',
    category: 'Security',
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
    rating: 4.1,
    reviewCount: 756,
  },
  {
    id: 'arlo-pro',
    name: 'Arlo Pro 4 Wireless Security Camera System',
    category: 'Security Cameras',
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
    rating: 4.6,
    reviewCount: 1023,
  },
  {
    id: 'august-smart-lock',
    name: 'August Wi-Fi Smart Lock',
    category: 'Smart Locks',
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
    rating: 4.4,
    reviewCount: 879,
  },
  {
    id: 'simplisafe',
    name: 'SimpliSafe Home Security System',
    category: 'Security',
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
    rating: 4.3,
    reviewCount: 1567,
  },
];

// Service providers data
export const serviceProviders = [
  {
    id: 'bell',
    name: 'Bell Smart Home',
    description: 'Professional home security and automation solutions with 24/7 monitoring.',
    locations: ['toronto', 'montreal', 'vancouver', 'calgary'],
    services: ['security', 'automation', 'professional-installation', 'monitoring'],
    website: 'https://bell.ca/smart-home',
  },
  {
    id: 'rogers',
    name: 'Rogers Smart Home Monitoring',
    description: 'Integrated security and home automation with professional installation and monitoring.',
    locations: ['toronto', 'vancouver', 'calgary'],
    services: ['security', 'automation', 'professional-installation', 'monitoring'],
    website: 'https://rogers.com/home-security',
  },
  {
    id: 'telus',
    name: 'TELUS SmartHome Security',
    description: 'Comprehensive home security and automation services for Canadian homeowners.',
    locations: ['vancouver', 'calgary', 'toronto'],
    services: ['security', 'automation', 'professional-installation', 'monitoring'],
    website: 'https://telus.com/smarthome-security',
  },
  {
    id: 'best-buy',
    name: 'Best Buy Home Advisor',
    description: 'Expert consultation and installation services for DIY smart home products.',
    locations: ['toronto', 'montreal', 'vancouver', 'calgary', 'other'],
    services: ['consultation', 'professional-installation', 'diy-products'],
    website: 'https://bestbuy.ca/en-ca/smart-home',
  },
];

export type UserAnswers = Record<string, any>;

export type RecommendationResult = {
  products: Product[];
  serviceProviders: typeof serviceProviders;
  quizAnswers: UserAnswers;
};

// Function to generate recommendations based on user answers
export const generateRecommendations = (answers: UserAnswers): RecommendationResult => {
  // Make a deep copy of the products to avoid mutating the original data
  let recommendedProducts = [...productData];
  let recommendedProviders = [...serviceProviders];
  
  // Filter products based on user preferences
  if (answers.goals) {
    // For multi-select, check if any of the selected goals match product categories
    const goalMapping: Record<string, string[]> = {
      'security': ['Security', 'Security Cameras', 'Smart Locks'],
      'energy': ['Climate Control', 'Lighting'],
      'convenience': ['Smart Locks', 'Voice Assistants'],
      'entertainment': ['Entertainment'],
      'monitoring': ['Security Cameras', 'Security'],
      'family-safety': ['Security', 'Climate Control'],
      'save-money': ['Climate Control', 'Lighting']
    };
    
    const relevantCategories = new Set<string>();
    for (const goal of answers.goals) {
      const categories = goalMapping[goal] || [];
      categories.forEach(category => relevantCategories.add(category));
    }
    
    // Filter products by relevant categories
    if (relevantCategories.size > 0) {
      recommendedProducts = recommendedProducts.filter(product => 
        relevantCategories.has(product.category)
      );
    }
  }
  
  // Filter by installation preference
  if (answers.installation === 'diy') {
    // Prefer DIY products
    recommendedProducts = recommendedProducts.filter(product => 
      !product.name.includes('Bell Smart Home') && // Filter out professional-only systems
      !product.name.includes('Rogers Smart Home Monitoring')
    );
    
    // Filter service providers to exclude professional installation only
    recommendedProviders = recommendedProviders.filter(provider => 
      provider.services.includes('diy-products')
    );
  } else if (answers.installation === 'professional') {
    // Mark professional installation products as recommended
    recommendedProducts = recommendedProducts.map(product => ({
      ...product,
      recommended: product.features.some(f => f.toLowerCase().includes('professional')) || 
                   product.brand === 'Bell' ||
                   product.brand === 'Rogers' ||
                   product.brand === 'TELUS'
    }));
    
    // Prioritize service providers that offer professional installation
    recommendedProviders = recommendedProviders.filter(provider => 
      provider.services.includes('professional-installation')
    );
  }
  
  // Filter by ecosystem
  if (answers.ecosystem && answers.ecosystem !== 'none') {
    const ecosystemMapping: Record<string, string[]> = {
      'google': ['Google', 'Google Home', 'Nest'],
      'alexa': ['Alexa', 'Amazon'],
      'apple': ['Apple HomeKit', 'HomeKit'],
      'other': [] // No filtering for "other"
    };
    
    const compatibilityTerms = ecosystemMapping[answers.ecosystem] || [];
    
    if (compatibilityTerms.length > 0) {
      // Prioritize products compatible with the selected ecosystem
      recommendedProducts = recommendedProducts.map(product => ({
        ...product,
        recommended: product.compatibility.some(c => 
          compatibilityTerms.some(term => c.includes(term))
        ) || product.recommended
      }));
    }
  }
  
  // Filter by budget
  if (answers.budget) {
    const budget = Number(answers.budget);
    
    // Filter out products that exceed the budget
    recommendedProducts = recommendedProducts.filter(product => 
      product.price <= budget
    );
    
    // Mark products that are within 80% of the budget as recommended
    // This helps highlight the best value propositions
    recommendedProducts = recommendedProducts.map(product => ({
      ...product,
      recommended: product.price <= (budget * 0.8) || product.recommended
    }));
  }
  
  // Filter service providers by location
  if (answers['postal-code']) {
    recommendedProviders = recommendedProviders.filter(provider => 
      provider.locations.includes(answers['postal-code'])
    );
  }
  
  // Sort recommended products to the top
  recommendedProducts.sort((a, b) => {
    if (a.recommended && !b.recommended) return -1;
    if (!a.recommended && b.recommended) return 1;
    return 0;
  });
  
  return {
    products: recommendedProducts,
    serviceProviders: recommendedProviders,
    quizAnswers: answers
  };
};
