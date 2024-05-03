import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, Tags } from '@/constants/types'
import Select, { MultiValue, StylesConfig } from 'react-select'
import chroma from 'chroma-js'

interface TagSelectorProps {
  options: Tags[]
  selectedTags: Tags[]
  id: string
  onChange: (val: any) => void
}

const colourStyles: StylesConfig<Tags, true> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color)
    let backgroundColor = undefined
    if (!isDisabled) {
      if (isSelected) {
        backgroundColor = data.color
      } else if (isFocused) {
        backgroundColor = color.alpha(0.1).css()
      }
    }
    return {
      ...styles,
      backgroundColor,
      color: getColor(isDisabled, isSelected, color, data.color),
      cursor: getCursor(isDisabled),

      ':active': {
        ...styles[':active'],
        backgroundColor: getActiveBackgroundColor(isDisabled, isSelected, data.color, color)
      }
    }

    function getColor(isDisabled: boolean, isSelected: boolean, color: chroma.Color, dataColor: string): string {
      if (isDisabled) {
        return '#ccc'
      } else if (isSelected) {
        return chroma.contrast(color, 'white') > 2 ? 'white' : 'black'
      } else {
        return dataColor
      }
    }

    function getCursor(isDisabled: boolean): string {
      return isDisabled ? 'not-allowed' : 'default'
    }

    function getActiveBackgroundColor(
      isDisabled: boolean,
      isSelected: boolean,
      dataColor: string,
      color: chroma.Color
    ): string | undefined {
      if (!isDisabled) {
        return isSelected ? dataColor : color.alpha(0.3).css()
      } else {
        return undefined
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
  const labelClassname = 'place-self-start dark:text-dark-accent'

  let selectedTags: Tags[] = props.selectedTags
  const options: Tags[] = props.options

  const handleChange = (selectedOptions: MultiValue<Tags>) => {
    // Aquí puedes transformar los datos seleccionados al formato deseado, si es necesario
    selectedTags = selectedOptions.map(option => {
      return props.options.find(tag => tag.name === option.name) as Tags
    })
    props.onChange(selectedOptions)
  }

  return (
    <div className='w-full min-h-max'>
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
        onChange={(newValue: MultiValue<Tags>) => handleChange(newValue)}
        styles={colourStyles}
        getOptionLabel={option => option.name}
        getOptionValue={option => option.id.toString()}
      />
    </div>
  )
}
export default TagSelectorComponent
