import React from 'react';

export default function ATSScore({ score }) {
  if (!score) return null;

  const scorePercentage = Math.min(score.score, 100);
  const scoreColor = scorePercentage >= 80 ? 'text-green-600' : scorePercentage >= 60 ? 'text-yellow-600' : 'text-red-600';
  const bgColor = scorePercentage >= 80 ? 'bg-green-50' : scorePercentage >= 60 ? 'bg-yellow-50' : 'bg-red-50';
  const borderColor = scorePercentage >= 80 ? 'border-green-200' : scorePercentage >= 60 ? 'border-yellow-200' : 'border-red-200';

  return (
    <div className={`${bgColor} border ${borderColor} rounded-lg p-6`}>
      <h3 className="text-lg font-bold text-gray-800 mb-4">🎯 ATS Score</h3>
      
      <div className="mb-6">
        <div className="flex items-end justify-between mb-2">
          <span className="text-gray-700 font-semibold">Overall Score</span>
          <span className={`text-4xl font-bold ${scoreColor}`}>
            {Math.round(scorePercentage)}%
          </span>
        </div>
        
        <div className="w-full bg-gray-300 rounded-full h-3 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              scorePercentage >= 80 ? 'bg-green-500' : scorePercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${scorePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-700">Keyword Match</span>
          <span className="font-semibold text-gray-800">{score.keyword_match_percentage}%</span>
        </div>
        
        <div className="flex justify-between">
          <span className="text-gray-700">Formatting Score</span>
          <span className="font-semibold text-gray-800">{score.formatting_score}/35</span>
        </div>
      </div>

      {score.matched_keywords && score.matched_keywords.length > 0 && (
        <div className="mt-4 pt-4 border-t border-current border-opacity-20">
          <p className="text-sm text-gray-700 mb-2 font-semibold">Matched Keywords:</p>
          <div className="flex flex-wrap gap-2">
            {score.matched_keywords.slice(0, 5).map((keyword, idx) => (
              <span key={idx} className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                ✓ {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {score.missing_keywords && score.missing_keywords.length > 0 && (
        <div className="mt-3">
          <p className="text-sm text-gray-700 mb-2 font-semibold">Missing Keywords:</p>
          <div className="flex flex-wrap gap-2">
            {score.missing_keywords.slice(0, 5).map((keyword, idx) => (
              <span key={idx} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                ✗ {keyword}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
