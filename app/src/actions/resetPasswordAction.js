import { redirect } from "react-router-dom";
import { UserApi } from "../services/api";


export default async function ({ request }) {
  switch (request.method) {
  case "POST": {
    let formData = await request.formData();
    const email = formData.get("email");
    await UserApi.RequestResetPasword({email});
  
    return redirect("/signin");
  }
  default: {
    throw new Response("", { status: 405 });
  }
  }
}