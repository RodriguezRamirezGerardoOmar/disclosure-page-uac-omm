import React from 'react'
import TagComponent from './TagComponent'
import cn from 'classnames'

interface TagListProps {
  tags: {
    id: number
    name: string
    color: string
  }[]
  showIcon: boolean
  className?: string
}
const TagListComponent = ({ ...props }: Readonly<TagListProps>) => {
  const style = cn('flex flex-wrap gap-x-2', props.className)
  return (
    <div className={style}>
      {props.tags.map(tag => (
        <TagComponent
          key={tag.id}
          tagName={tag.name}
          color={tag.color}
          showIcon={props.showIcon}
        />
      ))}
    </div>
  )
}

export default TagListComponent
