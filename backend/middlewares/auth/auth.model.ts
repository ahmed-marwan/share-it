import { Request } from 'express';

export interface TokenInterface {
  _id: string;
  name: string;
}

export interface AuthUser extends Request {
  user?: {
    _id: string;
    name: string;
  };
}