'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";

export default function Post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    
    // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  const handlePost = () => {
    if (!title || !description) {
      setSuccess("Veuillez remplir tous les champs.");
      return;
    }

    const newPost = {
      title,
      description,
      time: new Date().toLocaleString(),
      email: "user@email.com", // Utilisateur connecté
    };

    // Ajout du post dans le fichier JSON (simulé ici avec un console.log)
    console.log("Post créé :", newPost);
    setSuccess("Votre post a été créé avec succès !");
  };

  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Créer un post</h1>
        {success && <p style={{ color: "green" }}>{success}</p>}
        <div style={{ margin: "1rem" }}>
          <input
            type="text"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "0.5rem", margin: "0.5rem" }}
          />
        </div>
        <div style={{ margin: "1rem" }}>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: "0.5rem", margin: "0.5rem", width: "80%" }}
          />
        </div>
        <button
          onClick={handlePost}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: "#0070f3",
            color: "#fff",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Valider
        </button>
      </main>
    </div>
  );
}
