import React, { useState } from 'react';
import type { Player } from '../types';
import { AVATARS } from '../constants';

interface UserProfileScreenProps {
  onProfileSave: (user: Omit<Player, 'id' | 'isHost'>) => void;
}

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ onProfileSave }) => {
  const [name, setName] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(AVATARS[0]);

  const handleSave = () => {
    if (name.trim()) {
      onProfileSave({ name: name.trim(), avatar: selectedAvatar });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#11733F] p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8 text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">Muzgames</h1>
        <p className="text-indigo-300 text-lg">Islamic Trivia Challenge</p>
        
        <div>
          <label htmlFor="userId" className="text-lg font-semibold text-gray-300 block mb-2">Enter Your UserID</label>
          <input
            id="userId"
            type="text"
            maxLength={12}
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-gray-700 border-2 border-gray-600 text-white text-xl text-center font-bold rounded-lg p-3 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition duration-300"
            placeholder="Your Name"
          />
        </div>

        <div>
          <p className="text-lg font-semibold text-gray-300 mb-3">Choose Your Avatar</p>
          <div className="flex justify-center gap-4">
            {AVATARS.map((avatar, index) => (
              <button
                key={index}
                onClick={() => setSelectedAvatar(avatar)}
                className={`text-5xl p-3 rounded-full transition-transform duration-200 ${
                  selectedAvatar === avatar ? 'bg-indigo-600 scale-110 ring-4 ring-indigo-400' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {avatar}
              </button>
            ))}
          </div>
        </div>
        
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full bg-indigo-600 text-white font-bold text-xl py-4 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:scale-105 transition-all duration-300"
        >
          Save Profile & Host Game
        </button>
      </div>
    </div>
  );
};

export default UserProfileScreen;