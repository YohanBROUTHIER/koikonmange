import { redirect } from "react-router-dom";
import { UserApi } from "../services/api";
import toast from "../utils/toast";
import store from "../store";


export default async function ({ request }) {
  switch (request.method) {
  case "POST": {
    UserApi.signout();
    store.dispatch({type:"SIGNOUT"});
    toast.success("Déconnexion réussie.");
    return redirect("/");
  }
  default: {
    throw new Response("Invalide methode", { status: 405 });
  }
  }
}