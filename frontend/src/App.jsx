import React, { useState } from 'react';
import './App.css';
import ResumeForm from './components/ResumeForm';
import ResultCard from './components/ResultCard';
import ATSScore from './components/ATSScore';
import KeywordAnalysis from './components/KeywordAnalysis';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async (baseResume, jobDescription) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('http://localhost:8000/analyze-json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base_resume: baseResume,
          job_description: jobDescription,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message || 'Failed to generate resume. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                AI Resume Intelligence
              </h1>
              <p className="text-gray-600 mt-1">Optimize your resume with AI-powered matching & ATS scoring</p>
            </div>
            <div className="text-4xl">📄</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Section */}
        <div className="mb-8">
          <ResumeForm onSubmit={handleGenerate} disabled={loading} />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">❌ {error}</p>
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <LoadingSpinner />
          </div>
        )}

        {/* Results Section */}
        {results && !loading && (
          <div className="space-y-6">
            {/* ATS Score */}
            <div className="grid md:grid-cols-2 gap-6">
              <ATSScore score={results.ats_score} />
              <KeywordAnalysis analysis={results.keyword_analysis} />
            </div>

            {/* Resume Result */}
            <ResultCard resume={results.resume_structured} />
          </div>
        )}

        {/* Empty State */}
        {!results && !loading && !error && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Fill in your resume and job description to get started with AI optimization
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 bg-gray-50 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-600">
          <p>AI Resume Intelligence Platform | Powered by OpenAI</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
