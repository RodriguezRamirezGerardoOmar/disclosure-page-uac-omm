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

const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then(mod => mod.default), { ssr: false })

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