export function validateEmail(email) {
  if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    return true;
  }
  return false;
}

export function validateRequestBody(body) {
  if (!body) {
    return {
      isValid: false
    }
  }

  const bodyHasInvalidValues = Object.keys(body)
    .some(key => !!body[key].trim() === false);

  if (bodyHasInvalidValues) {
    return {
      isValid: false
    }
  }

  const sanitizedBody = {};
  Object.keys(body)
    .forEach(key => sanitizedBody[key] = body[key].trim());

  return {
    sanitizedBody,
    isValid: true
  }
}