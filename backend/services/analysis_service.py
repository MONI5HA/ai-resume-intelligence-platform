"""
Analysis services for resume optimization and scoring.
"""
import re
from collections import Counter
from typing import Dict, List, Any

def extract_keywords(text: str) -> List[str]:
    """Extract technical keywords and skills from text."""
    # Common technical keywords to look for
    tech_keywords = [
        'python', 'javascript', 'typescript', 'java', 'c\\+\\+', 'react', 'angular', 'vue',
        'node', 'express', 'django', 'flask', 'fastapi', 'sql', 'mongodb', 'postgresql',
        'aws', 'azure', 'gcp', 'docker', 'kubernetes', 'git', 'rest', 'graphql',
        'html', 'css', 'scss', 'tailwind', 'bootstrap', 'webpack', 'vite',
        'agile', 'scrum', 'ci/cd', 'jenkins', 'github', 'gitlab', 'machine learning',
        'ai', 'deep learning', 'nlp', 'tensorflow', 'pytorch', 'pandas', 'numpy'
    ]
    
    text_lower = text.lower()
    found_keywords = []
    
    for keyword in tech_keywords:
        if re.search(r'\b' + keyword + r'\b', text_lower):
            found_keywords.append(keyword.replace('\\+\\+', '++'))
    
    return list(set(found_keywords))

def calculate_ats_score(resume_text: str, job_description: str) -> Dict[str, Any]:
    """
    Calculate ATS (Applicant Tracking System) score based on resume and JD match.
    """
    resume_lower = resume_text.lower()
    jd_lower = job_description.lower()
    
    # Extract words from JD
    jd_words = set(re.findall(r'\b\w{4,}\b', jd_lower))
    resume_words = set(re.findall(r'\b\w{4,}\b', resume_lower))
    
    # Calculate keyword match percentage
    matched_words = jd_words & resume_words
    match_percentage = (len(matched_words) / len(jd_words) * 100) if jd_words else 0
    
    # Check for formatting indicators
    formatting_score = 0
    if any(section in resume_lower for section in ['experience', 'education', 'skills', 'projects']):
        formatting_score += 20
    if '•' in resume_text or '-' in resume_text:
        formatting_score += 10
    if any(metric in resume_lower for metric in ['%', 'increased', 'improved', 'reduced']):
        formatting_score += 15
    
    # Calculate total ATS score
    total_score = min(100, int(match_percentage * 0.7) + formatting_score)
    
    return {
        "score": total_score,
        "keyword_match_percentage": round(match_percentage, 2),
        "matched_keywords": list(matched_words)[:10],
        "missing_keywords": list(jd_words - resume_words)[:10],
        "formatting_score": formatting_score
    }

def analyze_resume_sections(resume_text: str) -> Dict[str, Any]:
    """
    Analyze and extract resume sections.
    """
    sections = {
        "contact_info": [],
        "professional_summary": [],
        "experience": [],
        "education": [],
        "skills": [],
        "projects": [],
        "certifications": [],
        "other": []
    }
    
    lines = resume_text.split('\n')
    current_section = "other"
    section_content = []
    
    for line in lines:
        line_lower = line.lower().strip()
        
        # Detect section headers
        if any(x in line_lower for x in ['contact', 'phone', 'email']):
            current_section = "contact_info"
        elif any(x in line_lower for x in ['summary', 'objective', 'professional']):
            current_section = "professional_summary"
        elif any(x in line_lower for x in ['experience', 'employment', 'work history']):
            current_section = "experience"
        elif any(x in line_lower for x in ['education', 'school', 'university']):
            current_section = "education"
        elif any(x in line_lower for x in ['skill', 'competencies']):
            current_section = "skills"
        elif any(x in line_lower for x in ['project', 'portfolio']):
            current_section = "projects"
        elif any(x in line_lower for x in ['certification', 'credential']):
            current_section = "certifications"
        elif line.strip():
            sections[current_section].append(line.strip())
    
    return sections

def keyword_analysis(resume_text: str, job_description: str) -> Dict[str, Any]:
    """
    Perform detailed keyword analysis.
    """
    resume_keywords = extract_keywords(resume_text)
    jd_keywords = extract_keywords(job_description)
    
    matched = set(resume_keywords) & set(jd_keywords)
    missing = set(jd_keywords) - set(resume_keywords)
    extra = set(resume_keywords) - set(jd_keywords)
    
    return {
        "total_keywords_in_jd": len(jd_keywords),
        "total_keywords_in_resume": len(resume_keywords),
        "matched_keywords": list(matched),
        "missing_keywords": list(missing),
        "extra_keywords": list(extra),
        "match_percentage": round(len(matched) / len(jd_keywords) * 100, 2) if jd_keywords else 0
    }
