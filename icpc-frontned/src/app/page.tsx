import Image from 'next/image'
import { CardWithHeaderComponent } from './components/cards/CardWithHeaderComponent'
import { TextComponent } from './components/text/TextComponent'
import { enumTextTags, Quote } from '@/constants/types'
import { InfoCardComponent } from './components/cards/InfoCardComponent'
import { DataCardComponent } from './components/cards/DataCardComponent'
import { LastNewsComponent } from './components/ui/LastNewsComponent'
import useUtilsStore from '@/store/useUtilsStore'

/*
Input: none (static landing page, no props or parameters)
Output: a landing page displaying a welcome message, info cards, daily quote, random fact, and latest news
Return value: a page component used as the main entry point for the site, showing navigation, highlights, and news
Function: fetches daily quote and random fact, renders a hero section, welcome card, info cards, data cards, and latest news
Variables: dailyQuote, RandomFact, items, dataCard, dataRamdomCard
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export const dynamic = 'force-dynamic'
export default async function Home() {
  const dailyQuote: Quote = await useUtilsStore.getState().getDailyQuote()
  const RandomFact: string = await useUtilsStore.getState().getRandomFact()

  const items = [
    {
      title: 'Noticias',
      icon: 'NewspaperIcon',
      info: `Mantente al día con los eventos más recientes y las actualizaciones del mundo tecnológico y académico.
       Explora nuestras noticias para estar siempre informado.`,
      href: 'news',
      type: 2
    },
    {
      title: 'Ejercicios',
      icon: 'ListBulletIcon',
      info: `Pon a prueba tus habilidades con nuestra amplia colección de ejercicios diseñados para fortalecer tus conocimientos en programación
       y resolver problemas desafiantes.`,
      href: 'exercises',
      type: 0
    },
    {
      title: 'Apuntes',
      icon: 'BookOpenIcon',
      info: `Accede a una variedad de apuntes detallados que te ayudarán a consolidar tus conocimientos y
       profundizar en conceptos clave para tu aprendizaje.`,
      href: 'note',
      type: 1
    }
  ]

  const dataCard = {
    title: 'Cita del dia',
    info: `“${dailyQuote.phrase}”`,
    autor: dailyQuote.author
  }

  const dataRamdomCard = {
    title: 'Dato aleatorio',
    info: `“${RandomFact}”`,
    image: 'images/dumie-data.png'
  }

  return (
    <main className='flex min-h-screen flex-col items-center mt-16 gap-8'>
      <section className='flex relative w-full h-[90vw] lg:h-[50vw] items-stretch'>
        <Image
          src='/images/landing-omm.png'
          alt='Logo'
          fill
          priority
          className='object-cover object-top -z-10'
        />
        <div className='h-40 w-full bg-gradient-to-t from-white self-end'></div>
      </section>
      <CardWithHeaderComponent
        title={'¡Bienvenido a la comunidad de la Olimpiada Mexicana de Matemáticas!'}
        comments={`Esta página ha nacido con el propósito de recoger de forma libre y gratuita 
material de preparación para olimpiadas de matemáticas destinado a alumnos de enseñanza secundaria. 
Encontrarás dicho material organizado por categorías con unidades teóricas, ejercicios resueltos y 
ejercicios propuestos de diferentes niveles.`}
        className='z-10 -mt-36 shadow-lg max-w-4xl'
      />

      <div className='flex flex-col px-5 gap-4'>
        <TextComponent
          tag={enumTextTags.h3}
          sizeFont='s20'
          className='font-medium'>
          La resolución de problemas
        </TextComponent>
        <TextComponent
          tag={enumTextTags.p}
          sizeFont='s12'
          className='max-w-4xl'>
          La preparación para la resolución de problemas es un camino arduo y difícil, sobre todo al principio, pero la recompensa de
          encontrar la solución a un problema suple con creces el esfuerzo empleado.
        </TextComponent>

        <div className='flex flex-col gap-4 lg:flex-row'>
          {items.map((item, index) => (
            <InfoCardComponent
              key={index}
              title={item.title}
              icon={item.icon}
              info={item.info}
              href={item.href}
              type={item.type}
            />
          ))}
        </div>
      </div>

      <div className='flex flex-col md:flex-row-reverse gap-4 h-full'>
        <div className='flex flex-col gap-4 my-7 px-4 md:px-0 md:pr-4 w-full md:w-1/3'>
          <DataCardComponent
            title={dataCard.title}
            info={dataCard.info}
            autor={dataCard.autor}
          />
          <DataCardComponent
            title={dataRamdomCard.title}
            info={dataRamdomCard.info}
          />
        </div>
        <div className='px-4 md:px-0 md:pl-4 h-full w-full'>
          <LastNewsComponent />
        </div>
      </div>
    </main>
  )
}