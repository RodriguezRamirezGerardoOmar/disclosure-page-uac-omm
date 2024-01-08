import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import Image from 'next/image'
import Link from 'next/link'

//genera un json con los datos de la noticia
const news = [
  {
    id: 1,
    title: 'Noticias',
    icon: 'NewspaperIcon',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    banner: '/images/dumie-data.png'
  },
  {
    id: 2,
    title: 'Ejercicios',
    icon: 'ListBulletIcon',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    banner: '/images/dumie-data.png'
  },
  {
    id: 3,
    title: 'Apuntes',
    icon: 'BookOpenIcon',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    href: '#',
    banner: '/images/dumie-data.png'
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
        {news.map(item => (
          <BasicPanelComponent key={item.id}>
            <Link
              href={item.href}
            className='h-full'>
              <div className='relative mb-4 h-64'>
                <Image
                  src='/images/dumie-data.png'
                  fill
                  alt='Picture of the author'
                  className='object-cover rounded-md'
                />
              </div>
              <TextComponent
                tag={enumTextTags.p}
                sizeFont='s16'
                className='font-bold text-primary'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptates.
              </TextComponent>
            </Link>
          </BasicPanelComponent>
        ))}
      </div>
    </div>
  )
}
