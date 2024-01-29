'use client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'

export default function Home() {
  const methods = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = () => {
  }
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <CreateNoteComponent methods={methods} />
    </form>
  )
}
