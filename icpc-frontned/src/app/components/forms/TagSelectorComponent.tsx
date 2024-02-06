
import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags } from '@/constants/types'
import Select, { ActionMeta, MultiValue, StylesConfig } from 'react-select'
import chroma from 'chroma-js'

interface TagSelectorProps {
  options: {
    id: number
    name: string
    color: string
  }[]
  selectedTags: {
    id: number
    name: string
    color: string
  }[]
  id: string
  onChange: (val: any) => void
}

interface Tags {
  id: number
  name: string
  color: string
}

const colourStyles: StylesConfig<Tags, true> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color)
    let backgroundColor = undefined;
    if (!isDisabled) {
      if (isSelected) {
        backgroundColor = data.color;
      } else if (isFocused) {
        backgroundColor = color.alpha(0.1).css();
      }
    }
    return {
      ...styles,
      backgroundColor,
      color: isDisabled ? '#ccc' : isSelected ? (chroma.contrast(color, 'white') > 2 ? 'white' : 'black') : data.color,
      cursor: isDisabled ? 'not-allowed' : 'default',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled ? (isSelected ? data.color : color.alpha(0.3).css()) : undefined
      }
    }
  },
  multiValue: (styles, { data }) => {
    const color = chroma(data.color)
    return {
      ...styles,
      backgroundColor: color.alpha(0.1).css()
    }
  },
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: data.color
  }),
  multiValueRemove: (styles, { data }) => ({
    ...styles,
    color: data.color,
    ':hover': {
      backgroundColor: data.color,
      color: 'white'
    }
  })
}

const TagSelectorComponent = ({ ...props }: Readonly<TagSelectorProps>) => {
  const labelClassname = 'place-self-start dark:text-dark-accent my-2'

  let selectedTags: Tags[] = props.selectedTags
  const options: Tags[] = props.options

  const handleChange = (selectedOptions: MultiValue<Tags>) => {
    // Aquí puedes transformar los datos seleccionados al formato deseado, si es necesario
    selectedTags = selectedOptions.map((option) => {
      return props.options.find((tag) => tag.name === option.name) as Tags
    })
    props.onChange(selectedOptions);
  };

  return (
    <div className='w-full m-2 min-h-max'>
      <TextComponent
        className={labelClassname}
        tag={enumTextTags.p}>
        Etiquetas
      </TextComponent>
      <Select
        instanceId={props.id}
        options={options}
        defaultValue={selectedTags}
        isSearchable={true}
        isMulti={true}
        onChange={(newValue: MultiValue<Tags>, actionMeta: ActionMeta<Tags>) => handleChange(newValue)}
        styles={colourStyles}
        getOptionLabel={(option) => option.name}
        getOptionValue={(option) => option.id.toString()}
      />
    </div>
  )
}
export default TagSelectorComponent
