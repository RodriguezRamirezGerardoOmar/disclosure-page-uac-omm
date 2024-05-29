import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, Option } from '@/constants/types'
import CreatableSelect from 'react-select/creatable'
import { StylesConfig } from 'react-select'
import chroma from 'chroma-js'

interface InputSelectorCreateProps {
  options: Option[]
  selectedOption: string
  id: string
  label: string
  onChange: (val: any) => void
  handleCreate: (val: any) => void
}

const colourStyles: StylesConfig<Option> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = chroma('black')
    let backgroundColor = undefined
    if (!isDisabled) {
      if (isSelected) {
        backgroundColor = 'white'
      } else if (isFocused) {
        backgroundColor = color.alpha(0.1).css()
      }
    }
    return {
      ...styles,
      backgroundColor,
      color: 'black',

      ':active': {
        ...styles[':active'],
        backgroundColor: 'white'
      }
    }
  }
}

const InputSelectorCreateComponent = ({ ...props }: Readonly<InputSelectorCreateProps>) => {
  const labelClassName = 'place-self-start dark:text-dark-accent'
  const options = props.options.map(option => ( option ))
  const selectedOption = options.find(option => option.label === props.selectedOption)
  return (
    <div className='w-full min-h-max'>
      <TextComponent
        className={labelClassName}
        tag={enumTextTags.p}>
        {props.label}
      </TextComponent>
      <CreatableSelect
        instanceId={props.id}
        options={props.options.map(option => option)}
        defaultValue={selectedOption}
        isSearchable={true}
        isClearable={true}
        styles={colourStyles}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
        onChange={newValue => {
          props.onChange(newValue)
        }}
        onCreateOption={inputValue => {
          const option = { label: inputValue, value: inputValue }
          const newOption = props.handleCreate(option)
          props.onChange(newOption)
        }}
      />
    </div>
  )
}
export default InputSelectorCreateComponent
