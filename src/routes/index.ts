import { Router } from 'express';
import * as HomeController from '../controllers/home';
import * as AuthController from '../controllers/auth';
import * as ImageController from '../controllers/image';

const router = Router();

router.get('/', HomeController.index);

router.get('/version', async (req, res) => {
  res.send({
    version: '1.0',
  });
});

router.post('/token', AuthController.token);

// 获取图片 OCR 识别
router.post('/image/ocr', ImageController.ocr);

// 存储图片
router.post('/image/upload', ImageController.upload);

// 获取图片相亲
router.get('/image/detail', ImageController.detail);

// 获取图片列表
router.get('/image/list', ImageController.list);

// 删除图片
router.post('/image/delete', ImageController.del);

export { router };
