import { Request, Response } from 'express';

/**
 * GET /
 * Home page.
 */
export const index = (req: Request, res: Response) => {
  res.send({
    version: '1.0',
  });
};

