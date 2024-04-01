import { Form, Link } from 'react-router-dom';

import style from "./session.module.css";

export default function ResetPassword() {

  return(
    <div className={style.container}>
      <h2 className={style.title}>Connection</h2>
      <Form className={style.form} method="post">
        <label htmlFor="email">Adresse mail</label>
        <input type="email" id="email" name="email" placeholder='email'/>
        <button className={style.center}>Envoyer</button>
        <Link className={[style.link, style.center].join(" ")} to="/signin">Connexion</Link>
      </Form>
    </div>
  );
}