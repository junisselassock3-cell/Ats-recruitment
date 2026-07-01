from fastapi import FastAPI, UploadFile, File, Form
from pypdf import PdfReader
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
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
    offre: str = Form(...)
):
    if not file.filename.lower().endswith(".pdf"):
        return{
            "erreur": "Veillez envoyer un fichier PDF"
        }
    reader = PdfReader(file.file)
    texte = ""
    for page in reader.pages:
        texte += page.extract_text() or ""
    texte_cv = texte.lower()
    texte_offre = offre.lower() 
    competences_connue = [
        "python",
        "sql",
        "postgresql",
        "fastapi",
        "react",
        "javascript",
        "html",
        "css",
        "git",
        "githup",
        "docker"

    ]   
    competences_offre = []
    competences_cv = []
    for comp in competences_connue:
        if comp in texte_offre:
            competences_offre.append(comp)
        if comp in texte_cv:
            competences_cv.append(comp)
    competences_manquante = [
        comp for comp in competences_offre
        if comp not in competences_cv
     ] 
    competence_corres =[
        comp for comp in competences_offre
        if comp in competences_cv
    ] 
    comp_supp = [
        comp for comp in competences_cv
        if comp not in competences_offre
    ]
    score = 0
    if len(competences_cv) >  0:
        score= (
            (len(competences_offre) - len(competences_manquante)) / len(competences_offre)
        ) * 100
    if score >= 80:
        commentaire = "Excellent profill"
    elif score >=60:
        commentaire ="Profil intéressant"
    elif score >=40:
        commentaire = "Profil moyen"
    else:
        commentaire ="Profil peu adapter"                
    return {
        "score": round(score,2),
        "commentaire": commentaire,
        "competences_cv": competences_cv,
        "competences_correspondantes": competence_corres,
        "competences_manquantes": competences_manquante,
        "competences_suplementaires": comp_supp,
        

    }            