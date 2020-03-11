import { User } from '../../models';
import {
  createToken,
  compareSync
} from '../../utils/auth';
import { userTypes } from '../../utils/constants';

export async function createUser(req, res) {
  try {
    const createdUser = await User.findOrCreate({
      where: {
        email: req.sanitizedBody.email
      },
      defaults: {
        ...req.sanitizedBody
      }
    });

    if (createdUser[1]) {
      const user = createdUser[0].dataValues;
      let token;
      const isUser = user.type === userTypes.USER;

      if (isUser) {
        token = createToken({
          id: user.id,
          type: user.type
        });
      }

      return res.status(201).send({
        message: isUser ? 'Succesfully created user' : 'Succesfully created agent',
        token
      });
    }

    return res.status(409).send({
      error: 'An account already exists with this email'
    });

  } catch (error) {
    res.status(500).send({
      error: 'Something went wrdssong'
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.sanitizedBody;
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      return res.status(494).send({
        error: 'Could not find an account registered with this email'
      });
    }

    if (!compareSync(password, user.password)) {
      return res.status(403).send({
        error: 'Email/Password is incorrect'
      });
    }

    return res.status(200).send({
      message: 'Successfully logged in',
      token: createToken({
        id: user.dataValues.id,
        type: user.dataValues.type
      })
    });

  } catch (error) {
    res.status(500).send({
      error: 'Something went wrong'
    });
  }
}
