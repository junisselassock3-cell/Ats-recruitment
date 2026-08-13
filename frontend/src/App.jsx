import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from "./components/Navebar";
import Uploadcv from "./components/UploadCV";
import ResultPage from './pages/ResultPage';
import Historique from "./pages/Historique";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App(){
  return(
    <BrowserRouter>
    <div className="min-h-screen bg-gray-100">
      <Navbar/>
      <Routes>
        <Route path="/" element={
          <main className="max-w-5xl mx-auto mt-10 px-6">
        <h2 className="text-4xl font-bold text-gray-800">
          Bienvenue sur ATS Recruit
        </h2>
        <p className="mt-4 text-gray-600 text-lg">
          Analysez automatiquement les cv et comparez-les avec une offre d'emploi grace à l'intelligence artificielle.
        </p>
        <button className="mt-8 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
          Commencer une analyse
        </button>
        <Uploadcv/>
      </main>
        }>
        </Route>
        <Route path="/resultat" element={
          <ProtectedRoute><ResultPage/></ProtectedRoute>
          }></Route>
        <Route path="/historique" element={
          <ProtectedRoute><Historique/></ProtectedRoute>
          }></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
    </div>
    </BrowserRouter>
  );
}
export default App;