import emailValidator from "email-validator";

import CoreValidator from "./core.validator.js";

export default class UserValidator extends CoreValidator {
  static checkBodyForCreate({name, email, password, passwordConfirm}) {
    if (!name || !String(name).match(/^[a-zA-Z][\w-]{3,20}$/)) {
      throw new Error("Merci de renseigner votre nom correctement.");
    }
    if (!password || !String(password).match(/^.{6,40}$/)) {
      throw new Error("Merci de renseigner un mot de passe correct.");
    }
    
    // mot de passe avec au moins 14 caractères, un lettre majucule et minuscule, et un chiffre.
    // if (!password || !String(password).match('^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{14,}$')) {
    //   throw new Error("Merci de renseigner un mot de passe correct.");
    // }
    if (password !== passwordConfirm) {
      throw new Error("Les mots de passe ne correspondent pas");
    }
    if (!email || !emailValidator.validate(email)) {
      throw new Error("Cet email n'est pas valide.");
    }
    return {name, email, password};
  }
  static checkBodyForUpdate({name, email}) {
    if (![name, email].some(value => !!value)) {
      throw new Error("Merci de renseigner un champ à metre à jour");
    }
    if (name && !String(name).match(/^[a-zA-Z][\w-]{3,20}$/)) {
      throw new Error("Merci de renseigner votre nom correctement.");
    }
    if (email && !emailValidator.validate(email)) {
      throw new Error("Cet email n'est pas valide.");
    }
    return {name, email};
  }
  static checkBodyForSignIn({email, password}) {
    if (Object.values({email, password}).some(value => !value)) {
      throw new Error("Merci de renseigner un email et un mot de passe");
    }
    if (password && !String(password).match(/^.{6,40}$/)) {
      throw new Error("Merci de renseigner un mot de passe correct.");
    }
    if (email && !emailValidator.validate(email)) {
      throw new Error("Cet email n'est pas valide.");
    }
    return {email, password};
  }
  static checkUuid(uuid) {
    if (!uuid || !String(uuid).match(/^[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}$/) ) {
      throw new Error("ID should be a valid uuid");
    }
  }
  static checkBodyForResetPassword({email}) {
    if (!email) {
      throw new Error("Merci de renseigner un email");
    }
    if (email && !emailValidator.validate(email)) {
      throw new Error("Cet email n'est pas valide.");
    }
    return {email};
  }
}