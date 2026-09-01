from fastapi import FastAPI, UploadFile, File, Form
from pypdf import PdfReader
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func
from database import engine
from models import Base
from sqlalchemy.orm import Session
from fastapi import HTTPException, Depends
from services.ats_service import analyser_cv
from database import get_db
import crud
import schemas
import models
from auth import create_access_token, verify_token
from security import verify_password
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
    candidate13 = schemas.CandidateCreate(
        nom="mervei",
        prenom="matho",
        email="mervele@gmal.com",
        telephone="6714671135",
        adresse="France",
        cv_nom = file.filename
    )  
    job_offer10= schemas.JobOfferCreate(
        titre="developpeur frontend",
        entreprise="MTN",
        description="developpeur full stack ",
        localisation="dauala",
        niveau_experience="4 ans",
        salaire="400000F"
    )
    try:
        db_candidate= crud.create_candidate(db,candidate13)
        db_job= crud.create_job_offer(db,job_offer10)
        analyse2= schemas.AnalysisCreate(
            candidate_id=db_candidate.id,
            job_offer_id= db_job.id,
            score=resultat["score"],
            commentaire=resultat["commentaire"]
        )
        db_analysis =  crud.create_analysis(db, analyse2)
        for nom in resultat["competences_correspondantes"]:
            skill = crud.get_skill_by_name(db, nom)
            if not skill:
                   skill = crud.create_skill(
                         db,
                         schemas.SkillCreate(
                          nom=nom,
                          categorie="Technique"
                        ))           
        crud.create_analysis_skill(
        db,
        schemas.AnalysisSkillCreate(
            analysis_id=db_analysis.id,
            skill_id=skill.id,
            statut="Correspondante"
          )       )
        for nom in resultat["competences_manquantes"]:
             skill = crud.get_skill_by_name(db, nom)
        if not skill:
               skill = crud.create_skill(
                 db,
             schemas.SkillCreate(
                nom=nom,
                categorie="Technique"
                 ) )
        crud.create_analysis_skill(
              db,
             schemas.AnalysisSkillCreate(
            analysis_id=db_analysis.id,
            skill_id=skill.id,
            statut="Manquante"
        )
    )
    except Exception as e:
     print("Error:", repr(e))
     raise
    return resultat  
# requetes pour afficher les candidats, les jobs et les offres
@app.get("/candidates")
def get_candidates(db:Session = Depends(get_db)):
    return db.query(models.Canditats).all()    
@app.get("/job_offers")
def get_job_offers(db: Session = Depends(get_db)):
    return db.query(models.JobOffer).all() 
 
@app.get("/analyses")
def get_analyses(email:str=Depends(verify_token), db: Session = Depends(get_db)):
    return db.query(models.Analysis).all()  
@app.get("/dashboard/stats")
def dashboard_stats(email: str=Depends(verify_token),
                    db: Session= Depends(get_db) ):
                    nb_candidats= db.query(models.Canditats).count(),
                    nb_offre = db.query(models.JobOffer).count(),
                    nb_analyse = db.query(models.Analysis).count(),
                    score_moyenne = db.query(func.avg(models.Analysis.score)).scalar()
                    return {
                         "candidats": nb_candidats,
                         "offres": nb_offre,
                         "analyses": nb_analyse,
                         "score_moyenne": round(score_moyenne or 0, 2)
                    }                  
@app.post("/register")
def register(user: schemas.UserCreate,
              db: Session= Depends(get_db)):
    return crud.create_user(db,user)
@app.post("/login")
def login(user: schemas.Login, db: Session=Depends(get_db)):
    db_user= crud.get_user_by_email(db, user.email)
    if not db_user:
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    if not verify_password(user.pass_word, db_user.mot_de_passe):
        raise HTTPException(status_code=401, detail="Email ou mot de passe incorrect")
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token" : access_token, "token_type": "bearer"}

@app.get("/candidates/{candidate_id}")
def get_candidate(
    candidate_id: int,
    email: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    candidate = db.query(models.Canditats).filter(
        models.Canditats.id == candidate_id
    ).first()

    if not candidate:
        raise HTTPException(
            status_code=404,
            detail="Candidat introuvable"
        )
    return candidate    
@app.get("/candidates/{candidate_id}/analyses")
def get_candidate_analyses(
    candidate_id: int,
    email: str = Depends(verify_token),
    db: Session = Depends(get_db)
):
    analyses = (
        db.query(models.Analysis)
        .filter(models.Analysis.candidate_id == candidate_id)
        .all()
    )

    result = []

    for analyse in analyses:
        result.append({
            "id": analyse.id,
            "job_id": analyse.job_id,
            "job_titre": analyse.job.titre if analyse.job else "Offre inconnue",
            "score": analyse.score,
            "commentaire": analyse.commentaire,
            "date_analyse": analyse.date_analyse
        })

    return result