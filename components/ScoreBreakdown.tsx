import React, { useMemo } from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, Legend, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import type { Score } from '../types';

interface ScoreBreakdownProps {
  scores: Score[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-white border border-gray-300 rounded-lg shadow-lg">
          <p className="font-bold text-brand-text">{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
    return null;
  };

export const ScoreBreakdown: React.FC<ScoreBreakdownProps> = ({ scores }) => {
    const { harmonyScores, otherScores } = useMemo(() => {
        const harmonyScores = scores.filter(s => s.category === 'Symmetry & Harmony');
        const otherScores = scores.filter(s => s.category !== 'Symmetry & Harmony');
        return { harmonyScores, otherScores };
    }, [scores]);

  return (
    <div className="animate-fade-in">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="p-4 bg-white/50 rounded-2xl shadow-sm">
                <h3 className="font-serif text-xl font-bold text-brand-dark text-center mb-4">Symmetry & Harmony</h3>
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={harmonyScores}>
                            <PolarGrid stroke="#d1d5db"/>
                            <PolarAngleAxis dataKey="name" tick={{ fill: '#581C87', fontSize: '12px' }}/>
                            <Radar name="Score" dataKey="value" stroke="#8B5CF6" fill="#A78BFA" fillOpacity={0.7} />
                            <Tooltip content={<CustomTooltip />} />
                        </RadarChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="p-4 bg-white/50 rounded-2xl shadow-sm">
                <h3 className="font-serif text-xl font-bold text-brand-dark text-center mb-4">Skin Health & Key Features</h3>
                <div className="w-full h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={otherScores} layout="vertical" margin={{ top: 5, right: 20, left: 30, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/>
                            <XAxis type="number" domain={[0, 100]} tick={{ fill: '#4b5563' }}/>
                            <YAxis type="category" dataKey="name" width={100} tick={{ fill: '#581C87', fontSize: '12px' }} />
                            <Tooltip content={<CustomTooltip />} cursor={{fill: 'rgba(167, 139, 250, 0.2)'}}/>
                            <Bar dataKey="value" fill="#A78BFA" background={{ fill: '#f3f4f6' }} radius={[0, 10, 10, 0]}/>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    </div>
  );
};