
import { 
  allSmartHomeProducts, 
  getProductsByCategory, 
  getProductsBySubCategory, 
  getProductsByCompatibility,
  getProductsByPriceRange,
  SmartHomeProduct, 
  ProductCategory,
  ProductSubCategory,
  ProductCompatibility
} from '../data/smartHomeProducts';

type QuizAnswers = Record<string, any>;

type RecommendationScore = {
  product: SmartHomeProduct;
  score: number;
  matchReasons: string[];
};

// A more comprehensive recommendation engine that ranks products based on user preferences
export const generateRecommendations = (answers: QuizAnswers) => {
  console.log('Generating recommendations based on answers:', answers);
  
  // Ensure we have some products to work with
  const availableProducts = allSmartHomeProducts.length > 0 ? 
    [...allSmartHomeProducts] : 
    createFallbackProducts();
  
  // Store matching reasons for each product
  const productScores: RecommendationScore[] = [];
  
  // Step 1: Filter by basic compatibility and user requirements
  
  // If user selected specific product categories
  if (answers && answers['product-categories']?.length > 0) {
    const categories = answers['product-categories'] as ProductCategory[];
    const filteredProducts = availableProducts.filter(product => 
      categories.includes(product.category)
    );
    
    // Only use filtered products if we actually found some
    const eligibleProducts = filteredProducts.length > 0 ? filteredProducts : availableProducts;
    
    // Step 2: Calculate scores for each eligible product
    eligibleProducts.forEach(product => {
      scoreProduct(product, answers, productScores);
    });
  } else {
    // If no categories specified, score all products
    availableProducts.forEach(product => {
      scoreProduct(product, answers, productScores);
    });
  }
  
  // If we still don't have any scored products, add fallbacks with default scores
  if (productScores.length === 0) {
    console.log('No products matched criteria, adding all products with basic scores');
    availableProducts.forEach(product => {
      productScores.push({
        product,
        score: 50, // Default score
        matchReasons: ['General recommendation']
      });
    });
  }
  
  // Sort products by score (highest first)
  productScores.sort((a, b) => b.score - a.score);
  
  // Organize recommendations by category
  const recommendationsByCategory: Record<ProductCategory, RecommendationScore[]> = {
    'security': [],
    'locks': [],
    'lighting': [],
    'climate': [],
    'entertainment': [],
    'appliances': [],
    'energy': [],
    'hubs': [],
    'automation': [],
    'outdoor': []
  };
  
  // Group recommendations by category
  productScores.forEach(scoredProduct => {
    const category = scoredProduct.product.category;
    if (!recommendationsByCategory[category]) {
      recommendationsByCategory[category] = [];
    }
    recommendationsByCategory[category].push(scoredProduct);
  });
  
  // Create the final recommendation object
  const recommendations = {
    topRecommendations: productScores.slice(0, 5),
    recommendationsByCategory,
    quizAnswers: answers || {}
  };
  
  console.log('Generated recommendations:', recommendations);
  
  return recommendations;
};

