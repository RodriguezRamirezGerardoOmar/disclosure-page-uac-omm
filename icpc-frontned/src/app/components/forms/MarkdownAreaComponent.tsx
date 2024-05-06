"use client"
import dynamic from 'next/dynamic'
import cn from 'classnames'
import { TextComponent } from '../text/TextComponent'

interface MarkdownAreaComponentProps {
  value: string
  onChange: (newValue: string) => void
  labelText?: string
  className?: string
}

// Dynamic import of the MarkdownEditor component
const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then(mod => mod.default), { ssr: false })

/*
Input: a value, a function to handle the change, a label and a class name
Output: a markdown editor component
Return value: a markdown editor component to be used in a form
Function: creates a markdown editor component to be used in a form
Variables: value, onChange, labelText, className, style, toolbars, toolbarsMode
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

export default function MarkdownAreaComponent({ value, onChange, labelText, className }: Readonly<MarkdownAreaComponentProps>) {
  const style = cn(className, 'w-full')
  return (
    <div className='w-full'>
      {labelText != undefined ? <TextComponent className='dark:text-dark-accent self-start'>{labelText}</TextComponent> : <></>}
      <MarkdownEditor
        key='texMath'
        className={style}
        value={value}
        height='320px'
        onChange={onChange}
        toolbars={[
          'undo',
          'redo',
          'header',
          'bold',
          'italic',
          'strike',
          'underline',
          'quote',
          'olist',
          'ulist',
          'link',
          'image',
          'code',
          'codeBlock'
        ]}
      /*enablePreview={false}*/
        toolbarsMode={['preview']}
      />
    </div>
  )
}
