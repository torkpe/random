export function errorHandler(err, res) {
  res.status(err.status || 500)
    .send({ error: err.message ? err.message : 'Somnething went wrong' });
}