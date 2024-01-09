import React from 'react'
import TagComponent from './TagComponent'
interface TagListProps {
  tags: {
    id: number
    name: string
    color: string
  }[]
}
const TagListComponent = ({ ...props }: Readonly<TagListProps>) => {
  return (
    <div className='flex flex-row gap-x-2'>
      {props.tags.map(tag => (
        <TagComponent
          key={tag.id}
          tagName={tag.name}
          color={tag.color}
          showIcon={false}
        />
      ))}
    </div>
  )
}

export default TagListComponent
