import bcrypt from 'bcrypt';
import UserDatamapper from "../datamapper/user.datamapper.js";
import UserValidator from "../helpers/validator/user.validator.js";

export default class UserController {
  static datamapper = UserDatamapper;
  static className = "user";
  static validator = UserValidator;

  static async postSignup(req, res) {
  
    const data = this.validator.checkBodyForCreate(req.body);
    
    const existingUser = await this.datamapper.findAll({where:[{name:"email",operator:"=",value:data.email}]} ); // on vérifie que l'email n'est pas déjà utilisé
    this.validator.checkIfMailIsUsed(existingUser);
    
    const hashedPassword = await bcrypt.hash(data.password, process.env.PASSWORD_SALT); // on hash le mot de passe
    
    await this.datamapper.create({ ...data, password: hashedPassword });
    res.status(201);
  }

  static async postSignin(req, res) {
    
    const data = this.validator.checkBodyForUpdate(req.body);

    let existingUser = await this.datamapper.findAll({where:[{name:"email",operator:"=",value:data.email}]} );

    await this.validator.checkUserSignin(data, existingUser);
    
    if (req.body.remember === "on") {
      req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 7; // si l'utilisateur a coché la case "se souvenir de moi", on définit la durée de vie du cookie à 7 jours
    }
  
    delete existingUser.password;
    req.session.user = existingUser;
    
    res.status(200);
  }

}

