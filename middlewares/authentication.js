import { JsonWebTokenError } from 'jsonwebtoken';
import { verifyToken } from '../utils/auth';

export function checkIfAuthenticated(req, res, next) {
  try {
    const token = req.headers['Authorization'] || req.headers['authorization'];
    if (!token) {
      return res.status(401).send({
        error: 'Unauthenticated. Please attach token to headers'
      });
    }

    const decoded = verifyToken(token);
    req.user = decoded.user;
    next();
  } catch (error) {
    let errorMessage = 'Something went wrong';
    if (error instanceof JsonWebTokenError) {
      errorMessage = 'Token is not valid. Please authenticate'
    }
    res.status(500).send({
      error: errorMessage
    });
  }
}