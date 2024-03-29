/* eslint-disable no-unused-vars */

import { Form, redirect } from "react-router-dom";
import { UserApi } from "../../../api"
import toast from "../../../helpers/toast";

export default function ValidatePassword() {

  return(
    <>
      <section className='section'>
        <Form className='section__form' method='POST'>
          
          <div className='section-form__divPassword'>
            <label htmlFor="password">Nouveau mot de passe :</label>
            <input type="text" id="password" name="password"/>
          </div>
          <div className='section-form__divPassword'>
            <label htmlFor="passwordConfirm">Confirmé le mot de passe :</label>
            <input type="text" id="passwordConfirm" name="passwordConfirm"/>
          </div>

          <button className='section_form--btn' type="submit">Valider votre nouveau mot de passe</button>

        </Form>
      </section>
    </>
  )
}