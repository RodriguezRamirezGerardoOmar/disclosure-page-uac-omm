import CreateExcerciseComponent from '../components/modals/CreateExcerciseComponent'
import CreateNewsComponent from '../components/modals/CreateNewsComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'

export default async function Home() {
  return (
    <>
      <div className='margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-10'>
      </div>
      <CreateNewsComponent />
      <CreateNoteComponent />
      <CreateExcerciseComponent />
    </>
  )
}
