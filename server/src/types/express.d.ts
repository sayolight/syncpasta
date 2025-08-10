import 'express';

declare module 'express' {
  export interface Request {
    // user?: DecodedIdToken;
    user?: { uid: string };
  }
}
