import { redirect } from "react-router-dom";
import { UserApi } from "../../../api"
import UserValidator from "../../../helpers/validators/user.validator";
import toast from "../../../helpers/toast";

export async function validateAccountLoader({ params }) {
  try {
    UserValidator.checkUuid(params.uuid);

    await UserApi.validateAccount(params.uuid);
    setTimeout(() => toast.success("Email confirmé avec succès"), 1000)
    
    return redirect("/");
  } catch (error) {
    setTimeout(() => toast.error(error), 1000)
    return redirect("/");
  }
}