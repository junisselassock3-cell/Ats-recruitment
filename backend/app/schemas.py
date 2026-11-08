from pydantic import BaseModel
from datetime import datetime
class UserBase(BaseModel):
    nom: str
    prenom: str
    email: str
    role: str
class UserCreate(UserBase):
    pass_word: str

class CandidateBase(BaseModel):
    nom: str
    prenom: str
    email: str
    telephone: str | None = None
    adresse : str | None = None
class CandidateCreate(CandidateBase):
    cv_nom: str
class JobOfferBase(BaseModel):
    titre: str
    entreprise: str
    description: str
    localisation:str | None=None
    niveau_experience: str | None=None
    salaire: str|None = None
class JobOfferCreate(JobOfferBase):
    pass
class SkillBase(BaseModel):
    nom: str
    categorie: str | None = None
class SkillCreate(SkillBase):
    pass
class AnalysisBase(BaseModel):
    score: float
    commentaire: str
class AnalysisCreate(AnalysisBase):
    candidate_id: int
    job_offer_id: int      
class AnalysisSkillBase(BaseModel):
    analysis_id: int
    skill_id: int
    statut: str
class AnalysisSkillCreate(AnalysisSkillBase):
    pass
class Login(BaseModel):
    email:str
    pass_word: str

            
