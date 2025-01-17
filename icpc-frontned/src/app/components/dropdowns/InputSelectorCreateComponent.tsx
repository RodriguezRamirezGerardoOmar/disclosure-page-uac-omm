import React, { useRef, useImperativeHandle, forwardRef, useState } from 'react';
import { TextComponent } from '../text/TextComponent';
import { enumTextTags, Option } from '@/constants/types';
import CreatableSelect from 'react-select/creatable';
import { StylesConfig, SelectInstance } from 'react-select';
import chroma from 'chroma-js';

interface InputSelectorCreateProps {
  options: Option[];
  selectedOption: Option | null;
  id: string;
  label: string;
  onChange: (val: Option | null) => void;
  handleCreate: (val: Option) => Option;
}

const colourStyles: StylesConfig<Option> = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    const color = chroma('black');
    let backgroundColor = undefined;
    if (!isDisabled) {
      if (isSelected) {
        backgroundColor = 'white';
      } else if (isFocused) {
        backgroundColor = color.alpha(0.1).css();
      }
    }
    return {
      ...styles,
      backgroundColor,
      color: 'black',
      ':active': {
        ...styles[':active'],
        backgroundColor: 'white',
      },
    };
  },
};

const InputSelectorCreateComponent = forwardRef(
  ({ options, selectedOption, id, label, onChange, handleCreate }: InputSelectorCreateProps, ref) => {
    const inputRef = useRef<SelectInstance<Option>>(null);
    const [key, setKey] = useState(0); // Clave para forzar re-renderizado del componente

    useImperativeHandle(ref, () => ({
      clear() {
        setKey(prevKey => prevKey + 1); // Cambia la clave para reiniciar
        onChange(null); // Notifica al padre que se limpió
      },
    }));

    return (
      <div className="w-full min-h-max">
        <TextComponent className="place-self-start dark:text-dark-accent" tag={enumTextTags.p}>
          {label}
        </TextComponent>
        <CreatableSelect
          key={key} // Forzar reinicialización completa
          instanceId={id}
          options={options}
          value={selectedOption} // Estado controlado
          isSearchable={true}
          isClearable={true}
          styles={colourStyles}
          getOptionLabel={option => option.label}
          getOptionValue={option => option.value}
          ref={inputRef}
          onChange={newValue => {
            onChange(newValue); // Notifica al padre del cambio
          }}
          onCreateOption={inputValue => {
            const option = { label: inputValue, value: inputValue };
            const newOption = handleCreate(option);
            onChange(newOption);
          }}
        />
      </div>
    );
  }
);

export default InputSelectorCreateComponent;
