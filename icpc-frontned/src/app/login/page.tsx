'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import LoginCardComponent from '../components/cards/LoginCardComponent'
import CheckboxComponent from '../components/forms/CheckboxComponent'
import TextFieldComponent from '../components/forms/TextFieldComponent'

const onSubmit: SubmitHandler<FormData> = () => {}

export default function Home() {
  const methods = useForm()
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <LoginCardComponent
        onSubmit={onSubmit}
        label='Iniciar sesión'>
        <TextFieldComponent
          labelText='Correo electrónico o nombre de usuario'
          fieldName='username'
          id='username'
          necessary={true}
          type='username'
          auto='username'
          register={methods.register}
        />
        <TextFieldComponent
          labelText='Contraseña'
          fieldName='password'
          id='password'
          necessary={true}
          type='password'
          auto='current-password'
          register={methods.register}
        />
        <CheckboxComponent
          labelText='Recuérdame'
          fieldName='rememberMe'
          register={methods.register}
        />
      </LoginCardComponent>
    </main>
  )
}
