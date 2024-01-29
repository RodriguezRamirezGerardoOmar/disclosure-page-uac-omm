import React from 'react'
import NoteCardComponent from '../../components/cards/NoteCardComponent'
import { TextComponent } from '@/app/components/text/TextComponent'
import { serialize } from 'next-mdx-remote/serialize'
import data from '@/app/note/apunte.json'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

export default async function Page({ params }: Readonly<{ params: { id: string } }>) {
  if (data.id.toString() === params.id) {
    const mdx = await serialize(data.content, {
      mdxOptions: {
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex as any]
      }
    })
    return (
      <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <NoteCardComponent
          title={data.title}
          description={data.description}
          content={mdx.compiledSource}
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
