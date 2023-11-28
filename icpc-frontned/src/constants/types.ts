import { ReactNode } from 'react'

export enum enumTextSizes {
  s128 = '9xl',
  s96 = '8xl',
  s72 = '7xl',
  s60 = '6xl',
  s48 = '5xl',
  s36 = '4xl',
  s30 = '3xl',
  s24 = '2xl',
  s20 = 'xl',
  s18 = 'lg',
  s17 = '[17px]',
  s16 = 'base',
  s14 = 'sm',
  s13 = '[13px]',
  s12 = 'xs',
  s10 = '[10px]',
  s11 = '[11px]',
  s9 = '[9px]',
  s8 = '[8px]',
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

