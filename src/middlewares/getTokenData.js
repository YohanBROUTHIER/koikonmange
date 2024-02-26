import jwt from 'jsonwebtoken';
import ApiError from '../helpers/apiError.js';
import UserValidator from '../validators/user.validator.js';

export default function (req, _, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new ApiError('Unauthorized', {httpStatus: 401});
  
  jwt.verify(token, process.env.JWT_PRIVATE_KEY,{ignoreExpiration:true} , (err,payload) => {
    if (err) throw new ApiError('Forbidden', {httpStatus: 403});

    const user = UserValidator.checkTokenPayload(payload, req);
    req.user = user;

    next();
  });
}