export default function (controllerMw) {
  return async (req, res, next) => {
    try {
      await controllerMw(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}