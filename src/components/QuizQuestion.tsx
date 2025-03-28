
import { useState, useEffect } from 'react';
import { ChevronRight, AlertCircle, PlusCircle, Check } from 'lucide-react';

export type QuestionOption = {
  id: string;
  label: string;
  value: string | number | boolean;
  services?: Array<{
    id: string;
    label: string;
    value: string;
  }>;
};

export type Question = {
  id: string;
  question: string;
  description?: string;
  type: 'single-select' | 'multi-select' | 'range' | 'provider-services';
  options?: QuestionOption[];
  min?: number;
  max?: number;
  maxSelections?: number;
  conditionalSelections?: {
    exclusive: string[];
    regular: string[];
  };
  showIf?: (answers: Record<string, any>) => boolean;
};

type QuizQuestionProps = {
  question: Question;
  onAnswer: (questionId: string, answer: any) => void;
  onNext: () => void;
  currentValue: any;
};

const QuizQuestion = ({ question, onAnswer, onNext, currentValue }: QuizQuestionProps) => {
  const [selected, setSelected] = useState<any>(currentValue || (question.type === 'multi-select' ? [] : question.type === 'provider-services' ? {} : ''));
  const [isValid, setIsValid] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [expandedProviders, setExpandedProviders] = useState<string[]>([]);

  useEffect(() => {
    setAnimate(true);
    
    // Set validity based on selected values
    if (question.type === 'multi-select') {
      setIsValid(Array.isArray(selected) && selected.length > 0);
    } else if (question.type === 'range') {
      setIsValid(selected !== '');
    } else if (question.type === 'provider-services') {
      // For provider-services, it's valid if either 'none' is selected or at least one provider is selected
      if (selected.none) {
        setIsValid(true);
      } else {
        const hasSelectedProvider = Object.keys(selected).length > 0;
        setIsValid(hasSelectedProvider);
      }
    } else {
      setIsValid(!!selected);
    }

    // Clear error message when selection changes
    setErrorMessage(null);
  }, [selected, question.type]);

  const handleSelectOption = (option: QuestionOption) => {
    if (question.type === 'provider-services') {
      if (option.value === 'none') {
        // If 'none' is selected, clear all other selections
        setSelected({ none: true });
        onAnswer(question.id, { none: true });
        
        // Collapse all expanded providers
        setExpandedProviders([]);
      } else {
        // If a provider is selected, remove 'none' selection if it exists
        const newSelected = { ...selected };
        delete newSelected.none;
        
        // Toggle provider selection
        if (newSelected[option.value as string]) {
          // If already selected, remove provider and its services
          delete newSelected[option.value as string];
          
          // Remove from expanded list if it was expanded
          setExpandedProviders(expandedProviders.filter(id => id !== option.id));
        } else {
          // Initialize provider with empty services array
          newSelected[option.value as string] = [];
          
          // Expand the provider to show services
          if (!expandedProviders.includes(option.id)) {
            setExpandedProviders([...expandedProviders, option.id]);
          }
        }
        
        setSelected(newSelected);
        onAnswer(question.id, newSelected);
      }
      
      return;
    }
    
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
        // Ensure selected is always an array
        const currentSelected = Array.isArray(selected) ? selected : [];
        
        // Check if the option is already selected
        const isOptionSelected = currentSelected.includes(option.value);
        
        if (isOptionSelected) {
          // If already selected, remove it
          newSelected = currentSelected.filter(val => val !== option.value);
        } else {
          // If not selected and we're at max, show error but don't add
          if (question.maxSelections && currentSelected.length >= question.maxSelections) {
            setErrorMessage(`You can only select up to ${question.maxSelections} options`);
            return;
          }
          // Otherwise add it
          newSelected = [...currentSelected, option.value];
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

  const toggleProviderExpansion = (providerId: string) => {
    if (expandedProviders.includes(providerId)) {
      setExpandedProviders(expandedProviders.filter(id => id !== providerId));
    } else {
      setExpandedProviders([...expandedProviders, providerId]);
    }
  };

  const handleServiceSelection = (providerValue: string, serviceValue: string) => {
    const newSelected = { ...selected };
    
    if (!newSelected[providerValue]) {
      newSelected[providerValue] = [];
    }
    
    // Toggle service selection
    if (newSelected[providerValue].includes(serviceValue)) {
      newSelected[providerValue] = newSelected[providerValue].filter(
        (service: string) => service !== serviceValue
      );
    } else {
      newSelected[providerValue] = [...newSelected[providerValue], serviceValue];
    }
    
    setSelected(newSelected);
    onAnswer(question.id, newSelected);
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
    if (question.type === 'provider-services') {
      if (option.value === 'none') {
        return !!selected.none;
      }
      return !!selected[option.value as string];
    }
    
    if (question.type === 'multi-select' && Array.isArray(selected)) {
      return selected.includes(option.value);
    }
    return selected === option.value;
  };

  const isServiceSelected = (providerValue: string, serviceValue: string) => {
    return selected[providerValue]?.includes(serviceValue) || false;
  };

  const isOptionDisabled = (option: QuestionOption) => {
    if (question.type === 'provider-services') {
      // Disable 'none' if other providers are selected
      if (option.value === 'none' && Object.keys(selected).length > 0 && !selected.none) {
        return true;
      }
      
      // Disable providers if 'none' is selected
      if (option.value !== 'none' && selected.none) {
        return true;
      }
      
      return false;
    }
    
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
          {question.type === 'provider-services' ? (
            <div className="space-y-3">
              {question.options?.map((option) => {
                const isSelected = isOptionSelected(option);
                const isDisabled = isOptionDisabled(option);
                const isExpanded = expandedProviders.includes(option.id) && isSelected;
                
                return (
                  <div key={option.id} className="space-y-2">
                    <button
                      onClick={() => handleSelectOption(option)}
                      disabled={isDisabled}
                      className={`
                        w-full text-left p-4 rounded-xl border transition-all duration-200
                        ${isSelected
                          ? 'border-primary bg-primary/5 shadow-sm'
                          : isDisabled
                            ? 'border-border bg-muted cursor-not-allowed opacity-60'
                            : 'border-border hover:border-primary/30 hover:bg-secondary/50'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
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
                          <span className="font-medium">{option.label}</span>
                        </div>
                        
                        {isSelected && option.services && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleProviderExpansion(option.id);
                            }}
                            className="text-primary hover:text-primary/70 p-1"
                          >
                            {isExpanded ? 'Hide services' : 'Select services'}
                          </button>
                        )}
                      </div>
                    </button>
                    
                    {isExpanded && option.services && (
                      <div className="pl-8 space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                        <p className="text-sm text-muted-foreground mb-2">
                          Select the services you currently have with {option.label}:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {option.services.map((service) => (
                            <button
                              key={service.id}
                              onClick={() => handleServiceSelection(option.value as string, service.value as string)}
                              className={`
                                flex items-center p-2 rounded-md border text-sm
                                ${isServiceSelected(option.value as string, service.value as string)
                                  ? 'border-primary bg-primary/10 text-primary'
                                  : 'border-border hover:border-primary/30 hover:bg-secondary/30'
                                }
                              `}
                            >
                              <div className={`
                                w-4 h-4 mr-2 rounded flex items-center justify-center
                                ${isServiceSelected(option.value as string, service.value as string)
                                  ? 'bg-primary text-white'
                                  : 'border border-muted-foreground/40'
                                }
                              `}>
                                {isServiceSelected(option.value as string, service.value as string) && <Check size={12} />}
                              </div>
                              {service.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : question.type === 'range' ? (
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
