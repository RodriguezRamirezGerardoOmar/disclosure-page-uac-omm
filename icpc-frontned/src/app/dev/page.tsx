'use client'
import React from 'react'
import FooterComponent from '../components/ui/FooterComponent'

export default function Home() {
  return (
    <main
      className={`margin-auto md:mx-auto max-w-7xl md:px-4 w-full h-full lg:px-8 lg:w-2/3 lg:h-auto 
    min-h-screen place-items-center justify-between py-24`}>
      <footer className='border-dashed border-2 border-dark-complementary'>
        <FooterComponent />
      </footer>
    </main>
  )
}
