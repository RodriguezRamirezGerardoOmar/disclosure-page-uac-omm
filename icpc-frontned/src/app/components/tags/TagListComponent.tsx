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

/*
Input: a list of tags with an id, a name, and a color; a string to define CSS classes and a boolean to show an icon
Output: a set of tag badges as a single component
Return value: a list of tag badges as a component
Function: creates a component that maps and displays a list of tags as a list of badges
Variables: tags { id, name, color }, showIcon, className
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

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
