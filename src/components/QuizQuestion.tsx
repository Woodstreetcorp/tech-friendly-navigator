import { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle } from 'lucide-react';

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
  maxSelections?: number;
  conditionalSelections?: {
    exclusive: string[];
    regular: string[];
  };
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

    // Clear error message when selection changes
    setErrorMessage(null);
  }, [selected, question.type]);

  const handleSelectOption = (option: QuestionOption) => {
    if (question.type === 'multi-select') {
      let newSelected: any[] = [];
      
      // Check if we have conditional selections
      if (question.conditionalSelections) {
        const { exclusive, regular } = question.conditionalSelections;
        const clickedValue = option.value.toString();
        
        // If clicking an exclusive option (like "Entire house")
        if (exclusive.includes(clickedValue)) {
          // If already selected, deselect it
          if (selected.includes(clickedValue)) {
            newSelected = [];
          } else {
            // Select only this exclusive option
            newSelected = [clickedValue];
          }
        } 
        // If clicking a regular option
        else if (regular.includes(clickedValue)) {
          // Start with current selection minus any exclusive options
          newSelected = selected.filter(item => !exclusive.includes(item));
          
          // Toggle the clicked option
          if (newSelected.includes(clickedValue)) {
            newSelected = newSelected.filter(val => val !== clickedValue);
          } else {
            newSelected = [...newSelected, clickedValue];
          }
        }
      } 
      // Regular multi-select handling
      else {
        if (!Array.isArray(selected)) {
          newSelected = [option.value];
        } else {
          // Check if the option is already selected
          const isOptionSelected = selected.includes(option.value);
          
          if (isOptionSelected) {
            // If already selected, just remove it
            newSelected = selected.filter(val => val !== option.value);
          } else {
            // If not selected and we're at max, show error but don't add
            if (question.maxSelections && selected.length >= question.maxSelections) {
              setErrorMessage(`You can only select up to ${question.maxSelections} options`);
              return;
            }
            // Otherwise add it
            newSelected = [...selected, option.value];
          }
        }
      }
      
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

  const isOptionSelected = (option: QuestionOption) => {
    if (question.type === 'multi-select' && Array.isArray(selected)) {
      return selected.includes(option.value);
    }
    return selected === option.value;
  };

  const isOptionDisabled = (option: QuestionOption) => {
    if (question.type === 'multi-select' && question.conditionalSelections) {
      const { exclusive, regular } = question.conditionalSelections;
      const optionValue = option.value.toString();
      
      // If any exclusive option is selected, disable regular options
      if (exclusive.some(val => selected.includes(val)) && regular.includes(optionValue)) {
        return true;
      }
      
      // If any regular option is selected, disable exclusive options
      if (regular.some(val => selected.includes(val)) && exclusive.includes(optionValue)) {
        return true;
      }
    }
    
    return false;
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

        {errorMessage && (
          <div className="bg-destructive/10 text-destructive rounded-lg p-3 flex items-start">
            <AlertCircle size={18} className="mr-2 mt-0.5 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}

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
              {question.options?.map((option) => {
                const isSelected = isOptionSelected(option);
                const isDisabled = isOptionDisabled(option);
                
                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(option)}
                    disabled={isDisabled}
                    className={`
                      text-left p-4 rounded-xl border transition-all duration-200
                      ${isSelected
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : isDisabled
                          ? 'border-border bg-muted cursor-not-allowed opacity-60'
                          : 'border-border hover:border-primary/30 hover:bg-secondary/50'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <div className={`
                        w-5 h-5 rounded-full mr-3 flex items-center justify-center
                        ${isSelected
                          ? 'bg-primary text-white'
                          : 'border border-muted-foreground/40'
                        }
                      `}>
                        {isSelected && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5 2.5L3.5 7.5L1.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        )}
                      </div>
                      <span>{option.label}</span>
                    </div>
                  </button>
                );
              })}
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
