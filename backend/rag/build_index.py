import json
import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="./chroma_db")
collection = client.get_or_create_collection("schools")

with open("data/schools.json") as f:
    schools = json.load(f)

texts, metadatas, ids = [], [], []
for s in schools:
    text = f"{s['name']} {s['country']} {s['program']} Min GPA {s['min_gpa_5']}/5.0 Deadline {s['deadline']} {s['notes']}"
    texts.append(text)
    metadatas.append(s)
    ids.append(s["id"])

model = SentenceTransformer("all-MiniLM-L6-v2")
embeddings = model.encode(texts).tolist()

collection.add(documents=texts, metadatas=metadatas, ids=ids, embeddings=embeddings)
print(f"Indexed {len(schools)} schools successfully into ChromaDB!")