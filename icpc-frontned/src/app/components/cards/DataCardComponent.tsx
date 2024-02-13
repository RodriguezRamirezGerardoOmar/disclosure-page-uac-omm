import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'

interface IInfoCardComponentProps {
  title: string
  info: string
  autor: string
  image?: string
}

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
