
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import QuizQuestion, { Question } from './QuizQuestion';
import { generateRecommendations } from '../utils/recommendationEngine';
import { toast } from 'sonner';

const quizQuestions: Question[] = [
  {
    id: 'living-situation',
    question: 'What type of home do you live in?',
    description: 'This helps us recommend solutions that work for your space.',
    type: 'single-select',
    options: [
      { id: 'detached', label: 'Detached House', value: 'detached' },
      { id: 'semi-detached', label: 'Semi-detached', value: 'semi-detached' },
      { id: 'townhouse', label: 'Townhouse', value: 'townhouse' },
      { id: 'condo', label: 'Condo/Apartment', value: 'condo' },
      { id: 'other', label: 'Other', value: 'other' },
    ],
  },
  {
    id: 'ownership',
    question: 'Do you own or rent your home?',
    type: 'single-select',
    options: [
      { id: 'own', label: 'I own it', value: 'own' },
      { id: 'rent', label: 'I rent it', value: 'rent' },
      { id: 'not-sure', label: 'I\'m not sure', value: 'not-sure' },
    ],
  },
  {
    id: 'home-size',
    question: 'What is the size of your home?',
    type: 'single-select',
    options: [
      { id: 'small', label: 'Less than 1,000 sq. ft.', value: 'small' },
      { id: 'medium', label: '1,000–2,000 sq. ft.', value: 'medium' },
      { id: 'large', label: 'Over 2,000 sq. ft.', value: 'large' },
    ],
  },
  {
    id: 'current-providers',
    question: 'Which service providers are you currently using?',
    description: 'This helps us find bundle discounts that may be available to you.',
    type: 'provider-services',
    options: [
      { 
        id: 'telus', 
        label: 'TELUS', 
        value: 'telus',
        services: [
          { id: 'internet', label: 'Home Internet', value: 'internet' },
          { id: 'tv', label: 'TV Services', value: 'tv' },
          { id: 'phone', label: 'Home Phone', value: 'phone' },
          { id: 'mobile', label: 'Mobile Phone', value: 'mobile' },
          { id: 'security', label: 'Home Security', value: 'security' }
        ]
      },
      { 
        id: 'bell', 
        label: 'Bell', 
        value: 'bell',
        services: [
          { id: 'internet', label: 'Home Internet', value: 'internet' },
          { id: 'tv', label: 'TV Services', value: 'tv' },
          { id: 'phone', label: 'Home Phone', value: 'phone' },
          { id: 'mobile', label: 'Mobile Phone', value: 'mobile' },
          { id: 'security', label: 'Home Security', value: 'security' }
        ]
      },
      { 
        id: 'rogers', 
        label: 'Rogers', 
        value: 'rogers',
        services: [
          { id: 'internet', label: 'Home Internet', value: 'internet' },
          { id: 'tv', label: 'TV Services', value: 'tv' },
          { id: 'phone', label: 'Home Phone', value: 'phone' },
          { id: 'mobile', label: 'Mobile Phone', value: 'mobile' },
          { id: 'security', label: 'Home Security', value: 'security' }
        ]
      },
      { 
        id: 'shaw', 
        label: 'Shaw', 
        value: 'shaw',
        services: [
          { id: 'internet', label: 'Home Internet', value: 'internet' },
          { id: 'tv', label: 'TV Services', value: 'tv' },
          { id: 'phone', label: 'Home Phone', value: 'phone' }
        ]
      },
      { 
        id: 'videotron', 
        label: 'Videotron', 
        value: 'videotron',
        services: [
          { id: 'internet', label: 'Home Internet', value: 'internet' },
          { id: 'tv', label: 'TV Services', value: 'tv' },
          { id: 'phone', label: 'Home Phone', value: 'phone' },
          { id: 'mobile', label: 'Mobile Phone', value: 'mobile' }
        ]
      },
      { id: 'none', label: 'None of these providers', value: 'none' }
    ],
  },
  {
    id: 'product-categories',
    question: 'Which smart home product categories are you most interested in?',
    description: 'Select up to 4 categories that interest you most.',
    type: 'multi-select',
    maxSelections: 4,
    options: [
      { id: 'security', label: 'Smart Home Security Systems', value: 'security' },
      { id: 'locks', label: 'Smart Locks and Access Control', value: 'locks' },
      { id: 'lighting', label: 'Smart Lighting and Switches', value: 'lighting' },
      { id: 'climate', label: 'Smart Climate Control Systems', value: 'climate' },
      { id: 'entertainment', label: 'Smart Entertainment Systems', value: 'entertainment' },
      { id: 'appliances', label: 'Smart Appliances and Cleaning Devices', value: 'appliances' },
      { id: 'energy', label: 'Smart Energy and Water Management', value: 'energy' },
      { id: 'hubs', label: 'Smart Home Hubs and Controllers', value: 'hubs' },
      { id: 'automation', label: 'Smart Home Automation and Monitoring', value: 'automation' },
      { id: 'outdoor', label: 'Smart Outdoor and Garden Devices', value: 'outdoor' },
    ],
  },
  {
    id: 'security-devices',
    question: 'Which security devices are you most interested in?',
    description: 'Select up to 3 options that interest you most.',
    type: 'multi-select',
    maxSelections: 3,
    showIf: answers => answers['product-categories']?.includes('security'),
    options: [
      { id: 'alarm-systems', label: 'Smart Alarm Systems', value: 'alarm-systems' },
      { id: 'video-doorbells', label: 'Video Doorbell Cameras', value: 'video-doorbells' },
      { id: 'security-cameras', label: 'Smart Security Cameras', value: 'security-cameras' },
      { id: 'motion-sensors', label: 'Smart Motion Sensors', value: 'motion-sensors' },
      { id: 'glass-break', label: 'Glass Break Sensors', value: 'glass-break' },
      { id: 'door-window', label: 'Door and Window Sensors', value: 'door-window' },
      { id: 'smoke-co', label: 'Smart Smoke & CO Detectors', value: 'smoke-co' },
    ],
  },
  {
    id: 'locks-access',
    question: 'Which smart locks or access control devices interest you?',
    description: 'Select up to 2 options that interest you most.',
    type: 'multi-select',
    maxSelections: 2,
    showIf: answers => answers['product-categories']?.includes('locks'),
    options: [
      { id: 'door-locks', label: 'Smart Door Locks', value: 'door-locks' },
      { id: 'garage-openers', label: 'Smart Garage Door Openers', value: 'garage-openers' },
      { id: 'keyless-entry', label: 'Keyless Entry Systems', value: 'keyless-entry' },
    ],
  },
  {
    id: 'lighting-devices',
    question: 'Which smart lighting products interest you?',
    description: 'Select up to 3 options that interest you most.',
    type: 'multi-select',
    maxSelections: 3,
    showIf: answers => answers['product-categories']?.includes('lighting'),
    options: [
      { id: 'light-bulbs', label: 'Smart Light Bulbs', value: 'light-bulbs' },
      { id: 'light-switches', label: 'Smart Light Switches and Dimmers', value: 'light-switches' },
      { id: 'smart-plugs', label: 'Smart Plugs and Outlets', value: 'smart-plugs' },
    ],
  },
  {
    id: 'climate-devices',
    question: 'Which climate control devices interest you?',
    description: 'Select up to 3 options that interest you most.',
    type: 'multi-select',
    maxSelections: 3,
    showIf: answers => answers['product-categories']?.includes('climate'),
    options: [
      { id: 'thermostats', label: 'Smart Thermostats', value: 'thermostats' },
      { id: 'ac-fans', label: 'Smart Air Conditioners and Fans', value: 'ac-fans' },
      { id: 'humidifiers', label: 'Smart Humidifiers and Dehumidifiers', value: 'humidifiers' },
      { id: 'air-purifiers', label: 'Smart Air Purifiers', value: 'air-purifiers' },
    ],
  },
  {
    id: 'entertainment-devices',
    question: 'Which entertainment devices interest you?',
    description: 'Select up to 3 options that interest you most.',
    type: 'multi-select',
    maxSelections: 3,
    showIf: answers => answers['product-categories']?.includes('entertainment'),
    options: [
      { id: 'smart-tvs', label: 'Smart TVs', value: 'smart-tvs' },
      { id: 'streaming-devices', label: 'Smart Streaming Devices', value: 'streaming-devices' },
      { id: 'smart-speakers', label: 'Smart Speakers and Voice Assistants', value: 'smart-speakers' },
      { id: 'soundbars', label: 'Smart Soundbars and Home Audio', value: 'soundbars' },
    ],
  },
  {
    id: 'appliance-devices',
    question: 'Which smart appliances interest you?',
    description: 'Select up to 3 options that interest you most.',
    type: 'multi-select',
    maxSelections: 3,
    showIf: answers => answers['product-categories']?.includes('appliances'),
    options: [
      { id: 'vacuum-cleaners', label: 'Smart Vacuum Cleaners', value: 'vacuum-cleaners' },
      { id: 'dishwashers', label: 'Smart Dishwashers', value: 'dishwashers' },
      { id: 'washing-machines', label: 'Smart Washing Machines and Dryers', value: 'washing-machines' },
      { id: 'ovens-microwaves', label: 'Smart Ovens and Microwaves', value: 'ovens-microwaves' },
      { id: 'refrigerators', label: 'Smart Refrigerators', value: 'refrigerators' },
    ],
  },
  {
    id: 'energy-devices',
    question: 'Which energy management devices interest you?',
    description: 'Select up to 2 options that interest you most.',
    type: 'multi-select',
    maxSelections: 2,
    showIf: answers => answers['product-categories']?.includes('energy'),
    options: [
      { id: 'leak-detectors', label: 'Smart Water Leak Detectors', value: 'leak-detectors' },
      { id: 'sprinkler-systems', label: 'Smart Sprinkler Systems', value: 'sprinkler-systems' },
      { id: 'power-strips', label: 'Smart Power Strips and Surge Protectors', value: 'power-strips' },
    ],
  },
  {
    id: 'hubs-devices',
    question: 'Which hub controllers interest you?',
    description: 'Select up to 2 options that interest you most.',
    type: 'multi-select',
    maxSelections: 2,
    showIf: answers => answers['product-categories']?.includes('hubs'),
    options: [
      { id: 'home-hubs', label: 'Smart Home Hubs', value: 'home-hubs' },
      { id: 'remote-controls', label: 'Universal Smart Remote Controls', value: 'remote-controls' },
    ],
  },
  {
    id: 'outdoor-devices',
    question: 'Which outdoor smart devices interest you?',
    description: 'Select up to 2 options that interest you most.',
    type: 'multi-select',
    maxSelections: 2,
    showIf: answers => answers['product-categories']?.includes('outdoor'),
    options: [
      { id: 'outdoor-cameras', label: 'Smart Outdoor Cameras', value: 'outdoor-cameras' },
      { id: 'outdoor-lights', label: 'Smart Outdoor Lights', value: 'outdoor-lights' },
      { id: 'lawn-mowers', label: 'Smart Lawn Mowers', value: 'lawn-mowers' },
    ],
  },
  {
    id: 'smart-assistant',
    question: 'Which smart home assistant ecosystem do you prefer?',
    type: 'single-select',
    options: [
      { id: 'alexa', label: 'Amazon Alexa', value: 'alexa' },
      { id: 'google', label: 'Google Assistant', value: 'google' },
      { id: 'apple', label: 'Apple HomeKit/Siri', value: 'apple' },
      { id: 'no-preference', label: 'No preference', value: 'no-preference' },
    ],
  },
  {
    id: 'installation',
    question: 'How would you prefer to install your smart home system?',
    type: 'single-select',
    options: [
      { id: 'diy', label: 'I\'ll install it myself (DIY)', value: 'diy' },
      { id: 'professional', label: 'I prefer professional installation', value: 'professional' },
      { id: 'not-sure', label: 'I\'m not sure yet', value: 'not-sure' },
    ],
  },
  {
    id: 'monitoring-preference',
    question: 'For security devices, what type of monitoring do you prefer?',
    type: 'single-select',
    showIf: answers => answers['product-categories']?.includes('security'),
    options: [
      { id: 'self-monitored', label: 'Self-monitored (alerts on my phone)', value: 'self-monitored' },
      { id: 'professional', label: 'Professional 24/7 monitoring', value: 'professional' },
      { id: 'both', label: 'Both self and professional monitoring', value: 'both' },
      { id: 'not-sure', label: 'Not sure yet', value: 'not-sure' },
    ],
  },
  {
    id: 'contract-preference',
    question: 'Do you prefer a service with or without a contract?',
    type: 'single-select',
    options: [
      { id: 'with-contract', label: 'With contract (may have lower monthly fees)', value: 'with-contract' },
      { id: 'no-contract', label: 'No contract (more flexibility)', value: 'no-contract' },
      { id: 'no-preference', label: 'No preference', value: 'no-preference' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your overall budget for smart home products?',
    description: 'Drag the slider to set your budget range.',
    type: 'range',
    min: 200,
    max: 3000,
  },
  {
    id: 'timeline',
    question: 'How soon are you looking to install your smart home system?',
    type: 'single-select',
    options: [
      { id: 'immediately', label: 'Immediately', value: 'immediately' },
      { id: 'month', label: 'Within the next month', value: 'month' },
      { id: 'researching', label: 'Just researching', value: 'researching' },
    ],
  },
  {
    id: 'postal-code',
    question: 'What\'s your postal code?',
    description: 'This helps us recommend local service providers.',
    type: 'single-select',
    options: [
      { id: 'toronto', label: 'Toronto Area (M5V)', value: 'toronto' },
      { id: 'vancouver', label: 'Vancouver Area (V6B)', value: 'vancouver' },
      { id: 'montreal', label: 'Montreal Area (H2Y)', value: 'montreal' },
      { id: 'calgary', label: 'Calgary Area (T2P)', value: 'calgary' },
      { id: 'other', label: 'Other Canadian Location', value: 'other' },
    ],
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [progress, setProgress] = useState(0);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Filter questions based on previous answers
    const filtered = quizQuestions.filter(question => {
      if (!question.showIf) return true;
      return question.showIf(answers);
    });
    
    setFilteredQuestions(filtered);
  }, [answers]);

  useEffect(() => {
    // Calculate progress based on filtered questions
    const currentIndex = filteredQuestions.findIndex(q => q.id === currentQuestion?.id);
    setProgress(((currentIndex + 1) / filteredQuestions.length) * 100);
  }, [currentQuestionIndex, filteredQuestions]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    const currentIndex = filteredQuestions.findIndex(q => q.id === currentQuestion?.id);
    
    if (currentIndex < filteredQuestions.length - 1) {
      const nextQuestionId = filteredQuestions[currentIndex + 1].id;
      const nextIndex = quizQuestions.findIndex(q => q.id === nextQuestionId);
      setCurrentQuestionIndex(nextIndex);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      completeQuiz();
    }
  };

  const handleBack = () => {
    const currentIndex = filteredQuestions.findIndex(q => q.id === currentQuestion?.id);
    
    if (currentIndex > 0) {
      const prevQuestionId = filteredQuestions[currentIndex - 1].id;
      const prevIndex = quizQuestions.findIndex(q => q.id === prevQuestionId);
      setCurrentQuestionIndex(prevIndex);
    }
  };

  const completeQuiz = () => {
    try {
      const recommendations = generateRecommendations(answers);
      
      localStorage.setItem('smartHomeRecommendations', JSON.stringify(recommendations));
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      
      toast.success("Your personalized recommendations are ready!");
      
      navigate('/recommendations');
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast.error("We encountered an error generating your recommendations. Please try again.");
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="pb-20 pt-32 px-4">
      <div className="container-custom mb-8">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Question {filteredQuestions.findIndex(q => q.id === currentQuestion?.id) + 1} of {filteredQuestions.length}</span>
            <span className="font-medium">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary transition-all duration-500 ease-apple" 
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {filteredQuestions.findIndex(q => q.id === currentQuestion?.id) > 0 && (
        <div className="container-custom mb-6">
          <div className="max-w-2xl mx-auto">
            <button 
              onClick={handleBack}
              className="flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} className="mr-1" />
              <span>Back</span>
            </button>
          </div>
        </div>
      )}

      <div className="container-custom">
        {currentQuestion && (
          <QuizQuestion
            question={currentQuestion}
            onAnswer={handleAnswer}
            onNext={handleNext}
            currentValue={answers[currentQuestion.id]}
          />
        )}
      </div>
    </div>
  );
};

export default Quiz;
