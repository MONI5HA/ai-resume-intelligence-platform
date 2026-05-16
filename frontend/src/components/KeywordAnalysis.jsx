import React from 'react';

export default function KeywordAnalysis({ analysis }) {
  if (!analysis) return null;

  return (
    <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
      <h3 className="text-lg font-bold text-gray-800 mb-4">🔍 Keyword Analysis</h3>
      
      <div className="space-y-4">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white p-3 rounded border border-purple-200">
            <p className="text-xs text-gray-600 mb-1">JD Keywords</p>
            <p className="text-2xl font-bold text-purple-600">{analysis.total_keywords_in_jd}</p>
          </div>
          <div className="bg-white p-3 rounded border border-purple-200">
            <p className="text-xs text-gray-600 mb-1">Resume Keywords</p>
            <p className="text-2xl font-bold text-blue-600">{analysis.total_keywords_in_resume}</p>
          </div>
          <div className="bg-white p-3 rounded border border-purple-200">
            <p className="text-xs text-gray-600 mb-1">Match %</p>
            <p className="text-2xl font-bold text-green-600">{analysis.match_percentage}%</p>
          </div>
        </div>

        {/* Matched Keywords */}
        {analysis.matched_keywords && analysis.matched_keywords.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">✅ Matched Keywords</p>
            <div className="flex flex-wrap gap-2">
              {analysis.matched_keywords.map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Missing Keywords */}
        {analysis.missing_keywords && analysis.missing_keywords.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">⚠️ Missing Keywords</p>
            <div className="flex flex-wrap gap-2">
              {analysis.missing_keywords.slice(0, 8).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
            {analysis.missing_keywords.length > 8 && (
              <p className="text-xs text-gray-600 mt-2">
                +{analysis.missing_keywords.length - 8} more missing keywords
              </p>
            )}
          </div>
        )}

        {/* Extra Keywords */}
        {analysis.extra_keywords && analysis.extra_keywords.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-700 mb-2">💡 Extra Keywords (Bonus Skills)</p>
            <div className="flex flex-wrap gap-2">
              {analysis.extra_keywords.slice(0, 5).map((keyword, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full"
                >
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
