
import React, { useEffect } from 'react';
import type { PlayerScore } from '../types';
import { SOUND_EFFECTS } from '../constants';

interface LeaderboardScreenProps {
  scores: PlayerScore[];
  isGameOver: boolean;
  onNext: () => void;
}

const LeaderboardScreen: React.FC<LeaderboardScreenProps> = ({ scores, isGameOver, onNext }) => {
  const sortedScores = [...scores].sort((a, b) => b.score - a.score);
  
  useEffect(() => {
    if (isGameOver) {
      new Audio(SOUND_EFFECTS.GAME_OVER).play().catch(e => console.error("Error playing sound:", e));
    }
  }, [isGameOver]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-gray-900 p-4">
      <div className="w-full max-w-2xl text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-8">{isGameOver ? 'Final Leaderboard' : 'Leaderboard'}</h1>
        <div className="space-y-4">
          {sortedScores.map((player, index) => (
            <div 
              key={player.id} 
              className="flex items-center justify-between bg-gray-800 p-4 rounded-lg shadow-lg text-left"
            >
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold w-8">{index + 1}</span>
                <span className="text-3xl">{player.avatar}</span>
                <span className="text-xl font-semibold">{player.name}</span>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{player.score}</p>
                {player.lastAnswerPoints > 0 && !isGameOver && (
                   <p className="text-green-400 font-semibold text-sm">+{player.lastAnswerPoints}</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={onNext}
          className="mt-12 w-full max-w-sm mx-auto bg-indigo-600 text-white font-bold text-xl py-4 rounded-lg shadow-lg hover:bg-indigo-700 transform hover:scale-105 transition-all duration-300"
        >
          {isGameOver ? 'Play Again' : 'Next Question'}
        </button>
      </div>
    </div>
  );
};

export default LeaderboardScreen;
