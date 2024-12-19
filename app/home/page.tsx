import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Data from "../data/post.json"

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Charger les posts depuis le fichier JSON
    const fetchPosts = async () => {
      try {
        const response = await fetch("../data/post.json"); // Assurez-vous que le fichier est dans public/post.json
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Erreur lors du chargement des posts :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <main style={{ textAlign: "center", padding: "2rem" }}>
        <h1>Bienvenue sur Crokette</h1>
        <p>Ce blog est dédié aux chiens et à leurs aventures !</p>
        <section style={{ marginTop: "2rem" }}>
          <h2>Liste des posts</h2>
          {loading ? (
            <p>Chargement des posts...</p>
          ) : posts.length === 0 ? (
            <p>Pas encore de post.</p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              {posts.map((post, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    padding: "1rem",
                    margin: "1rem 0",
                    width: "80%",
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                  <small>
                    Posté par {post.email} le {post.time}
                  </small>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
