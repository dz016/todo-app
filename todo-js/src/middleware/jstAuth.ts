import jwt, { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const SECRET = "ghustaba";

export const jwtAuth = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers.authorization;

  try {
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      const user = jwt.verify(token, SECRET) as JwtPayload;

      // Attach user ID to request headers
      req.headers["userId"] = user.id;

      // Continue to the next middleware
      next();
    } else {
      res.sendStatus(401);
    }
  } catch (error) {
    // Handle token verification failure
    console.error("JWT verification failed:", error);
    res.sendStatus(403); // Use 403 for forbidden access
  }
};
