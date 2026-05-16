const API_BASE_URL = 'http://localhost:8000';

export const resumeAPI = {
  generate: async (baseResume, jobDescription) => {
    const response = await fetch(`${API_BASE_URL}/generate`, {
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

    return response.json();
  },

  analyze: async (baseResume, jobDescription) => {
    const response = await fetch(`${API_BASE_URL}/analyze`, {
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

    return response.json();
  },

  analyzeJson: async (baseResume, jobDescription) => {
    const response = await fetch(`${API_BASE_URL}/analyze-json`, {
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

    return response.json();
  },

  getAtsScore: async (baseResume, jobDescription) => {
    const response = await fetch(`${API_BASE_URL}/ats-score`, {
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

    return response.json();
  },

  getKeywordAnalysis: async (baseResume, jobDescription) => {
    const response = await fetch(`${API_BASE_URL}/keyword-analysis`, {
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

    return response.json();
  },
};
