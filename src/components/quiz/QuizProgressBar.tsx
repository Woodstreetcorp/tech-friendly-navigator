
import React from 'react';

interface QuizProgressBarProps {
  currentQuestion: number;
  totalQuestions: number;
  progress: number;
}

const QuizProgressBar = ({ currentQuestion, totalQuestions, progress }: QuizProgressBarProps) => {
  return (
    <div className="container-custom mb-8">
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Question {currentQuestion + 1} of {totalQuestions}</span>
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
  );
};

export default QuizProgressBar;
