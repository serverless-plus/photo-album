import React from 'react';
import { View, Image } from '@tarojs/components';
import { AtTag } from 'taro-ui';
import LabelList from '../label-list';

import './index.less';

export default function ImageCard({ url, labels, onClick }) {
  return (
    <View className="image-card" onClick={onClick}>
      <Image className="image-item" src={url} />
      <LabelList list={labels} />
    </View>
  );
}
