export function requestHandler(functionToHandle) {
  return (req, res, next) => {
    try {
      functionToHandle(req, res);
    } catch (error) {
      res.status(500).json({
        status: "error",
        message: error.message,
      });
    }
  };
}
