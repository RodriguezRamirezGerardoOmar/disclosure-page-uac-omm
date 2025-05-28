import React from 'react'
import ExerciseCardComponent from '@/app/components/cards/ExerciseCardComponent'
import useExcerciseStore from '@/store/useExcerciseStore'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'
import HeartbeatComponent from '@/app/components/logging/HeartbeatComponent'

/*
Input: params (object with exercise id from the route)
Output: a page displaying the exercise card with description, solution, and heartbeat logging
Return value: a page component used to show a single exercise with all its details and activity logging
Function: fetches exercise data by id, serializes markdown for description and solution, renders the exercise card, and logs user activity
Variables: params, exerciseBody, description, solution
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

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
    <main className='grid min-h-screen grid-cols-1 place-items-center justify-between w-full py-24'>
      <HeartbeatComponent itemId={params.exercise} itemType='exercise' />
      <div className='flex justify-end w-full'>
        <ExerciseCardComponent
          exercise={exerciseBody}
          itemId={params.exercise}
          description={description.compiledSource}
          solution={solution.compiledSource}
          clue={exerciseBody.clue}
        />
      </div>
    </main>
  )
}

export default ExercisePage
