import React from 'react'
import NoteItemComponent from '../components/NoteItemComponent'

interface NoteListProps {
  notes: {
    id: number
    tagId: number
    title: string
    description: string
    tags: {
      id: number
      name: string
      color: string
    }[]
  }[]
}

const NoteListComponent = ({ ...props }: Readonly<NoteListProps>) => {
  return (
    <div className='grid grid-rows-10 gap-4'>
      {props.notes.map(note => (
        <a key={note.id} href="/note">
          <NoteItemComponent note={note} />
        </a>
      ))}
    </div>
  )
}

export default NoteListComponent
