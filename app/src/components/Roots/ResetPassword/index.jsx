import { useState } from 'react';
import { Form, redirect} from 'react-router-dom';

import { UserApi } from "../../../api"


export default function ResetPassword() {

  const [error, setError] = useState("");


  return(
    <>
      <section className='section'>
        <Form className='section__form' method="post">
          <h2 className='section-form__h2'>Connection</h2>
          <div className='section-form__div'>
            <label htmlFor="email">Email :</label>
            <input type="email" name="email" id="email"/>
            {error?
              <p>{error}</p>
              :
              ""
            }
          </div>

          <button className='section-form__btn' type="submit">Envoyer</button>

        </Form>
      </section>
    </>
  )
}