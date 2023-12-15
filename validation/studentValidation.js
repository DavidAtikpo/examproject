import Joi from "joi";

const studentValidation = (req, res, next) => {
  const schema = Joi.object({
    firstName: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(20).required()
      .messages({
        "string.pattern.base": "Must contain alphabets.",
        "string.min": "Minimum length of 3.",
        "string.max": "Maximum length of 20.",
        "string.empty": "Cannot be an empty field.",
        "any.required": "Field is a required field.",
      }),
    lastName: Joi.string().pattern(/^[a-zA-Z]+$/).min(3).max(20).required()
      .messages({
        "string.pattern.base": "Must contain alphabets.",
        "string.min": "Minimum length of 3.",
        "string.max": "Maximum length of 20.",
        "string.empty": "Cannot be an empty field.",
        "any.required": "Field is a required field.",
      }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "org"] } }).required()
      .messages({
        "string.email": "Invalid email format.",
        "string.empty": "Field cannot be an empty field.",
        "any.required": "Field is a required field.",
      }),

      phoneNumber: Joi.string().pattern(/^[0-9+]+$/).min(8).max(15).required()
      .messages({
        "string.pattern.base": "Should only contain numbers and the plus sign.",
        "string.min": "Minimum length of 8.",
        "string.max": "Maximum length of 15.",
        "string.empty": "Cannot be an empty field.",
        "any.required": "Field is a required field.",
      }),
      
    password: Joi.string().min(8).pattern(/^(?=.*[a-zA-Z])(?=.*\d)/).required()
      .messages({
        "string.pattern.base": "Password should be a mix of alphabets and numeric characters.",
        "string.min": "Password should have a minimum length of 8.",
        "string.empty": "Field cannot be an empty field.",
        "any.required": "Field is a required field.",
      }),
    confirmPassword: Joi.string().required()
      .valid(Joi.ref('password'))
      .messages({
        "any.only": "Passwords do not match.",
        "string.empty": "Field cannot be an empty field.",
        "any.required": "Field is a required field.",
      }),
    
  });

  const validation = schema.validate(req.body, { abortEarly: false });
  const { error } = validation;

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    //console.error(errors);
    
    // Extracting Joi error messages and returning them
    const joiErrorMessages = {};
    error.details.forEach((detail) => {
      const key = detail.path.join('.');
      const message = detail.message;
      joiErrorMessages[key] = message;
    });

    return res.status(400).json({ errors: joiErrorMessages });
  }

  next();
};

export default { studentValidation };
