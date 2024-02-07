import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

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
    this.validator.checkIfMailIsUsed(existingUser[0]);
    
    const hashedPassword = await bcrypt.hash(data.password, parseInt(process.env.PASSWORD_SALT)); // on hash le mot de passe
    
    const newUser = await this.datamapper.create({ ...data, password: hashedPassword });
    const key = await this.datamapper.createKey({"user_id":newUser.id, type:"account_validation"});

    await sendMailValidateAccount(data.email, key);

    res.status(201).end();
  }

  static async postSignin(req, res) {
    
    const data = this.validator.checkBodyForUpdate(req.body);

    let existingUser = await this.datamapper.findAll({where:[{name:"email",operator:"=",value:data.email}]} );

    await this.validator.checkUserSignin(data, existingUser);

    delete existingUser.password;

    const expiresIn = parseInt(process.env.JWT_EXPIRE_IN, 10) || 60;

    const token = jwt.sign({ ...existingUser, ip: req.ip, userAgent: req.headers['user-agent']}, process.env.JWT_PRIVATE_KEY, { expiresIn });
    
    res.json(token);
  }

  static async postResetPassword(req, res) {
    const data = this.validator.checkBodyForResetPassword(req.body);

    const user = await this.datamapper.findAll({where:[{name:"email",operator:"=",value:data.email}]});

    this.validator.checkIfExist(user, this.className);

    const key = await this.datamapper.createKey({id:user.id, type:"reset_password"});

    await sendMailResetPassword(data.email, key);

    res.status(200).end();
  }

  static async patchActiveAccount(req,res) {
    const { uuid } = req.params;
    this.validator.checkUuid(uuid);

    const key = await this.datamapper.findKeyByPkAndType(uuid, "account_validation");
    this.validator.checkIfExist(key, this.className);

    await this.datamapper.update({id: key["user_id"], active:true});
    await this.datamapper.deleteKey(key.id);

    res.status(200).end();
  }

  static async patchResetPassword(req,res) {
    const { uuid } = req.body;
    this.validator.checkUuid(uuid);

    const key = await this.datamapper.findKeyByPkAndType(uuid, "reset_password");
    this.validator.checkIfExist(key, this.className);

    await this.datamapper.update({id: key["user_id"], active:true});
    await this.datamapper.deleteKey(key.id);

    res.status(200).end();
  }
}

