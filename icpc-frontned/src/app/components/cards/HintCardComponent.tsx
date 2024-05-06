'use client'
import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { MDXRemote } from 'next-mdx-remote'

interface HintCardComponentProps {
  body: string
}

/*
Input: the body of the hint card
Output: a card with an mdx body
Return value: a card component used to display hints and solutions to exercises
Function: creates a card component with an mdx body
Variables: body
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const HintCardComponent = ({ ...props }: Readonly<HintCardComponentProps>) => {
  return (
    <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
      <MDXRemote
        compiledSource={props.body}
        scope={undefined}
        frontmatter={undefined}
      />
    </BasicPanelComponent>
  )
}

export default HintCardComponent
