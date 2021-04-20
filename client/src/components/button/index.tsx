import React from 'react';
import { Text } from '@tarojs/components';
import { AtFab } from 'taro-ui';
import './index.less';

export default function Button({ loading = false, onClick, icon, className, ...rest }) {
  return (
    <AtFab className={`${className || ''} ${loading && 'at-button--disabled'}`} onClick={() => {
      !loading && onClick()
    }} size="normal" {...rest}>
      {loading ? (
        <Text className="loading at-fab__icon at-icon at-icon-loading-3"></Text>
      ) : (
        <Text className={`at-fab__icon at-icon at-icon-${icon}`}></Text>
      )}
    </AtFab>
  );
}
