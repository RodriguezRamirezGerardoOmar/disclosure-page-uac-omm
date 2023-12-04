import Image from 'next/image'
import { CardWithHeaderComponent } from './components/panels/CardWithHeaderComponent'

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center'>
      <section className='relative w-full h-[70vw] lg:h-[50vw] dark:invert'>
        <Image
          src='/banner-landing.png'
          alt='Logo'
          fill
          priority
          style={{ objectFit: 'cover' }}
          className='object-top invert'
        />
      </section>
      <div></div>
      <CardWithHeaderComponent
        title={'!Bienvenido a la comunidad de desarrolladores de software!'}
        comments={'Aqui encontraras todo lo que necesitas para aprender a programar'}
      />
    </main>
  )
}
