from sqlalchemy.orm import Session
import models
import schemas
import security
def create_user(db:Session, user:schemas.UserCreate):
    db_user = models.User(
        nom = user.nom,
        prenom= user.prenom,
        email = user.email,
        role=user.role,
    mot_de_passe =security.hash_password(user.pass_word)    
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user
def create_candidate(db:Session, candidate: schemas.CandidateCreate):
    db_candidate = models.Canditats(
        nom = candidate.nom,
        prenom = candidate.prenom,
        email = candidate.email,
        telephone = candidate.telephone,
        adresse= candidate.adresse,
        cv_nom_fichier = candidate.cv_nom
    ) 
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    return db_candidate
def create_job_offer(db:Session, job:schemas.JobOfferCreate):
    db_job = models.JobOffer(
        titre= job.titre,
        entreprise= job.entreprise,
        description = job.description,
        localisation= job.localisation,
        niveau_experience= job.niveau_experience,
        salaire = job.salaire
    )
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    return db_job
def create_skill(db: Session, skill:schemas.SkillCreate):
    db_skill = models.Skill(
        nom = skill.nom,
        categorie=skill.categorie
    )
    db.add(db_skill)
    db.commit()
    db.refresh(db_skill)
    return db_skill
def create_analysis(db: Session, analysis: schemas.AnalysisCreate):
    db_analysis = models.Analysis(
        candidate_id = analysis.candidate_id,
        job_id=analysis.job_offer_id,
        score = analysis.score,
        commentaire = analysis.commentaire
    )
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis
def get_skill_by_name(db: Session, nom: str):
    return db.query(models.Skill).filter(models.Skill.nom == nom).first()
def create_analysis_skill(db: Session, analysis_skill: schemas.AnalysisSkillCreate):
    db_analysis_skill = models.AnalysisSkill(
        analysis_id=analysis_skill.analysis_id,
        skill_id=analysis_skill.skill_id,
        statut=analysis_skill.statut
    )
    db.add(db_analysis_skill)
    db.commit()
    db.refresh(db_analysis_skill)
    return db_analysis_skill
def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email==email).first()