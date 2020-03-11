import { Comment, User } from '../models';
import { generateHashPassword } from './auth';

export const userTypes = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  AGENT: 'AGENT'
}

export const baserUrls = {
  AUTH: '/api/v1/auth',
  ADMIN: '/api/v1/admin',
}

export const userDetails = {
  name: '',
  email: '',
  password: ''
}

export const loginDetails = {
  password: '',
  email: '',
}

export const ticketDetails = {
  title: '',
  body: '',
}

export const commentDetails = {
  comment: '',
}

export const ticketStatusTypes = {
  OPEN: 'OPEN',
  CLOSED: 'CLOSED'
}

export const queryRelationship = {
  include: [
    {
      model: Comment,
      as: 'comments',
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id','name', 'email', 'type']
        },
      ]
    },
    {
      model: User,
      as: 'createdByDetails',
      attributes: ['id','name', 'email', 'type']
    },
    {
      model: User,
      as: 'assignedToDetails',
      attributes: ['id', 'name', 'email', 'type']
    }
  ]
}

export const endpointPrefix = '/api/v1';
export const users = [
  {
    name: 'John Doe',
    email: 'admin@email.com',
    password: generateHashPassword('adminPass'),
    type: userTypes.ADMIN
  },
  {
    name: 'Agent Doe',
    email: 'agent@email.com',
    password: generateHashPassword('adminPass'),
    type: userTypes.AGENT
  },
  {
    name: 'User Doe',
    email: 'user1@email.com',
    password: generateHashPassword('adminPass'),
    type: userTypes.USER
  },
  {
    name: 'Another Doe',
    email: 'another@email.com',
    password: generateHashPassword('adminPass'),
    type: userTypes.USER
  }
]