'use client'
import { enumTextTags, IReactNode } from '@/constants/types'
import cn from 'classnames'
import { ReactNode } from 'react'

interface ITextComponentProps extends IReactNode {
  tag?: enumTextTags
  sizeFont?: 's12' | 's14' | 's16' | 's18' | 's20' | 's24' | 's28' | 's36' | 's48' | 's60' | 's72' | 's96' | 's128'
  className?: string[] | string
  children: ReactNode | ReactNode[] | string
  [key: string]: any
}

const sizeClasses = {
  s12: 'text-xs',
  s14: 'text-sm',
  s16: 'text-base',
  s18: 'text-lg',
  s20: 'text-xl',
  s24: 'text-2xl',
  s28: 'text-3xl',
  s36: 'text-4xl',
  s48: 'text-5xl',
  s60: 'text-6xl',
  s72: 'text-7xl',
  s96: 'text-8xl',
  s128: 'text-9xl'
}

/*
Input: an HTML tag, a font size, a set of TailwindCSS classes, and a set of children
Output: a string of text surrounded in a specific HTML tag with a specific font size and CSS classes
Return value: a string of text as a component
Function: creates a string of text and sets the style
Variables: tag, sizeFont, className, children
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

export const TextComponent = ({ className = [], tag = enumTextTags.p, sizeFont = 's16', ...props }: ITextComponentProps) => {
  const CustomTag = tag
  const classes = cn('montserrat', `${className}`, `${sizeClasses[sizeFont]}`)

  return (
    <CustomTag
      className={classes}
      {...props}
    >
      {props.children ? props.children : ''}
    </CustomTag>
  )
}
