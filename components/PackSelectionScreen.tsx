
import React, { useState } from 'react';
import type { TriviaPack, Player } from '../types';
import { TRIVIA_PACKS } from '../constants';

interface PackSelectionScreenProps {
  host: Player;
  onPackSelect: (packId: string) => void;
}

const PackSelectionScreen: React.FC<PackSelectionScreenProps> = ({ host, onPackSelect }) => {
  const [selectedPackId, setSelectedPackId] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 to-gray-900 p-4">
       <div className="w-full max-w-2xl text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">Welcome, {host.name}!</h1>
        <p className="text-xl text-indigo-300 mb-8">Choose a trivia pack to host.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {TRIVIA_PACKS.map(pack => (
                <button 
                    key={pack.id} 
                    onClick={() => setSelectedPackId(pack.id)}
                    className={`p-6 rounded-2xl text-left transition-all duration-300 transform hover:-translate-y-2 shadow-xl ${pack.color} ${selectedPackId === pack.id ? 'ring-4 ring-white' : ''}`}
                >
                    <h2 className="text-2xl font-bold mb-2">{pack.title}</h2>
                    <p className="text-gray-200">{pack.description}</p>
                </button>
            ))}
        </div>

        <button
          onClick={() => selectedPackId && onPackSelect(selectedPackId)}
          disabled={!selectedPackId}
          className="w-full max-w-sm mx-auto bg-green-600 text-white font-bold text-xl py-4 rounded-lg shadow-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
        >
          Create Room
        </button>
       </div>
    </div>
  );
};

export default PackSelectionScreen;
