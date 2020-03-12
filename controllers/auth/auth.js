import { User } from '../../models';
import {
  createToken,
  compareSync
} from '../../utils/auth';
import { userTypes } from '../../utils/constants';
import {
  EntryExistError,
  EntryNotFound,
  AuthenticationError
} from '../../utils/errors';

export async function createUser(req, res, next) {
  try {
    const createdUser = await User.findOrCreate({
      where: {
        email: req.sanitizedBody.email
      },
      defaults: {
        ...req.sanitizedBody
      }
    });

    if (!createdUser[1]) {
      throw new EntryExistError('An account already exists with this email')
    }
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
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.sanitizedBody;
    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user) {
      throw new EntryNotFound('Could not find an account registered with this email');
    }

    if (!compareSync(password, user.password)) {
      throw new AuthenticationError('Email/Password is incorrect');
    }

    return res.status(200).send({
      message: 'Successfully logged in',
      token: createToken({
        id: user.dataValues.id,
        type: user.dataValues.type
      })
    });

  } catch (error) {
    next(error);
  }
}
