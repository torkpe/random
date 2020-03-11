import {
  validateEmail,
  validateRequestBody
} from '../utils/validator';

import {
  baserUrls,
  userTypes,
  userDetails,
  loginDetails,
  ticketDetails,
  commentDetails
} from '../utils/constants';

import {
  generateHashPassword
} from '../utils/auth';

export function createUser(req, res, next) {
   try {
    const requestBody = {
      ...userDetails,
      ...req.body
    }

    const { isValid, sanitizedBody } = validateRequestBody(requestBody);

    if (!isValid) {
      return res.status(400).send({
        error: 'All fields are required'
      });
    }

    const { email } = sanitizedBody;

    if (!validateEmail(email)) {
      return res.status(400).send({
        error: 'Email is not valid'
      });
    }

    sanitizedBody.type = createUserType(req.baseUrl);
    sanitizedBody.password = generateHashPassword(sanitizedBody.password);
    req.sanitizedBody = sanitizedBody;

    next();
  } catch(error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}

function createUserType(baseUrl) {
  switch (baseUrl) {
    case baserUrls.AUTH:
      return userTypes.USER;
    case baserUrls.ADMIN:
      return userTypes.AGENT;
    default:
      break;
  }
}

export function login(req, res, next) {
  try {
    const requestBody = {
      ...loginDetails,
      ...req.body
    }

    const { isValid, sanitizedBody } = validateRequestBody(requestBody);

    if (!isValid) {
      return res.status(400).send({
        error: 'All fields are required'
      });
    }

    const { email } = sanitizedBody;

    if (!validateEmail(email)) {
      return res.status(400).send({
        error: 'Email is not valid'
      });
    }

    req.sanitizedBody = sanitizedBody;

    next();
  } catch(error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}

export function createTicket(req, res, next) {
  try {
    const requestBody = {
      ...ticketDetails,
      ...req.body
    }

    const { isValid, sanitizedBody } = validateRequestBody(requestBody);

    if (!isValid) {
      return res.status(400).send({
        error: 'All fields are required'
      });
    }

    sanitizedBody.createdBy = req.user.id;

    req.sanitizedBody = sanitizedBody;

    next();
  } catch(error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}

export function createComment(req, res, next) {
  try {
    const requestBody = {
      ...commentDetails,
      ...req.body
    }

    const { isValid, sanitizedBody } = validateRequestBody(requestBody);

    if (!isValid) {
      return res.status(400).send({
        error: 'All fields are required'
      });
    }

    sanitizedBody.uid = req.user.id;
    sanitizedBody.ticketId = req.params.ticketId;

    req.sanitizedBody = sanitizedBody;

    next();
  } catch(error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}