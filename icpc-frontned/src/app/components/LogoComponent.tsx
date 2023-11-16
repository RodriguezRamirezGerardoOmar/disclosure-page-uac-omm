'use client'
import Image from 'next/image'
import logo from '@/app/images/fdiLogo.png'

interface ILogoProps{
    size: number
}

export default function LogoComponent({size}: Readonly<ILogoProps>) {
  return (
    <Image
      src={logo}
      alt='Logo de la facultad'
      width={size}
      height={size}></Image>
  )
}
