
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
    id: 'goals',
    question: 'What are your main goals with smart home tech?',
    description: 'Select all that apply to you.',
    type: 'multi-select',
    options: [
      { id: 'security', label: 'Security (cameras, alarms, sensors)', value: 'security' },
      { id: 'energy', label: 'Energy Efficiency (thermostats, lighting)', value: 'energy' },
      { id: 'convenience', label: 'Convenience (automation, voice control)', value: 'convenience' },
      { id: 'entertainment', label: 'Entertainment (audio/video systems)', value: 'entertainment' },
      { id: 'monitoring', label: 'Remote Monitoring (while away)', value: 'monitoring' },
      { id: 'family-safety', label: 'Family Safety (smoke detection, panic buttons)', value: 'family-safety' },
      { id: 'save-money', label: 'Save money on utilities', value: 'save-money' },
    ],
  },
  {
    id: 'specific-features',
    question: 'Which specific features are most important to you?',
    description: 'Select all that are important.',
    type: 'multi-select',
    options: [
      { id: 'voice-control', label: 'Voice Control', value: 'voice-control' },
      { id: 'mobile-app', label: 'Mobile App Control', value: 'mobile-app' },
      { id: 'energy-monitoring', label: 'Energy Usage Monitoring', value: 'energy-monitoring' },
      { id: 'video-surveillance', label: 'Video Surveillance', value: 'video-surveillance' },
      { id: 'motion-detection', label: 'Motion Detection', value: 'motion-detection' },
      { id: 'remote-access', label: 'Remote Access', value: 'remote-access' },
      { id: 'automated-routines', label: 'Automated Routines & Schedules', value: 'automated-routines' },
      { id: 'smart-alerts', label: 'Smart Alerts & Notifications', value: 'smart-alerts' },
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
    id: 'ecosystem',
    question: 'Do you already use any smart home products or platforms?',
    type: 'single-select',
    options: [
      { id: 'google', label: 'Google Home', value: 'google' },
      { id: 'alexa', label: 'Amazon Alexa', value: 'alexa' },
      { id: 'apple', label: 'Apple HomeKit', value: 'apple' },
      { id: 'other', label: 'Ring / Nest / Ecobee / Other', value: 'other' },
      { id: 'none', label: 'None yet', value: 'none' },
    ],
  },
  {
    id: 'device-preference',
    question: 'Which smart devices are you most interested in?',
    description: 'Select all that interest you.',
    type: 'multi-select',
    options: [
      { id: 'hubs', label: 'Smart Hubs & Controllers', value: 'hubs' },
      { id: 'lighting', label: 'Smart Lighting', value: 'lighting' },
      { id: 'security', label: 'Security Devices (Cameras, Sensors)', value: 'security' },
      { id: 'climate', label: 'Climate Control (Thermostats, HVAC)', value: 'climate' },
      { id: 'entertainment', label: 'Entertainment Devices', value: 'entertainment' },
      { id: 'kitchen', label: 'Kitchen Appliances', value: 'kitchen' },
      { id: 'cleaning', label: 'Cleaning Devices (Robot Vacuums)', value: 'cleaning' },
    ],
  },
  {
    id: 'budget',
    question: 'What\'s your budget for smart home setup?',
    description: 'Drag the slider to set your budget range.',
    type: 'range',
    min: 200,
    max: 2000,
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
    id: 'monitoring-preference',
    question: 'If you\'re interested in security, what type of monitoring do you prefer?',
    type: 'single-select',
    options: [
      { id: 'self-monitored', label: 'Self-monitored (alerts on my phone)', value: 'self-monitored' },
      { id: 'professional', label: 'Professional 24/7 monitoring', value: 'professional' },
      { id: 'both', label: 'Both self and professional monitoring', value: 'both' },
      { id: 'not-applicable', label: 'Not applicable / Not sure', value: 'not-applicable' },
    ],
  },
  {
    id: 'areas',
    question: 'Which areas of your home are you most interested in upgrading?',
    description: 'Select all that apply to you.',
    type: 'multi-select',
    options: [
      { id: 'entryway', label: 'Front door / Entryway', value: 'entryway' },
      { id: 'living-areas', label: 'Living room / Kitchen', value: 'living-areas' },
      { id: 'outdoor', label: 'Backyard / Outdoor', value: 'outdoor' },
      { id: 'garage', label: 'Garage', value: 'garage' },
      { id: 'whole-house', label: 'Entire house', value: 'whole-house' },
    ],
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
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate progress percentage
    setProgress(((currentQuestionIndex) / quizQuestions.length) * 100);
  }, [currentQuestionIndex]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Quiz completed
      completeQuiz();
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const completeQuiz = () => {
    try {
      const recommendations = generateRecommendations(answers);
      
      // Store recommendations in localStorage for the recommendations page
      localStorage.setItem('smartHomeRecommendations', JSON.stringify(recommendations));
      localStorage.setItem('quizAnswers', JSON.stringify(answers));
      
      toast.success("Your personalized recommendations are ready!");
      
      // Navigate to recommendations page
      navigate('/recommendations');
    } catch (error) {
      console.error("Error generating recommendations:", error);
      toast.error("We encountered an error generating your recommendations. Please try again.");
    }
  };

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <div className="pb-20 pt-32 px-4">
      {/* Progress bar */}
      <div className="container-custom mb-8">
        <div className="max-w-2xl mx-auto space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Question {currentQuestionIndex + 1} of {quizQuestions.length}</span>
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

      {/* Back button */}
      {currentQuestionIndex > 0 && (
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

      {/* Current question */}
      <div className="container-custom">
        <QuizQuestion
          question={currentQuestion}
          onAnswer={handleAnswer}
          onNext={handleNext}
          currentValue={answers[currentQuestion.id]}
        />
      </div>
    </div>
  );
};

export default Quiz;
