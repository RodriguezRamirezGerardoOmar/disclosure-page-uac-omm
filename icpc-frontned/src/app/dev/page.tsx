'use client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CreateUserComponent from '../components/modals/CreateUserComponent'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'
import CreateNewsComponent from '../components/cards/CreateNewsComponent'

export default function Home() {
  const methods = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = async () => {}
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <CreateUserComponent methods={methods} />
      <CreateNoteComponent methods={methods} />
      <CreateNewsComponent methods={methods} />
    </form>
  )
}
