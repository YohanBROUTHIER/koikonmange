import { redirect } from "react-router-dom";
import { UserApi } from "../../api";
import toast from "../../helpers/toast";
import UserValidator from "../../helpers/validators/user.validator";


export async function signUpAction({ request, params }) {
    switch (request.method) {
      case "POST": {
        let formData = await request.formData()
        const data = {
          name: formData.get("name"),
          email: formData.get("email"),
          password: formData.get("password"),
          passwordConfirm: formData.get("passwordConfirm")
        };
  
        UserValidator.checkBodyForCreate(data)
  
        await UserApi.create(data);
  
        toast.success("Inscription effectué avec succès.\nVous allez être redirigé.")
        await new Promise(r => setTimeout(r, 3200));
        return redirect("/");
      }
      default: {
        throw new Response("Invalide methode", { status: 405 });
      }
    }
  }