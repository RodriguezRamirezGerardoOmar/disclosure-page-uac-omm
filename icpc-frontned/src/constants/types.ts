import { ReactNode } from 'react'

export enum enumTextSizes {
  s128 = 'text-9xl',
  s96 = 'text-8xl',
  s72 = 'text-7xl',
  s60 = 'text-6xl',
  s48 = 'text-5xl',
  s36 = 'text-4xl',
  s30 = 'text-3xl',
  s24 = 'text-2xl',
  s20 = 'text-xl',
  s18 = 'text-lg',
  s17 = 'text-[17px]',
  s16 = 'text-base',
  s14 = 'text-sm',
  s13 = 'text-[13px]',
  s12 = 'text-xs',
  s10 = 'text-[10px]',
  s11 = 'text-[11px]',
  s9 = 'text-[9px]',
  s8 = 'text-[8px]',
  s7 = '[7px]'
}

export enum enumTextTags {
  h1 = 'h1',
  h2 = 'h2',
  h3 = 'h3',
  h4 = 'h4',
  h5 = 'h5',
  h6 = 'h6',
  p = 'p',
  span = 'span',
  label = 'label',
  a = 'a',
  ul = 'ul',

  li = 'li',
  div = 'div'
}

type typeReactNode = ReactNode

export interface IReactNode {
  children?: typeReactNode
}
