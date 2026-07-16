import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ResultCard from "../components/ResultCard";
function ResultPage(){
    const { state } = useLocation();
    const navigate = useNavigate();
    return (
        <div className="container mx-auto p-6">
            <button
                onClick={() => navigate("/")}
                 className="mb-6 bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition"
            >
                  ← Retour
            </button>
            <ResultCard resultat={state.resultat}/>
        </div>
        
    );
}
export default ResultPage;