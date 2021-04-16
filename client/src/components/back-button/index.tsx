import React from "react";
import Taro from '@tarojs/taro'

import BaseButton from '../button'
import "./index.less";

export default function BackButton() {
  function goBack() {
    Taro.navigateBack()
  }
  return (
    <BaseButton onClick={goBack} icon='chevron-left' loading={false} className='back-button'/>
  );
}
