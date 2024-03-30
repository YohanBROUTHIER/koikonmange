import { Form, Link } from "react-router-dom";

import style from "./session.module.css";

export default function SignUp() {
  return(
    <>
      <h2 className={style.title}>Créer un compte</h2>
      <Form className={style.form} method='POST'>
        <label htmlFor="name">Nom d&apos;utilisateur</label>
        <input type="text" id="name" name="name" placeholder='Nom'/>
        <label htmlFor="email">Adresse mail</label>
        <input type="email" id="email" name="email" placeholder='email'/>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" id="password" name="password" placeholder='******'/>
        <label htmlFor="passwordConfirm">Confirmer le mot de passe</label>
        <input type="password" id="passwordConfirm" name="passwordConfirm" placeholder='******'/>
        <button className={style.center}>Créer un compte</button>
        <Link className={[style.link, style.center].join(" ")} to="/signin">Vous avez déjà un compte ? Connexion</Link>
      </Form>
    </>
  );
}