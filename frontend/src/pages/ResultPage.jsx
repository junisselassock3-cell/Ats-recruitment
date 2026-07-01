import { useLocation } from "react-router-dom";
import ResultCard from "../components/ResultCard";
function ResultPage(){
    const { state } = useLocation();
    return (
        <div className="container mx-auto p-6">
            <ResultCard resultat={state.resultat}/>
        </div>
    );
}
export default ResultPage;