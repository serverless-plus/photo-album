import React from 'react';
import { View } from '@tarojs/components';

import './index.less';

import ImageCard from '../image-card';

export default function ImageList({ list = [], onClick }) {
  return (
    <View className="image-list">
      {list.map((item) => {
        return (
          <ImageCard
            onClick={() => {
              onClick(item);
            }}
            key={item.id}
            url={item.url}
            labels={item.labels.split(';')}
          />
        );
      })}
    </View>
  );
}
