class ApiError extends Error {
  public success;
  public data: unknown;

  constructor(
    public statusCode: number = 500,
    public message = "Something went wrong.",
    public errors: unknown[] = [],
    public stack = ""
  ) {
    super(message);

    this.errors = errors;
    this.message = message;
    this.statusCode = statusCode;
    this.success = false;
    this.data = null;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
