'use client'
import { UserIcon } from '@heroicons/react/20/solid'
import { TextComponent } from '@/app/components/text/TextComponent'
import { enumTextTags } from '@/constants/types'

interface IUserProps {
  verified: boolean
}

export default function UserComponent({ verified }: Readonly<IUserProps>) {
  return verified ? (
    <UserIcon className='h-10 w-10 rounded-full' />
  ) : (
    <TextComponent
      tag={enumTextTags.p}
      sizeFont='s12'>
      Iniciar sesión
    </TextComponent>
  )
}
