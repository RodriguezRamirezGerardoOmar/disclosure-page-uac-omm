'use client'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import React, { ReactNode } from 'react'

/*
Input: children (ReactNode elements to be wrapped), reCaptchaKey (Google reCAPTCHA public key from environment variable)
Output: Provider component that wraps its children with GoogleReCaptchaProvider
Return value: React component that provides reCAPTCHA context to its children
Function: Wraps the application or part of it with Google reCAPTCHA v3 provider using the provided public key
Variables: children, reCaptchaKey
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

export default function CaptchaWrapperComponent({ children }: Readonly<{ children: ReactNode }>) {
  const reCaptchaKey: string | undefined = process.env.NEXT_PUBLIC_CAPTCHA_KEY

  return <GoogleReCaptchaProvider reCaptchaKey={reCaptchaKey ?? 'NOT DEFINED'}>{children}</GoogleReCaptchaProvider>
}
