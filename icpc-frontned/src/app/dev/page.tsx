import CreateExcerciseComponent from '../components/modals/CreateExcerciseComponent'
import CreateNewsComponent from '../components/modals/CreateNewsComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'
import ExerciseHeaderComponent from '../components/ui/ExerciseHeaderComponent'

export default async function Home() {
  return (
    <>
      <div
        className='margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-10'></div>
      <ExerciseHeaderComponent
        category={'Álgebra'}
        title={'Problema'}
        itemId={'00f5c419-73b7-4936-9910-4560660633d6'}
      />
      <CreateNewsComponent />
      <CreateNoteComponent />
      <CreateExcerciseComponent />
    </>
  )
}
