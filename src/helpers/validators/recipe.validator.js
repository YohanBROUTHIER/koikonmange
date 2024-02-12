import ApiError from '../../helpers/apiError.js';
import CoreValidator from './core.validator.js';

export default class RecipeValidator extends CoreValidator {
  static checkBodyForCreate({ name, image, steps, hunger, time, preparating_time, user_id }) {
    if (!name || !String(name).match(/^[a-zA-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
      throw new ApiError("Merci de renseigner le nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (image && !String(image)) {
      throw new ApiError("Erreur de chemin de l'image.", {name: "Bad Request", httpStatus:400});
    }
    if (!steps) {
      throw new ApiError("Merci d'indiquer les étapes de la préparation.", {name: "Bad Request", httpStatus:400});
    }
    steps.foreach((step, index) => {
      if (!String(step)) {
        throw new ApiError(`Merci de renseigner l'étape ${index+1} correctement.`, {name: "Bad Request", httpStatus:400});
      }
    })
    if (hunger && !["little","normal","big"].includes(hunger)) {
      throw new ApiError(`hunger n'accepte que les valeur: little, normal, big`, {name: "Bad Request", httpStatus:400});
    }
    if (!time || !String(time).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (!preparating_time || !String(preparating_time).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    this.checkId(user_id);

    return { name, image, steps, hunger, time, preparating_time, user_id };
  }

  static checkBodyForUpdate({ name, image, steps, hunger, time, preparating_time, user_id }) {
    if (name && !String(name).match(/^[a-zA-Z][a-zA-Z0-9\u00E0-\u00EF\u00F9-\u00FC' .-]{3,}$/)) {
      throw new ApiError("Merci de renseigner le nom correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (image && !String(image)) {
      throw new ApiError("Erreur de chemin de l'image.", {name: "Bad Request", httpStatus:400});
    }
    if (steps) {
      steps.foreach((step, index) => {
        if (!String(step)) {
          throw new ApiError(`Merci de renseigner l'étape ${index+1} correctement.`, {name: "Bad Request", httpStatus:400});
        }
      });
    }
    if (hunger && !["little","normal","big"].includes(hunger)) {
      throw new ApiError(`hunger n'accepte que les valeur: little, normal, big`, {name: "Bad Request", httpStatus:400});
    }
    if (time && !String(time).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    if (preparating_time && !String(preparating_time).match(/^\d+ (days?|hours?|minutes?|seconds?)$|^\d+ (day|hours?|minutes?|seconds?) \d+ (day|hours?|minutes?|seconds?)$/)) {
      throw new ApiError("Merci de renseigner le temps correctement.", {name: "Bad Request", httpStatus:400});
    }
    this.checkId(user_id);

    return { name, image, steps, hunger, time, preparating_time, user_id };
  }
}
