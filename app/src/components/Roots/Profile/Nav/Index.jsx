import { NavLink } from "react-router-dom";
import style from "./index.module.css";

export default function Nav() {

  return(
    <nav className={`${style.nav} sectionProfile sectionProfile--Nav`}>
      <h2>Menu</h2>
      <ul> 
        <NavLink to={"/profil"}>Profil</NavLink> 
        <NavLink to={"/profil/diet-preferences"}>Préférences utilisateurs</NavLink>
        <NavLink to={"/profil/account"}>Compte</NavLink>
      </ul>
    </nav>
  )
}