export const validator = (
  name,
  email,
  address,
  isValid,
  nameIsValid,
  emailIsValid,
  addressIsValid
) => {
  const nameRegExp = /(^\w+\s\w+$)/i;
  const emailRegExp = /^[0-9a-zA-Z]+@\w+\.\w+$/i;
  const addressRegExp = /^\d{1,5}\s\w+\s\w+\s*\w*$/i;

  const nameMatch = String(name).match(nameRegExp);
  const emailMatch = String(email).match(emailRegExp);
  const addressMatch = String(address).match(addressRegExp);

  if (nameMatch && emailMatch && addressMatch) {
    isValid = true;
  } else if (!nameMatch && emailMatch && addressMatch) {
    isValid = false;
    //nameIsValid = false;
    //emailIsValid = true;
    //addressIsValid = true;
  } else if (nameMatch && !emailMatch && addressMatch) {
    isValid = false;
    // nameIsValid = true;
    // emailIsValid = false;
    // addressIsValid = true;
  } else if (nameMatch && emailMatch && !addressMatch) {
    isValid = false;
    // nameIsValid = true;
    // emailIsValid = true;
    // addressIsValid = false;
  } else if (!nameMatch && !emailMatch && addressMatch) {
    isValid = false;
    // nameIsValid = false;
    // emailIsValid = false;
    // addressIsValid = true;
  } else if (nameMatch && !emailMatch && !addressMatch) {
    isValid = false;
    // nameIsValid = true;
    // emailIsValid = false;
    // addressIsValid = false;
  } else if (!nameMatch && emailMatch && !addressMatch) {
    isValid = false;
    // nameIsValid = false;
    // emailIsValid = true;
    // addressIsValid = false;
  } else if (!nameMatch && !emailMatch && !addressMatch) {
    isValid = false;
    // nameIsValid = false;
    // emailIsValid = false;
    // addressIsValid = false;
  } else {
    isValid = false;
    // nameIsValid = false;
    // emailIsValid = false;
    // addressIsValid = false;
  }

  return isValid;
};
