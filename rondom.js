import crypto from "crypto";

// Generate a 32-byte secret key
const secretKey = crypto.randomBytes(32).toString("hex");

console.log(secretKey);
