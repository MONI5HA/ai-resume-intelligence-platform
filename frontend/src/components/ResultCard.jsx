import React, { useState } from 'react';

export default function ResultCard({ resume }) {
  const [activeTab, setActiveTab] = useState('formatted');

  if (!resume) return null;

  // Format resume as text for display
  const formatResume = () => {
    if (!resume) return '';
    
    let formatted = '';
    
    if (resume.contact) {
      const c = resume.contact;
      formatted += `${c.name}\n`;
      if (c.email) formatted += `${c.email}`;
      if (c.phone) formatted += ` | ${c.phone}`;
      if (c.location) formatted += ` | ${c.location}`;
      formatted += '\n\n';
    }

    if (resume.professional_summary) {
      formatted += `PROFESSIONAL SUMMARY\n`;
      formatted += `${resume.professional_summary}\n\n`;
    }

    if (resume.experience && resume.experience.length > 0) {
      formatted += `EXPERIENCE\n`;
      resume.experience.forEach(exp => {
        formatted += `${exp.company} | ${exp.position}\n`;
        formatted += `${exp.duration}\n`;
        if (exp.highlights) {
          exp.highlights.forEach(h => formatted += `• ${h}\n`);
        }
        formatted += '\n';
      });
    }

    if (resume.education && resume.education.length > 0) {
      formatted += `EDUCATION\n`;
      resume.education.forEach(edu => {
        formatted += `${edu.school}\n`;
        formatted += `${edu.degree}${edu.field ? ' in ' + edu.field : ''}\n`;
        if (edu.graduation) formatted += `${edu.graduation}\n`;
        formatted += '\n';
      });
    }

    if (resume.skills && resume.skills.length > 0) {
      formatted += `SKILLS\n`;
      formatted += resume.skills.join(' • ') + '\n\n';
    }

    if (resume.projects && resume.projects.length > 0) {
      formatted += `PROJECTS\n`;
      resume.projects.forEach(proj => {
        formatted += `${proj.name}\n`;
        if (proj.description) formatted += `${proj.description}\n`;
        if (proj.technologies) formatted += `Technologies: ${proj.technologies.join(', ')}\n`;
        formatted += '\n';
      });
    }

    return formatted;
  };

  const downloadResume = () => {
    const text = formatResume();
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', 'optimized-resume.txt');
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
        <h2 className="text-white font-bold text-xl">Optimized Resume</h2>
        <button
          onClick={downloadResume}
          className="px-4 py-2 bg-white text-blue-600 font-semibold rounded hover:bg-gray-100 transition-colors"
        >
          📥 Download
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setActiveTab('formatted')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'formatted'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📄 Formatted View
        </button>
        <button
          onClick={() => setActiveTab('json')}
          className={`flex-1 px-6 py-3 text-sm font-medium transition-colors ${
            activeTab === 'json'
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          📋 Structured Data
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === 'formatted' ? (
          <div className="bg-gradient-to-b from-white to-gray-50 p-8 rounded border border-gray-200 font-serif text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
            {formatResume()}
          </div>
        ) : (
          <div className="bg-gray-900 p-4 rounded text-gray-100 text-xs font-mono overflow-x-auto">
            <pre>{JSON.stringify(resume, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  );
}
