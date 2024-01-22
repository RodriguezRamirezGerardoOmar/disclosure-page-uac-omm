import React from 'react'
import LogoComponent from '../LogoComponent'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import TextFieldComponent from '../forms/TextFieldComponent'
import { FieldValues, UseFormRegister } from 'react-hook-form'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'

interface ICreateNoteProps {
  register: UseFormRegister<FieldValues>
}

const CreateNoteComponent = ({ ...props }: Readonly<ICreateNoteProps>) => {
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center w-full justify-between'>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary w-full overflow-hidden'>
        <div className='flex flex-col w-full justify-items-center'>
          <LogoComponent classes='self-center' size={100} />
          <TextComponent className="self-center" sizeFont='s28' tag={enumTextTags.h1}>{"Crear apunte"}</TextComponent>
        </div>
        <TextFieldComponent
          fieldName='title'
          id='title'
          labelText='Título del apunte'
          necessary={true}
          type='text'
          register={props.register}
        />
      </BasicPanelComponent>
    </main>
  )
}

export default CreateNoteComponent
