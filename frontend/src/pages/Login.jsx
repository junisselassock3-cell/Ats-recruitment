import { useState } from "react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [pass_word, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pass_word,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem("token", data.access_token);
      alert("Connexion réussie !");
      navigate("/historique");
    } else {
      alert(data.detail);
    }
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg p-8 rounded-lg w-96"
      >
        <h2 className="text-2xl font-bold text-center mb-6">
          Connexion
        </h2>
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 mb-4 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border p-2 mb-4 rounded"
          value={pass_word}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          
          >
          Se connecter
        </button>
      </form>
    </div>
  );
}
export default Login;