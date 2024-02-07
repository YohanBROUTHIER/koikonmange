import jwt from 'jsonwebtoken';
import ApiError from "../helpers/apiError.js";

export default function (req, _, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err, _) => {
      if (!err) throw new ApiError('You are already connected.', {httpStatus: 400});
    
      next();
    });
  } else {
    next();
  }
}