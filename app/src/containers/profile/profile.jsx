import { Outlet } from "react-router-dom";

import Nav from "./nav";
import { useSupportType } from "../../utils";

export default function Profil() {
  const supportType = useSupportType();
  return(
    <>
      <Nav />
      <main className={supportType !== "mobile" && supportType !== "tablet" ? "small" : ""}>
        <Outlet />
      </main>
    </>
  );
}