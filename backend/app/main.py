from fastapi import FastAPI, UploadFile, File, Form
from pypdf import PdfReader
from fastapi.middleware.cors import CORSMiddleware
from database import engine
from models import Base
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from services.ats_service import analyser_cv
from database import get_db
import crud
import schemas

app = FastAPI()
Base.metadata.create_all(bind=engine)
origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5174",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.get("/")
def home():
    return{"message": "ATS API démarré"}
@app.post("/upload-cv")
async def upload_cv(file: UploadFile = File(...)):
    reader = PdfReader(file.file)
    texte = ""
    for page in reader.pages:
        texte += page.extract_text() or ""
        competence_reconues = [
            "python",
            "sql",
            "postgresql",
            "fastapi",
            "javascript",
            "html",
            "css",
            "git",
            "githup",
            "docker"
        ]
        texte_minuscule = texte.lower()
        competences_trouvees = []
    for competence in competence_reconues:
        if competence in texte_minuscule:
            competences_trouvees.append(competence)    
    return {
            "name_file": file.filename,
            "nombre_caracteres": len(texte),
            "competences": competences_trouvees
    }
@app.post("/analyse-cv")
async def analyse_cv(
    file:UploadFile = File(...),
    offre: str = Form(...),
    db: Session =Depends(get_db)  
):
    print("j'ai bien chargé")
    if not file.filename.lower().endswith(".pdf"):
      raise HTTPException(
          status_code=400,
          detail="Veillez envoyer un fichier pdf."
      )
    reader = PdfReader(file.file)
    texte = ""
    for page in reader.pages:
        texte += page.extract_text() or ""

    resultat = analyser_cv(texte,offre)  
    print("3 analyse terminé,")
    candidate = schemas.CandidateCreate(
        nom="junisse",
        prenom="lassock",
        email="junisselassock@gmail.com",
        telephone="681411559",
        adresse="Douala",
        cv_nom = file.filename
    )  
    try:
        crud.create_candidate(db,candidate)
        print("✅ Candidat enregistré avec succès")
    except Exception as e:
     print("Error:", repr(e))
     raise
    return resultat       
    
    