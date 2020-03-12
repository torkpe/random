import { AuthorizationError } from '../utils/errors';

export function authorize(userType) {
  return (req, res, next) => {
    try {
      if (req.user.type !== userType) {
        throw new AuthorizationError('You are not authorized to access this endpoint');
      }
      next();
    } catch (error) {
      next(error);
    }
  }
}