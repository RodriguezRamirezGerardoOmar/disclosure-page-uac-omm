'use client' 
import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import Link from 'next/link'
import NewsItemComponent from '../cards/NewsItemComponent'
import useNewsStore from '@/store/useNewsStore'
import { useEffect, useState } from 'react'
import { News } from '@/constants/types'

/*
Input: none
Output: Section displaying the latest news items, with a link to view more news
Return value: Component that shows a list of the most recent news or a message if there are none
Function: Fetches and displays the three most recent news items, with a link to the news page
Variables: lastNews, setLastNews
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/
export const LastNewsComponent = () => {
  const [lastNews, setLastNews] = useState<News[]>([])
  
  useEffect(() => {
    const fetchNews = async () => {
      const news = await useNewsStore.getState().getNews(3)
      setLastNews(news)
    }
    fetchNews()
  }, [])

  return (
    <div className='h-full'>
      <div className='flex justify-between'>
        <TextComponent
          tag={enumTextTags.h2}
          sizeFont='s20'
          className='font-bold text-gray-800 dark:text-dark-accent'>
          Últimas Noticias
        </TextComponent>

        <div className='flex justify-end'>
          <Link href='/news' className='text-primary dark:text-dark-accent'>
            Ver más noticias
          </Link>
        </div>
      </div>
      
      {lastNews.length > 0 ? (
        <div className='flex flex-col gap-4 md:flex-row h-full'>
          {lastNews.map(item => (
            <NewsItemComponent item={item} key={item.id} />
          ))}
        </div>
      ) : (
        <TextComponent
          tag={enumTextTags.p}
          sizeFont='s16'
          className='text-center mt-28 text-gray-500 dark:text-dark-accent'>
          No hay noticias
        </TextComponent>
      )}
    </div>
  );
}