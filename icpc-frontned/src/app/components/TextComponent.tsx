import cn from 'classnames'
import { enumTextSizes, enumTextTags, IReactNode } from '@/constants/types'
import { ReactNode } from 'react'

interface ITexComponentProps extends IReactNode {
  tag?: enumTextTags
  sizeFont?: enumTextSizes
  className?: string
  children: ReactNode | ReactNode[] | string
  [key: string]: any
}

export const TextComponent = ({ classNames = [], tag = enumTextTags.p, sizeFont = enumTextSizes.s14, ...props }: ITexComponentProps) => {
  const CustomTag = tag
  const classes = cn('Montserrat', classNames, `text-${sizeFont}`)

  return <CustomTag className={classes}>{props.children ? props.children : ''}</CustomTag>
}
