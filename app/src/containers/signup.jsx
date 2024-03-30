/* eslint-disable no-unused-vars */

import { Form } from "react-router-dom";

export default function SignUp() {
  return(
    <main className='section outlet'>
      <Form className='section__form' method='POST'>
        <h2 className='section-form__h2'>Créer un compte</h2>
        <div className='section-form__div'>
          <input type="text" id="name" name="name" placeholder='Nom'/>
        </div>
        <div className='section-form__div'>
          <input type="email" id="email" name="email" placeholder='email'/>
        </div>

        <div className='section-form__div'>
          <label htmlFor="password">Mot de passe :</label>
          <input type="text" id="password" name="password" placeholder='******'/>
          <p className="section-form-div__warningPassword">*14 caractères minimums, une lettre majuscule et minuscule, un chiffre.</p>
        </div>
        <div className='section-form__div'>
          <label htmlFor="passwordConfirm">Confirmer le mot de passe :</label>
          <input type="text" id="passwordConfirm" name="passwordConfirm" placeholder='******'/>
        </div>

        <button className='section-form__btn' type="submit">Créer un compte</button>

      </Form>
    </main>
  )
}