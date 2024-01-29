import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface TagProps {
  color: string
  tagName: string
  showIcon: boolean
}

const TagComponent = ({ ...props }: Readonly<TagProps>) => {
  return (
    <div
      className='rounded-md w-min-content px-3 py-1.5 flex flex-row gap-x-2'
      style={{ backgroundColor: props.color }}>
      <TextComponent
        sizeFont='s12'
        className='text-white font-medium'>
        {props.tagName}
      </TextComponent>
      {props.showIcon ? (
        <button>
          <XMarkIcon className='block h-4 w-4' />
        </button>
      ) : (
        <></>
      )}
    </div>
  )
}

export default TagComponent
