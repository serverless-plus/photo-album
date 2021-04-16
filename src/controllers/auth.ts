import { Request, Response } from 'express';
import { apis } from '../utils/capi';

export const token = async (req: Request, res: Response): Promise<void> => {
  const { uuid } = req.body;
  const result = await apis.getCosTmpCredential(uuid);
  if (result.Error) {
    res.send({
      success: false,
      error: result.Error,
    });
  } else {
    res.send({
      success: true,
      data: result,
    });
  }
};
