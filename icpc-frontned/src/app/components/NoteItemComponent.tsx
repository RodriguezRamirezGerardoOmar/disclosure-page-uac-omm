import React from 'react'
import { TextComponent } from './text/TextComponent'
import TagListComponent from './tags/TagListComponent'

interface NoteItemProps {
  note: {
    id: number
    title: string
    description: string
    tags: {
      id: number
      name: string
      color: string
    }[]
  }
}

const NoteItemComponent = ({ ...props }: Readonly<NoteItemProps>) => {
  return (
    <div className='bg-white dark:bg-dark-primary flex flex-col w-full rounded-md shadow-md p-2'>
      <div className='flex flex-row w-full items-center justify-between gap-x-2'>
        <TextComponent
          sizeFont='s24'
          className='text-secondary dark:text-dark-complementary'>{`${props.note.id}.- ${props.note.title}`}</TextComponent>
        <TagListComponent
          tags={props.note.tags}
          showIcon={false}
        />
      </div>
      <TextComponent className='p-1'>{props.note.description}</TextComponent>
    </div>
  )
}

export default NoteItemComponent
