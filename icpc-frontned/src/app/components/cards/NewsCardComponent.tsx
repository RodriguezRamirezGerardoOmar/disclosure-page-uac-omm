'use client'
import { MDXRemote } from 'next-mdx-remote'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'

interface NewsCardComponentProps {
  title: string
  author: string
  createdAt: string
  body: string
}

/*
Input: the title of the news article, the author, the creation date, and the body of the news article
Output: a card with the title, author, creation date, and body of the news article
Return value: a card component used to display news articles
Function: creates a card component with the title, author, creation date, and body of the news article
Variables: title, author, createdAt, body
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

export const NewsCardComponent = ({ ...props }: Readonly<NewsCardComponentProps>) => {
  return (
    <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
      <TextComponent
        sizeFont='s36'
        className='dark:text-dark-accent my-4'
        tag={enumTextTags.h1}>
        {props.title}
      </TextComponent>
      <img
        alt=''
        src='https://www.dongee.com/tutoriales/content/images/2023/01/image-47.png'
      />
      <TextComponent
        sizeFont='s14'
        className='text-gray-500 font-medium my-4'>
        {`Autor: ${props.author}`}
      </TextComponent>
      <TextComponent
        sizeFont='s14'
        className='text-gray-500 font-medium my-4'>
        {`Fecha: ${props.createdAt}`}
      </TextComponent>
      <MDXRemote
        compiledSource={props.body}
        scope={undefined}
        frontmatter={undefined}
      />
    </BasicPanelComponent>
  )
}
