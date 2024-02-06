import session from 'express-session';

export default {

  session : session({
    secret: process.env.SESSIONS_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: false
    }
  }),
  sessionInit (req, res, next) {
    if (req.session.user) {
      res.locals.user = req.session.user;
    } else {
      res.locals.user = null;
    }
    next();
  }

};