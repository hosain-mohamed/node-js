import jwt from "jsonwebtoken";

async function generateToken(user) {
  const token = jwt.sign({ user: user }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
}

export default generateToken;
