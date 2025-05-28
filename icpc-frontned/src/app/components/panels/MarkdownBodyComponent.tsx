'use client'
import React, { useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Prism from 'prismjs';
import '../css/prism.css'; 

interface MarkdownBodyComponentProps {
  body: string;
}

/*
Input: body (string containing the compiled MDX/Markdown content to render)
Output: a styled container rendering the Markdown/MDX content with syntax highlighting
Return value: a component used to display formatted Markdown/MDX content with code highlighting
Function: renders Markdown/MDX content using MDXRemote, applies Prism.js syntax highlighting, and customizes code block rendering
Variables: body
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

function MarkdownBodyComponent({ body }: Readonly<MarkdownBodyComponentProps>) {
  useEffect(() => {
    // Effect: Re-run Prism syntax highlighting whenever the body changes
    Prism.highlightAll();
  }, [body]);

  return (
    <div
      className={`w-full prose text-accent dark:text-dark-accent
      [&_a]:text-dark-accent [&_a]:dark:text-dark-complementary
      prose-headings:dark:text-dark-accent
      [&_img]:m-auto
      prose-strong:dark:text-dark-accent
      prose-blockquote:dark:text-dark-accent max-w-max
      text-justify`}
    >
      <MDXRemote
        compiledSource={body}
        scope={{}}
        frontmatter={{}}
        components={{
          code({ className, children }) {
            const language = className?.replace('language-', '') || 'plaintext';
            return (
              <pre className={`language-${language}`}>
                <code className={`language-${language}`}>
                  {String(children).replace(/\n$/, '')}
                </code>
              </pre>
            );
          }
        }}
      />
    </div>
  );
}

export default MarkdownBodyComponent;