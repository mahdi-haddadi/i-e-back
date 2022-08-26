exports.errorHandler = (err, req, res, next) => {
  const errorsValidation = errorValidation(err);

  if (errorsValidation.length > 0) {
    return res.status(400).json(errorsValidation);
  } else {
    const statusCode = err.statusCode ? err.statusCode : 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      data: err.data,
    });
  }
};

const errorValidation = (err) => {
  let errors = [];
  if (err?.inner) {
    err.inner.forEach((e) => {
      errors.push({ [e?.path]: e?.message });
    });
  }
  return errors;
};
