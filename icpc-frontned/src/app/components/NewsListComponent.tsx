import React from 'react'
import NewsItemComponent from './cards/NewsItemComponent'
import cn from 'classnames'
const data = require('../newslist/listaNoticias.json')

interface INewsListComponentProps {
    className?: string

}

const NewsListComponent = ({...props}: Readonly<INewsListComponentProps>) => {
  const style = cn(props.className,'w-11/12 flex flex-row flex-wrap gap-4 justify-between')
  return (
    <div className={style}>{
        data.news.map((news: { id: any; href: string; title: string; image: string }) => (
            <NewsItemComponent item={news} key={news.id} className=''/>
        ))
    }</div>
  )
}

export default NewsListComponent