import { redirect } from "react-router-dom";

import toast from "./toast";
import { UserApi } from "../services/api";
import store from "../store";
import types from "../store/types";

export default function (callback) {
  return async function (req) {
    try {
      return await callback(req);
    } catch (err) {
      if (err.httpStatus === 401) {
        UserApi.signout();
        store.dispatch({types:types.signout});
        return redirect("/signin");
      }
      throw err;
      toast.error(err);
      return {err};
    }
  };
}