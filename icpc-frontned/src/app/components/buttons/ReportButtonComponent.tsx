'use client'
import React, { useState } from 'react'
import ReportCardComponent from '../modals/ReportCardComponent'

interface ReportButtonComponentProps {
  itemType: 'Nota' | 'Ejercicio' | 'Noticias'
  itemId: string
}

interface ReportData {
  description: string
  content: string
}

const ReportButtonComponent: React.FC<ReportButtonComponentProps> = ({ itemType, itemId }) => {
  const [showReportCard, setShowReportCard] = useState(false)

  const handleShowReport = () => setShowReportCard(true)

  const handleReportSubmit = (reportData: ReportData) => {
    console.log('Reporte subido para item:', itemType, itemId, reportData)
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
        <ReportCardComponent
          itemType={itemType}
          itemId={itemId}
          onSubmit={handleReportSubmit}
          onCancel={() => setShowReportCard(false)}
        />
      )}
    </div>
  )
}

export default ReportButtonComponent
