import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import style from './footer.module.css';
import { useSupportType } from "../../../utils";

export default function Footer()  {
  const {leftMenu}= useSelector((state) => state.styles);
  const supportType = useSupportType();

  return(
    <footer className={leftMenu && (supportType === "desktop" || supportType === "large_screen") ? [style.footer, style.leftMenu].join(" ") : style.footer}>
      <p>©Koikonmange 2024</p>
      <nav className={style.nav}>
        <NavLink to="/cookie">Gestion des cookies</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>
    </footer>
  );
}