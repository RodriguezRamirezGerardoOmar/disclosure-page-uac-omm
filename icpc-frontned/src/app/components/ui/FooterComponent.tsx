import React from 'react'
import { TextComponent } from '@/app/components/text/TextComponent'
import { enumTextTags } from '@/constants/types'
import LogoComponent from '../LogoComponent'

const FooterComponent = () => {
  return (
    <div className='w-full flex flex-col gap-2 border-dashed border-2 border-dark-complementary p-2'>
      <LogoComponent size={50} />
      <TextComponent tag={enumTextTags.h1}>Making the world a better place through construction alegant hieararchies</TextComponent>
      <div className='flex flex-row gap-2'>
        <TextComponent tag={enumTextTags.p}>Icon</TextComponent>
        <TextComponent tag={enumTextTags.p}>Icon</TextComponent>
        <TextComponent tag={enumTextTags.p}>Icon</TextComponent>
      </div>
      <div className='flex flex-row gap-2'>
        <div className='flex flex-col gap-2'>
          <TextComponent tag={enumTextTags.h1}>Ayuda</TextComponent>
          <TextComponent tag={enumTextTags.p}>Guías</TextComponent>
          <TextComponent tag={enumTextTags.p}>Manual de usuario</TextComponent>
          <TextComponent tag={enumTextTags.p}>Manual de programador</TextComponent>
        </div>
        <div className='flex flex-col gap-2'>
          <TextComponent tag={enumTextTags.h1}>Contacto</TextComponent>
          <TextComponent tag={enumTextTags.p}>Acerca de nosotros</TextComponent>
          <TextComponent tag={enumTextTags.p}>Universidad Autónoma de Campeche</TextComponent>
          <TextComponent tag={enumTextTags.p}>Facultad de Ingeniería</TextComponent>
        </div>
        <TextComponent tag={enumTextTags.p}>© 2024. Todos los derechos reservados</TextComponent>
      </div>
    </div>
  )
}

export default FooterComponent
