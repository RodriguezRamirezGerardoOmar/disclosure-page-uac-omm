'use client'
import Image from 'next/image'
import logoClearMode from '@/../../public/fdiClearMode.svg'
import logoDarkMode from '@/../../public/fdiDarkMode.svg'

interface ILogoProps {
  size: number
}

export default function LogoComponent({ size }: Readonly<ILogoProps>) {
  return (
    <>
      <Image
        src={logoDarkMode}
        alt='Logo de la facultad'
        width={size}
        height={size}
        className='hidden dark:block'></Image>
      <Image
        src={logoClearMode}
        alt='Logo de la facultad'
        width={size}
        height={size}
        className='block dark:hidden'></Image>
    </>
  )
}
