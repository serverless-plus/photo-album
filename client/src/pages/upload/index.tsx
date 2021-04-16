import React, { useState } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtImagePicker, AtMessage } from 'taro-ui';
import { useLocalStorage } from 'react-use';

import './index.less';

import BaseButton from '../../components/button';
import BackButton from '../../components/back-button';

import { uploadToCos, uploadImages } from '../../apis';

export default function Index() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uid] = useLocalStorage('uuid');

  function onSelectChange(files) {
    setImages(files);
  }

  function onSelectFail(errMsg) {
    Taro.atMessage({
      type: 'error',
      message: errMsg,
    });
  }

  function onImageClick(index, file) {
    console.log(index, file);
  }

  async function submitImages() {
    if (images.length === 0) {
      Taro.atMessage({
        type: 'warning',
        message: '请选择要上传的图片',
      });
      return;
    }
    setLoading(true);
    try {
      const imageUrls = [];
      for (let i = 0; i < images.length; i++) {
        const file = images[i].file.originalFileObj;

        const res = await uploadToCos(uid, file);
        console.log('res', res);
        imageUrls.push(res);
      }

      // 提交存储到数据库
      await uploadImages(uid as string, imageUrls);
      Taro.atMessage({
        type: 'success',
        message: '上传成功',
      });
      Taro.navigateBack();
    } catch (e) {
      Taro.atMessage({
        type: 'error',
        message: `上传失败，${e.message}`,
      });
    }
    setLoading(false);
  }

  return (
    <View className="upload-page">
      <AtMessage />
      <AtImagePicker
        multiple
        files={images}
        onChange={onSelectChange}
        onFail={onSelectFail}
        onImageClick={onImageClick}
      />

      {/* 上传按钮 */}
      <BaseButton
        className="submit-button"
        loading={loading}
        onClick={submitImages}
        icon="upload"
      />
      {/* 返回按钮 */}
      <BackButton/>
    </View>
  );
}
