'use client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CreateUserComponent from '../components/modals/CreateUserComponent'

export default function Home() {
  const methods = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = async () => {}
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <CreateUserComponent methods={methods} />
    </form>
  )
}
