const reqValues = ["body", "params", "query"];

export const validationSchema = (schema) => {
  return (req, res, next) => {
    const errors = [];
    reqValues.forEach((value) => {
      const schemaToValidate = schema[value];
      if (!schemaToValidate) return;
      const reqValue = req[value];
      const { error } = schemaToValidate.validate(reqValue, {
        abortEarly: false,
      });
      if (error) {
        const { details } = error;
        const message = details.map((i) => i.message).join(",");
        errors.push(message);
      }
    });
    if (errors.length) {
      const message = errors.join(",");
      return res.status(400).json({ error: message });
    }
    next();
  };
};
