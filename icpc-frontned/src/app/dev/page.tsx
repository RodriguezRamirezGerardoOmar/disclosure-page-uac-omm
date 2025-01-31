import CreateExcerciseComponent from '../components/modals/CreateExcerciseComponent'
import CreateNewsComponent from '../components/modals/CreateNewsComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'

export default function Home() {
  return (
    <>
      <CreateNewsComponent id='3a80e283-7140-48b6-a4a5-e3ce48bdcb79'/>
      <CreateNoteComponent />
      <CreateExcerciseComponent />
    </>
  )
}
