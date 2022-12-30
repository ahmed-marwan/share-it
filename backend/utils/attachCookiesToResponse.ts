import { Response } from 'express';

const attachCookiesToResponse = (res: Response, token: string) => {
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    signed: true,
    secure: process.env.NODE_ENV === 'production',
    expires: new Date(Date.now() + oneDay),
  });
};

export default attachCookiesToResponse;