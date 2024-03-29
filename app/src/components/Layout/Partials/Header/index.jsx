import './Header.css';
import { useRef, useState } from 'react';
import store from '../../../../store';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";

import { NavLink } from "react-router-dom";

import BurgerMenu from '../../UXElements/components/BurgerMenu';
import types from '../../../../store/reducers/types';

const Header = () => {
    const {isAside} = useSelector((state) => state.isAside);

    const dispatch = useDispatch()

    const boxProfile = useRef();
    const headerRightSideElement = useRef();

    const {isConnected} = useSelector((state) => state.session);
    const {name} = useSelector((state) => state.session);
    const {isAdmin} =useSelector((state) => state.session);
    const [isBox, setBox] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate=  useNavigate();
    const {search} = useLocation();
    const handleClick = (event) => {
        
        const widthBox = boxProfile.current.offsetWidth;
        setBox(!isBox)
        
        if (isBox) {
            boxProfile.current.style.transform = `translateX(${widthBox+10}px)`;
           

        } else {
            boxProfile.current.style.transform = `translateX(-${widthBox+17}px)`;
            
        }
        
    }

    const handleClickBurgerMenu = () => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen)
    };

    const handleClickDeconnexion = () => {
        localStorage.removeItem("user");
        dispatch({type:types.SIGNOUT})
        location.reload();
        navigate("/");
    };


    return(
        <>
            <header id="header" className="header" style={isAside? {gridColumn: '2 / -1'}:{gridColumn: '1 / -1'} }>
                <h1>KoiKon<span>Mange</span></h1>
                <h2 className="headerH1initial hidden">KK<span>M</span></h2>
                <div ref={headerRightSideElement} className={menuOpen?'header__middleSide':'header__middleSide hideNav'}>
                    <nav className="header-middleSide__nav">
                        <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/${search && search}`} >Accueil</NavLink>
                        <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/proposal${search && search}`}>Propositions</NavLink>
                        
                        {!isAdmin?
                            isConnected?
                            <>
                                <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/favorites${search && search}`}>Favoris</NavLink>
                                <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/history${search && search}`}>Historique</NavLink>
                            </>
                                :
                                ""
                                :
                                ""}
                        
                        <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/recipes${search && search}`}>Recettes</NavLink>
                    </nav>
                </div>
                <div className='header-rightSide'>
                    <CgProfile onClick={handleClick}  className="iconProfile"/>
                    {isConnected?
                        <div ref={boxProfile} className='header-rightSide__boxProfile'>
                            
                            <p>{name}</p> 
                            <NavLink className="header-rightSide-boxProfile__settings" to="/profil">Paramètres <IoIosSettings/></NavLink>
                            <button className="btnBoxProfil" onClick={handleClickDeconnexion}>Se déconnecter</button>
                        
                        </div>
                        :
                        <div ref={boxProfile} className='header-rightSide__boxProfile'>
                            
                            <NavLink to={`/signin${search && search}`}>
                                <button className="btnBoxProfil">Se connecter</button>
                            </NavLink>
                            
                            <NavLink to={`/signup${search && search}`}>
                                <button className="btnBoxProfil">Créer un compte</button>
                            </NavLink>
                        </div> 
                        }

                    <BurgerMenu handleClick={handleClickBurgerMenu} color={{background:"var(--colorOrange)"}}/>
                </div>
                
            </header>
        </>
    )
}

export default Header;