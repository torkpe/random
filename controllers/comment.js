import { Comment } from '../models';

export async function createComment(req, res, next) {
  try {
    await Comment.create(req.sanitizedBody);

    res.status(201).send({
      message: 'Successfully added comment'
    });

  } catch (error) {
    next(error);
  }
}
