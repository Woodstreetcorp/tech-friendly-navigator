
import QuizQuestion from './QuizQuestion';
import { quizQuestions } from './quiz/QuizData';
import { useQuizLogic } from './quiz/useQuizLogic';
import QuizProgressBar from './quiz/QuizProgressBar';
import BackButton from './quiz/BackButton';

const Quiz = () => {
  const {
    currentQuestionIndex,
    answers,
    progress,
    filteredQuestions,
    handleAnswer,
    handleNext,
    handleBack,
    currentQuestion
  } = useQuizLogic(quizQuestions);

  return (
    <div className="pb-20 pt-32 px-4">
      <QuizProgressBar 
        currentQuestion={filteredQuestions.findIndex(q => q.id === currentQuestion?.id)}
        totalQuestions={filteredQuestions.length}
        progress={progress}
      />

      {filteredQuestions.findIndex(q => q.id === currentQuestion?.id) > 0 && (
        <BackButton onClick={handleBack} />
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
