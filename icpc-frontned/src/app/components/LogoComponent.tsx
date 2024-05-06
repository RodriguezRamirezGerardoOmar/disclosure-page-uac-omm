'use client'
import Image from 'next/image'
import logoClearMode from '@/../../public/icons/fdiClearMode.svg'
import logoDarkMode from '@/../../public/icons/fdiDarkMode.svg'
import cn from 'classnames'

interface ILogoProps {
  size: number
  classes?: string
}

/*
Input: a number of pixels and a string of TailwindCSS
Output: the engineering faculty logo in dark or clear mode
Return value: an svg logo as a component
Function: displays the logo of the engineering faculty and changes the mode according to the user's preference
Variables: size, classes
Date: 12 - 04 - 2024
Author: Gerardo Omar Rodriguez Ramirez
*/

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
