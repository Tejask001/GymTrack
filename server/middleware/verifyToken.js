import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { createError } from "../error.js";

dotenv.config({ path: "./config.env" });

export const verifyToken = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      return next(createError(401, "You are not authenticated!"));
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) return next(createError(401, "You are not authenticated"));

    const decode = jwt.verify(token, process.env.JWT);
    req.user = decode;
    return next();
  } catch (err) {
    next(err);
  }
};
