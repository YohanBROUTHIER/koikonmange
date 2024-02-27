import ApiError from "../helpers/apiError.js";
import CoreValidator from './core.validator.js';

export default class RecipeValidator extends CoreValidator {
  static checkBodyForCreate({ name, image, steps, hunger, time, preparatingTime, person },{id}) {
    if (!name || !String(name).match(/^[a-zA-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
      throw new ApiError("Merci de renseigner le nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (image && !String(image)) {
      throw new ApiError("Erreur de chemin de l'image.", {name: "Bad Request", httpStatus:400});
    }
    if (!steps) {
      throw new ApiError("Merci d'indiquer les étapes de la préparation.", {name: "Bad Request", httpStatus:400});
    }
    steps.forEach((step, index) => {
      if (!String(step)) {
        throw new ApiError(`Merci de renseigner l'étape ${index+1} correctement.`, {name: "Bad Request", httpStatus:400});
      }
    });
    if (hunger && !["Copieux","Normal","Léger"].includes(hunger)) {
      throw new ApiError(`hunger n'accepte que les valeur: Copieux, Normal, Léger`, {name: "Bad Request", httpStatus:400});
    }
    this.checkValidTimeFormat(time);
    this.checkValidTimeFormat(preparatingTime);
    this.checkId(person, "person");
    if (id) {
      this.checkId(id, "userId");      
    }

    return { name, image, steps, hunger, time, preparatingTime, person, userId:id };
  }

  static checkBodyForUpdate({ name, image, steps, hunger, time, preparatingTime, person, userId }) {
    if (name && !String(name).match(/^[a-zA-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
      throw new ApiError("Merci de renseigner le nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (image && !String(image)) {
      throw new ApiError("Erreur de chemin de l'image.", {name: "Bad Request", httpStatus:400});
    }
    if (steps) {
      steps.forEach((step, index) => {
        if (!String(step)) {
          throw new ApiError(`Merci de renseigner l'étape ${index+1} correctement.`, {name: "Bad Request", httpStatus:400});
        }
      });
    }
    if (hunger && !["Copieux","Normal","Léger"].includes(hunger)) {
      throw new ApiError(`hunger n'accepte que les valeur: Copieux, Normal, Léger`, {name: "Bad Request", httpStatus:400});
    }
    if (time) {
      this.checkValidTimeFormat(time);
    }
    if (preparatingTime) {
      this.checkValidTimeFormat(preparatingTime);
    }
    if (person) {
      this.checkId(person, "person");      
    }
    if (userId) {
      this.checkId(userId, "userId");
    }

    return { name, image, steps, hunger, time, preparatingTime, person, userId };
  }

}
