'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import EmailCardComponent from '../components/cards/EmailCardComponent'
import TextFieldComponent from '../components/forms/TextFieldComponent'

const onSubmit: SubmitHandler<FormData> = () => {}

export default function Home() {
  const methods = useForm()

  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <EmailCardComponent
        label='Recuperar contraseña'
        onSubmit={onSubmit}>
        <TextFieldComponent
          labelText='Ingresa tu correo electrónico'
          register={methods.register}
          fieldName='email'
          auto='email'
          type='email'
          necessary={true}
          id='email'
        />
      </EmailCardComponent>
    </main>
  )
}
