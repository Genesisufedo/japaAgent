import json
import os

class SchoolAgent:
    def __init__(self):
        self.schools_db = []
        data_files = ["data/schools.json", "data/gen_schools.json"]
        for file_path in data_files:
            if os.path.exists(file_path):
                with open(file_path, "r") as f:
                    try:
                        data = json.load(f)
                        if isinstance(data, list):
                            self.schools_db.extend(data)
                            print(f"[DEBUG] Loaded {len(data)} schools from {file_path}")
                    except json.JSONDecodeError as e:
                        print(f"[ERROR] Could not parse {file_path}: {e}")
        print(f"[DEBUG] Total schools in database: {len(self.schools_db)}")

    def analyze_profile(self, profile):
        
        raw_gpa = profile.get("gpa")
        gpa = float(raw_gpa) if raw_gpa else 3.0
        print(f"[DEBUG] Analyzing profile with GPA: {gpa}")
        
        seen_ids = set()
        filtered = []
        
        for s in self.schools_db:
           
            req_gpa = float(s.get("min_gpa_4", 0))
            if s['id'] not in seen_ids:
                if gpa >= (req_gpa - 0.5):  
                    filtered.append(s)
                    seen_ids.add(s['id'])
        
        print(f"[DEBUG] Found {len(filtered)} matching schools.")
        
        return {
            "recommendations": sorted(filtered, key=lambda x: x.get('min_gpa_4', 0), reverse=True)[:15],
            "checklist": [
                "Draft Statement of Purpose (SOP)",
                "Request Official Academic Transcripts",
                "Contact Professors for Letters of Recommendation",
                "Check English Language Proficiency (IELTS/TOEFL)",
                "Prepare Application Fee"
            ]
        }

def build_graph():
    return SchoolAgent()