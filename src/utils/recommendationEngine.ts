
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
  
  // Prefilter products based on essential criteria
  let eligibleProducts = [...allSmartHomeProducts];
  
  // Store matching reasons for each product
  const productScores: RecommendationScore[] = [];
  
  // Step 1: Filter by basic compatibility and user requirements
  
  // If user selected specific product categories
  if (answers['product-categories']?.length > 0) {
    const categories = answers['product-categories'] as ProductCategory[];
    eligibleProducts = eligibleProducts.filter(product => 
      categories.includes(product.category)
    );
  }
  
  // Step 2: Calculate scores for each eligible product
  eligibleProducts.forEach(product => {
    let score = 0;
    const matchReasons: string[] = [];
    
    // Score based on subcategory preference
    if (answers[`${product.category}-devices`]?.includes(product.subCategory)) {
      score += 40; // Highest weight - exact subcategory match
      matchReasons.push(`Matches your ${product.subCategory.replace(/-/g, ' ')} preference`);
    }
    
    // Score based on smart assistant preference
    if (answers['smart-assistant'] && answers['smart-assistant'] !== 'no-preference') {
      const assistantMap: Record<string, ProductCompatibility> = {
        'alexa': 'Alexa',
        'google': 'Google Assistant',
        'apple': 'Apple HomeKit'
      };
      
      const preferredAssistant = assistantMap[answers['smart-assistant']];
      
      if (product.compatibility.includes(preferredAssistant)) {
        score += 20;
        matchReasons.push(`Works with your preferred ${preferredAssistant} assistant`);
      }
    }
    
    // Score based on installation preference
    if (answers['installation']) {
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
    if (answers['contract-preference']) {
      if (answers['contract-preference'] === 'with-contract' && product.contractRequired) {
        score += 10;
        matchReasons.push('Includes contract as preferred');
      } else if (answers['contract-preference'] === 'no-contract' && !product.contractRequired) {
        score += 10;
        matchReasons.push('No contract required as preferred');
      }
    }
    
    // Score based on monitoring preference for security products
    if (product.category === 'security' && answers['monitoring-preference']) {
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
    if (answers['budget']) {
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
      } else {
        // Penalize products that exceed budget, but don't eliminate them
        score -= 20;
        matchReasons.push('Exceeds your budget but included for comparison');
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
    
    // Store the score and reasons
    productScores.push({
      product,
      score,
      matchReasons
    });
  });
  
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
  
  // Group top recommendations by category
  productScores.forEach(scoredProduct => {
    const category = scoredProduct.product.category;
    recommendationsByCategory[category].push(scoredProduct);
  });
  
  // Create the final recommendation object with at least some fallback data
  const recommendations = {
    topRecommendations: productScores.slice(0, 5),
    recommendationsByCategory,
    quizAnswers: answers
  };
  
  // Make sure to have at least some recommendations if quiz data was insufficient
  if (productScores.length === 0) {
    console.log('No products matched quiz criteria, adding fallback recommendations');
    const fallbackProducts = allSmartHomeProducts.filter(p => p.recommended).slice(0, 5);
    
    fallbackProducts.forEach(product => {
      const fallbackScore: RecommendationScore = {
        product,
        score: 50,
        matchReasons: ['General recommendation based on popularity']
      };
      
      recommendations.topRecommendations.push(fallbackScore);
      recommendationsByCategory[product.category].push(fallbackScore);
    });
  }
  
  console.log('Generated recommendations:', recommendations);
  
  return recommendations;
};
