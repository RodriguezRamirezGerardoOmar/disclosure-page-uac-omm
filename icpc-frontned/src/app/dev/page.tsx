import CreateNewsComponent from '../components/modals/CreateNewsComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'
import CreateExcerciseComponent from '../components/modals/CreateExcerciseComponent'

export default function Home() {
  return (
    <>
      <CreateNewsComponent />
      <CreateNoteComponent />
      <CreateExcerciseComponent />
    </>
  )
}
