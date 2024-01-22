'use client'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import CheckboxComponent from '../components/forms/CheckboxComponent'
import TextFieldComponent from '../components/forms/TextFieldComponent'
import { BasicPanelComponent } from '../components/panels/BasicPanelComponent'
import LogoComponent from '../components/LogoComponent'
import { enumTextTags } from '@/constants/types'
import SubmitComponent from '../components/forms/SubmitComponent'
import { TextComponent } from '../components/text/TextComponent'

export default function Home() {
  const onSubmit: SubmitHandler<FieldValues> = () => {
  }

  const methods = useForm<FieldValues>()
  return (
    <main
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
      min-h-screen place-items-center justify-between py-24`}>
      <BasicPanelComponent backgroundColor='bg-gray-300 dark:bg-dark-primary'>
        <div className='grid grid-cols-1 place-items-center justify-between'>
          <LogoComponent size={150} />
          <TextComponent
            tag={enumTextTags.h3}
            sizeFont='s36'
            className='dark:text-dark-accent'>
            Inicio de sesión
          </TextComponent>
        </div>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className='grid grid-cols-1 place-items-center justify-between'>
          <TextFieldComponent
            labelText='Correo electrónico / Nombre de usuario'
            register={methods.register}
            fieldName='username'
            auto='username'
            type='username'
            necessary={true}
            id='username'
          />
          <TextFieldComponent
            labelText='Contraseña'
            register={methods.register}
            fieldName='password'
            auto='current-password'
            type='password'
            necessary={true}
            id='password'
          />
          <CheckboxComponent
            labelText='Recuérdame'
            register={methods.register}
            fieldName='rememberMe'
          />
          <SubmitComponent text='Iniciar sesión' />
          <a href='/forgot'>
            <TextComponent className='dark:text-dark-accent underline hover:text-dark-accent hover:dark:text-complementary'>
              Olvidé mi contraseña
            </TextComponent>
          </a>
        </form>
      </BasicPanelComponent>
    </main>
  )
}
