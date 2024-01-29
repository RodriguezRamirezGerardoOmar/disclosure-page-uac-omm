'use client'
import Image from 'next/image'
import logoClearMode from '@/../../public/icons/fdiClearMode.svg'
import logoDarkMode from '@/../../public/icons/fdiDarkMode.svg'
import cn from 'classnames'

interface ILogoProps {
  size: number
  classes?: string
}

export default function LogoComponent({ size, classes }: Readonly<ILogoProps>) {
  return (
    <>
      <Image
        src={logoDarkMode}
        alt='Logo de la facultad'
        width={size}
        height={size}
        className={cn(classes,'hidden dark:block')}
        priority={true}></Image>
      <Image
        src={logoClearMode}
        alt='Logo de la facultad'
        width={size}
        height={size}
        className={cn(classes,'block dark:hidden')}
        priority={true}></Image>
    </>
  )
}
