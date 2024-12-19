'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Post = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null); // Pour stocker l'email de l'utilisateur connecté
  const router = useRouter();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en vérifiant localStorage
    const loggedIn = localStorage.getItem('isLoggedIn');
    const email = localStorage.getItem('userEmail'); // Récupérer l'email de l'utilisateur connecté

    if (loggedIn !== 'true' || !email) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      router.push('/login');
    } else {
      setIsLoggedIn(true);
      setUserEmail(email); // Stocker l'email de l'utilisateur connecté
    }
  }, [router]);

  const handlePost = () => {
    if (!title || !description) {
      setSuccess('Veuillez remplir tous les champs.');
      return;
    }

    const newPost = {
      title,
      description,
      time: new Date().toLocaleString(),
      email: userEmail, // Utiliser l'email de l'utilisateur connecté
      image: 'https://placedog.net/500?random=1', // Image aléatoire de chien
    };

    // Récupérer les posts existants depuis localStorage
    const existingPosts = JSON.parse(localStorage.getItem('posts') || '[]');

    // Ajouter le nouveau post à la liste existante
    existingPosts.push(newPost);

    // Sauvegarder les posts dans localStorage
    localStorage.setItem('posts', JSON.stringify(existingPosts));

    setSuccess('Votre post a été créé avec succès !');
  };

  return (
    <div>
      <h1>Créer un post</h1>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <input
        type="text"
        placeholder="Titre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button onClick={handlePost}>Valider</button>
    </div>
  );
};

export default Post;
