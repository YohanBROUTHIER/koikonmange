import { redirect } from "react-router-dom";
import { UserApi } from "../services/api";
import toast from "../utils/toast";
import UserValidator from "../services/validators/userValidator";

export default async function ({ request }) {
  switch (request.method) {
  case "POST": {
    let formData = await request.formData();
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      passwordConfirm: formData.get("passwordConfirm")
    };
  
    UserValidator.checkBodyForCreate(data);
  
    await UserApi.create(data);
  
    toast.success("Inscription effectué avec succès.\nVous allez être redirigé.");
    await new Promise(r => setTimeout(r, 3200));
    return redirect("/");
  }
  default: {
    throw new Response("Invalide methode", { status: 405 });
  }
  }
}