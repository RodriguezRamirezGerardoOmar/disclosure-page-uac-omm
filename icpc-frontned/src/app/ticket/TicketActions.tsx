'use client'

import React from 'react';
import { ButtonComponent } from '@/app/components/buttons/ButtonComponent';
import useUtilsStore from '@/store/useUtilsStore';
import { toast } from 'sonner';

interface TicketActionsProps {
  ticketId: string;
}

export const TicketActions: React.FC<TicketActionsProps> = ({ ticketId }) => {
  const approveTicket = useUtilsStore (state => state.approveTicket)
  const acceptTicket = async () => {
    try {
      const response = await approveTicket(ticketId);
      if (response) {
        const toastOptions = {
          duration: 5000,
          style: {
            backgroundColor: 'id' in response ? 'green' : '#ff0000',
            color: '#ffffff'
          }
        }
        if ('id' in response) {
          toast.success('Ticket aprobado con éxito.', toastOptions);
          window.location.href = '/profile'
        } else {
          toast.error('Ocurrió un error al aprobar el ticket.', toastOptions);
        }
      }
      
    } catch (error) {
      toast.error('Ocurrió un error al aprobar el ticket.', { duration: 5000, style: { backgroundColor: '#ff0000', color: '#ffffff' } });
    }
  };

  const rejectTicket = useUtilsStore (state => state.rejectTicket)
  const denyTicket = async () => {
    try {
      const response = await rejectTicket(ticketId);
      if (response) {
        const toastOptions = {
          duration: 5000,
          style: {
            backgroundColor: 'id' in response ? 'green' : '#ff0000',
            color: '#ffffff'
          }
        }
        if ('id' in response) {
          toast.success('Ticket rechazado con éxito.', toastOptions);
          window.location.href = '/profile'
        } else {
          toast.error('Ocurrió un error al rechazar el ticket.', toastOptions);
        }
      }
      
    } catch (error) {
      toast.error('Ocurrió un error al rechazar el ticket.', { duration: 5000, style: { backgroundColor: '#ff0000', color: '#ffffff' } });
    }
  };

  return (
    <div className='flex gap-4 mt-8'>
      <ButtonComponent text='Aceptar' className='bg-green-500 text-white hover:bg-green-600' onClick={acceptTicket} />
      <ButtonComponent text='Denegar' className='bg-red-500 text-white hover:bg-red-600' onClick={denyTicket} />
    </div>
  );
};
