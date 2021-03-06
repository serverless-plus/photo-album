import React, { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { navigateTo, useDidShow } from '@tarojs/taro';
import { useLocalStorage } from 'react-use';

import './index.less';

// TODO: 添加小程序登录功能
// import AvatarBox from "../../components/avatar-box";
import ImageList from '../../components/image-list';
import BaseButton from '../../components/button';
import NoImage from '../../components/no-image';
import AddGuide from '../../components/guide/add';

import { getImageList } from '../../apis';

export default function Index() {
  // TODO: 添加翻页功能
  const [page, setPage] = useState(1);
  const [uid] = useLocalStorage('uuid');

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true)

  function gotoUpload() {
    navigateTo({
      url: '/pages/upload/index',
    });
  }

  function onImageClick(image) {
    navigateTo({
      url: `/pages/detail/index?id=${image.id}`,
    });
  }

  async function getList(uid, page) {
    setLoading(true);
    const res = await getImageList(uid as string, page);
    setList(res);
    setLoading(false);
  }

  useDidShow(() => {
    getList(uid, page);
  });

  return (
    <View className="index">
      <AddGuide />
      {/* <AvatarBox imageTotal={list.length} /> */}
      {
        list.length > 0
          ? <ImageList list={list} onClick={onImageClick} />
          : <View className='no-image'>
          {loading ? '加载中...' : <Text>欢迎进入智能相册 <br/>请上传照片，识别图像</Text>}
        </View>
      }

      <BaseButton className='add-button' loading={false} onClick={gotoUpload} icon='add'/>
    </View>
  );
}
