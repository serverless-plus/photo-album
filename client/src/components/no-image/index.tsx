import React from "react";
import { View } from "@tarojs/components";


import './index.less'

export default function NoImage({ loading = false, text = '暂无数据' }) {
  return (
    <View className='no-image'>
      {loading ? '加载中...' : text}
    </View>
  );
}
