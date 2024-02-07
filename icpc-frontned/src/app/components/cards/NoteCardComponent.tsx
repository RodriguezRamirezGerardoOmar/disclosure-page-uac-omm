'use client'
import { BasicPanelComponent } from '@/app/components/panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import { MDXRemote } from 'next-mdx-remote'
import TagListComponent from '../tags/TagListComponent'
import { ButtonComponent } from '../buttons/ButtonComponent'

interface NoteCardProps {
  title: string
  description: string
  content: string
  showButton: boolean
  tags: {
    id: number
    name: string
    color: string
  }[]
}

export default function NoteCardComponent({ ...props }: Readonly<NoteCardProps>) {
  return (
    <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary'>
      <TextComponent
        sizeFont='s36'
        className='dark:text-dark-accent'>
        {props.title}
      </TextComponent>
      <TagListComponent
        tags={props.tags}
        showIcon={false}
        className='my-4'
      />
      <TextComponent
        sizeFont='s14'
        className='text-gray-500 font-medium my-4'>
        {props.description}
      </TextComponent>

      <MDXRemote
        compiledSource={props.content}
        frontmatter={undefined}
        scope={undefined}
      />

      {props.showButton ? (
        <div className='grid justify-items-center my-4'>
          <a href='/exercises'>
            <ButtonComponent text='Problemas del tema' />
          </a>
        </div>
      ) : (
        <></>
      )}
    </BasicPanelComponent>
  )
}
