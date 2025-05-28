import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, News } from '@/constants/types'
import MarkdownBodyComponent from '../panels/MarkdownBodyComponent'
import useNewsStore from '@/store/useNewsStore'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import ReportButtonComponent from '../buttons/ReportButtonComponent'

interface NewsCardComponentProps {
  id: string
  itemId?: string
  isTicketPage?: boolean
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

async function getNewsArticle(id: string): Promise<News> {
  return await useNewsStore.getState().getNewsArticle(id)
}

async function NewsCardComponent({ isTicketPage = false, ...props  }: Readonly<NewsCardComponentProps>) {
  const news = await getNewsArticle(props.id)
  const body = await serialize(news.body, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex as any]
    }
  })
  return (
    <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary w-full md:w-11/12'>
      {!isTicketPage && (
        <div className='flex justify-end w-full px-16'>
          <ReportButtonComponent
            itemId={news.id}
            itemType='news'
          />
        </div>
      )}
      <TextComponent
        sizeFont='s36'
        className='dark:text-dark-accent my-4'
        tag={enumTextTags.h1}>
        {news.title}
      </TextComponent>
      <img
        className='object-cover w-2/3 lg:w-1/3 m-auto rounded-md'
        alt=''
        src={process.env.NEXT_PUBLIC_API_URL + 'api/v1/image/' + news.imageId.id}
      />
      <TextComponent
        sizeFont='s14'
        className='text-gray-500 font-medium my-4'>
        {news.created_by ?? 'Anónimo'}
      </TextComponent>
      <TextComponent
        sizeFont='s14'
        className='text-gray-500 font-medium my-4'>
        {news.created_at ? `${news.created_at.split('Z')[0].toString().split('T')[0]}` : ''}
      </TextComponent>
      <MarkdownBodyComponent body={body.compiledSource} />
    </BasicPanelComponent>
  )
}

export default NewsCardComponent
