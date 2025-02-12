'use client'
import React, { useState } from 'react'
import ReportCardComponent from '../modals/ReportCardComponent'
import { useForm } from 'react-hook-form'

interface ReportButtonComponentProps {
  itemType: 'note' | 'exercise' | 'news'
  itemId: string
}

interface ReportData {
  description: string
  content: string
}

const ReportButtonComponent: React.FC<ReportButtonComponentProps> = ({ itemType, itemId }) => {
  const [showReportCard, setShowReportCard] = useState(false)
  const methods = useForm()

  const handleShowReport = () => setShowReportCard(true)

  const handleReportSubmit = (data: ReportData) => {
    setShowReportCard(false)
  }

  const handleModalClose = () => {
    setShowReportCard(false)
  }

  return (
    <div>
      <button
        className='bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition'
        onClick={handleShowReport}>
        Reportar Error
      </button>
      {showReportCard && (
        <div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
          <div className='rounded-lg p-6 w-full max-h-[90%] overflow-y-auto'>
            <ReportCardComponent
              itemType={itemType}
              itemId={itemId}
              onSubmit={handleReportSubmit}
              onCancel={handleModalClose}
              methods={methods}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default ReportButtonComponent
