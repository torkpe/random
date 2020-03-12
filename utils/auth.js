import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export function createToken(user) {
  return jwt.sign({
    exp: Math.floor(Date.now() / 1000) + (60 * 60),
    user
  }, process.env.SECRET_KEY);
}

export function verifyToken(token) {
  return jwt.verify(token, process.env.SECRET_KEY);
}

export function generateHashPassword(password) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
}

export function compareSync(password, userPassword) {
  return bcrypt.compareSync(password, userPassword);
}
