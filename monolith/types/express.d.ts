export {};

declare global {
  namespace Express {
    interface User {
      _id?: string;
    }
  }
}
