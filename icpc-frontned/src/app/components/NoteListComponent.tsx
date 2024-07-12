import React from 'react'
import NoteItemComponent from '../components/NoteItemComponent'
import { Note } from '@/constants/types'

interface NoteListProps {
  notes: Note[]
}

/*
Input: a list of notes objects with id, tagId, title, description, and a list of tag objects with id, name, and color
Output: a list of notes with the title, description, and tags
Return value: a list of notes as a component
Function: maps a set of notes articles into a list
Variables: notes { id, tagId, title, description, tags { id, name, color } }
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const NoteListComponent = ({ ...props }: Readonly<NoteListProps>) => {
  return (
    <div className='grid grid-rows-10 gap-4'>
      {props.notes.map((note, index) => (
        <a key={index} href={`note/${note.id}`}>
          <NoteItemComponent note={note} index={index+1}/>
        </a>
      ))}
    </div>
  )
}

export default NoteListComponent
