import { NavLink } from "react-router-dom";
import style from "./nav.module.css";
import { useSupportType } from "../../utils";

export default function Nav() {
  const supportType = useSupportType();
  return(
    <div className={supportType === "mobile" || supportType === "tablet" ? style.menu : [style.menu, style["not-mobile"]].join(" ")}>
      <h2>Menu</h2>
      <nav className={style.nav}> 
        <NavLink to={"./dashboard"}>Profile</NavLink> 
        <NavLink to={"./diet-preferences"}>Préférences utilisateurs</NavLink>
        <NavLink to={"./account"}>Compte</NavLink>
      </nav>
    </div>
  );
}