'use client'

import React from 'react';
import { ButtonComponent } from '@/app/components/buttons/ButtonComponent';
import useUtilsStore from '@/store/useUtilsStore';

interface TicketActionsProps {
  ticketId: string;
}

export const TicketActions: React.FC<TicketActionsProps> = ({ ticketId }) => {
  const approveTicket = useUtilsStore (state => state.approveTicket)
  const acceptTicket = async () => {
    try {
      const response = await approveTicket(ticketId);
      if ('statusCode' in response && response.statusCode == 201) {
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

  const rejectTicket = useUtilsStore (state => state.rejectTicket)
  const denyTicket = async () => {
    try {
      const response = await rejectTicket(ticketId);
      if ('statusCode' in response && response.statusCode == 201) {
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
      <ButtonComponent text='Denegar' className='bg-red-500 text-white hover:bg-red-600' onClick={denyTicket} />
    </div>
  );
};
