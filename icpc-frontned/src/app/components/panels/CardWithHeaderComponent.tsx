import { enumTextTags } from '@/constants/types'
import cn from 'classnames'
import { TextComponent } from '../text/TextComponent'

interface CardWithHeaderComponentProps {
  title: string
  comments?: string
  className?: string[]
}

export const CardWithHeaderComponent = ({ className = [], ...props }: CardWithHeaderComponentProps) => {
  const classes = cn(className, `divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow dark:bg-dark-primary mx-10`)
  return (
    <div className={classes}>
      <div className='px-4 py-5 sm:px-6'>
        <TextComponent
          tag={enumTextTags.h2}
          sizeFont='s36'
        >
          {props.title}
        </TextComponent>
      </div>
      <div className='px-4 py-5 sm:p-6'>
        <TextComponent
          sizeFont='s16'
          tag={enumTextTags.p}
          className='leading-5 text-gray-500'
        >
          {props.comments}
        </TextComponent>
      </div>
    </div>
  )
}
