import io

def extract_text(file_bytes: bytes, filename: str) -> str:
    """Extracts text from bytes based on the provided filename."""
    filename = filename.lower()
    
    if filename.endswith('.txt'):
        return file_bytes.decode('utf-8', errors='ignore')
        
    elif filename.endswith('.pdf'):
        try:
            import pypdf
            reader = pypdf.PdfReader(io.BytesIO(file_bytes))
            return "\n".join([page.extract_text() for page in reader.pages if page.extract_text()])
        except Exception as e:
            return f"[Error processing PDF: {str(e)}]"
            
    elif filename.endswith('.docx'):
        try:
            import docx2txt
            return docx2txt.process(io.BytesIO(file_bytes))
        except Exception as e:
            return f"[Error processing DOCX: {str(e)}]"
            
    return file_bytes.decode('utf-8', errors='ignore')

def parse_profile(raw_text: str) -> dict:
    cleaned_text = " ".join(raw_text.split())
    return {
        "raw_cv_transcript": cleaned_text[:4000],
        "parsed_status": "successfully_extracted"
    }