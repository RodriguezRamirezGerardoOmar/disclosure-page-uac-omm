import CreateExcerciseComponent from '../components/modals/CreateExcerciseComponent'
import CreateNewsComponent from '../components/modals/CreateNewsComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'

export default function Home() {
  return (
    <>
      <CreateNewsComponent />
      <CreateNoteComponent />
      <CreateExcerciseComponent />
    </>
  )
}
