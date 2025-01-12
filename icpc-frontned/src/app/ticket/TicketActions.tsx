'use client'

import React from 'react';
import { ButtonComponent } from '@/app/components/buttons/ButtonComponent';

interface TicketActionsProps {
  ticketId: string;
}

export const TicketActions: React.FC<TicketActionsProps> = ({ ticketId }) => {
  const acceptTicket = async () => {
    try {
      const response = await fetch(`/ticket/approve/${ticketId}`, { method: 'POST' });
      if (response.ok) {
        console.log('Ticket aprobado');
        alert('El ticket ha sido aprobado con éxito.');
      } else {
        console.error('Error al aprobar el ticket');
        alert('Ocurrió un error al aprobar el ticket.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de conexión al intentar aprobar el ticket.');
    }
  };

  const rejectTicket = async () => {
    try {
      const response = await fetch(`/ticket/reject/${ticketId}`, { method: 'POST' });
      if (response.ok) {
        console.log('Ticket rechazado');
        alert('El ticket ha sido rechazado con éxito.');
      } else {
        console.error('Error al rechazar el ticket');
        alert('Ocurrió un error al rechazar el ticket.');
      }
    } catch (error) {
      console.error('Error de red:', error);
      alert('Error de conexión al intentar rechazar el ticket.');
    }
  };

  return (
    <div className='flex gap-4 mt-8'>
      <ButtonComponent text='Aceptar' className='bg-green-500 text-white hover:bg-green-600' onClick={acceptTicket} />
      <ButtonComponent text='Denegar' className='bg-red-500 text-white hover:bg-red-600' onClick={rejectTicket} />
    </div>
  );
};
