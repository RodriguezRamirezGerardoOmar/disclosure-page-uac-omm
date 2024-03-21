import React from 'react'

interface ISubmitProps {
  text?: string
}

/*
Input: a string with the text for the submit button
Output: a submit button with the text
Return value: a submit button component for a form
Function: creates a button to submit a form
Variables: text
Date: 21 - 03 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

const SubmitComponent = ({text}: Readonly<ISubmitProps>) => {
  return (
    <input
      type='submit'
      className='max-w-min bg-primary rounded-md py-2 px-4 text-complementary dark:bg-dark-accent m-2'
      value={text}
    />
  )
}

export default SubmitComponent
