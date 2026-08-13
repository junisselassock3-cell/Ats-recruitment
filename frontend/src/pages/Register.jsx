import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    pass_word: "",
    role: "Recruteur",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await response.json();

    if (response.ok) {
      alert("Inscription réussie !");
      navigate("/login");
    } else {
      alert(data.detail);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Créer un compte
        </h2>

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-3"
        />

        <input
          type="password"
          name="pass_word"
          placeholder="Mot de passe"
          onChange={handleChange}
          className="w-full border p-2 rounded mb-4"
        />

        <button
          className="w-full bg-blue-600 text-white p-2 rounded"
          type="submit"
        >
          S'inscrire
        </button>

        <p className="text-center mt-4">
          Déjà un compte ?{" "}
          <Link to="/login" className="text-blue-600">
            Se connecter
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;