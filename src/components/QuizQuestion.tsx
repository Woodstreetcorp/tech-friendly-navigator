
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

export type QuestionOption = {
  id: string;
  label: string;
  value: string | number | boolean;
};

export type Question = {
  id: string;
  question: string;
  description?: string;
  type: 'single-select' | 'multi-select' | 'range';
  options?: QuestionOption[];
  min?: number;
  max?: number;
};

type QuizQuestionProps = {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
  onNext: () => void;
  currentValue: any;
};

const QuizQuestion = ({ question, onAnswer, onNext, currentValue }: QuizQuestionProps) => {
  const [selected, setSelected] = useState<any>(currentValue || (question.type === 'multi-select' ? [] : ''));
  const [isValid, setIsValid] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
    
    // Set validity based on selected values
    if (question.type === 'multi-select') {
      setIsValid(Array.isArray(selected) && selected.length > 0);
    } else if (question.type === 'range') {
      setIsValid(selected !== '');
    } else {
      setIsValid(!!selected);
    }
  }, [selected, question.type]);

  const handleSelectOption = (option: QuestionOption) => {
    if (question.type === 'multi-select') {
      // Toggle selection for multi-select
      const newSelected = Array.isArray(selected) 
        ? selected.includes(option.value) 
          ? selected.filter(val => val !== option.value) 
          : [...selected, option.value]
        : [option.value];
      
      setSelected(newSelected);
      onAnswer(question.id, newSelected);
    } else {
      // Single option selection
      setSelected(option.value);
      onAnswer(question.id, option.value);
    }
  };

  const handleRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setSelected(value);
    onAnswer(question.id, value);
  };

  const handleNext = () => {
    if (isValid) {
      onNext();
    }
  };

  return (
    <div className={`glass-card p-8 md:p-10 max-w-2xl mx-auto transition-all duration-500 ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-semibold mb-2">{question.question}</h3>
          {question.description && (
            <p className="text-muted-foreground">{question.description}</p>
          )}
        </div>

        <div className="space-y-4">
          {question.type === 'range' ? (
            <div className="space-y-4">
              <input 
                type="range" 
                min={question.min || 0} 
                max={question.max || 100} 
                value={selected || 0}
                onChange={handleRangeChange}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer focus:outline-none"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>${question.min || 0}</span>
                <span>${selected || 0}</span>
                <span>${question.max || 100}+</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {question.options?.map((option) => (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option)}
                  className={`
                    text-left p-4 rounded-xl border transition-all duration-200
                    ${(question.type === 'multi-select' && Array.isArray(selected) && selected.includes(option.value)) || selected === option.value
                      ? 'border-primary bg-primary/5 shadow-sm'
                      : 'border-border hover:border-primary/30 hover:bg-secondary/50'
                    }
                  `}
                >
                  <div className="flex items-center">
                    <div className={`
                      w-5 h-5 rounded-full mr-3 flex items-center justify-center
                      ${(question.type === 'multi-select' && Array.isArray(selected) && selected.includes(option.value)) || selected === option.value
                        ? 'bg-primary text-white'
                        : 'border border-muted-foreground/40'
                      }
                    `}>
                      {((question.type === 'multi-select' && Array.isArray(selected) && selected.includes(option.value)) || selected === option.value) && (
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5 2.5L3.5 7.5L1.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </div>
                    <span>{option.label}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pt-4">
          <button
            onClick={handleNext}
            disabled={!isValid}
            className={`
              flex items-center justify-center px-6 py-3 rounded-full text-white transition-all duration-200
              ${isValid ? 'bg-primary hover:bg-primary/90' : 'bg-muted-foreground/30 cursor-not-allowed'}
            `}
          >
            <span>Continue</span>
            <ChevronRight size={18} className="ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuizQuestion;
