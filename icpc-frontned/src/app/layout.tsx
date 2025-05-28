import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import NavbarComponent from './components/NavbarComponent'
import classNames from 'classnames'
import FooterComponent from './components/ui/FooterComponent'
import { Toaster } from 'sonner'
import CaptchaWrapperComponent from './components/captcha/CaptchaWrapperComponent'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Sistema de divulgación de OMM',
  description: 'Plataforma para la divulgación de información y recursos del OMM'
}

/*
Input: children (ReactNode, the content of the page to render inside the layout)
Output: the root layout for the application, including navbar, captcha provider, footer, and global styles
Return value: a layout component used to wrap all pages with consistent UI elements and providers
Function: sets up the global layout, applies font and background styles, renders the navbar, wraps children with CaptchaWrapperComponent, adds footer and toast notifications
Variables: children, montserrat, metadata
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={classNames(montserrat.className, 'bg-white dark:bg-dark-secondary ')}>
        <NavbarComponent />
        <CaptchaWrapperComponent>{children}</CaptchaWrapperComponent>
        <footer>
          <FooterComponent />
        </footer>
        <Toaster />
      </body>
    </html>
  )
}
