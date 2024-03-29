import { NavLink } from "react-router-dom";
import style from './Footer.module.css'
import { useSelector } from "react-redux";

const Footer = () => {
    const {isAside} = useSelector((state) => state.isAside);

    return(
        <footer id="footer" className={style.footer} style={isAside? {gridColumn: '2 / -1'}:{gridColumn: '1 / -1'} }>
            <div>
                <p>©Koikonmange 2024</p>
                <NavLink>Gestion des cookies</NavLink>
                <NavLink>Contact</NavLink>
            </div>
            <img src="/logo1.png" alt="Logo de Koikonmange" />
        </footer>
    )
}

export default Footer;