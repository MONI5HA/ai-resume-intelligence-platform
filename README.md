# AI Resume Intelligence Platform

A modern web application that uses AI to optimize resumes for specific job descriptions, with ATS scoring and keyword analysis.

## Features

✨ **AI-Powered Resume Optimization**
- Intelligent resume enhancement based on job descriptions
- Context-aware rewriting that maintains authenticity
- Strategic keyword integration for ATS optimization

📄 **Structured Resume Output**
- Formatted resume preview (like a Word document)
- Structured JSON representation for easy parsing
- Resume sections breakdown (contact, experience, education, skills, projects)

🎯 **ATS Scoring**
- Calculate ATS compatibility score
- Identify matched and missing keywords
- Get formatting score analysis
- Actionable recommendations for improvement

🔍 **Keyword Analysis**
- Compare keywords from job description vs. resume
- Identify matched technical skills
- Highlight missing keywords to add
- Bonus skill discovery

🎨 **Modern UI**
- Clean, intuitive interface
- Real-time character counting
- Loading states with progress indication
- Color-coded score indicators
- Responsive design for all devices

## Project Structure

```
ai-resume-intelligence-platform/
├── backend/
│   ├── main.py           # FastAPI application
│   ├── services/
│   │   ├── openai_services.py    # OpenAI integration & resume generation
│   │   └── analysis_service.py   # ATS scoring & keyword analysis
│   ├── .env              # Environment variables (OPENAI_API_KEY)
│   └── requirements.txt  # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── App.jsx       # Main React component
    │   ├── App.css       # Global styles
    │   ├── components/   # React components
    │   │   ├── ResumeForm.jsx         # Input form
    │   │   ├── ResultCard.jsx         # Resume display
    │   │   ├── ATSScore.jsx           # ATS score card
    │   │   ├── KeywordAnalysis.jsx    # Keyword analysis
    │   │   └── LoadingSpinner.jsx     # Loading indicator
    │   ├── services/
    │   │   └── api.js    # API client
    │   ├── index.css     # Base styles
    │   └── main.jsx      # React entry point
    ├── package.json      # Frontend dependencies
    └── vite.config.js    # Vite configuration
```

## Getting Started

### Backend Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/Scripts/activate  # On Windows
   ```

3. **Install dependencies:**
   ```bash
   pip install fastapi uvicorn python-dotenv openai
   ```

4. **Set up environment variables:**
   - Update `.env` file with your OpenAI API key:
   ```
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

5. **Start the backend server:**
   ```bash
   uvicorn main:app --reload
   ```
   Backend runs on `http://localhost:8000`

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

## How to Use

1. **Fill in the Resume:**
   - Paste your current resume in the left textarea
   - Include all relevant experience, education, skills

2. **Fill in the Job Description:**
   - Paste the target job description in the right textarea
   - Include full job requirements and qualifications

3. **Generate Optimized Resume:**
   - Click the "Generate Optimized Resume" button
   - Wait for AI processing (10-30 seconds)

4. **Review Results:**
   - **ATS Score**: See compatibility percentage and matching keywords
   - **Keyword Analysis**: View matched, missing, and bonus keywords
   - **Resume Views**: 
     - Formatted: Professional resume layout
     - Structured Data: JSON format for programmatic access

5. **Download:**
   - Click the Download button to save the optimized resume as text

## API Endpoints

### POST /generate
Generate an optimized resume
```json
Request: {
  "base_resume": "string",
  "job_description": "string"
}
Response: {
  "generated_resume": "string"
}
```

### POST /analyze-json
Get comprehensive analysis with structured output
```json
Response: {
  "resume_structured": { /* JSON resume */ },
  "ats_score": { /* ATS score data */ },
  "keyword_analysis": { /* Keyword analysis */ }
}
```

### POST /ats-score
Calculate ATS score only
```json
Response: {
  "score": number,
  "keyword_match_percentage": number,
  "matched_keywords": [],
  "missing_keywords": [],
  "formatting_score": number
}
```

### POST /keyword-analysis
Perform keyword analysis only
```json
Response: {
  "total_keywords_in_jd": number,
  "total_keywords_in_resume": number,
  "matched_keywords": [],
  "missing_keywords": [],
  "extra_keywords": [],
  "match_percentage": number
}
```

## Technologies Used

**Backend:**
- FastAPI - Modern Python web framework
- OpenAI API - AI-powered resume optimization
- Pydantic - Data validation
- Uvicorn - ASGI server

**Frontend:**
- React 19 - UI library
- Vite - Build tool
- Tailwind CSS - Utility-first CSS
- JavaScript (ES6+)

## Environment Variables

Create a `.env` file in the backend directory:
```
OPENAI_API_KEY=sk-your-actual-api-key-here
```

Get your API key from: https://platform.openai.com/account/api-keys

## ATS Scoring Details

The ATS score is calculated based on:
1. **Keyword Match (70%)**: How many job description keywords are in the resume
2. **Formatting Score (30%)**:
   - +20 points for standard sections (Experience, Education, Skills, Projects)
   - +10 points for bullet points or dashes
   - +15 points for quantifiable achievements (%, increased, improved, reduced)

Maximum score: 100

## Notes

- The first generation may take 10-30 seconds as the AI processes your documents
- Subsequent requests are typically faster
- Ensure your OpenAI API key has sufficient credits
- The app requires internet connection for AI processing

## License

MIT

## Support

For issues or feature requests, please create an issue in the repository.
