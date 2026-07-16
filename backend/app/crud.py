from sqlalchemy.orm import Session
import models
import schemas

def create_user(db:Session, user:schemas.UserCreate):
    db_user = models.User(
        nom = user.nom,
        prenom= user.prenom,
        email = user.email,
        pass_word = user.pass_word,
        role=user.role
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
        candidate_id = analysis.canditate_id,
        job_offer_id = analysis.job_offer_id,
        score = analysis.score,
        commentaire = analysis.commentaire
    )
    db.add(db_analysis)
    db.commit()
    db.refresh(db_analysis)
    return db_analysis

