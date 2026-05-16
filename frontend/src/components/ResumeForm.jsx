import React, { useState } from 'react';

export default function ResumeForm({ onSubmit, disabled }) {
  const [baseResume, setBaseResume] = useState('');
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (baseResume.trim() && jobDescription.trim()) {
      onSubmit(baseResume, jobDescription);
    }
  };

  const isFormValid = baseResume.trim() && jobDescription.trim();

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Resume Textarea */}
        <div>
          <label htmlFor="resume" className="block text-sm font-semibold text-gray-700 mb-2">
            Your Resume
          </label>
          <textarea
            id="resume"
            value={baseResume}
            onChange={(e) => setBaseResume(e.target.value)}
            placeholder="Paste your current resume here..."
            disabled={disabled}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-white shadow-sm hover:border-gray-400 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {baseResume.length} characters
          </p>
        </div>

        {/* Job Description Textarea */}
        <div>
          <label htmlFor="jd" className="block text-sm font-semibold text-gray-700 mb-2">
            Job Description
          </label>
          <textarea
            id="jd"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description here..."
            disabled={disabled}
            className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none bg-white shadow-sm hover:border-gray-400 transition-colors disabled:bg-gray-50 disabled:text-gray-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            {jobDescription.length} characters
          </p>
        </div>
      </div>

      {/* Generate Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={!isFormValid || disabled}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {disabled ? '⏳ Generating...' : '✨ Generate Optimized Resume'}
        </button>
      </div>
    </form>
  );
}
