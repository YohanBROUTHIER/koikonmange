import sanitizeHtml from "sanitize-html";

export default function (req, res, next) {
  // Pour chaque propriété du BODY, on sanitized les propriétés qui sont des string.
  Object.keys(req.body).forEach(key => {
    if (typeof req.body[key] === "string") {
      req.body[key] = sanitizeHtml(req.body[key]);
    }
  });
  
  next();
}