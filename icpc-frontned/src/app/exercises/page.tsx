import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../components/text/TextComponent'
import TableComponent from '../components/tables/TableComponent'

/*
Input: none (static page, no props or parameters)
Output: a page displaying a title, description, and a table of exercises
Return value: a page component used to show a list of programming exercises
Function: renders a title, a description, and a table component for exercises
Variables: none (uses static content and imported components)
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function Home() {
  return (
    <div className='mt-16'>
      <div className='pt-10 px-10'>
        <TextComponent
          sizeFont='s28'
          tag={enumTextTags.h1}
          className='text-dark-primary dark:text-dark-accent'>
          Ejercicios
        </TextComponent>
        <TextComponent
          sizeFont='s14'
          tag={enumTextTags.p}
          className='text-dark-primary dark:text-dark-accent mt-5'>
          Aquí encontrarás ejercicios de diferentes temas de programación
        </TextComponent>
      </div>

      <div className='px-10 mt-5'>
        <TableComponent />
      </div>
    </div>
  )
}
