import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8">
      <div className="relative flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <div className="rounded-full h-28 w-28 bg-purple-100 flex items-center justify-center text-purple-500">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
             </svg>
          </div>
      </div>
      <h2 className="mt-8 font-serif text-2xl font-bold text-brand-dark">Analyzing your features...</h2>
      <p className="mt-2 text-gray-600">Our AI is preparing your personalized beauty report.</p>
    </div>
  );
};
