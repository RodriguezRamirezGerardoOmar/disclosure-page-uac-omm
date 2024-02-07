'use client'
import React from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { MDXRemote } from 'next-mdx-remote'

interface HintCardComponentProps {
  body: string
}

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
