'use client'
import { useForm, SubmitHandler } from 'react-hook-form'
import CheckboxComponent from '../components/forms/CheckboxComponent'
import TextFieldComponent from '../components/forms/TextFieldComponent'
import { BasicPanelComponent } from '../components/panels/BasicPanelComponent'
import LogoComponent from '../components/LogoComponent'
import { enumTextTags } from '@/constants/types'
import SubmitComponent from '../components/forms/SubmitComponent'
import { TextComponent } from '../components/text/TextComponent'
import useStore from '@/store/useStore'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'

/*
Input: none (static login page, no props or parameters)
Output: a page displaying a login form with username/email, password, remember me checkbox, and submit button
Return value: a page component used to authenticate users and start a session
Function: renders a logo, a title, and a form for users to enter their credentials, handles CAPTCHA verification, login logic, and feedback
Variables: login, captcha, router, methods, executeRecaptcha, onSubmit
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function Home() {
  const login = useStore(state => state.login)
  const captcha = useStore(state => state.captcha)
  const router = useRouter()
  const methods = useForm()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const onSubmit: SubmitHandler<{ username: string; password: string }> = async data => {
    if (!executeRecaptcha) {
      toast.error('Error al cargar el CAPTCHA, carga la página nuevamente', {
        duration: 5000,
        style: {
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
      })
    } else {
      try {
        const recaptchaToken = await executeRecaptcha('login')
        const captchaVerified = await captcha(recaptchaToken)
        if (captchaVerified.success) {
          const { username, password } = data
          const credentials = username.includes('@') ? { email: username, password } : { username: username, password }

          await login(credentials) 
          router.push('/')
          toast.success('Inicio de sesión exitoso', {
            duration: 5000,
            style: {
              backgroundColor: 'green',
              color: '#ffffff'
            }
          })
        }
      } catch (error) {
        toast.error('Error al iniciar sesión, verifica tus credenciales', {
          duration: 5000,
          style: {
            backgroundColor: '#ff0000',
            color: '#ffffff'
          }
        })
      }
    }
  }

  return (
    <main
      className={`margin-auto flex h-full min-h-screen w-full max-w-3xl place-items-center justify-between md:mx-auto
      md:px-4 lg:h-auto lg:w-2/3 lg:px-8`}>
      <BasicPanelComponent backgroundColor='bg-gray-300 dark:bg-dark-primary w-full shadow-lg xs:mx-2 sm:mx-4'>
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
          onSubmit={methods.handleSubmit(onSubmit as any)}
          className='grid grid-cols-1 place-items-center justify-between'>
          <TextFieldComponent
            labelText='Correo electrónico / Nombre de usuario'
            register={methods.register}
            fieldName='username'
            auto='username'
            type='text'
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
          <SubmitComponent
            text='Iniciar sesión'
            action={function (): void {}}
          />
        </form>
      </BasicPanelComponent>
    </main>
  )
}
