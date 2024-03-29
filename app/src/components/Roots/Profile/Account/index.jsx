import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Form, useSubmit } from "react-router-dom";

import { CiTrash } from "react-icons/ci";
import style from "./index.module.css"

export default function Account() {
  const submit = useSubmit();
  const submitRef = useRef(null);
  const session = useSelector((state) => state.session);
  const [inChange, setInChange] = useState(null);
  const [value, setValue] = useState("");

  function clickHandler(event) {
    setValue("");
    setInChange(event.target.dataset.inputId);
  }
  function changePassword() {
    submit({email: session.email}, {
      method: "post",
      action: "/reset-password"
    })
  }
  function changeValue(event) {
    setValue(event.target.value);
  }
  function submitHandler(event) {
    event.preventDefault();
    if (inChange !== "delete") {
      const data = {};
      data[inChange] = value;
      submit(data,{method: "patch"})
    } else {
      submit({email:value},{method: "delete"});
    }
    setValue("");
    setInChange(null);
  }

  return(
    <main className={`${style.main} sectionProfile sectionProfile--Main`}>
      <h2>Compte</h2>
      <Form ref={submitRef} className={style.form} method="patch" onSubmit={submitHandler}>
        <fieldset>
          
            <label htmlFor="name">Nom :</label>
            <input type="text" id="name" value={inChange !== "name" ? session.name : value} onChange={changeValue} disabled={inChange !== "name" ? true : false}/>
         
          
          {inChange !== "name" ?
          <>
            <button type="button" data-input-id="name" onClick={clickHandler} >Changer</button>
          </>
          :
          <>
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button data-input-id="name" >Valider</button>
          </>
          }
        </fieldset>

        <fieldset>
          <label htmlFor="email">Email :</label>
          <input type="email" id="email" value={inChange !== "email" ? session.email : value} onChange={changeValue} disabled={inChange !== "email" ? true : false}/>
          {inChange !== "email" ?
          <>
            <button type="button" data-input-id="email" onClick={clickHandler} >Changer</button>
          </>
          :
          <>
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button data-input-id="email" >Valider</button>
          </>
          }
        </fieldset>

        <fieldset>
          <label htmlFor="password">Mot de passe :</label>
          <input type="password" id="password" defaultValue={"*******"}  disabled/>
          {inChange !== "password" ?
          <>
            <button type="button" data-input-id="password" onClick={clickHandler} >Changer</button>
          </>
          :
          <>
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button type="button" data-input-id="password" onClick={changePassword} >Confirmer</button>
          </>
          }
        </fieldset>

        <fieldset className={style.fieldDelete}>
          
          {inChange !== "delete" ?
          <>
            <h3>Supprimer mon compte</h3>
            <button type="button" className={style.btnDelete} data-input-id="delete" onClick={clickHandler} ><CiTrash size={28} /></button>
          </>
          :
          <>
            <input type="email" placeholder="Entrez votre email." value={value} onChange={changeValue} />
            <button type="button" data-input-id={null} onClick={clickHandler} >Annuler</button>
            <button data-input-id="password" >Valider</button>
          </>
          }
        </fieldset>
      </Form>
    </main>
  )
}