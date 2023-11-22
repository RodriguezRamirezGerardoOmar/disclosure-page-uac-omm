'use client'

import React from 'react'

interface IInputProps {
  labelText: string
  id: string
  name: string
  type: string
  autocomplete: string
  placeholder: string
  required: boolean
  classes: string
}

const SubmitComponent = ({ labelText, id, name, classes }: Readonly<IInputProps>) => {
  return (
    <div className='flex m-4 justify-center'>
      <input
        type='submit'
        value={labelText}
        name={name}
        className={classes}
        id={id}></input>
    </div>
  )
}

export default SubmitComponent
