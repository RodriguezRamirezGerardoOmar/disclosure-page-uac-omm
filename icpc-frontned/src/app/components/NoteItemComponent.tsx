import React from 'react'
import { TextComponent } from './text/TextComponent'
import TagListComponent from './tags/TagListComponent'
import { Note } from '@/constants/types'

interface NoteItemProps {
  note: Note
  index: number
}

/*
Input: a note object with id, title, description, and a list of tag objects with id, name, and color
Output: an item of a list of notes with the title, description, and tags
Return value: an item of a list of notes as a component
Function: maps the different parts of a notes article into a card that acts as an item of a list
Variables: note { id, title, description, tags { id, name, color } }
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const NoteItemComponent = ({ ...props }: Readonly<NoteItemProps>) => {
  return (
    <div className='bg-white dark:bg-dark-primary flex flex-col w-full rounded-md shadow-md p-2'>
      <div className='flex flex-col lg:flex-row w-full items-center lg:items-start justify-between gap-x-2'>
        <TextComponent
          sizeFont='s24'
          className='text-secondary dark:text-dark-complementary'>{`${props.index}.- ${props.note.title}`}</TextComponent>
        <TagListComponent
          tags={props.note.tags.slice(0, 3)} // Mostrar solo las primeras etiquetas
          showIcon={false}
        />
        {props.note.tags.length > 3 && ( // Mostrar puntos suspensivos si hay más etiquetas N. debe ser igual que el de arriba
          <span className='ml-1 text-gray-400'> ... </span> 
        )}
      </div>
      <TextComponent className='p-1'>{props.note.commentId.body}</TextComponent>
    </div>
  )
}

export default NoteItemComponent
