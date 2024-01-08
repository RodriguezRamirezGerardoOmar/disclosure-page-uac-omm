import React from 'react'
import cn from 'classnames'
import { TextComponent } from './text/TextComponent'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface TagProps {
  color: string
  tagName: string
  showIcon: boolean
}

const TagComponent = ({...props}: Readonly<TagProps>) => {
  const style = cn(props.color.toString(), 'rounded-md w-min px-3 py-1.5 flex flex-row gap-x-2').toString()
  return (
    <div className={style}>
      <TextComponent
        sizeFont='s12'
        className='text-white font-medium'>
        {props.tagName}
      </TextComponent>
      {props.showIcon ? (<button ><XMarkIcon className='block h-4 w-4'/></button>) : (<></>)}
    </div>
  )
}

export default TagComponent
