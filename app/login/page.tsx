'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Définir les types pour les états
interface User {
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Lire le fichier user.json depuis le dossier public
      const response = await fetch('/data/user.json');
      if (!response.ok) {
        throw new Error('Erreur lors de la lecture des utilisateurs');
      }

      const users: User[] = await response.json();

      // Vérifier les informations d'identification
      const user = users.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        // Stocker l'état de connexion dans localStorage
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email); // Stocker l'email de l'utilisateur connecté

        // Rediriger vers la page d'accueil
        router.push('/');
      } else {
        setErrorMessage('Email ou mot de passe incorrect.');
      }
    } catch (error) {
      console.error(error);
      setErrorMessage('Une erreur s\'est produite. Veuillez réessayer.');
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
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        <button type="submit">Valider</button>
      </form>
    </div>
  );
};

export default Login;
