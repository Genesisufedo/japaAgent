import chromadb
from sentence_transformers import SentenceTransformer

client = chromadb.PersistentClient(path="./chroma_db")
model = SentenceTransformer("all-MiniLM-L6-v2")

def get_collection():
    return client.get_or_create_collection("schools")

def search_schools(query, n_results=5):
    collection = get_collection()
    query_embedding = model.encode([query]).tolist()
    results = collection.query(query_embeddings=query_embedding, n_results=n_results)
    return results["metadatas"][0] if results["metadatas"] else []