import { SubmitHandler, useForm } from 'react-hook-form'
import LogoComponent from './LogoComponent'
import { TextComponent } from './TextComponent'
import { enumTextSizes, enumTextTags } from '@/constants/types'

type FormData = {
  newPassword: string
  confirmation: string
}

export default function PasswordCardComponent() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const onSubmit: SubmitHandler<FormData> = data => console.log(data)

  const textFieldClassname =
    'block w-full rounded-md border-0 m-2 p-2 text-dark-primary shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-accent sm:leading-6'
  const labelClassname = 'place-self-start dark:text-dark-accent m-1'

  return (
    <div className='md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto'>
      {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
      <div className='mx-auto max-w-3xl bg-gray-300 dark:bg-dark-primary rounded-md p-2'>
        <div className='w-full grid grid-cols-1 place-items-center'>
          <LogoComponent size={150} />
          <TextComponent
            tag={enumTextTags.h3}
            sizeFont={enumTextSizes.s36}
            className='dark:text-dark-accent'>
            Nueva contraseña
          </TextComponent>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className='m-2 flex flex-col columns-1 place-items-center'>
          {/* register your input into the hook by invoking the "register" function */}
          <TextComponent
            htmlFor='newPassword'
            tag={enumTextTags.label}
            className={labelClassname}>
            Ingrese su nueva contraseña
          </TextComponent>
          <input
            {...register('newPassword', { required: true })}
            className={textFieldClassname}
            autoComplete='new-password'
            type='password'
            id='newPassword'
          />
          {/* errors will return when field validation fails  */}
          {errors.newPassword && (
            <TextComponent
              tag={enumTextTags.span}
              className='text-error'>
              Es necesario llenar este campo
            </TextComponent>
          )}

          {/* include validation with required or other standard HTML validation rules */}
          <TextComponent
            htmlFor='confirmation'
            tag={enumTextTags.label}
            className={labelClassname}>
            Confirme su contraseña
          </TextComponent>
          <input
            {...register('confirmation', { required: true })}
            className={textFieldClassname}
            autoComplete='new-password'
            type='password'
            id='confirmation'
          />
          {/* errors will return when field validation fails  */}
          {errors.confirmation && (
            <TextComponent
              tag={enumTextTags.span}
              className='text-error'>
              Es necesario llenar este campo
            </TextComponent>
          )}

          <input
            type='submit'
            className='max-w-min bg-primary rounded-md py-2 px-4 text-complementary dark:bg-dark-accent m-2'
          />
        </form>
      </div>
    </div>
  )
}
