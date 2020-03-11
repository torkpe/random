export function authorize(userType) {
  return (req, res, next) => {
    try {
      if (req.user.type !== userType) {
        return res.status(401).send({
          error: 'You are not authorized to access this endpoint'
        });
      }
      next();
    } catch (error) {
      res.status(500).send({
        error: 'Something went wrong'
      })
    }
  }
}