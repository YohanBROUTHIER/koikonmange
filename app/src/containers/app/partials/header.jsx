import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import style from "./header.module.css";

import { useSupportType } from '../../../utils/index.js';

export default function Header() {
  const {name, isConnected, isAdmin} = useSelector((state) => state.session);
  const [menuIsVisible, setMenuIsVisible] = useState(false);

  const supportType = useSupportType();

  function toggleMenuVisibility() {
    setMenuIsVisible(!menuIsVisible);
  }

  return(
    <header className={style.header} >
      {supportType !== "mobile" ?
        <h1>KoiKon<span>Mange</span></h1>
        :
        <h1>KK<span>M</span></h1>
      }
      {supportType !== "mobile" && supportType !== "tablet" &&
        <nav className={style.nav}>
          <NavLink to="/" >Accueil</NavLink>
          <NavLink to="/proposal" >Propositions</NavLink>
          <NavLink to="/recipes" >Recettes</NavLink>                        
          {!isAdmin && isConnected &&
            <>
              <NavLink to="/favorites" >Favoris</NavLink>
              <NavLink to="/history" >Historique</NavLink>
            </>
          }
        </nav>
      }
      <button className={supportType !== "mobile" && supportType !== "tablet" ? style.button : [style.right, style.button].join(" ")} onClick={toggleMenuVisibility}>Menu</button>
      {menuIsVisible &&
        <Menu {...{name,isConnected,isAdmin,supportType,toggleMenuVisibility}} />
      }
    </header>
  );
}

function Menu({name, isConnected, isAdmin, supportType, toggleMenuVisibility}) {
  return (
    <>
      <div className={supportType === "mobile" || supportType === "tablet" ? style.menu : [style.menu, style.small].join(" ")} >
        {isConnected ?
          <p>{name}</p>
          :
          <div className={style["user-button"]}>
            <Link className={[style.button, style.fixe].join(" ")} to="/signin" onClick={toggleMenuVisibility}>Se connecter</Link>
            <Link className={[style.button, style.fixe].join(" ")} to="/signup" onClick={toggleMenuVisibility}>Créer un compte</Link>
          </div>
        }
        <nav className={style.nav}>
          {isConnected &&
            <>
              <NavLink to="/profile/dashboard" onClick={toggleMenuVisibility}>Paramètres</NavLink>
            </>
          }
          {(supportType === "mobile" || supportType === "tablet") &&
            <>
              <NavLink to="/" onClick={toggleMenuVisibility}>Accueil</NavLink>
              <NavLink to="/proposal" onClick={toggleMenuVisibility}>Propositions</NavLink>
              <NavLink to="/recipes" onClick={toggleMenuVisibility}>Recettes</NavLink>                        
              {!isAdmin && isConnected &&
                <>
                  <NavLink to="/favorites" onClick={toggleMenuVisibility}>Favoris</NavLink>
                  <NavLink to="/history" onClick={toggleMenuVisibility}>Historique</NavLink>
                </>
              }
            </>
          }
          {isConnected &&
            <NavLink to="/signout" onClick={toggleMenuVisibility}>Se déconnecter</NavLink>
          }
        </nav>
      </div>
      <div className={style.blur} onClick={toggleMenuVisibility}></div>
    </>
  );
}

