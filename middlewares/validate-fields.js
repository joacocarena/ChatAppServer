const { validationResult } = require("express-validator");
 
const validateFields = (req, res, next) => {
  
  const errors = validationResult(req).errors;
  
  if (errors.length) {
    return res.status(400).json({
        ok: false,
        errors: errors
    })
  }
 
  next();
}
 
module.exports = {
  validateFields
}