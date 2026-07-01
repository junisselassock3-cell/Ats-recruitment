function ResultCard({resultat}){
    console.log(resultat);
    if(!resultat){
        return null;
    }
    return(
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4"> Résultat de l'analyse</h2>
            <p className="text-xl font-semibold text-blue-700">
                Score ATS : {resultat.score}%
            </p>
            <div className="mt-4">
                <h3 className="font-semibold">Compétences du cv</h3>
                <ul className="list-disc ml-6">{resultat.competences_cv?.map((competence,index) =>(
                    <li key={index}>{competence}</li>
                 )   )}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">Compétences correspondantes</h3>
                <ul className="list-disc ml-6">
                    {resultat.competences_correspondantes?.map((competence,index)=>(
                        <li key={index}>{competence}</li>
                    ))}
                </ul>
            </div>
            <div className="mt-4">
                <h3 className="font-semibold">Compétences manquantes</h3>
                <ul className="list-disc ml-6">
                    {resultat.competences_manquantes?.map((competence,index)=>(
                        <li key={index}>{competence}</li>
                    ))}
                </ul>
            </div>

        </div>
    );
}
export default ResultCard;