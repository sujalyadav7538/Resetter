import crypto from 'crypto';
import { createConnection } from 'net';

const createLink = async ({ id, mail }) => {
  try {
    const token = crypto.randomBytes(32).toString('hex'); // Generate a secure random token
    const link = `http://localhost:3000/password-reset/${mail}/${token}`;
    return [link,token];
  } catch (error) {
    throw new Error("Failed to create the password reset link");
  }
};

export default createLink;