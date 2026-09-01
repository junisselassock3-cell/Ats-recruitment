import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function CandidateDetail() {
  const { id } = useParams();

  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [analyses, setAnalyses] = useState([]);

  useEffect(() => {
  const token = localStorage.getItem("token");

  fetch(`http://127.0.0.1:8000/candidates/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Candidat introuvable");
      }

      return response.json();
    })
    .then((data) => {
      setCandidate(data);
    })
    .catch((error) => {
      console.error(error);
    });

  fetch(`http://127.0.0.1:8000/candidates/${id}/analyses`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      setAnalyses(data);
      setLoading(false);
    })
    .catch((error) => {
      console.error(error);
      setLoading(false);
    });
}, [id]);

  if (loading) {
    return <p className="p-6">Chargement...</p>;
  }

  if (!candidate) {
    return <p className="p-6">Candidat introuvable.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Profil du candidat
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">
          {candidate.nom} {candidate.prenom}
        </h2>

        <p className="mb-2">
          <strong>Email :</strong> {candidate.email}
        </p>

        <p className="mb-2">
          <strong>Téléphone :</strong>{" "}
          {candidate.telephone || "-"}
        </p>

        <p className="mb-2">
          <strong>Adresse :</strong>{" "}
          {candidate.adresse || "-"}
        </p>
        <p>
          <strong>CV :</strong>{" "}
          {candidate.cv_nom || "-"}
        </p>
      </div>
      <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
        <h2 className="text-2xl font-bold mb-6"> Historique des analyses </h2>

         {analyses.length === 0 ? (
         <p className="text-gray-500"> Aucune analyse pour ce candidat.</p>) : (
         <div className="overflow-x-auto">
           <table className="w-full">
             <thead>
               <tr className="border-b">
                 <th className="p-4 text-left">ID</th>
                 <th className="p-4 text-left">Offre</th>
                 <th className="p-4 text-left">Score</th>
                 <th className="p-4 text-left">Commentaire</th>
                 <th className="p-4 text-left">Date</th>
              </tr>
             </thead>

             <tbody>
               {analyses.map((analyse) => (
               <tr key={analyse.id} className="border-b">
                 <td className="p-4">{analyse.id}</td>
                 <td className="p-4">{analyse.job_id}</td>
                 <td className="p-4 font-semibold">{analyse.score}%</td>
                 <td className="p-4">{analyse.commentaire}</td>
                 <td className="p-4">{analyse.date_analyse  ? new Date(  analyse.date_analyse ).toLocaleDateString("fr-FR") : "-"}</td>
               </tr> ))}
             </tbody>
            </table>
          </div> )}
        </div>
      

    </div>
  );
}

export default CandidateDetail;