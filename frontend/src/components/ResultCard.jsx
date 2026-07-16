function ResultCard({resultat}){
    console.log(resultat);
    if(!resultat){
        return null;
    }
    let scoreColor = "text-red-600";

      if (resultat.score >= 80) {
             scoreColor = "text-green-600";
       }
        else if (resultat.score >= 60) {
         scoreColor = "text-yellow-600";
        }
    return(
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-4"> Résultat de l'analyse</h2>
            <p className={`text-xl font-semibold ${scoreColor}`}>
                Score ATS : {resultat.score}%
            </p>
            <div className="w-full bg-gray-200 rounded-full h-4 mt-4">
                <div
                    className="bg-green-600 h-4 rounded-full transition-all duration-700"
                    style={{ width: `${resultat.score}%` }}
               ></div>
            </div>
            <p className="mt-3 text-lg font-medium text-gray-700">
                {resultat.commentaire}
            </p>
            
            <div className="mt-4">
                <h3 className="font-semibold">Compétences du cv</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                    {resultat.competences_cv?.map((competence, index) => (
                      <span
                                  key={index}
                                 className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                         >
                                  {competence}
                          </span>
                               ))}
                </div>
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