from sqlalchemy import Column, Integer, String, Float, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), nullable=False)
    prenom = Column(String(100), nullable=False)
    email = Column(String(150), unique=True, nullable=False)
    mot_de_passe = Column(String(255), nullable=False)
    role = Column(String(20), default="Recruteur")
    date_creation = Column(DateTime(timezone=True),server_default=func.now())

class Canditats(Base):
    __tablename__ = "candidates"
    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), nullable=False)
    prenom = Column(String(100), nullable=False)
    email = Column(String(150), unique=True)
    telephone = Column(String(30))
    adresse = Column(String(255))
    cv_nom_fichier = Column(String(255))
    date_creation = Column(DateTime(timezone=True), server_default=func.now())
    analyses = relationship("Analysis", back_populates="candidate")

class JobOffer(Base):
    __tablename__ = "job_offers"
    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(150), nullable=False)
    entreprise = Column(String(150), nullable=False)
    description = Column(String, nullable=False)
    localisation = Column(String(150))
    niveau_experience = Column(String(100))
    salaire = Column(String(100))
    statut = Column(String(50), default="ouverte")
    date_creation = Column(DateTime(timezone=True), server_default= func.now()) 
    analyses = relationship("Analysis", back_populates="job")
class Skill(Base):
    __tablename__ = "skills"    
    id = Column(Integer, primary_key= True, index=True)
    nom = Column(String(100), unique=True, nullable=False)
    categorie = Column(String(1001))
    analysis_skill = relationship("AnalysisSkill")

class Analysis(Base):
    __tablename__ = "analyses"
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"), nullable=False)
    job_id = Column(Integer, ForeignKey("job_offers.id"), nullable=False)
    score = Column(Float, nullable=False)
    commentaire = Column(String)
    date_analyse = Column(DateTime(timezone=True), server_default=func.now())
    candidate = relationship("Canditats",  back_populates = "analyses")
    job = relationship("JobOffer", back_populates="analyses")
    analysis_skills = relationship("AnalysisSkill", back_populates="analysis")
    
class AnalysisSkill(Base):
    __tablename__ = "analysis_skills"
    id = Column(Integer, primary_key=True, index=True)
    analysis_id = Column(Integer, ForeignKey("analyses.id"), nullable=False) 
    skill_id = Column(Integer, ForeignKey("skills.id"), nullable=False)
    statut = Column(String(30), nullable=False)
    analysis = relationship("Analysis", back_populates="analysis_skills")
    skill = relationship("Skill")    
