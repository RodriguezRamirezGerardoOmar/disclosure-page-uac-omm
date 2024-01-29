import React from 'react'
import NoteCardComponent from '../../components/cards/NoteCardComponent'
import { TextComponent } from '@/app/components/text/TextComponent'
const data = require('@/app/note/apunte.json')
export default function Page({ params }: Readonly<{ params: { id: string } }>) {
  if (data.id.toString() === params.id) {
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
  } else {
    return (
      <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <TextComponent>Error 404... </TextComponent>
      </main>
    )
  }
}
