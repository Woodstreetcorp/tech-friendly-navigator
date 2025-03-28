
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { useRecommendationFilters } from '@/hooks/useRecommendationFilters';
import RecommendationFilters from '@/components/recommendations/RecommendationFilters';
import CategoryTabs from '@/components/recommendations/CategoryTabs';
import TopPicks from '@/components/recommendations/TopPicks';
import AdvisorCTA from '@/components/recommendations/AdvisorCTA';

const Recommendations = () => {
  const {
    recommendations,
    activeTab,
    filters,
    filteredProducts,
    showNoResults,
    handleTabChange,
    handleCompatibilityFilter,
    handleBrandFilter,
    handlePriceChange,
    handleContractFilter,
    resetFilters,
    getUniqueBrands,
    getCategoryCount,
    getActiveCategories,
    getServiceProviders
  } = useRecommendationFilters();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow pt-32 pb-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <Link 
                to="/" 
                className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors mb-4"
              >
                <ArrowLeft size={18} className="mr-1" />
                <span>Back to Home</span>
              </Link>
              
              <h1 className="text-3xl font-bold mb-2">Your Personalized Recommendations</h1>
              <p className="text-muted-foreground">
                Based on your preferences, we've selected the best smart home solutions for you.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <RecommendationFilters 
                filters={filters}
                uniqueBrands={getUniqueBrands()}
                onPriceChange={handlePriceChange}
                onCompatibilityFilter={handleCompatibilityFilter}
                onBrandFilter={handleBrandFilter}
                onContractFilter={handleContractFilter}
                onResetFilters={resetFilters}
              />
              
              <Link to="/talk-to-advisor">
                <Button className="flex items-center gap-2 bg-accent hover:bg-accent/90">
                  <Compass size={16} />
                  Get Expert Advice
                </Button>
              </Link>
            </div>
          </div>
          
          {recommendations?.topRecommendations && recommendations.topRecommendations.length > 0 && (
            <TopPicks topRecommendations={recommendations.topRecommendations} />
          )}
          
          <div className="mb-8">
            <CategoryTabs 
              activeTab={activeTab}
              onTabChange={handleTabChange}
              categoryCount={getCategoryCount}
              activeCategories={getActiveCategories()}
              filteredProducts={filteredProducts}
              showNoResults={showNoResults}
              onResetFilters={resetFilters}
            />
          </div>
          
          <AdvisorCTA />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Recommendations;
