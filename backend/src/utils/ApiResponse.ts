class ApiResponse {
  public success;

  constructor(
    public statusCode: number,
    public responseData: unknown,
    public message: string = "Success"
  ) {
    this.statusCode = statusCode;
    this.responseData = responseData;
    this.message = message;
    this.success = statusCode < 400;
  }
}

export { ApiResponse };
