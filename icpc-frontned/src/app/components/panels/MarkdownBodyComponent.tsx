'use client'
import React, { useEffect } from 'react';
import { MDXRemote } from 'next-mdx-remote';
import Prism from 'prismjs';
import '../css/prism.css'; // Cambia el tema si prefieres otro

interface MarkdownBodyComponentProps {
  body: string;
}

function MarkdownBodyComponent({ body }: Readonly<MarkdownBodyComponentProps>) {
  useEffect(() => {
    // Resalta el código después de que el componente se renderice
    Prism.highlightAll();
  }, [body]);

  return (
    <div
      className={`w-full prose text-accent dark:text-dark-accent
      [&_a]:text-dark-accent [&_a]:dark:text-dark-complementary
      prose-headings:dark:text-dark-accent
      [&_img]:m-auto
      prose-strong:dark:text-dark-accent
      prose-blockquote:dark:text-dark-accent max-w-max`}
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