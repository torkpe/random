export class ValidationError extends Error{
  constructor(message){
    super(message);
    this.status = 400;
  }
}

export class AuthenticationError extends Error{
  constructor(message){
    super(message);
    this.status = 401;
  }
}

export class EntryExistError extends Error{
  constructor(message){
    super(message);
    this.status = 409;
  }
}

export class AuthorizationError extends Error{
  constructor(message){
    super(message);
    this.status = 403;
  }
}

export class EntryNotFound extends Error{
  constructor(message){
    super(message);
    this.status = 404;
  }
}

export class BadRequestError extends Error{
  constructor(message){
    super(message);
    this.status = 400;
  }
}