
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateRecommendations } from '../../utils/recommendationEngine';
import { Question } from '../QuizQuestion';
import { toast } from 'sonner';

export const useQuizLogic = (quizQuestions: Question[]) => {
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
  }, [answers, quizQuestions]);

  useEffect(() => {
    // Calculate progress based on filtered questions
    const currentQuestion = quizQuestions[currentQuestionIndex];
    const currentIndex = filteredQuestions.findIndex(q => q.id === currentQuestion?.id);
    setProgress(((currentIndex + 1) / filteredQuestions.length) * 100);
  }, [currentQuestionIndex, filteredQuestions, quizQuestions]);

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers(prev => ({ ...prev, [questionId]: answer }));
  };

  const handleNext = () => {
    const currentQuestion = quizQuestions[currentQuestionIndex];
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
    const currentQuestion = quizQuestions[currentQuestionIndex];
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

  return {
    currentQuestionIndex,
    setCurrentQuestionIndex,
    answers,
    progress,
    filteredQuestions,
    handleAnswer,
    handleNext,
    handleBack,
    completeQuiz,
    currentQuestion: quizQuestions[currentQuestionIndex]
  };
};
