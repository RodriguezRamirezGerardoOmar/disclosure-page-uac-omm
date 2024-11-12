import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import Link from 'next/link'
import NewsItemComponent from '../cards/NewsItemComponent'
import useNewsStore from '@/store/useNewsStore'; // Importa el store para acceder a las noticias

export const LastNewsComponent = async () => {
  const lastNews = await useNewsStore.getState().getNews(3); // Llama al método getNews para obtener solo 3 noticias

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
          <Link href='/noticias' className='text-primary'>
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
  );
}
