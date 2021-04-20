import React, {useState } from 'react';
import { useLocalStorage, useMount } from 'react-use';
import Tour from 'reactour'

import './index.less'

const steps = [
  {
    selector: '.add-button',
    content: '点击添加图片'
  },
]

export default function AddTour() {
  const [guide, setGuide] = useLocalStorage('addguide');

  const [isTourOpen, setIsTourOpen] = useState(false);

  useMount(() => {
    setIsTourOpen(guide === undefined ? true : !!guide)
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
      showButtons={false}
      isOpen={isTourOpen}
      onRequestClose={() => {
        setIsTourOpen(false)
        setGuide(0);
      }}
    />
  );
}
