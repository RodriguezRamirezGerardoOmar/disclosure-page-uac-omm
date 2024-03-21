import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'

interface IInfoCardComponentProps {
  title: string
  info: string
  autor: string
  image?: string
}

/*
Input: the title of the card, the information to display, the author of the information, and an image if it has one
Output: a card with the title, information, author, and image if it has one
Return value: a card component used for random quotes
Function: creates a card component with the title, information, author, and image if it has one
Variables:
Date:
Author:
*/

export const DataCardComponent = ({ ...props }: IInfoCardComponentProps) => {
  return (
    <BasicPanelComponent backgroundColor='bg-complementary' >
      <div className='flex flex-col'>
        <TextComponent
          sizeFont='s18'
          className='text-gray-500 font-bold'>
          {props.title}
        </TextComponent>
        <div className='flex gap-4'>
          {props.image ? (
            <img
              src={props.image}
              alt=""
              className='w-full h-40 object-contain rounded-md mt-2'
            />
          ) : (
            <></>
          )}
          <TextComponent
            sizeFont='s14'
            className='text-black mt-2'>
            {props.info}
          </TextComponent>
        </div>
        <TextComponent
          sizeFont='s14'
          className='text-black mt-4 self-end italic'>
          {props.autor}
        </TextComponent>
      </div>
    </BasicPanelComponent>
  )
}
