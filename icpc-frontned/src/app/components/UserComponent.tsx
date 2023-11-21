'use client'
import { UserIcon } from '@heroicons/react/20/solid'
import { TextComponent } from './TextComponent'
import { enumTextSizes, enumTextTags } from '@/constants/types'

interface IUserProps{
  verified: Boolean,
  className?: string
}

export default function UserComponent({ verified}: IUserProps) {
  if (verified) {
    return <UserIcon className='h-10 w-10 rounded-full' />
  }
  return (
    <TextComponent
      tag={enumTextTags.p}
      sizeFont={enumTextSizes.s12}>
      Iniciar sesión
    </TextComponent>
  )
}
