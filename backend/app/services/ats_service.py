def analyser_cv(texte, offre):
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
        "github",
        "docker",
        "rubit"
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
    if len(competences_offre) >  0:
        score= (
            len(competence_corres) / len(competences_offre)
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