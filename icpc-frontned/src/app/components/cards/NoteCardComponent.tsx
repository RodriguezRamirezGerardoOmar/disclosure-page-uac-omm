'use client'
import { BasicPanelComponent } from '@/app/components/panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import TagListComponent from '../tags/TagListComponent'
import { ButtonComponent } from '../buttons/ButtonComponent'
import MarkdownBodyComponent from '../panels/MarkdownBodyComponent'
import { Tags } from '@/constants/types'
import ReportButtonComponent from '@/app/components/buttons/ReportButtonComponent'
import { toast } from 'sonner'

interface NoteCardProps {
  title: string
  description: string
  content: string
  showButton: boolean
  tags: Tags[]
  itemId?: string
}

/*
Input: the title, description, content, showButton, and a list of tags with their id, name, and color
Output: a card with the title, description, content, showButton, and a list of tags
Return value: a card component used to display notes articles
Function: creates a card component with the title, description, content, showButton, and a list of tags
Variables: title, description, content, showButton, tags { id, name, color }
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

function onclick() {
  toast.success('Redirigiendo a la página de ejercicios')
}

export default function NoteCardComponent({ ...props }: Readonly<NoteCardProps>) {
  const isTicketPage = window.location.pathname.includes('ticket')
  return (
    <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary w-full md:w-11/12'>
      {!isTicketPage && (
        <div className='flex justify-end w-full px-16'>
          <ReportButtonComponent
            itemId={props.itemId!}
            itemType='note'
          />
        </div>
      )}
      <TextComponent
        sizeFont='s36'
        className='dark:text-dark-accent'>
        {props.title}
      </TextComponent>
      <TagListComponent
        tags={props.tags}
        showIcon={false}
        className='my-4'
      />
      <TextComponent
        sizeFont='s14'
        className='text-gray-500 dark:text-dark-accent font-medium my-4'>
        {props.description}
      </TextComponent>
      <div className='w-full'>
        <MarkdownBodyComponent body={props.content} />
      </div>
      {props.showButton ? (
        <div className='grid justify-items-center my-4'>
          <a href='/exercises'>
            <ButtonComponent text='Problemas del tema' onClick={onclick}/>
          </a>
        </div>
      ) : (
        <></>
      )}
    </BasicPanelComponent>
  )
}
