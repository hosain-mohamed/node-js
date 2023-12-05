import jwt from "jsonwebtoken";

export async function generateToken(user) {
  const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}
