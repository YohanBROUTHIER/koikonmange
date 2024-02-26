import emailValidator from "email-validator";
import bcrypt from 'bcrypt';

import CoreValidator from "./core.validator.js";
import ApiError from "../helpers/apiError.js";

export default class UserValidator extends CoreValidator {
  static checkBodyForCreate({name, email, password, passwordConfirm}) {
    if (!name || !String(name).match(/^[a-zA-Z][\w-]{3,20}$/)) {
      throw new ApiError("Merci de renseigner votre nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (!password || !String(password).match(/^.{6,40}$/)) {
      throw new ApiError("Merci de renseigner un mot de passe correct.", {name: "Bad Request", httpStatus:400});
    }
    if (password !== passwordConfirm) {
      throw new ApiError("Les mots de passe ne correspondent pas", {name: "Bad Request", httpStatus:400});
    }
    if (!email || !emailValidator.validate(email)) {
      throw new ApiError("Cet email n'est pas valide.", {name: "Bad Request", httpStatus:400});
    }
    return {name, email, password};
  }

  static checkBodyForUpdate({name, email, password, passwordConfirm}) {

    if (!Object.values({name, email, password}).some(value => !!value)) {
      throw new ApiError("Merci de renseigner un champ à metre à jour", {name: "Bad Request", httpStatus:400});
    }
    if (name && !String(name).match(/^[a-zA-Z][\w-]{3,20}$/)) {
      throw new ApiError("Merci de renseigner votre nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (password && !String(password).match(/^.{6,40}$/)) {
      throw new ApiError("Merci de renseigner un mot de passe correct.", {name: "Bad Request", httpStatus:400});
    }
    if (password && (password !== passwordConfirm)) {
      throw new ApiError("Les mots de passe ne correspondent pas", {name: "Bad Request", httpStatus:400});
    }
    if (email && !emailValidator.validate(email)) {
      throw new ApiError("Cet email n'est pas valide.", {name: "Bad Request", httpStatus:400});
    }
    return {name, email, password: String(password)};
  }

  static checkBodyForSignIn({email, password}) {

    if (Object.values({email, password}).some(value => !value)) {
      throw new ApiError("Merci de renseigner un email et un mot de passe", {name: "Bad Request", httpStatus:400});
    }
    if (password && !String(password).match(/^.{6,40}$/)) {
      throw new ApiError("Merci de renseigner un mot de passe correct.", {name: "Bad Request", httpStatus:400});
    }
    if (email && !emailValidator.validate(email)) {
      throw new ApiError("Cet email n'est pas valide.", {name: "Bad Request", httpStatus:400});
    }
    return {email, password};
  }

  static checkIfMailIsUsed(mail) {
    if (mail) {
      throw new ApiError("Cet email est déjà utilisé.", {name: "Bad Request", httpStatus:400});
    }
  }

  static async checkUserSignin(data, existingUser) {
    if (!existingUser) { // si l'email inconnu, on affiche un message d'erreur
      throw new ApiError("Mot de passe ou email incorrect", {name: "Bad Request", redirect:"signin", httpStatus:400});
    }
    
    if (!existingUser.active) {
      throw new ApiError("Ce compte n'a pas été activé. Veuillez vérifier vos mail.", {name: "Bad Request", redirect:"signin", httpStatus:400});
    }
    const isValidPassword = await bcrypt.compare(data.password, existingUser.password); // on vérifie que le mot de passe est correct
    
    if (!isValidPassword) {
      throw new ApiError("Mot de passe ou email incorrect", {name: "Bad Request", redirect:"signin", httpStatus:400});
    }
  }

  static checkUuid(uuid) {
    if (!uuid || !String(uuid).match(/^[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}-?[0-9a-zA-Z]{4}$/) ) {
      throw new ApiError("ID should be a valid uuid", {httpStatus:400});
    }
  }

  static checkBodyForResetPassword({email}) {
    if (!email) {
      throw new ApiError("Merci de renseigner un email", {name: "Bad Request", httpStatus:400});
    }
    if (email && !emailValidator.validate(email)) {
      throw new ApiError("Cet email n'est pas valide.", {name: "Bad Request", httpStatus:400});
    }
    return {email};
  }

  static checkIfEqual(dataA, dataB, message) {
    if (dataA !== dataB) {
      throw new ApiError(message, {name: "Bad Request", httpStatus:400});
    }
  }

  static checkTokenPayload({id, name, email, ip, userAgent}, req) {
    if (!id || !String(id).match(/^[1-9]\d*$/)) {
      throw new ApiError('Security Alert', {httpStatus: 401});
    }
    if (!name || !String(name).match(/^[a-zA-Z][\w-]{3,20}$/)) {
      throw new ApiError('Security Alert', {httpStatus: 401});
    }
    if (!email || !emailValidator.validate(email)) {
      throw new ApiError('Security Alert', {httpStatus: 401});
    }
    if (ip !== req.ip || userAgent !== req.headers['user-agent']) {
      throw new ApiError('Security Alert', {httpStatus: 401});
    }
    return {id, name, email};
  }
}