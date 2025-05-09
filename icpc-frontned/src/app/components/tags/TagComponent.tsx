import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { readableColor, getLuminance } from 'polished'

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

const determineTextColor = (backgroundColor: string): string => {
  const luminance = getLuminance(backgroundColor);
  
  // Si el color es rojo puro o similar, forzar blanco
  const forceWhiteFor = ['#FF0000', '#E60026', '#C21807']; // Puedes agregar más tonalidades

  if (forceWhiteFor.includes(backgroundColor.toUpperCase())) {
    return '#FFFFFF';
  }

  // Condición personalizada basada en luminancia (puedes ajustar el umbral)
  return luminance > 0.5 ? '#000000' : '#FFFFFF';
};

const TagComponent = ({ ...props }: Readonly<TagProps>) => {
  const backgroundColor = `#${props.color}`
  const textColor = determineTextColor(backgroundColor);

  return (
    <div
      className='rounded-md w-min-content px-3 py-1.5 flex flex-row gap-x-2'
      style={{ backgroundColor: backgroundColor }}>
      <TextComponent
        sizeFont='s12'
        className='font-medium'
        style={{ color: textColor }}>
        {props.tagName}
      </TextComponent>
      {props.showIcon ? (
        <button>
          <XMarkIcon className='block h-4 w-4' style={{ color: textColor }} />
        </button>
      ) : null}
    </div>
  )
}

export default TagComponent
