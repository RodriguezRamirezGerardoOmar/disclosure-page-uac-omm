'use client'
import { FieldValues, useForm } from 'react-hook-form'
import CreateExerciseComponent from '../components/modals/CreateExcerciseComponent'

export default function Home() {
  const methods = useForm<FieldValues>()
  return (
      <CreateExerciseComponent methods={methods} />
  )
}
