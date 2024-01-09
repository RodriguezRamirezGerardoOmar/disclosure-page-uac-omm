import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../components/text/TextComponent'
import TableComponent from '../components/tables/TableComponent'

export default function Home() {
  return (
    <div className='mt-16'>
      <div className='pt-10 px-10'>
        <TextComponent
          sizeFont='s28'
          tag={enumTextTags.h1}
          className='text-accent'>
          Ejercicios
        </TextComponent>
        <TextComponent
          sizeFont='s14'
          tag={enumTextTags.p}
          className='text-dark-primary dark:text-dark-secondary'>
          Aquí encontrarás ejercicios de diferentes temas de programación
        </TextComponent>
      </div>

      <div className='px-10'>
        <TableComponent />
      </div>
    </div>
  )
}
