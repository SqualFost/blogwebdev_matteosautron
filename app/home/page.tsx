'use client';

import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Home = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // Récupérer les posts depuis localStorage
    const storedPosts = localStorage.getItem('posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    }
    setLoading(false);
  }, []);

  return (
    <div>
      <Navbar />
      <h1>Liste des posts</h1>
      {loading ? (
        <p>Chargement...</p>
      ) : posts.length === 0 ? (
        <p>Aucun post à afficher.</p>
      ) : (
        posts.map((post, index) => (
          <div key={index}>
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <small>Posté par {post.email} le {post.time}</small>
            <img src={post.image} alt="Image du post" />
          </div>
        ))
      )}
    </div>
  );
};

export default Home;
