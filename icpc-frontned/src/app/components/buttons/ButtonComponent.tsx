import { enumTextTags } from '@/constants/types'
import { TextComponent } from '../text/TextComponent'
import { ArrowLongRightIcon } from '@heroicons/react/24/solid'

interface IButtonComponentProps {
  text: string
  buttonType?: 'button' | 'submit' | 'button_outline'
  icon?: boolean
}

export const ButtonComponent = ({ buttonType = 'button', ...props }: IButtonComponentProps) => {
  const styles = {
    button: `inline-flex items-center gap-x-2 rounded-md bg-primary text-complementary px-3.5 py-2.5 
      font-medium shadow-sm hover:bg-secondary focus-visible:outline 
      focus-visible:outline-offset-2 focus-visible:outline-complementary`,
    button_outline: `inline-flex items-center gap-x-2 rounded-md bg-transparent text-primary border-primary
      border px-3.5 py-2.5 font-medium shadow-sm hover:bg-secondary hover:text-complementary
      focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-primary`
  }

  return (
    <button
      type='button'
      className={`${styles[buttonType as keyof typeof styles] || ''}`}>
      <TextComponent
        tag={enumTextTags.span}
        sizeFont='s14'>
        {props.text}
      </TextComponent>
      {props.icon && <ArrowLongRightIcon className='w-5 h-5' />}
    </button>
  )
}
