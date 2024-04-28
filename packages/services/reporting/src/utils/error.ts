class HTTPError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    // Ensure the error class name is correct in stack traces
    this.name = this.constructor.name;
  }
}

export const notFound = (msg = "Resource not found") => {
  return new HTTPError(msg, 404);
};

export const badRequest = (msg = "Bad Request") => {
  return new HTTPError(msg, 400);
};

export const serverError = (msg = "Internal Server Error") => {
  return new HTTPError(msg, 500);
};

export const authenticationError = (msg = "Authentication Failed") => {
  return new HTTPError(msg, 401);
};

export const authorizationError = (msg = "Permission Denied") => {
  return new HTTPError(msg, 403);
};
