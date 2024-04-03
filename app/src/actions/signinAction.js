import { redirect } from "react-router-dom";

import { UserApi } from "../services/api";
import toast from "../utils/toast";
import UserValidator from "../services/validators/userValidator";
import store from "../store";
import types from "../store/types";


export default async function ({ request }) {
  switch (request.method) {
  case "POST": {
    let formData = await request.formData();
    const idConnection = {
      email: formData.get("email"),
      password: formData.get("password")
    };
    UserValidator.checkBodyForSignIn(idConnection);
        
    const user = await UserApi.signin(idConnection);
    store.dispatch({type:types.signin, payload:user});
  
    toast.success("Connexion réussie.\nVous allez être redirigé.");
    await new Promise(r => setTimeout(r, 3200));
    return redirect("/");
  }
  default: {
    throw new Response("Invalide methode", { status: 405 });
  }
  }
}