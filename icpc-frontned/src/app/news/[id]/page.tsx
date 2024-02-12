import React from 'react'
import { NewsCardComponent } from '@/app/components/cards/NewsCardComponent'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import data from '@/app/news/noticia.json'

export default async function Page({ params }: { params: { id: string } }) {
  const mdx = await serialize(data.body, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex as any]
    }
  })
  if (data.id.toString() === params.id) {
    return (
      <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
        <NewsCardComponent
          body={mdx.compiledSource}
          title={data.title}
          author={data.author}
          createdAt={data.createdAt}
        />
      </main>
    )
  }
  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <h1>404</h1>
    </main>
  )
}
