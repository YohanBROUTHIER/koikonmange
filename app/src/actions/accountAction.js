import { redirect } from "react-router-dom";
import { UserApi } from "../services/api";
import toast from "../utils/toast";
import UserValidator from "../services/validators/user.validator.js";
import store from "../store/index.js";
import types from "../store/reducers/types/index.js";

export default async function ({request}) {
  const {session} = store.getState();
  switch (request.method) {
  case "PATCH": {
    const formData = await request.formData();
    let data = {
      name: formData.get("name"),
      email: formData.get("email")
    };
    
    data = UserValidator.checkBodyForUpdate(data);
    
    const { session }= store.getState();
    
    const newUser = await UserApi.update(session.id,data);
    
    localStorage.setItem('user', JSON.stringify(newUser));
    store.dispatch({type: types.UPDATE_USER, payload:newUser});
    
    toast.success("Mise à jour du compte effectué avec succès.");
    return null;
  }
  case "DELETE": {
    const formData = await request.formData();
    if (session.email !== formData.get("email")) {
      throw new Error("Vous avez rentrer une mauvaise adresse mail.");
    }
    await UserApi.delete(session.id);
    store.dispatch({type:types.SIGNOUT});
    
    toast.success("Suppression du compte effectué avec succès.\nVous allez être redirigé.");
    await new Promise(r => setTimeout(r, 3200));
    return redirect("/");
  }
  default: {
    throw new Response("Invalide methode", { status: 405 });
  }
  }
}