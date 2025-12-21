declare global {
  namespace Express {
    interface Request {
      user?: { globalUserId: string };
    }
  }
}