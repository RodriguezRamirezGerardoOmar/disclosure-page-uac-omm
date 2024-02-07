import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import LogoComponent from '../LogoComponent'
import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import { Controller, FieldValues, RegisterOptions, SubmitHandler, UseFormRegisterReturn, UseFormReturn } from 'react-hook-form'
import TextFieldComponent from '../forms/TextFieldComponent'
import MarkdownAreaComponent from '../forms/MarkdownAreaComponent'
import SubmitComponent from '../forms/SubmitComponent'

interface IReportCardProps {
  methods: UseFormReturn<FieldValues>
}

const ReportCardComponent = ({ ...props }: Readonly<IReportCardProps>) => {
  return (
    <div
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-24`}>
      <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
        <div className='flex flex-col items-center'>
          <LogoComponent size={100} />
          <TextComponent
            tag={enumTextTags.h1}
            sizeFont='s16'
            className='dark:text-dark-accent'>
            ¿Encontraste un error?
          </TextComponent>
          <TextFieldComponent
            labelText='Descripción del error'
            register={props.methods.register}
            fieldName='description'
            id='description'
            necessary={true}
            type='text'
            auto='off'
          />
          <Controller
            name='content'
            defaultValue=''
            control={props.methods.control}
            render={({ field }) => (
              <MarkdownAreaComponent
                value={field.value}
                onChange={newValue => field.onChange(newValue)}
                labelText='Contenido'
                className='p-2'
              />
            )}
          />
          <SubmitComponent text='Reportar' />
        </div>
      </BasicPanelComponent>
    </div>
  )
}

export default ReportCardComponent
