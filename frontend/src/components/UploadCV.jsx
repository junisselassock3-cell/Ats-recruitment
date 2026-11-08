import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ResultCard from "./ResultCard";
function Uploadcv(){
    const navigate = useNavigate();
    const [cvFile, setCvFile] = useState(null);
    const [offre, setOffre] = useState("");
    const [resultat, setResultat] = useState("");
    const handleSubmit = async () => {
        console.log("Bouton cliqué");
        if(!cvFile || !offre ){
            alert("Veillez sélectionner un cv et saisir une offre d'emploi.");
            return;
        }
        const formDate = new FormData();
        formDate.append("file",cvFile);
        formDate.append("offre",offre)
        try{
            const response = await fetch("http://127.0.0.1:8000/analyse-cv",
                {
                    method: "POST",
                    body: formDate,
                }
            );
            if(!response.ok){
                throw new Error("Erreur lors de l'analyse");
            }
            const data = await response.json();
            navigate("/resultat",{state:{resultat: data},});
        }catch (error){
            console.error(error);
            alert("Impossible de contacter le serveur.");
        };
        

    }
    return(
        <div className="bg-white rounded-xl shadow-lg p-6 mt-10">
            <h2 className="text-2xl font-semibold mb-6">Analyse d'un cv</h2>
            <div className="border-2 border-dashed border-blue-400 rounded-lg p-8 text-center bg-gray-50">
                <label className="cursor-pointer">
                    <span className="text-blue-700 font-semibold"> Sélectionner un cv (PDF)</span>
                    <input type="file"
                        accept=".pdf" 
                        onChange={(e) => {
                        setCvFile(e.target.files[0])}     
                 }
                 className="hidden" /> 
                </label>
                 {cvFile ? (
                    <p className="mt-4 text-green-600 font-medium">
                         {cvFile.name}
                    </p>
                 ):(
                    <p className="mt-4 text-gray-500">
                        Aucun cv sélectionné
                    </p>
                 ) }         
            </div>
            <div className="mb-6">
                <label className="block font-medium mb-2">Offre d'emploi</label>
                <textarea 
                rows="8"
                value={offre}
                onChange={(e) => setOffre(e.target.value)}
                 placeholder="Collez ici le texte de l'offre d'emploi ..."
                 className="w-full border rounded-lg p-3"></textarea>
            </div>

            <button onClick={handleSubmit} className="bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
                Analyse le cv
            </button>
            <ResultCard resultat={resultat}/>

        </div>
    );
    
}

export default Uploadcv;
