import { Request } from "express";

export class CustomError extends Error {
  /**
   *
   * @param message - An Error Message
   * @param statusCode - Then Error's Status Code!
   */
  constructor(
    public message: string,
    public statusCode: number,
    public errors?: { [key: string]: any }
  ) {
    super();
  }
}

export const getSuccessLink = (req: Request) =>
  `${req.protocol}://${req.headers.host}/payments/success`;
