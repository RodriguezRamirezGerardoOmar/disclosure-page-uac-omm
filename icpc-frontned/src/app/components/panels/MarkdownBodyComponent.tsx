'use client'
import React from 'react'
import { MDXRemote } from 'next-mdx-remote'

interface NewsBodyComponentProps {
  body: string
}

function MarkdownBodyComponent({ ...props }: Readonly<NewsBodyComponentProps>) {
  return (
    <div
      className={`w-full prose text-accent dark:text-dark-accent
      [&_a]:text-dark-accent [&_a]:dark:text-dark-complementary
      prose-headings:dark:text-dark-accent
      [&_img]:m-auto
    prose-strong:dark:text-dark-accent
    prose-blockquote:dark:text-dark-accent max-w-max`}>
      <MDXRemote
        compiledSource={props.body}
        scope={undefined}
        frontmatter={undefined}
      />
    </div>
  )
}

export default MarkdownBodyComponent
