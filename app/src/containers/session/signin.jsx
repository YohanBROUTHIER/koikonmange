import { Form, Link} from 'react-router-dom';

import style from "./session.module.css";

export default function SignIn() {

  return (
    <div className={style.container}>
      <h2 className={style.title}>Se connecter</h2>
      <Form className={style.form} method="post">
        <label htmlFor="email">Adresse mail</label>
        <input type="email" name="email" id="email" placeholder='Email'/>
        <label htmlFor="password">Mot de passe</label>
        <input type="password" name="password" id="password" placeholder='******'/>
        <button className={style.center}>Connection</button>
        <Link className={[style.link, style.center].join(" ")} to="/reset-password"> Mot de passe oublié ? </Link>
        <Link className={[style.link, style.center].join(" ")} to="/signup">Pas encore de compte ? Créer un compte</Link>
      </Form>
    </div>
  );
}