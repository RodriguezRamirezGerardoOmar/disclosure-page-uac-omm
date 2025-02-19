'use client'
import React, { useEffect, useState } from 'react'
import { BasicPanelComponent } from '../panels/BasicPanelComponent'
import { TextComponent } from '../text/TextComponent'
import { enumTextTags, Report } from '@/constants/types'
import useUtilsStore from '@/store/useUtilsStore'

interface DisplayReportComponentProps {
  id: string
  onClose: () => void
}

const DisplayReportComponent = ({ id, onClose }: Readonly<DisplayReportComponentProps>) => {
  const getReport = useUtilsStore(state => state.getReport)
  const closeReport = useUtilsStore(state => state.closeReport)
  const [report, setReport] = useState<Report | null>(null)
  const [reportBody, setReportBody] = useState<string>('')

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await getReport(id)
        setReport(response)
        if (response) {
          setReportBody(response.report)
        }
      } catch (error) {
        console.error('Error fetching report:', error)
      }
    }
    fetchReport()
  }, [id, getReport])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-primary p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <BasicPanelComponent backgroundColor='bg-white dark:bg-dark-primary typography'>
          <TextComponent tag={enumTextTags.h1} sizeFont='s24' className='text-accent dark:text-dark-accent'>
            {report?.summary}
          </TextComponent>
          <TextComponent>{reportBody}</TextComponent>
        </BasicPanelComponent>
        <div><button
          className='bg-red-500 text-white px-4 py-2 rounded mt-4'
          onClick={closeReport(id)}>
          Cerrar
        </button>
        <button
          className='bg-red-500 text-white px-4 py-2 rounded mt-4'
          onClick={onClose}>
          Cerrar
        </button></div>
      </div>
    </div>
  )
}

export default DisplayReportComponent
