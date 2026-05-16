from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.openai_services import generate_resume, generate_resume_json
from services.analysis_service import calculate_ats_score, analyze_resume_sections, keyword_analysis

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ResumeRequest(BaseModel):
    base_resume: str
    job_description: str

@app.get("/")
def root():
    return {"message": "AI Resume Engine Running"}

@app.post("/generate")
def generate(data: ResumeRequest):
    result = generate_resume(
        data.base_resume,
        data.job_description
    )

    return {
        "generated_resume": result
    }

@app.post("/analyze")
def analyze(data: ResumeRequest):
    """Analyze resume with ATS scoring and keyword analysis."""
    optimized_resume = generate_resume(
        data.base_resume,
        data.job_description
    )
    
    ats_score = calculate_ats_score(optimized_resume, data.job_description)
    sections = analyze_resume_sections(optimized_resume)
    keywords = keyword_analysis(optimized_resume, data.job_description)
    
    return {
        "optimized_resume": optimized_resume,
        "ats_score": ats_score,
        "sections": sections,
        "keyword_analysis": keywords
    }

@app.post("/analyze-json")
def analyze_json(data: ResumeRequest):
    """Analyze resume and return structured JSON output."""
    optimized_resume_json = generate_resume_json(
        data.base_resume,
        data.job_description
    )
    
    # Also generate the text version for scoring
    optimized_resume_text = generate_resume(
        data.base_resume,
        data.job_description
    )
    
    ats_score = calculate_ats_score(optimized_resume_text, data.job_description)
    keywords = keyword_analysis(optimized_resume_text, data.job_description)
    
    return {
        "resume_structured": optimized_resume_json,
        "ats_score": ats_score,
        "keyword_analysis": keywords
    }

@app.post("/ats-score")
def get_ats_score(data: ResumeRequest):
    """Calculate ATS score."""
    ats_score = calculate_ats_score(data.base_resume, data.job_description)
    return ats_score

@app.post("/keyword-analysis")
def get_keyword_analysis(data: ResumeRequest):
    """Perform keyword analysis."""
    keywords = keyword_analysis(data.base_resume, data.job_description)
    return keywords