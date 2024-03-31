import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import style from './footer.module.css';

export default function Footer()  {
  const {leftMenu}= useSelector((state) => state.styles);
  return(
    <footer className={leftMenu ? [style.footer, style.leftMenu].join(" ") : style.footer}>
      <p>©Koikonmange 2024</p>
      <nav className={style.nav}>
        <NavLink to="/cookie">Gestion des cookies</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </footer>
  );
}