import Validator from "fastest-validator";

const v = new Validator();
const schema = {
  email: {
    type: "email",
    required: true,
    messages: {
      required: "email är obligatorisk",
      emailEmpty: "email fältet är tomt",
      email: "email är inte giltigt",
    },
  },
  password: {
    type: "string",
    required: true,
    min: 8,
    max: 20,
    pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
    messages: {
      required: "password är obligatorisk",
      stringMin: "Password måste vara åtminstone 8 karaktär",
      stringPattern:
        "Password ska innehålla en stor bokstav en små bokstav och en nummer",
    },
  },
};

const validate = v.compile(schema);

const validatAndSanitize = (data) => {
  const result = validate(data);
  if (result !== true) {
    const sanitizedErrors = result.map((error) => {
      const { expected, actual, type, ...rest } = error;
      return rest;
    });
    return sanitizedErrors;
  } else {
    return true;
  }
};
export default validatAndSanitize;
