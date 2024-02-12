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
