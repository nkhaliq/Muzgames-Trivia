
import React from 'react';
import type { Player } from '../types';

interface LobbyScreenProps {
  roomCode: string;
  players: Player[];
  onStartGame: () => void;
}

const LobbyScreen: React.FC<LobbyScreenProps> = ({ roomCode, players, onStartGame }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-gradient-to-br from-indigo-900 to-gray-900 p-4 md:p-8">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-2xl text-indigo-300 mb-2">Game Room Code:</h1>
        <div className="bg-gray-800 inline-block p-4 rounded-2xl shadow-lg mb-8">
            <p className="text-6xl md:text-8xl font-extrabold tracking-widest text-white">{roomCode}</p>
        </div>
        
        <h2 className="text-3xl font-bold mb-6">Players Joined ({players.length})</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {players.map(player => (
                <div key={player.id} className="bg-gray-700 p-4 rounded-lg flex flex-col items-center shadow-md">
                    <span className="text-4xl mb-2">{player.avatar}</span>
                    <p className="font-bold text-lg truncate w-full">{player.name}</p>
                </div>
            ))}
        </div>
      </div>
      
      <button
        onClick={onStartGame}
        className="w-full max-w-md bg-green-600 text-white font-bold text-2xl py-5 rounded-lg shadow-lg hover:bg-green-700 transform hover:scale-105 transition-all duration-300 mt-8"
      >
        Start Game
      </button>
    </div>
  );
};

export default LobbyScreen;
