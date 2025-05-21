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

export type TResponseBasicError = {
  Code: number
  ResponseMessage: string
  StatusCode: number
  Success: boolean
}

export type TResponseError = {
  ErrorCode: number
  ErrorMessage: string
  PropertyName: string
  AttemptedValue?: { [key: string]: string } | string | number | boolean
}

export interface IApiResponse<E = {}> {
  data: any
  rows?: number // totalCurrentPageRecords
  totalRows?: number // totalRecords
  currentPage?: number // currentPageNumber
  totalPageRecords?: number // totalCurrentPageRecords
  totalAvailablePages?: number
  error: boolean
  statusCode: number | undefined
  message: string
  errors: E | TResponseError | any
}

export interface Option {
  label: string
  value: string
}

export interface Tags {
  id: string
  name: string
  color: string
}

export interface Categories {
  id: string
  name: string
}

export interface Difficulties {
  id: string
  level: number
  name: string
}

export enum TicketType {
  EXERCISE = 'exercise',
  NOTE = 'note',
  NEWS = 'news',
  UTILS = 'utils',
  USER = 'user'
}

export enum TicketStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

export enum TicketOperation {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export interface News {
  index: number
  id: string
  title: string
  body: string
  created_by: string
  created_at: string
  imageId: {
    id: string
  }
}

export interface Note {
  id: string
  title: string
  body: string
  isVisible: boolean
  tags: Tags[]
  category: Categories
  commentId: {
    id: string
    body: string
  }
}

export interface DBImage {
  id: string
  assetName: string
  data: Buffer
}

export interface Exercise {
  id: string
  title: string
  description: string
  category: Categories
  difficulty: Difficulties
  constraints: string
  clue: string
  tags: Tags[]
  solution: string
  author: string
}

export interface Quote {
  phrase: string
  author : string
}

export const AllTabs = {
  EXERCISES: 'Ejercicios',
  NOTES: 'Apuntes',
  NEWS: 'Noticias',
  REPORTS: 'Reportes',
  CHANGES: 'Cambios',
  CATEGORIES: 'Categoría',
  TAGS: 'Etiqueta',
  DIFFICULTY: 'Dificultad',
  ACCOUNT: 'Cuentas'
}

export interface IProfileTableItem {
  color?: string
  tagName?: string
  level?: number
  index: number
  id: string
  title: string
}

  export interface Ticket {
    id: string,
    itemType: TicketType,
    commentId: {
      id: string,
      body: string
    },
    operation: TicketOperation,
    originalExerciseId: Exercise,
    modifiedExerciseId: Exercise,
    originalNoteId: Note,
    modifiedNoteId: Note,
    originalNewsId: News,
    modifiedNewsId: News,
    status: TicketStatus
  }

  export interface Report {
    id: string,
    summary: string,
    report: string,
    itemType: TicketType,
    note: Note,
    excercise: Exercise,
    news: News
  }