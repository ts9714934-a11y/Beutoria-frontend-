
import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="w-full text-center py-6 border-b border-gray-200">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-brand-dark tracking-wider">
        Beutoria
      </h1>
      <p className="text-brand-text text-sm md:text-base mt-1">Your Personal AI Beauty Analyst</p>
    </header>
  );
};
