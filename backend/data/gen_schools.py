import json
import random

countries = [
    {"name": "Finland", "currency": "eur", "tuition_base": 12000, "deadline": "2026-01-15"},
    {"name": "UK", "currency": "gbp", "tuition_base": 22000, "deadline": "2026-07-01"},
    {"name": "Canada", "currency": "cad", "tuition_base": 25000, "deadline": "2026-03-01"},
    {"name": "USA", "currency": "usd", "tuition_base": 30000, "deadline": "2026-02-01"}
]

programs = [
    "MSc Computer Science", "MSc Data Science", "MSc Mechanical Engineering",
    "MSc Electrical Engineering", "MSc Biology", "MSc Finance", "MSc AI"
]

universities = [
    "Aalto University", "University of Helsinki", "University of Manchester",
    "University of Toronto", "University of British Columbia", "University of Waterloo",
    "Georgia Tech", "University of Michigan", "University of Edinburgh",
    "University of Glasgow", "McGill University", "University of Alberta"
   
]

schools = []
for i in range(50):
    country = random.choice(countries)
    uni = random.choice(universities)
    program = random.choice(programs)
    gpa_min = round(random.uniform(2.8, 4.0), 1)

    school = {
        "id": f"{uni.lower().replace(' ', '_')}_{i}",
        "name": uni,
        "country": country["name"],
        "program": program,
        "min_gpa_5": gpa_min,
        "min_gpa_4": round(gpa_min * 0.8, 1),
        f"tuition_{country['currency']}": country["tuition_base"] + random.randint(0, 10000),
        "deadline": country["deadline"],
        "intake": "September 2026",
        "scholarship": f"{country['name']} Scholarship 50-100%",
        "notes": f"Strong in {program.split()[1]}. Check website for IELTS requirements."
    }
    schools.append(school)

with open("data/schools.json", "w") as f:
    json.dump(schools, f, indent=2)

print(f"Generated {len(schools)} schools in data/schools.json")