// Helper function to score a product based on user answers
function scoreProduct(
  product: SmartHomeProduct, 
  answers: QuizAnswers, 
  productScores: RecommendationScore[]
) {
  let score = 0;
  const matchReasons: string[] = [];
  
  // Score based on subcategory preference
  if (answers && answers[`${product.category}-devices`]?.includes(product.subCategory)) {
    score += 40; // Highest weight - exact subcategory match
    matchReasons.push(`Matches your ${product.subCategory.replace(/-/g, ' ')} preference`);
  }
  
  // Score based on smart assistant preference
  if (answers && answers['smart-assistant'] && answers['smart-assistant'] !== 'no-preference') {
    const assistantMap: Record<string, ProductCompatibility> = {
      'alexa': 'Alexa',
      'google': 'Google Assistant',
      'apple': 'Apple HomeKit'
    };
    
    const preferredAssistant = assistantMap[answers['smart-assistant']];
    
    if (preferredAssistant && product.compatibility.includes(preferredAssistant)) {
      score += 20;
      matchReasons.push(`Works with your preferred ${preferredAssistant} assistant`);
    }
  }
  
  // Score based on installation preference
  if (answers && answers['installation']) {
    if (answers['installation'] === 'diy' && 
        (product.installationType === 'DIY' || product.installationType === 'Both')) {
      score += 15;
      matchReasons.push('Suitable for DIY installation');
    } else if (answers['installation'] === 'professional' && 
              (product.installationType === 'Professional' || product.installationType === 'Both')) {
      score += 15;
      matchReasons.push('Professional installation available');
    }
  }
  
  // Score based on contract preference
  if (answers && answers['contract-preference']) {
    if (answers['contract-preference'] === 'with-contract' && product.contractRequired) {
      score += 10;
      matchReasons.push('Includes contract as preferred');
    } else if (answers['contract-preference'] === 'no-contract' && !product.contractRequired) {
      score += 10;
      matchReasons.push('No contract required as preferred');
    }
  }
  
  // Score based on monitoring preference for security products
  if (product.category === 'security' && answers && answers['monitoring-preference']) {
    if (answers['monitoring-preference'] === 'self-monitored' && 
        !product.monthlySubscriptionRequired) {
      score += 15;
      matchReasons.push('Supports self-monitoring as preferred');
    } else if ((answers['monitoring-preference'] === 'professional' || 
               answers['monitoring-preference'] === 'both') && 
               product.monthlySubscription) {
      score += 15;
      matchReasons.push('Professional monitoring available');
    }
  }
  
  // Score based on budget
  if (answers && answers['budget']) {
    const budget = answers['budget'] as number;
    if (product.price <= budget) {
      // Higher scores for products that are closer to the budget without exceeding it
      const budgetUtilizationRatio = product.price / budget;
      // Optimal utilization is around 70-90% of budget
      if (budgetUtilizationRatio >= 0.7 && budgetUtilizationRatio <= 0.9) {
        score += 15;
        matchReasons.push('Excellent value within your budget');
      } else if (budgetUtilizationRatio < 0.5) {
        score += 10;
        matchReasons.push('Affordable option well under your budget');
      } else {
        score += 5;
        matchReasons.push('Fits within your budget');
      }
    }
  }
  
  // Bonus points for highly rated products
  if (product.rating >= 4.7) {
    score += 10;
    matchReasons.push('Highly rated by customers');
  } else if (product.rating >= 4.3) {
    score += 5;
    matchReasons.push('Well-rated by customers');
  }
  
  // Bonus points for recommended products
  if (product.recommended) {
    score += 10;
    matchReasons.push('Recommended by our experts');
  }
  
  // Ensure we have at least one match reason
  if (matchReasons.length === 0) {
    matchReasons.push('General recommendation');
  }
  
  // Store the score and reasons
  productScores.push({
    product,
    score: score > 0 ? score : 50, // Ensure a minimum score
    matchReasons
  });
}

// Function to create fallback products if none are available
function createFallbackProducts(): SmartHomeProduct[] {
  console.log('Creating fallback products');
  
  // Return a few basic products from different categories
  return [
    {
      id: 'fallback-security-1',
      name: 'Basic Security System',
      brand: 'SmartHome',
      category: 'security',
      subCategory: 'alarm-systems',
      description: 'A reliable security system for your home.',
      price: 199.99,
      priceRange: 'mid-range',
      featuredImage: '/placeholder.svg',
      installationType: 'DIY',
      contractRequired: false,
      monthlySubscriptionRequired: false,
      features: [{ name: 'Easy setup' }, { name: 'Mobile app control' }],
      compatibility: ['Alexa', 'Google Assistant'],
      rating: 4.5,
      reviewCount: 120,
      recommended: true,
      recommendationReasons: ['Popular choice', 'Easy to install'],
    },
    {
      id: 'fallback-lighting-1',
      name: 'Smart Light Bulb',
      brand: 'SmartHome',
      category: 'lighting',
      subCategory: 'light-bulbs',
      description: 'Energy-efficient smart light bulb.',
      price: 29.99,
      priceRange: 'budget',
      featuredImage: '/placeholder.svg',
      installationType: 'DIY',
      contractRequired: false,
      monthlySubscriptionRequired: false,
      features: [{ name: 'Voice control' }, { name: 'Color changing' }],
      compatibility: ['Alexa', 'Google Assistant', 'Apple HomeKit'],
      rating: 4.7,
      reviewCount: 350,
      recommended: true,
      recommendationReasons: ['Energy efficient', 'Easy to install'],
    },
    {
      id: 'fallback-climate-1',
      name: 'Smart Thermostat',
      brand: 'SmartHome',
      category: 'climate',
      subCategory: 'thermostats',
      description: 'Programmable smart thermostat for energy savings.',
      price: 149.99,
      priceRange: 'mid-range',
      featuredImage: '/placeholder.svg',
      installationType: 'DIY',
      contractRequired: false,
      monthlySubscriptionRequired: false,
      features: [{ name: 'Energy savings' }, { name: 'Remote control' }],
      compatibility: ['Alexa', 'Google Assistant'],
      rating: 4.6,
      reviewCount: 280,
      recommended: true,
      recommendationReasons: ['Energy saving', 'Easy to install'],
    }
  ];
}
