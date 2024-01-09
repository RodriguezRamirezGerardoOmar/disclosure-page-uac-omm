
import TagListComponent from '../TagListComponent'
import { PaginationComponent } from '../paginations/PaginationComponent'
const exercises = [
  { id: 1, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 2, name: 'Lindsay Walton', dificult: 2, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 3, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 4, name: 'Lindsay Walton', dificult: 3, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 5, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 6, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 7, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 8, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 9, name: 'Lindsay Walton', dificult: 5, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 10, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 11, name: 'Lindsay Walton', dificult: 2, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 12, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 13, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 14, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 16, name: 'Lindsay Walton', dificult: 3, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 17, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 18, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 19, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 20, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 21, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 22, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 23, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] },
  { id: 24, name: 'Lindsay Walton', dificult: 1, categorie: 'Algebra', tag: ['example','ejemplo'] }
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default function TableComponent() {
  return (
    <div className='px-4 sm:px-6 lg:px-8 '>
      <div className='mt-8 flow-root'>
        <div className='-mx-4 -my-2 sm:-mx-6 lg:-mx-8'>
          <div
            className={`ring-1 ring-gray-300 sm:mx-0 sm:rounded-lg inline-block 
          min-w-full align-middle  h-[70vh] overflow-y-scroll scroll-smooth`}>
            <table className='min-w-full border-separate border-spacing-0'>
              <thead>
                <tr>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 
                    text-left text-sm font-semibold text-gray-500 backdrop-blur 
                    backdrop-filter sm:pl-6 lg:pl-8'>
                    NOMBRE
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm
                    font-semibold text-gray-500 backdrop-blur backdrop-filter'>
                    DIFICULTAD
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5
                    text-left text-sm font-semibold text-gray-500 backdrop-blur backdrop-filter lg:table-cell'>
                    CATEGORIA
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 
                    py-3.5 text-left text-sm font-semibold text-gray-500 backdrop-blur backdrop-filter'>
                    ETIQUETAS
                  </th>
                  <th
                    scope='col'
                    className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 
                    py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8'>
                    <span className='sr-only'>Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {exercises.map((exercise, id) => (
                  <tr
                    key={exercise.id}
                    className='cursor-pointer hover:bg-slate-200'>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'
                      )}>
                      {exercise.name}
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap flex gap-1 px-3 py-4 text-sm text-gray-500'
                      )}>
                        { 
                        //itera sobre el numero de dificultad y pinta tantas estrellas como sea el numero
                        Array.from(Array(exercise.dificult), (_, i) => (
                          <img src='icons/estrellas.svg' key={i}  className='h-5 w-5' />
                        ))
                      }
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell'
                      )}>
                      {exercise.categorie}
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'whitespace-nowrap text-sm text-gray-500'
                      )}>
                        <TagListComponent tags={exercise.tag.map(tag => ({id: 1, name: tag, color: 'bg-green-500'}))} />
                    </td>
                    <td
                      className={classNames(
                        id !== Object.keys(exercise).length - 1 ? 'border-b border-gray-200' : '',
                        'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8'
                      )}>
                      <a
                        href='#'
                        className='text-indigo-600 hover:text-indigo-900'>
                        Edit<span className='sr-only'>, {exercise.name}</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationComponent />
        </div>
      </div>
    </div>
  )
}
