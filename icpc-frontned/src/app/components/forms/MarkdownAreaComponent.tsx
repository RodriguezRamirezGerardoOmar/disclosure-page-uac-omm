const MarkdownEditor = dynamic(() => import('@uiw/react-markdown-editor').then(mod => mod.default), { ssr: false })

export default function MarkdownAreaComponent({ value, onChange, labelText, className }: Readonly<MarkdownAreaComponentProps>) {
  const style = cn(className, 'w-full min-h-40')
  return (
    <div className={style}>
      {labelText != undefined ? (
        <TextComponent className='dark:text-dark-accent self-start'>
          {labelText}
        </TextComponent>
      ): (<></>)}
      <MarkdownEditor
        className={style}
        value={value}
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
        toolbarsMode={['preview']}
      />
    </div>
  )
}