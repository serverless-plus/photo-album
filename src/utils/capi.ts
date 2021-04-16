import { Capi } from '@tencent-sdk/capi';

class CloudApi {
  capi: Capi;
  region: string;
  appId: string;
  secretId: string;
  secretKey: string;
  bucket: string;

  constructor() {
    const {
      REGION,
      TENCENT_APP_ID,
      TENCENT_SECRET_ID,
      TENCENT_SECRET_KEY,
      BUCKET,
    } = process.env as {
      REGION: string;
      TENCENT_APP_ID: string;
      TENCENT_SECRET_ID: string;
      TENCENT_SECRET_KEY: string;
      BUCKET: string;
    };

    this.capi = new Capi({
      debug: false,
      Region: REGION,
      ServiceType: '',
      SecretId: TENCENT_SECRET_ID,
      SecretKey: TENCENT_SECRET_KEY,
    });

    this.region = REGION;
    this.appId = TENCENT_APP_ID;
    this.secretId = TENCENT_SECRET_ID;
    this.secretKey = TENCENT_SECRET_KEY;
    this.bucket = BUCKET;
  }

  /**
   * get cos temporary credential for uploading picture to cos
   * @param {string} uuid uuid
   */
  async getCosTmpCredential(uuid: string) {
    this.capi.options.ServiceType = 'sts';
    const { Response } = await this.capi.request(
      {
        Action: 'GetFederationToken',
        Version: '2018-08-13',
        Name: uuid,
        // policies for upload
        Policy: JSON.stringify({
          version: '2.0',
          statement: [
            {
              effect: 'allow',
              action: ['name/cos:PutObject'],
              resource: [
                `qcs::cos:${this.region}:uid/${this.appId}:prefix//${this.appId}/${this.bucket}/*`,
              ],
            },
          ],
        }),
        DurationSeconds: 7200,
      },
      {
        host: 'sts.tencentcloudapi.com',
      },
    );
    Response.StartTime = Math.round(Date.now() / 1000);
    Response.Region = this.region;
    Response.BucketName = `${this.bucket}-${this.appId}`;
    return Response;
  }

  /**
   * get OCR result
   * @param {string} imgUrl image url
   * @param {string} lang language, default zh
   */
  async getOCRResult(imgUrl: string, lang = 'zh') {
    this.capi.options.ServiceType = 'ocr';
    const { Response } = await this.capi.request(
      {
        Action: 'GeneralBasicOCR',
        Version: '2018-11-19',
        ImageUrl: imgUrl,
        LanguageType: lang,
      },
      {
        host: 'ocr.tencentcloudapi.com',
      },
    );
    return Response;
  }

  /**
   * get image label
   * @param {string} imgUrl image url
   * @param {string} lang language, default zh
   */
  async getImageLabel(imgUrl: string) {
    this.capi.options.ServiceType = 'tiia';
    const { Response } = await this.capi.request(
      {
        Action: 'DetectLabel',
        Version: '2019-05-29',
        ImageUrl: imgUrl,
        Scenes: ['CAMERA'],
      },
      {
        host: 'tiia.tencentcloudapi.com',
      },
    );

    return Response;
  }
}

const apis = new CloudApi();

export { apis };
