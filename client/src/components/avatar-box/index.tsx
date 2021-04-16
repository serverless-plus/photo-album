import React from "react";
import { View, Text } from "@tarojs/components";
import { AtAvatar } from 'taro-ui'

import "./index.less";

export default function AvatarBox({ imageTotal }) {
  return (
    <View
      className='avatar-box'
      // style={{
      //   backgroundImage:
      //     "url(https://pic3.zhimg.com/80/v2-097ed98c12a84f46e2e13fdc5e7de0ea_r.jpg)"
      // }}
    >
      <AtAvatar className='avatar' image='https://jdc.jd.com/img/200' circle size='large' />
      <View className='data-box'>
        <View className='data-item'>
          <Text>访客</Text>
          <Text>666</Text>
        </View>
        <View className='data-item'>
          <Text>点赞</Text>
          <Text>666</Text>
        </View>
        <View className='data-item'>
          <Text>总数</Text>
          <Text>{imageTotal}</Text>
        </View>
      </View>
    </View>
  );
}
