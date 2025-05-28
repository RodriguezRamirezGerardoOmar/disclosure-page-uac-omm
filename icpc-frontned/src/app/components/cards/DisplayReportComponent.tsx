'use client'
import React, { useEffect, useState } from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, Report } from '@/constants/types'
import useUtilsStore from '@/store/useUtilsStore'
import { ButtonComponent } from '../buttons/ButtonComponent'
import { toast } from 'sonner'
import { XMarkIcon } from '@heroicons/react/20/solid'

interface DisplayReportComponentProps {
  id: string
  onClose: () => void
}

/*
Input: the id of the report to display and the onClose callback
Output: a card with the report's title, body, styles, and a button to resolve the report
Return value: a card component used to display a report's details and allow closing it
Function: fetches and displays a report by id, showing its details and providing a button to mark it as resolved
Variables: id, onClose, getReport, closeReport, report, reportBody
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const DisplayReportComponent = ({ id, onClose }: Readonly<DisplayReportComponentProps>) => {
  const getReport = useUtilsStore(state => state.getReport)
  const closeReport = useUtilsStore(state => state.closeReport)
  const [report, setReport] = useState<Report | null>(null)
  const [reportBody, setReportBody] = useState<string>('')

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport(id)
        // Condition: If the response has an 'id' property, set the report and its body
        if ('id' in response) {
          setReport(response)
          setReportBody(response.report)
        }
      } catch (error) {
        console.error('Error fetching report:', error)
      }
    }
    fetchReport()
  }, [id, getReport, setReport, setReportBody])

  const getUrl = (id: string | undefined) => {
    // Condition: Returns a different URL based on the report's itemType
    if (report?.itemType === 'exercise') {
      return `/exercises/${id}`
    } else if (report?.itemType === 'news') {
      return `/news/${id}`
    } else if (report?.itemType === 'note') {
      return `/note/${id}`
    } else {
      return '/'
    }
  }

  const close = async () => {
    try {
      const response = await closeReport(id)
      // Condition: If the response has an 'id' property, show a success toast and call onClose
      if ('id' in response) {
        toast.success('Reporte cerrado exitosamente.', {
          duration: 5000,
          style: {
            backgroundColor: 'green',
            color: '#ffffff'
          }
        })
        onClose()
      }
    } catch (error) {
      toast.error('No se pudo cerrar el reporte.', {
        duration: 5000,
        style: {
          backgroundColor: '#ff0000',
          color: '#ffffff'
        }
      })
    }
  }

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white dark:bg-dark-primary p-6 rounded-lg shadow-lg max-w-3xl w-full'>
        <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary typography'>
          <div className='flex w-full justify-end'>
            <div
              className='p-2 hover:bg-gray-100 dark:hover:bg-red-700 transition-colors duration-200 rounded max-w-min max-h-min'
              title='Cerrar formulario'>
              <button
                onClick={onClose}
                className='text-inherit'>
                <XMarkIcon className='h-6 w-6' />
              </button>
            </div>
          </div>
          <TextComponent
            tag={enumTextTags.h1}
            sizeFont='s24'
            className='text-accent dark:text-dark-accent'>
            {report?.summary}
          </TextComponent>
          <TextComponent className='text-accent dark:text-dark-accent'>{reportBody}</TextComponent>
          <TextComponent className='text-accent dark:text-dark-accent'>
            Encontrado en:{' '}
            <a
              className='underline hover:text-dark-complementary'
              target='_blank'
              href={getUrl(report?.note?.id ?? report?.excercise?.id ?? report?.news?.id)}>
              {report?.note?.title ?? report?.excercise?.title ?? report?.news?.title}
            </a>
          </TextComponent>
        </BasicPanelComponent>
        <div className='flex justify-center mt-4'>
          <ButtonComponent
            text='Reporte resuelto'
            onClick={close}
          />
        </div>
      </div>
    </div>
  )
}

export default DisplayReportComponent
