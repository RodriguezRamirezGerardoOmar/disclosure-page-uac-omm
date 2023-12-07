import React from 'react'

interface ISubmitProps {
  text?: string
}

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
