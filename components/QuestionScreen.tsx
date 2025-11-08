
import React, { useState, useEffect } from 'react';
import type { Question } from '../types';
import { ANSWER_OPTIONS_STYLE, SOUND_EFFECTS } from '../constants';
import { ShapeIcon } from './icons';

interface QuestionScreenProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answerIndex: number, timeTaken: number) => void;
}

const QUESTION_DURATION = 15;

const QuestionScreen: React.FC<QuestionScreenProps> = ({ question, questionNumber, totalQuestions, onAnswer }) => {
  const [timeLeft, setTimeLeft] = useState(QUESTION_DURATION);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showCorrect, setShowCorrect] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          if (selectedAnswer === null) {
              onAnswer(-1, QUESTION_DURATION);
          }
          return 0;
        }
        // Play tick sound for the last 5 seconds
        if (prev > 1 && prev <= 6) {
            new Audio(SOUND_EFFECTS.TICK).play().catch(e => console.error("Error playing sound:", e));
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onAnswer, selectedAnswer]);


  const handleAnswerClick = (index: number) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
      const isCorrect = index === question.correctAnswerIndex;
      if (isCorrect) {
        new Audio(SOUND_EFFECTS.CORRECT).play().catch(e => console.error("Error playing sound:", e));
      } else {
        new Audio(SOUND_EFFECTS.INCORRECT).play().catch(e => console.error("Error playing sound:", e));
      }
      const timeTaken = QUESTION_DURATION - timeLeft;
      onAnswer(index, timeTaken);
    }
  };

  const progressPercentage = (timeLeft / QUESTION_DURATION) * 100;

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 p-4">
      <header className="flex justify-between items-center text-lg font-bold">
        <div>{questionNumber} / {totalQuestions}</div>
        <div className="flex-grow text-center text-2xl md:text-3xl font-extrabold px-4 line-clamp-2">
            {question.text}
        </div>
        <div className="relative w-16 h-16 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle className="text-gray-700" strokeWidth="8" stroke="currentColor" fill="transparent" r="28" cx="32" cy="32" />
                <circle 
                    className="text-indigo-500" 
                    strokeWidth="8" 
                    strokeDasharray={2 * Math.PI * 28} 
                    strokeDashoffset={2 * Math.PI * 28 * (1 - progressPercentage / 100)}
                    strokeLinecap="round" 
                    stroke="currentColor" 
                    fill="transparent" 
                    r="28" 
                    cx="32" 
                    cy="32"
                    style={{ transition: 'stroke-dashoffset 1s linear' }}
                />
            </svg>
            <span className="absolute text-2xl font-bold">{timeLeft}</span>
        </div>
      </header>

      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 py-4">
        {question.options.map((option, index) => {
            const style = ANSWER_OPTIONS_STYLE[index];
            const isCorrect = index === question.correctAnswerIndex;
            const isSelected = index === selectedAnswer;

            let buttonClass = `${style.color} hover:opacity-90`;
            if (selectedAnswer !== null) {
                if (isCorrect) {
                    buttonClass = 'bg-green-500 animate-pulse';
                } else if (isSelected) {
                    buttonClass = 'bg-gray-600 opacity-50';
                } else {
                    buttonClass = 'bg-gray-800 opacity-50';
                }
            }

          return (
            <button
              key={index}
              disabled={selectedAnswer !== null}
              onClick={() => handleAnswerClick(index)}
              className={`w-full h-full flex items-center justify-between p-4 md:p-6 rounded-lg text-white text-lg md:text-2xl font-bold transition-all duration-300 ${buttonClass}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-md ${style.color} bg-opacity-50`}>
                    <ShapeIcon shape={style.shape} />
                </div>
                <span>{option}</span>
              </div>
            </button>
          );
        })}
      </main>
    </div>
  );
};

export default QuestionScreen;
