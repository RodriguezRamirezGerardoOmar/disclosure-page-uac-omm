import React, { useRef, useImperativeHandle, forwardRef } from 'react'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, Option } from '@/constants/types'
import CreatableSelect from 'react-select/creatable'
import { StylesConfig, SelectInstance } from 'react-select'
import chroma from 'chroma-js'

interface InputSelectorCreateProps {
  options: Option[]
  selectedOption: Option | null
  id: string
  label: string
  onChange: (val: Option | null) => void
  handleCreate: (val: Option) => void
}

/*
Input: options (array of selectable options), selectedOption (currently selected option), id (unique identifier), label (label for the selector), onChange (callback for selection change), handleCreate (callback for creating a new option)
Output: a dropdown selector with creatable options, styled and labeled
Return value: a component used to select or create an option from a dropdown list
Function: renders a creatable select dropdown, allows selecting or creating options, exposes a clear method to parent via ref
Variables: options, selectedOption, id, label, onChange, handleCreate, inputRef, colourStyles
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

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

const InputSelectorCreateComponent = forwardRef(
  ({ options, selectedOption, id, label, onChange, handleCreate }: InputSelectorCreateProps, ref) => {
    const inputRef = useRef<SelectInstance<Option>>(null)

    useImperativeHandle(ref, () => ({
      clear() {
        inputRef.current?.clearValue() 
        onChange(null) 
      }
    }))

    return (
      <div className='w-full min-h-max'>
        <TextComponent
          className='place-self-start dark:text-dark-accent'
          tag={enumTextTags.p}>
          {label}
        </TextComponent>
        <CreatableSelect
          instanceId={id}
          options={options}
          value={selectedOption} 
          isSearchable={true}
          isClearable={true}
          styles={colourStyles}
          getOptionLabel={option => option.label}
          getOptionValue={option => option.value}
          ref={inputRef}
          onChange={newValue => {
            onChange(newValue) 
          }}
          onCreateOption={inputValue => {
            const newOption = { label: inputValue, value: inputValue }
            handleCreate(newOption) 
            onChange(newOption) 
          }}
        />
      </div>
    )
  }
)

export default InputSelectorCreateComponent
