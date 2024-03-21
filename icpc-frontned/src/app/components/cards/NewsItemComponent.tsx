import { enumTextTags } from '@/constants/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import cn from 'classnames'

interface INewsItemProps {
    item: {
        href: string
        title: string
        image: string
    }
    className?: string
}

/*
Input: an object that contains the href, title, and image of the news item, and a style for the card
Output: a card with the title, image, and style for a list of news items
Return value: a card component used to display an item in a list of news articles
Function: creates a card component with the title, image, and style for a list of news items, and a style for the card
Variables: item { href, title, image }, className, style
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const NewsItemComponent = ({...props}: Readonly<INewsItemProps>) => {
  const style = cn(props.className, 'bg-white dark:bg-dark-primary w-full lg:w-[32%]')
  return (
    <BasicPanelComponent backgroundColor={style}>
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
                className='font-bold text-dark-accent'>
                {props.item.title}
              </TextComponent>
            </Link>
          </BasicPanelComponent>
  )
}

export default NewsItemComponent