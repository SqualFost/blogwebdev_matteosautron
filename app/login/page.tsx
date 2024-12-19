"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Lire le fichier user.json depuis le dossier public
      const response = await fetch("/data/user.json");
      if (!response.ok) {
        throw new Error("Erreur lors de la lecture des utilisateurs");
      }

      const users = await response.json();

      // Vérifier les informations d'identification
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Stocker l'état de connexion dans localStorage
        localStorage.setItem("isLoggedIn", "true");
        // Rediriger vers la page d'accueil
        router.push("/");
      } else {
        setErrorMessage("Email ou mot de passe incorrect.");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <h1>Connexion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default Login;
