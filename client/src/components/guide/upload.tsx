import React, { useState } from 'react';
import { useLocalStorage, useMount } from 'react-use';
import Tour from 'reactour'

import './index.less'

const steps = [
  {
    selector: '.at-image-picker__choose-btn',
    content: '点击选择图片'
  },
  {
    selector: '.submit-button',
    content: '点击上传图片'
  },
  {
    selector: '.back-button',
    content: '点击返回首页'
  },
]

export default function UploadGuid() {
  const [guide, setGuide] = useLocalStorage('uploadguide');

  const [isTourOpen, setIsTourOpen] = useState(false);

  useMount(() => {
    setTimeout(() => {
      setIsTourOpen(guide === undefined ? true : !!guide)
    }, 500);
  })

  return (
    <Tour
      className='guide'
      steps={steps}
      rounded
      disableInteraction={true}
      closeWithMask={false}
      showNumber={false}
      showNavigation={false}
      showButtons={true}
      prevButton='上一步'
      nextButton='下一步'
      isOpen={isTourOpen}
      onRequestClose={() => {
        setIsTourOpen(false)
        setGuide(0);
      }}
    />
  );
}
