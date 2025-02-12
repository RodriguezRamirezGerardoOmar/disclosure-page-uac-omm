import React from 'react'
import ExerciseCardComponent from '@/app/components/cards/ExerciseCardComponent'
import MarkdownBodyComponent from '@/app/components/panels/MarkdownBodyComponent'
import { TextComponent } from '@/app/components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import useExcerciseStore from '@/store/useExcerciseStore'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

async function getMarkdown(body: string) {
  return await serialize(body, {
    mdxOptions: {
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex as any]
    }
  })
}

async function ExercisePage({ params }: Readonly<{ params: { exercise: string } }>) {
  const exerciseBody = await useExcerciseStore.getState().getExercise(params.exercise)
  const description = await getMarkdown(exerciseBody.description)
  const solution = await getMarkdown(exerciseBody.solution)

  return (
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between py-24'>
      <div className='flex justify-end w-full px-4'></div>
      <ExerciseCardComponent exercise={exerciseBody} />
      <div className='mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 text-accent dark:text-dark-accent'>
        <TextComponent tag={enumTextTags.h1}>Descripción del problema:</TextComponent>
        <MarkdownBodyComponent body={description.compiledSource} />
        <br />
        <TextComponent tag={enumTextTags.h1}>Restricciones:</TextComponent>
        <TextComponent>{exerciseBody.constraints}</TextComponent>
        <br />
        <TextComponent tag={enumTextTags.h1}>Solución del problema:</TextComponent>
        <MarkdownBodyComponent body={solution.compiledSource} />
      </div>
    </main>
  )
}

export default ExercisePage
