import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, NavLink, useSubmit } from 'react-router-dom';

import style from "./header.module.css";

import { iconesPath, useSupportType } from '../../../utils/index.js';

export default function Header() {
  const {name, isConnected, isAdmin} = useSelector((state) => state.session);
  const {leftMenu}= useSelector((state) => state.styles);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const supportType = useSupportType();
  
  function toggleMenuVisibility() {
    setMenuIsVisible(!menuIsVisible);
  }

  return(
    <>
    
      <header className={leftMenu && (supportType === "desktop" || supportType === "large_screen") ? [style.header, style.leftMenu].join(" ") : style.header} >
        {supportType === "mobile" || (supportType !== "mobile"  && leftMenu) ?
          <h1>KK<span>M</span></h1>
          :
          <h1>KoiKon<span>Mange</span></h1>
        }
        {(supportType === "desktop" || supportType === "large_screen") &&
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
        {supportType === "desktop" || supportType === "large_screen" ?
          <button className={[style.button, style.menu].join(" ")} onClick={toggleMenuVisibility}><img src={iconesPath.menu}/></button>
          :
          //Icone a modifier pour afficher l'icone d'un utilisateur
          <button className={[style.right, style.button, style.menu].join(" ")} onClick={toggleMenuVisibility}><img src={iconesPath.menu}/></button>
        }
        {menuIsVisible &&
        <Menu {...{name,isConnected,isAdmin,supportType,toggleMenuVisibility}} />
        }
      </header>
      {menuIsVisible &&
        <div className={style.blur} onClick={toggleMenuVisibility}></div>
      }
    </>
  );
}

function Menu({name, isConnected, isAdmin, supportType, toggleMenuVisibility}) {
  const submit = useSubmit();
  function signout() {
    submit(null,{method:"POST",action:"/signout"});
    toggleMenuVisibility();
  }
  return (
    <>
      <div className={supportType === "mobile" ? style.menu : [style.menu, style.small].join(" ")} >
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
        </nav>
        {isConnected &&
          <button className={style.button} onClick={signout}>Se déconnecter</button>
        }
      </div>
    </>
  );
}

