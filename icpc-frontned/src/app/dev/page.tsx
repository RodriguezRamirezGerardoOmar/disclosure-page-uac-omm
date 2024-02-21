'use client'
import { FieldValues, useForm } from 'react-hook-form'
import CreateUserComponent from '../components/modals/CreateUserComponent'

export default function Home() {
  const methods = useForm<FieldValues>()
  return (
      <CreateUserComponent methods={methods} />
  )
}
