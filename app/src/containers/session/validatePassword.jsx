import { Form } from "react-router-dom";

import style from "./session.module.css";

export default function ValidatePassword() {

  return(
    <div className={style.container}>
      <h2 className={style.title}>Modification du mot de passe</h2>
      <Form className={style.form} method='POST'>
        <label htmlFor="password">Nouveau mot de passe</label>
        <input type="password" id="password" name="password"/>
        <label htmlFor="passwordConfirm">Confirmé le mot de passe</label>
        <input type="password" id="passwordConfirm" name="passwordConfirm"/>
        <button className={style.center}>Valider votre nouveau mot de passe</button>
      </Form>
    </div>
  );
}