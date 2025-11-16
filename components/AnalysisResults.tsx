import React, { useState } from 'react';
import type { AnalysisResult } from '../types';
import { ScoreBreakdown } from './ScoreBreakdown';
import { PersonalizedPlan } from './PersonalizedPlan';

interface AnalysisResultsProps {
  result: AnalysisResult;
  image: string;
  onReset: () => void;
}

// This component was previously in Overview.tsx
const ScoreIndicator: React.FC<{ score: number }> = ({ score }) => {
    const getRingColor = () => {
        if (score >= 85) return 'stroke-green-500';
        if (score >= 60) return 'stroke-yellow-500';
        return 'stroke-red-500';
    };
    
    const circumference = 2 * Math.PI * 45; // 2 * pi * r
    const offset = circumference - (score / 100) * circumference;

    return (
        <div className="relative w-32 h-32 md:w-40 md:h-40">
            <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                    className="stroke-current text-gray-200"
                    strokeWidth="10"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                ></circle>
                <circle
                    className={`stroke-current ${getRingColor()} transition-all duration-1000 ease-out`}
                    strokeWidth="10"
                    strokeLinecap="round"
                    cx="50"
                    cy="50"
                    r="45"
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    transform="rotate(-90 50 50)"
                ></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl md:text-4xl font-bold text-brand-dark">{score}</span>
            </div>
        </div>
    );
};


type Tab = 'breakdown' | 'plan';

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ result, image, onReset }) => {
  const [activeTab, setActiveTab] = useState<Tab>('breakdown');
  const [isAnimating, setIsAnimating] = useState<boolean>(false);

  const handleTabChange = (newTab: Tab) => {
    if (newTab !== activeTab) {
      setIsAnimating(true); // Start fade-out and scale-down
      setTimeout(() => {
        setActiveTab(newTab);
        setIsAnimating(false); // New content renders, start fade-in and scale-up
      }, 150); // This duration is about half of the transition time for a smooth effect
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'breakdown':
        return <ScoreBreakdown scores={result.scores} />;
      case 'plan':
        return <PersonalizedPlan enhancements={result.enhancements} />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{ tabName: Tab; label: string }> = ({ tabName, label }) => (
    <button
      onClick={() => handleTabChange(tabName)}
      className={`px-4 py-2 text-sm md:px-6 md:py-3 md:text-base font-semibold rounded-full transition-colors duration-300 ${
        activeTab === tabName
          ? 'bg-purple-600 text-white shadow-md'
          : 'bg-white/50 text-brand-text hover:bg-white'
      }`}
    >
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-6xl animate-fade-in bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg p-4 sm:p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-dark">Your Beauty Analysis is Ready</h2>
      </div>
      
      {/* Permanent Overview Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1 flex justify-center items-center">
             <img src={image} alt="User analysis" className="rounded-2xl object-cover w-full max-w-sm shadow-lg border-4 border-white" />
        </div>
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-4">
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-4">Overall Score</h3>
            <ScoreIndicator score={result.overallScore} />
            <p className="text-center mt-6 text-gray-700 max-w-lg leading-relaxed">{result.summary}</p>
        </div>
      </div>


      <div className="flex justify-center space-x-2 md:space-x-4 mb-8 p-2 bg-gray-200/50 rounded-full">
        <TabButton tabName="breakdown" label="Score Breakdown" />
        <TabButton tabName="plan" label="Personalized Plan" />
      </div>

      <div className={`min-h-[400px] transition-all duration-300 ease-in-out ${isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'}`}>
        {renderTabContent()}
      </div>

      <div className="text-center mt-12">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-colors shadow-md hover:shadow-lg"
        >
          Analyze Another Photo
        </button>
      </div>
    </div>
  );
};
