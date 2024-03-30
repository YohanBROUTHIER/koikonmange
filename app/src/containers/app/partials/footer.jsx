import { NavLink } from "react-router-dom";
import style from './footer.module.css';

export default function Footer()  {
  return(
    <footer className={style.footer}>
      <p>©Koikonmange 2024</p>
      <nav className={style.nav}>
        <NavLink to="/cookie">Gestion des cookies</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </footer>
  );
}