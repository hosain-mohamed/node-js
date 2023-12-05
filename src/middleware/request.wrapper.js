export function requestWrapper(functionToHandle) {
  return async (req, res, next) => {
    try {
      await functionToHandle(req, res, next);
    } catch (error) {
      console.log(error);
      next(error);
    }
  };
}
