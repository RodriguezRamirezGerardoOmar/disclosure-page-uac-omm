import React from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, Option } from '@/constants/types'
import Select, { StylesConfig } from 'react-select'
import chroma from 'chroma-js'

interface InputSelectorProps {
  options: Option[]
  selectedOption: string
  id: string
  label: string
  clearable?: boolean
  onChange: (val: any) => void
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

/*
Input: a list of all posible options; the currently selected value;
the id of the selector; a function to handle the change of value
Output: a searchable selector with the options and the selected value
Return value: a selector component to display the options and select the desired value
Function: creates a component to search and select from a list of options
Variables:
Date: 07 - 05 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const InputSelectorComponent = ({ ...props }: Readonly<InputSelectorProps>) => {
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
      <Select
        instanceId={props.id}
        options={props.options}
        defaultValue={selectedOption}
        isSearchable={true}
        isMulti={false}
        onChange={newValue => props.onChange(newValue)}
        getOptionLabel={option => option.label}
        getOptionValue={option => option.value}
        styles={colourStyles}
        isClearable={(props.clearable === undefined) ? false : props.clearable}
      />
    </div>
  )
}
export default InputSelectorComponent
