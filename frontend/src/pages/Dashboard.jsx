import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import StatsChart from "../components/StatsChart";

function Dashboard() {  
  const navigate = useNavigate();
    const [stats, setStats] = useState({
    candidats: 0,
    offres: 0,
    analyses: 0,
    score_moyenne: 0,

  });

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.log(err));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-100">

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white shadow-lg">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold">ATS Recruit</h1>
          <p className="text-sm text-slate-400">Gestion de recrutement</p>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-4">
            <li className="bg-blue-600 rounded-lg px-4 py-3 cursor-pointer">
              🏠 Dashboard
            </li>

            <li className="hover:bg-slate-700 rounded-lg px-4 py-3 cursor-pointer" 
            onClick={() => navigate("/candidates")}
            >
              👥 Candidats
            </li>

            <li className="hover:bg-slate-700 rounded-lg px-4 py-3 cursor-pointer">
              💼 Offres
            </li>

            <li className="hover:bg-slate-700 rounded-lg px-4 py-3 cursor-pointer">
              📊 Analyses
            </li>

            <li className="hover:bg-slate-700 rounded-lg px-4 py-3 cursor-pointer">
              ⚙️ Paramètres
            </li>
          </ul>
        </nav>
      </aside>

      {/* Contenu principal */}
      <main className="ml-64">

        {/* Navbar */}
        <header className="bg-white shadow flex justify-between items-center px-8 py-5">

          <h2 className="text-3xl font-bold text-slate-800">
            Dashboard
          </h2>

          <button
            onClick={logout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
          >
            Déconnexion
          </button>

        </header>

        <div className="p-8">

          {/* Cartes */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500">👥 Candidats</p>
              <h2 className="text-4xl font-bold mt-2">{stats.candidats}</h2>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500">💼 Offres</p>
              <h2 className="text-4xl font-bold mt-2">{stats.offres}</h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500">📊 Analyses</p>
              <h2 className="text-4xl font-bold mt-2">{stats.analyses}</h2>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <p className="text-gray-500">⭐ Score moyen</p>
              <h2 className="text-4xl font-bold mt-2">{stats.score_moyenne}%</h2>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg mt-8 p-6">
              <h2 className="text-2xl font-bold mb-4">
                  Statistiques générales
              </h2>
               <StatsChart stats={stats} />
          </div>
          {/* Tableau */}
          <div className="bg-white rounded-xl shadow-lg mt-10 p-6">
            <h2 className="text-2xl font-bold mb-6">
              Dernières analyses
            </h2>
            <table className="w-full">
              <thead className="bg-slate-200">
                <tr>
                  <th className="p-3 text-left">ID</th>
                  <th className="p-3 text-left">Candidat</th>
                  <th className="p-3 text-left">Score</th>
                  <th className="p-3 text-left">Commentaire</th>
                </tr>
              </thead>
              <tbody>

                <tr className="border-b">

                  <td className="p-3">1</td>
                  <td className="p-3">Jean Dupont</td>
                  <td className="p-3">90%</td>
                  <td className="p-3">Excellent profil</td>

                </tr>

                <tr className="border-b">

                  <td className="p-3">2</td>
                  <td className="p-3">Marie Paul</td>
                  <td className="p-3">82%</td>
                  <td className="p-3">Bon profil</td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </main>

    </div>
  );
}
export default Dashboard;