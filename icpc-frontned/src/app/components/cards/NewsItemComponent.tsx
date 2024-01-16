import { enumTextTags } from '@/constants/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'

interface INewsItemProps {
    item: {
        href: string
        title: string
        image: string
    }
}

const NewsItemComponent = ({...props}: Readonly<INewsItemProps>) => {
  return (
    <BasicPanelComponent>
            <Link
              href={props.item.href}
            className='h-full'>
              <div className='relative mb-4 h-64'>
                <Image
                  src={props.item.image}
                  fill
                  alt='Picture of the author'
                  className='object-cover rounded-md'
                />
              </div>
              <TextComponent
                tag={enumTextTags.p}
                sizeFont='s16'
                className='font-bold text-primary'>
                {props.item.title}
              </TextComponent>
            </Link>
          </BasicPanelComponent>
  )
}

export default NewsItemComponent