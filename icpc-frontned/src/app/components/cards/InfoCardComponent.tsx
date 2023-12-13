import { NewspaperIcon, ListBulletIcon, BookOpenIcon } from '@heroicons/react/24/outline'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import Link from 'next/link'

interface IInfoCardComponentProps {
  title: string
  icon: string
  info: string
  href: string
  exercises: number
}

export const InfoCardComponent = ({ title = 'Title', exercises = 0, href = '#', ...props }: IInfoCardComponentProps) => {
  return (
    <BasicPanelComponent>
      <div className='flex justify-between items-center'>
        <div className='flex flex-row gap-2 '>
          {props.icon === 'NewspaperIcon' && <NewspaperIcon className='w-6 h-6' />}
          {props.icon === 'ListBulletIcon' && <ListBulletIcon className='w-6 h-6' />}
          {props.icon === 'BookOpenIcon' && <BookOpenIcon className='w-6 h-6' />}
          <TextComponent
            tag={enumTextTags.h3}
            sizeFont='s16'
            className='font-medium'>
            {title}
          </TextComponent>
        </div>
        <div className='flex flex-row gap-2'>
          <TextComponent
            tag={enumTextTags.span}
            sizeFont='s14'
            className='text-gray-500 font-medium'>
            {`Total de Ejercicios:`}
          </TextComponent>
          <TextComponent
            tag={enumTextTags.h3}
            sizeFont='s14'
            className='font-medium text-secondary'>
            {exercises.toString()}
          </TextComponent>
        </div>
      </div>
      <div className='pt-2'>
        <TextComponent
          tag={enumTextTags.p}
          sizeFont='s12'
          className='leading-5 text-gray-500'>
          {props.info || `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`}
        </TextComponent>
      </div>
      <div className='mt-2'>
        <Link href={href}>
          <TextComponent
            tag={enumTextTags.span}
            sizeFont='s14'
            className='text-secondary font-medium cursor-pointer'>
            {`Ver mas...`}
          </TextComponent>
        </Link>
      </div>
    </BasicPanelComponent>
  )
}
