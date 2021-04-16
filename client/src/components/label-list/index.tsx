import React from 'react';
import { View, Text } from '@tarojs/components';
import { AtTag } from 'taro-ui';

import './index.less';

export default function LabelList({ list = [] }) {
  list = list.filter(item => item)
  return (
    <View className="label-list">
      {list.length > 0 ? (
        list.map((item) => {
          return (
            <AtTag key={item} className="label-item" size="small" type="primary" circle active>
              {item}
            </AtTag>
          );
        })
      ) : (
        <Text>暂无</Text>
      )}
    </View>
  );
}
