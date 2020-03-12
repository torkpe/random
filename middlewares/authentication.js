import { verifyToken } from '../utils/auth';
import { AuthenticationError } from '../utils/errors';

export function checkIfAuthenticated(req, res, next) {
  try {
    const token = req.headers['Authorization'] || req.headers['authorization'];
    if (!token) {
      throw new AuthenticationError('Unauthenticated. Please attach token to headers')
    }
    const decoded = verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    next(error);
  }
}