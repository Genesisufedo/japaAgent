from dotenv import load_dotenv
import os
import traceback
import json
from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Any, Dict, Optional
from utils.parser import extract_text, parse_profile
from agent.graph import build_graph
from fastapi.responses import StreamingResponse
from groq import Groq


app = FastAPI()
app.add_middleware(CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"])

load_dotenv()
api_key = os.getenv("GROQ_API_KEY") 
client = Groq(api_key=api_key)

graph = build_graph()


class ChatRequest(BaseModel):
    messages: List[Dict[str, str]]
    profile: Optional[Dict[str, Any]] = {}
    schools: Optional[List[Dict[str, Any]]] = []
    checklist: Optional[List[Any]] = []

@app.post("/analyze")
async def analyze(cv: UploadFile = File(...), transcript: UploadFile = File(...)):
    try:
        cv_text = extract_text(await cv.read(), cv.filename)
        transcript_text = extract_text(await transcript.read(), transcript.filename)
        profile = parse_profile(cv_text + " " + transcript_text)
        result = graph.analyze_profile(profile)
        return {
            "profile": profile,
            "schools": result.get("recommendations", []),
            "checklist": result.get("checklist", [])
        }
    except Exception as e:
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/chat")
async def chat(request: ChatRequest):
    system_prompt = f"""
    You are a JapaPrep AI assistant. Use the following context to answer:
    - User Profile: {json.dumps(request.profile)}
    - Recommended Schools: {json.dumps(request.schools)}
    - Application Checklist: {json.dumps(request.checklist)}
    
    If asked about deadlines, tuition, or requirements, refer ONLY to this provided data.
    """
    
    messages = [{"role": "system", "content": system_prompt}] + request.messages

    def generate():
        stream = client.chat.completions.create(
            messages=messages,
            model="llama-3.3-70b-versatile",
            stream=True,
        )
        for chunk in stream:
            yield chunk.choices[0].delta.content or ""

    return StreamingResponse(generate(), media_type="text/plain")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)