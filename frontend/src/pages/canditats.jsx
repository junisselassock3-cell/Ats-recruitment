import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/candidates", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erreur lors du chargement des candidats");
        }
        return response.json();
      })
      .then((data) => {
        setCandidates(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="p-6">Chargement des candidats...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Candidats
      </h1>
      {candidates.length === 0 ? (<p>Aucun candidat enregistré.</p>) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead>
              <th className="p-4 text-left">Actions</th>
              <tr className="border-b">
                <th className="p-4 text-left">ID</th>
                <th className="p-4 text-left">Nom</th>
                <th className="p-4 text-left">Prénom</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Téléphone</th>
                <th className="p-4 text-left">CV</th>
              </tr>
            </thead>

            <tbody>
              {candidates.map((candidate) => (
                <tr key={candidate.id} className="border-b">
                  <td className="p-4">{candidate.id}</td>
                  <td className="p-4">{candidate.nom}</td>
                  <td className="p-4">{candidate.prenom}</td>
                  <td className="p-4">{candidate.email}</td>
                  <td className="p-4">
                    {candidate.telephone || "-"}
                  </td>
                  <td className="p-4">
                    {candidate.cv_nom || "-"}
                  </td>
                  <td className="p-4">
                      <button
                        onClick={() => navigate(`/candidates/${candidate.id}`)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                                Voir
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Candidates;