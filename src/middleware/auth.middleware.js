import jwt from "jsonwebtoken";
import { ERROR } from "../utils/http.status.text.js";
import {
  NO_TOKEN_PROVIODED,
  UNAUTHORIZED,
} from "../utils/http.message.text.js";

async function isAuthenticated(req, res, next) {
  // get Token from  autherization key in header capital or small
  let token = req.headers.authorization || req.headers.Authorization;

  if (token && token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  if (!token)
    return res.status(403).json({
      status: ERROR,
      message: NO_TOKEN_PROVIODED,
    });
  try {
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({
      status: ERROR,
      message: UNAUTHORIZED,
    });
  }
}

export default isAuthenticated;
