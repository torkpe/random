import { Comment } from '../models';

export async function createComment(req, res) {
  try {
    await Comment.create(req.sanitizedBody);

    res.status(201).send({
      message: 'Successfully added comment'
    });

  } catch (error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}
