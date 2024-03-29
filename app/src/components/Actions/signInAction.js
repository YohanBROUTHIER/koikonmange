import { redirect } from "react-router-dom";
import { UserApi } from "../../api";
import toast from "../../helpers/toast";
import UserValidator from "../../helpers/validators/user.validator";
import store from "../../store";


export async function signInAction({ request }) {
    switch (request.method) {
      case "POST": {
        let formData = await request.formData()
        const idConnection = {
          email: formData.get("email"),
          password: formData.get("password")
        };
        UserValidator.checkBodyForSignIn(idConnection)
        
        const user = await UserApi.signin(idConnection)
        store.dispatch({type:"SIGNIN", payload:user});
  
        toast.success("Connexion réussie.\nVous allez être redirigé.")
        await new Promise(r => setTimeout(r, 3200));
        return redirect("/");
      }
      default: {
        throw new Response("Invalide methode", { status: 405 });
      }
    }
  }