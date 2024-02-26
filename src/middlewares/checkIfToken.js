import authenticateToken from "./authenticateToken.js";

export default function (req, res ,next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {
    authenticateToken(req,res,next);    
  } else {
    next();
  }
}