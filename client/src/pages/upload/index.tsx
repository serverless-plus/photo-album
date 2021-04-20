import React, { useState, useRef } from 'react';
import { View } from '@tarojs/components';
import Taro from '@tarojs/taro';
import { AtImagePicker, AtMessage, AtNoticebar, AtToast } from 'taro-ui';
import { useMount, useLocalStorage } from 'react-use';

import './index.less';

import BaseButton from '../../components/button';
import BackButton from '../../components/back-button';
import UploadGuide from '../../components/guide/upload';

import { uploadToCos, uploadImages } from '../../apis';

const MAX_SIZE = 5 * 1024 * 1024;

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

  function checkFileSize() {
    const largeFileIndexs = []
    images.forEach((item, index) => {
      if (item.file.size > MAX_SIZE) {
        largeFileIndexs.push(index)
      }
    })

    const imgElements = document.querySelectorAll('taro-image-core')

    // 清楚动效类
    setTimeout(() => {
      imgElements.forEach((item) => {
        item.classList.remove('select-error')
      })
    }, 1500)

    if (largeFileIndexs.length > 0) {
      Taro.atMessage({
        type: 'warning',
        message: '支持图片最大为 5M',
      });
      // add error status
      imgElements.forEach((item, index) => {
        if (largeFileIndexs.indexOf(index) !== -1) {
          item.classList.add('select-error')
        }
      })
      return false
    }
    return true
  }

  async function submitImages() {
    if (images.length === 0) {
      Taro.atMessage({
        type: 'warning',
        message: '请选择要上传的图片',
      });
      return;
    }
    if (!checkFileSize()) {
      return;
    }
    setLoading(true);
    try {
      const imageUrls = [];

      for (let i = 0; i < images.length; i++) {
        const file = images[i].file

        const fileObj = file.originalFileObj;

        const res = await uploadToCos(uid, fileObj);
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
      <UploadGuide key='upload-guide'/>

      <AtMessage />

      <AtToast isOpened={loading} duration={0} text={loading ? '上传中' : '上传成功'} icon={loading ? 'loading' : 'success'} status={loading ? 'loading' : 'success'}></AtToast>

      <AtNoticebar icon='volume-plus'>所选图片最大支持 5M</AtNoticebar>

      <AtImagePicker
        multiple
        className='image-picker'
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
