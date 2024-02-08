import jwt from 'jsonwebtoken';
import ApiError from '../helpers/apiError.js';

export default function (req, _, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) throw new ApiError('Unauthorized', {httpStatus: 401});

  jwt.verify(token, process.env.JWT_PRIVATE_KEY, (err,payload) => {
    if (err) throw new ApiError('Forbidden', {httpStatus: 403});

    if (payload.ip !== req.ip || payload.userAgent !== req.headers['user-agent']) {
      throw new ApiError('Security Alert', {httpStatus: 401});
    }

    req.user = payload;

    next();
  });
}