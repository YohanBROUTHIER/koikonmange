import bcrypt from 'bcrypt';
import UserDatamapper from "../datamapper/user.datamapper.js";
import UserValidator from "../helpers/validator/user.validator.js";
import CoreController from './core.controller.js';
import { sendMailResetPassword, sendMailValidateAccount } from '../helpers/mailer.js';

export default class UserController extends CoreController {
  static datamapper = UserDatamapper;
  static className = "user";
  static validator = UserValidator;

  static async postSignup(req, res) {
  
    const data = this.validator.checkBodyForCreate(req.body);
    
    const existingUser = await this.datamapper.findAll({where:[{name:"email",operator:"=",value:data.email}]}); // on vérifie que l'email n'est pas déjà utilisé
    this.validator.checkIfMailIsUsed(existingUser);
    
    const hashedPassword = await bcrypt.hash(data.password, process.env.PASSWORD_SALT); // on hash le mot de passe
    
    const newUser = await this.datamapper.create({ ...data, password: hashedPassword });
    const key = await this.datamapper.createKey({id:newUser.id, type:"account_validation"});

    await sendMailValidateAccount(data.email, key);

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

  static async postSignout(req, res) {
    await req.session.destroy();
    res.status(200);
  }

  static async postResetPassword(req, res) {
    const data = this.validator.checkBodyForResetPassword(req.body);

    const user = await this.datamapper.findAll({where:[{name:"email",operator:"=",value:data.email}]});

    this.validator.checkIfExist(user, this.className);

    const key = await this.datamapper.createKey({id:user.id, type:"reset_password"});

    await sendMailResetPassword(data.email, key);

    res.status(200);
  }

  static async patchActiveAccount(req,res) {
    const { uuid } = req.params;
    this.validator.checkUuid(uuid);

    const key = await this.datamapper.findKeyByPkAndType(uuid, "account_validation");
    this.validator.checkIfExist(key, this.className);

    await this.datamapper.update({id: key["user_id"], active:true});
    await this.datamapper.deleteKey(key.id);

    res.status(200);
  }

  static async patchResetPassword(req,res) {
    const { uuid } = req.body;
    this.validator.checkUuid(uuid);

    const key = await this.datamapper.findKeyByPkAndType(uuid, "reset_password");
    this.validator.checkIfExist(key, this.className);

    await this.datamapper.update({id: key["user_id"], active:true});
    await this.datamapper.deleteKey(key.id);

    res.status(200);
  }
}

