import React from 'react';
import type { AnalysisResult } from '../types';

interface OverviewProps {
  result: Pick<AnalysisResult, 'overallScore' | 'summary'>;
  image: string;
}

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

export const Overview: React.FC<OverviewProps> = ({ result, image }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in">
        <div className="lg:col-span-1 flex justify-center items-center">
             <img src={image} alt="User analysis" className="rounded-xl object-cover w-full max-w-sm shadow-md" />
        </div>
        <div className="lg:col-span-2 flex flex-col items-center justify-center text-center p-4">
            <h3 className="font-serif text-2xl font-bold text-brand-dark mb-2">Overall Score</h3>
            <ScoreIndicator score={result.overallScore} />
            <p className="text-center mt-6 text-gray-700 max-w-md">{result.summary}</p>
        </div>
    </div>
  );
};