'use client'
import React from 'react'
import { MDXRemote } from 'next-mdx-remote'

interface NewsBodyComponentProps {
  body: string
}

function MarkdownBodyComponent({ ...props }: Readonly<NewsBodyComponentProps>) {
  return (
    <div className='prose text-accent dark:text-dark-accent prose-a:text-dark-accent'>
      <MDXRemote
        compiledSource={props.body}
        scope={undefined}
        frontmatter={undefined}
      />
    </div>
  )
}

export default MarkdownBodyComponent
