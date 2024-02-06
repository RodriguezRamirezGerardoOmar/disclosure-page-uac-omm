"use client"
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CreateNoteComponent from '../components/modals/CreateNoteComponent'

export default function Home() {
  const methods = useForm<FieldValues>()
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try{
        const response = await fetch("http://localhost:3001/api/v1/notes", {
            method: 'POST',
            mode: 'cors',
            headers: {
              'Access-Control-Request-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data })
          });
        console.log(response)
    }
    catch(err){
      console.log(err)
    }
    finally{
        console.log("Note created")
    }
  }
  return (
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <CreateNoteComponent methods={methods} />
    </form>
  )
}
