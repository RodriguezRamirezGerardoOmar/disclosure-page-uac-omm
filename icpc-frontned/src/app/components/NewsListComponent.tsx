import React from 'react'
import NewsItemComponent from './cards/NewsItemComponent'
const data = require('../newslist/listaNoticias.json')

const NewsListComponent = () => {
  return (
    <div className='flex flex-row'>{
        data.news.map((news: { id: any; href: string; title: string; image: string }) => (
            <NewsItemComponent item={news} key={news.id}/>
        ))
    }</div>
  )
}

export default NewsListComponent