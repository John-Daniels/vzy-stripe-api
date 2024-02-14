export const generateOTP = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

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

export function getStartOfMonth() {
  const currentDate = new Date();
  return new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1,
    0,
    0,
    0,
    0
  );
}

export function getEndOfMonth() {
  const currentDate = new Date();
  const lastDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0,
    23,
    59,
    59,
    999
  );
  return lastDayOfMonth;
}
