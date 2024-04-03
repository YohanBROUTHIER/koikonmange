import { redirect } from "react-router-dom";
import { UserApi } from "../../services/api";
import UserValidator from "../../services/validators/userValidator";
import toast from "../../utils/toast";

export default async function ({ params }) {
  try {
    UserValidator.checkUuid(params.uuid);

    await UserApi.validateAccount(params.uuid);
    setTimeout(() => toast.success("Email confirmé avec succès"), 1000);
    
    return redirect("/");
  } catch (error) {
    setTimeout(() => toast.error(error), 1000);
    return redirect("/");
  }
}