import { Request, Response } from 'express';
import { apis } from '../utils/capi';
import { ImageLabel } from '../typings';
import { ImageService } from '../services/image';

async function getImageLabel(url: string) {
  const { CameraLabels = [] } = await apis.getImageLabel(url);
  return CameraLabels.map((item: ImageLabel) => item.Name).slice(0, 3);
}

export const ocr = async (req: Request, res: Response): Promise<void> => {
  const { imgUrl } = req.body;
  const result = await apis.getOCRResult(imgUrl);
  if (result.Error) {
    res.send({
      success: false,
      error: result.Error,
    });
  } else {
    res.send({
      success: true,
      data: result.TextDetections,
    });
  }
};

export const label = async (req: Request, res: Response): Promise<void> => {
  const { imgUrl } = req.body;
  const result = await apis.getImageLabel(imgUrl);
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

export const upload = async (req: Request, res: Response): Promise<void> => {
  const { images = [], uid } = req.body;
  const labelRes = [];
  for (let i = 0; i < images.length; i++) {
    const url = images[i];
    const labels = await getImageLabel(url);
    const imageObj = {
      uid,
      url,
      labels: labels.join(';'),
    };
    await ImageService.create(imageObj);
    labelRes.push(imageObj);
  }
  res.send({
    success: true,
    data: labelRes,
  });
};

export const detail = async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.query.id);
  const data = await ImageService.getById(id);

  res.send({
    success: true,
    data,
  });
};

export const list = async (req: Request, res: Response): Promise<void> => {
  const { uid } = req.query;
  if (!uid) {
    res.send({
      success: false,
      error: {
        message: '不合法用户',
      },
    });
  } else {
    const data = await ImageService.list(uid as string);

    res.send({
      success: true,
      data,
    });
  }
};

export const del = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.body;

  try {
    await ImageService.delete(id);
    res.send({
      success: true,
      data: {},
    });
  } catch (e) {
    res.send({
      success: false,
      error: {
        message: '删除失败',
      },
    });
  }
};
