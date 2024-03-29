import { redirect } from "react-router-dom";
import { UserApi } from "../../api";
import toast from "../../helpers/toast";



export async function validatePasswordAction({ request, params }) {
    switch (request.method) {
      case "POST": {
        let formData = await request.formData()
        const data = {
          password: formData.get("password"),
          passwordConfirm: formData.get("passwordConfirm")
        };
        await UserApi.validatePassword(params.uuid ,data);
        
        toast.success("Mot de passe modifié avec succès.\nVous allez être redirigé.")
        await new Promise(r => setTimeout(r, 3200));
        return redirect("/");
      }
      default: {
        throw new Response("", { status: 405 });
      }
    }
  }