'use client'
import React from 'react'
import { MDXRemote } from 'next-mdx-remote'

interface NewsBodyComponentProps {
  body: string
}

function NewsBodyComponent({ ...props }: Readonly<NewsBodyComponentProps>) {
  return (
    <MDXRemote
      compiledSource={props.body}
      scope={undefined}
      frontmatter={undefined}
    />
  )
}

export default NewsBodyComponent
