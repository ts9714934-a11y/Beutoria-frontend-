import React from 'react';
import type { Enhancement } from '../types';

interface PersonalizedPlanProps {
  enhancements: Enhancement[];
}

const HighlightedText: React.FC<{ text: string }> = ({ text }) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return (
      <span>
        {parts.map((part, i) =>
          part.startsWith('**') && part.endsWith('**') ? (
            <strong key={i} className="font-bold text-purple-800 bg-purple-200/70 px-1 py-0.5 rounded">
              {part.slice(2, -2)}
            </strong>
          ) : (
            part
          )
        )}
      </span>
    );
  };

export const PersonalizedPlan: React.FC<PersonalizedPlanProps> = ({ enhancements }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      {enhancements.map((item, index) => (
        <div key={index} className="bg-white/50 p-6 rounded-2xl shadow-sm border border-purple-100">
          <h3 className="font-serif text-2xl font-bold text-brand-dark mb-1">{item.area}</h3>
          <p className="text-gray-600 italic mb-6">{item.problem}</p>

          <div className="space-y-4">
            {item.solutions.map((solution, sIndex) => (
                <div key={sIndex}>
                    <h4 className="font-bold text-brand-text mb-1">{solution.title}</h4>
                    <p className="text-gray-700 text-sm leading-relaxed">
                        <HighlightedText text={solution.description} />
                    </p>
                </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};