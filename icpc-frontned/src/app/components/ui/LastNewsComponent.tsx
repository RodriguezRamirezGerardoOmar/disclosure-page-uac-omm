import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import Link from 'next/link'
import NewsItemComponent from '../cards/NewsItemComponent'

//genera un json con los datos de la noticia
const lastNews = [
  {
    id: 1,
    title: 'Lanzamiento de la última versión de Python, ¿Qué novedades nos trae Python 4.0?',
    href: '#',
    image: '/images/dumie-data.png'
  },
  {
    id: 2,
    title: 'El boom de la tecnología wearable: dispositivos inteligentes que cambian la forma en que vivimos',
    href: '#',
    image: '/images/dumie-data.png'
  },
  {
    id: 3,
    title: 'La era de la computación cuántica: perspectivas y desafíos en el horizonte tecnológico',
    href: '#',
    image: '/images/dumie-data.png'
  }
]

export const LastNewsComponent = () => {
  return (
    <div className='h-full'>
      <div className='flex justify-between'>
        <TextComponent
          tag={enumTextTags.h2}
          sizeFont='s20'
          className='font-bold text-gray-800'>
          Últimas Noticias
        </TextComponent>

        <div className='flex justify-end'>
          <Link
            href='/noticias'
            className='text-primary'>
            Ver más noticias
          </Link>
        </div>
      </div>
      <div className='flex flex-col gap-4 md:flex-row h-full'>
        {lastNews.map(item => (
          <NewsItemComponent item={item} key={item.id} />
        ))}
      </div>
    </div>
  )
}
