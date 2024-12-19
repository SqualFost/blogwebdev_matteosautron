import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en consultant localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    // Supprimer l'état de connexion de localStorage
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <nav style={{ padding: "1rem", backgroundColor: "#f8f8f8", textAlign: "center" }}>
      <a href="/" style={{ margin: "0 1rem", textDecoration: "none", color: "#0070f3" }}>
        Crokette
      </a>
      <a href="/post" style={{ margin: "0 1rem", textDecoration: "none", color: "#0070f3" }}>
            Poster
      </a>
      {isLoggedIn ? (
        <>
          <a
            href="/"
            onClick={handleLogout}
            style={{ margin: "0 1rem", textDecoration: "none", color: "#0070f3" }}
          >
            Se déconnecter
          </a>
        </>
      ) : (
        <a href="/login" style={{ margin: "0 1rem", textDecoration: "none", color: "#0070f3" }}>
          Se connecter
        </a>
      )}
    </nav>
  );
}
