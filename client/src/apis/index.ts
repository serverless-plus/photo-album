import axios from "axios";
import Cos from "cos-js-sdk-v5";
import CONFIG from "../config";

const request = axios.create({
  baseURL: CONFIG.baseUrl,
  timeout: CONFIG.timeout,
  headers: {
    "Content-Type": "application/json"
  }
});

export async function getCosToken(uuid) {
  const res = await request.post(`/token`, {
    uuid
  });
  if (res.data.success) {
    return res.data;
  } else {
    throw res.data.error;
  }
}

export async function uploadToCos(uuid, file) {
  return new Promise(async (resolve, reject) => {
    const { data } = await getCosToken(uuid);
    const cos = new Cos({
      getAuthorization(options, callback) {
        try {
          callback({
            TmpSecretId: data.Credentials.TmpSecretId,
            TmpSecretKey: data.Credentials.TmpSecretKey,
            XCosSecurityToken: data.Credentials.Token,
            StartTime: data.StartTime, // 时间戳，单位秒，如：1580000000
            ExpiredTime: data.ExpiredTime // 时间戳，单位秒，如：1580000900
          });
        } catch (e) {
          reject(e);
        }
      }
    });
    cos.putObject(
      {
        Bucket: data.BucketName,
        Region: data.Region,
        Key: `${uuid}/${file.name}`,
        Body: file
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(`https://${data.Location}`);
        }
      }
    );
  });
}

export async function getOcrResult(imgUrl) {
  const { data } = await request.post(`/image/ocr`, {
    imgUrl
  });
  if (data.success) {
    return data;
  } else {
    throw new Error(data.error.message)
  }
}

export async function getImageList(uid: string, page: number = 1) {
  const { data } = await request.get(
    `/image/list?uid=${uid}&limit=10&offset=${page - 1}`
  );
  return data.data;
}

export async function uploadImages(uid: string, images: string[]) {
  const { data } = await request.post("/image/upload", {
    uid,
    images
  });
  if (data.success) {
    return data;
  } else {
    throw new Error(data.error.message)
  }
}

export async function getImage(id: string) {
  const { data } = await request.get(`/image/detail?id=${id}`);
  if (data.success) {
    return data;
  } else {
    throw new Error(data.error.message)
  }
}

export async function deleteImage(id: number) {
  const { data } = await request.post("/image/delete", {
    id
  });
  if (data.success) {
    return data;
  } else {
    throw new Error(data.error.message)
  }
}
