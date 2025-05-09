'use client'
import { enumTextTags, News } from '@/constants/types'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import cn from 'classnames'

interface INewsItemProps {
  item: News
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

const NewsItemComponent = ({ ...props }: Readonly<INewsItemProps>) => {
  const style = cn(props.className, 'bg-white dark:bg-dark-primary w-full lg:w-[32%]')
  return (
    <BasicPanelComponent backgroundColor={style}>
      <Link
        href={`/news/${props.item.id}`}
        className='h-full'>
        <div className='relative mb-4 h-64'>
          {props.item.imageId?.id !== undefined && props.item.imageId.id !== '' && (
            <Image
              src={process.env.NEXT_PUBLIC_API_URL + 'api/v1/image/' + props.item.imageId.id}
              fill
              alt={props.item.title}
              className='object-cover rounded-md'
            />
          )}
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
