import toast from "./toast";

export default function (callback) {
  return async function (req) {
    try {
      return await callback(req)
    } catch (err) {
      toast.error(err);
      return {err};
    }
  }
}