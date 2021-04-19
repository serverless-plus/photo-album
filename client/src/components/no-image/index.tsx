import React from "react";
import { View } from "@tarojs/components";


import './index.less'

export default function NoImage({ loading = false }) {
  return (
    <View className='no-image'>
      {loading ? '加载中...' : '暂无数据'}
    </View>
  );
}
