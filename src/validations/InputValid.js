export const InputValid = (name, value) => {
    let error = "";
  
    if (value === "") {
      error = "This field is required";
      return error;
    }
    if (value.match(/^\s/)) {
      error = `Please enter valid ${name} without first space`;
      return error;
    }
    return error;
  };