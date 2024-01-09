import React from 'react'
import NoteCardComponent from '../components/cards/NoteCardComponent'
const data = require('../note/apunte.json')
export default function Home() {
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <NoteCardComponent
        title={data.title}
        description={data.description}
        content={data.content}
        tags={data.tags}
        showButton={true}
      />
    </main>
  )
}
