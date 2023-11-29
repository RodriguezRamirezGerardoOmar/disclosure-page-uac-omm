'use client'
import Image from 'next/image'
import logoClearMode from '@/../../public/fdiClearMode.svg'
import logoDarkMode from '@/../../public/fdiDarkMode.svg'
import classNames from 'classnames'

interface ILogoProps {
  size: number
  className?: string
}

export default function LogoComponent({ size, className }: Readonly<ILogoProps>) {
  return (
    <>
      <Image
        src={logoDarkMode}
        alt='Logo de la facultad'
        width={size}
        height={size}
        className={classNames(className,'hidden dark:block')}
        priority={true}></Image>
      <Image
        src={logoClearMode}
        alt='Logo de la facultad'
        width={size}
        height={size}
        className={classNames(className,'block dark:hidden')}
        priority={true}></Image>
    </>
  )
}
