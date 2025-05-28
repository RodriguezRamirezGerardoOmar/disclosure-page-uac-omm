'use client'
import { SubmitHandler, useForm } from 'react-hook-form'
import PasswordCardComponent from '../components/cards/PasswordCardComponent'
import TextFieldComponent from '../components/forms/TextFieldComponent'

/*
Input: none (static recovery page, no props or parameters)
Output: a page displaying a form to create and confirm a new password
Return value: a page component used to reset a user's password
Function: renders a password card with two input fields for new password and confirmation, and handles form submission
Variables: methods (react-hook-form methods)
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const onSubmit: SubmitHandler<FormData> = () => {}

export default function Home() {
  const methods = useForm()
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <PasswordCardComponent
        label='Crear nueva contraseña'
        onSubmit={onSubmit}>
        <TextFieldComponent
          labelText='Ingresa tu nueva contraseña'
          fieldName='newPassword'
          auto='new-password'
          id='newPassword'
          necessary={true}
          type='password'
          register={methods.register}
        />
        <TextFieldComponent
          labelText='Confirma tu nueva contraseña'
          fieldName='confirmation'
          auto='new-password'
          id='confirmation'
          necessary={true}
          type='password'
          register={methods.register}
        />
      </PasswordCardComponent>
    </main>
  )
}
