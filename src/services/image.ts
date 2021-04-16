import { Image as ImageModel } from '../models/image';
import { Image } from '../typings';

export class ImageService {
  static async list(uid: string, limit = 10, offset = 0) {
    const res = await ImageModel.findAll({
      offset,
      limit,
      where: {
        uid,
      },
    });

    return res;
  }

  static async getById(id: number) {
    const res = await ImageModel.findOne({
      where: {
        id,
      },
    });

    return res;
  }

  static async getByUrl(uid: string, url: string) {
    const res = await ImageModel.findOne({
      where: {
        uid,
        url,
      },
    });

    return res;
  }

  static async create(image: Image) {
    const res = await ImageModel.create(image);

    return res;
  }

  static async delete(id: number) {
    const res = await ImageModel.destroy({
      where: {
        id,
      },
    });

    return res;
  }
}
