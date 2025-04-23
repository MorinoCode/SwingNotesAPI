import Validator from "fastest-validator";

const v = new Validator();
const schema = {
  title: {
    type: "string",
    required: true,
    unique: true,
    messages: {
      required: "title är obligatorisk",
    },
  },
  beskrivning: {
    type: "string",
    required: true,
    min: 3,
    messages: {
      stringMin: "beskrivning måste vara åtminstone 3 karaktär",
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
