import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
function Historique(){
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.removeItem("token");
        navigate("/login");
    };
    const [analyses, setAnalyses] = useState([]);
    
    useEffect(()=>{
        const token = localStorage.getItem("token");
        if(!token){
            navigate("/login")
            return;
        }
        fetch("http://127.0.0.1:8000/analyses",{
            headers:{
               Authorization: `Bearer ${token}`,
            }
        }

        )
        .then((res)=> res.json())
        .then((data)=>setAnalyses(data))
        .catch((err)=>console.log(err));
    },[]);
    return(
        <div>
            <button onClick={logout}>Déconnexion </button>
            <h2>Historiques des analyses</h2>
           
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Score</th>
                        <th>Commentaire</th>
                    </tr>
                </thead>
                <tbody>
                    {analyses.map((analyse)=>
                    (<tr key={analyse.id}>
                        <td>{analyse.id}</td>
                        <td>{analyse.score}%</td>
                        <td>{analyse.commentaire}</td>
                    </tr>   
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default Historique
