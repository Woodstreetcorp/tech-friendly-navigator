
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300 ease-apple ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link 
            to="/" 
            className="text-2xl font-semibold text-primary"
          >
            SmartHome<span className="text-foreground">Advisor</span>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`transition-colors hover:text-primary ${
                location.pathname === '/' ? 'text-primary font-medium' : 'text-foreground/80'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/recommendations" 
              className={`transition-colors hover:text-primary ${
                location.pathname === '/recommendations' ? 'text-primary font-medium' : 'text-foreground/80'
              }`}
            >
              Recommendations
            </Link>
            <Link 
              to="/talk-to-advisor" 
              className={`transition-colors hover:text-primary ${
                location.pathname === '/talk-to-advisor' ? 'text-primary font-medium' : 'text-foreground/80'
              }`}
            >
              Talk to an Advisor
            </Link>
            <Link 
              to="/about-us" 
              className={`transition-colors hover:text-primary ${
                location.pathname === '/about-us' ? 'text-primary font-medium' : 'text-foreground/80'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/talk-to-advisor" 
              className="py-2 px-4 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              Get Started
            </Link>
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-foreground p-2" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg animate-slide-down">
          <nav className="container-custom py-4 flex flex-col space-y-4">
            <Link 
              to="/" 
              className={`py-2 px-4 rounded-lg ${
                location.pathname === '/' ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <Link 
              to="/recommendations" 
              className={`py-2 px-4 rounded-lg ${
                location.pathname === '/recommendations' ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
              }`}
            >
              Recommendations
            </Link>
            <Link 
              to="/talk-to-advisor" 
              className={`py-2 px-4 rounded-lg ${
                location.pathname === '/talk-to-advisor' ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
              }`}
            >
              Talk to an Advisor
            </Link>
            <Link 
              to="/about-us" 
              className={`py-2 px-4 rounded-lg ${
                location.pathname === '/about-us' ? 'bg-primary/10 text-primary font-medium' : 'text-foreground'
              }`}
            >
              About Us
            </Link>
            <Link 
              to="/talk-to-advisor" 
              className="py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors text-center"
            >
              Get Started
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
