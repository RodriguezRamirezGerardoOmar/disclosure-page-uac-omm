import cn from 'classnames'
import { enumTextSizes, enumTextTags, IReactNode } from '@/constants/types'
import { ReactNode } from 'react'
import { Montserrat } from 'next/font/google'

interface ITexComponentProps extends IReactNode {
  tag?: enumTextTags
  sizeFont?: enumTextSizes
  className?: string | string[]
  children: ReactNode | ReactNode[] | string
  [key: string]: any
}

export const TextComponent = ({ className = [], tag = enumTextTags.p, sizeFont = enumTextSizes.s14, ...props }: ITexComponentProps) => {
  const CustomTag = tag
  const classes = cn('Montserrat', className, `text-${sizeFont}`)

  return (
    <CustomTag
      className={classes}
      {...props}
    >
      {props.children ? props.children : ''}
    </CustomTag>
  )
}
