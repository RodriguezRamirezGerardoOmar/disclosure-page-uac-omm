'use client'
import React from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'

const customStyle = {
  ...dark,
  'pre[class*="language-"]': {
    ...dark['pre[class*="language-"]'],
    border: 'none', // Remove the border
    boxShadow: 'none', // Remove the box shadow
    background: 'transparent', // Remove the background color
  },
  'code[class*="language-"]': {
    ...dark['code[class*="language-"]'],
    background: 'transparent', // Remove the background color
  },
};

interface MarkdownBodyComponentProps {
  body: string
}

function MarkdownBodyComponent({ body }: MarkdownBodyComponentProps) {
  return (
    <div
      className={`w-full prose text-accent dark:text-dark-accent
      [&_a]:text-dark-accent [&_a]:dark:text-dark-complementary
      prose-headings:dark:text-dark-accent
      [&_img]:m-auto
      prose-strong:dark:text-dark-accent
      prose-blockquote:dark:text-dark-accent max-w-max`}>
      <MDXRemote
        compiledSource={body}
        scope={{}}
        frontmatter={{}}
        components={{
          code({ className, children }) {
            const match = /language-(\w+)/.exec(className || '')
            return match ? (
              <SyntaxHighlighter
                style={customStyle}
                language={match[1]}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className}>
                {children}
              </code>
            )
          }
        }}
      />
    </div>
  )
}

export default MarkdownBodyComponent