import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface TagProps {
  color: string
  tagName: string
  showIcon: boolean
}

/*
Input: tag properties containing a color, a name, and a boolean to show an icon
Output: a tag badge with a name and a color
Return value: a badge component that represents a tag
Function: creates a badge component to represent a tag, assigning a color and a name
Variables: color, tagName, showIcon
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

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
