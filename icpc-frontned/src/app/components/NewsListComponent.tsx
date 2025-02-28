'use client'
import React, { Suspense, useEffect, useState } from 'react'
import cn from 'classnames'
import { TextComponent } from './text/TextComponent'
import { enumTextTags, News } from '@/constants/types'
import useNewsStore from '@/store/useNewsStore'

const LazyNewsItemComponent = React.lazy(() => import('./cards/NewsItemComponent'))

interface INewsListComponentProps {
  className?: string
}

/*
Input: a string of TailwindCSS
Output: a list of news articles
Return value: a list of news articles as a component
Function: maps the news articles and displays them
Variables: className, news { id, href, title, image }
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const NewsListComponent = ({ ...props }: Readonly<INewsListComponentProps>) => {
  const style = cn(props.className, 'w-11/12 flex flex-row flex-wrap gap-4')
  let ref = React.createRef<HTMLDivElement>()
  const newsList = useNewsStore(state => state.news)
  const [news, setNews] = useState<News[]>(newsList)
  const getNews = useNewsStore(state => state.getNews)
  
  useEffect(() => {
    getNews().then(response => {
      setNews(response)
    })
  }, [getNews])

  return (
    <>
      <div className={style}>
        <TextComponent
          tag={enumTextTags.h1}
          sizeFont='s28'
          className='font-bold dark:text-dark-accent my-4'>
          Noticias
        </TextComponent>
      </div>
      <div className={style} ref={ref}>
        {news.length > 0 ? (
          news.map((newsItem: News) => (
            <Suspense key={newsItem.index}>
              <LazyNewsItemComponent
                item={newsItem}
                className=''
              />
            </Suspense>
          ))
        ) : (
          <TextComponent
            className='text-center w-full' // Agregado w-full para ocupar todo el ancho
            tag={enumTextTags.h1}
            sizeFont='s20'>
            No hay noticias
          </TextComponent>
        )}
      </div>
    </>
  )
}

export default NewsListComponent