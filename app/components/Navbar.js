import Link from "next/link";

const Navbar = () => (
  <nav>
    <div>
      <h1>Crokette</h1>
    </div>
    <div>
      <Link href="/home">Accueil</Link>
      <Link href="/login">Connexion</Link>
      <Link href="/post">Poster</Link>
    </div>
  </nav>
);

export default Navbar;
