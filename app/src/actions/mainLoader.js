/* eslint-disable react/display-name */
import store from "../store";
import types from "../store/types";

export default function () {
  store.dispatch({type:types.removeLeftMenu});

  return null;
}