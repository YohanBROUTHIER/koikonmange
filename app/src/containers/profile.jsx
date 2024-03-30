import Nav from "../components/Partials/navprofil";
import { Outlet } from "react-router-dom";
import './profile.css';

export default function Profil() {
  return(
    <main className="section app-wrapper">
      <Nav />
      <Outlet />
    </main>
  );
}