import Nav from "./Nav/Index";
import { Outlet } from "react-router-dom";
import './Profile.css'

export default function Profil() {
  return(
    <main className="section app-wrapper">
        <Nav />
        <Outlet />
    </main>
  )
}