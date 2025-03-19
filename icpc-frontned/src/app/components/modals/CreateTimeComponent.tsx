'use client';
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent';
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';
import useUtilsStore from '@/store/useUtilsStore';
import { toast } from 'sonner';

interface CreateTimeLimitComponentProps {
  methods: UseFormReturn<FieldValues>;
  onCreateTimeLimit: (time: number) => void;
  timeId?: string;
  onClose: () => void;
}

const CreateTimeLimitComponent: React.FC<CreateTimeLimitComponentProps> = ({ methods, onCreateTimeLimit, timeId, onClose }) => {
  const createTimeLimit = useUtilsStore(state => state.createTimeLimit);
  const updateTimeLimit = useUtilsStore(state => state.updateTimeLimit);
  const getTimeLimit = useUtilsStore(state => state.getTimeLimit);

  useEffect(() => {
    if (timeId) {
      const loadTimeLimit = async () => {
        const timeLimits = await getTimeLimit();
        const timeLimit = timeLimits.find(t => t.id === timeId);
        if (timeLimit) {
          methods.setValue('TimeLimit', timeLimit.timeLimit.toString());
        }
      };
      loadTimeLimit();
    }
  }, [timeId, getTimeLimit, methods]);

  const clearForm = () => {
    methods.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const timeData = {
      timeLimit: parseInt(data.TimeLimit)
    };

    let response;
    if (timeId) {
      response = await updateTimeLimit(timeId, { timeLimit: timeData.timeLimit });
    } else {
      response = await createTimeLimit(timeData.timeLimit);
    }

    if ('id' in response) {
      toast.success(`Límite de tiempo ${timeId? 'creado' : 'editado'} con éxito.`, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      });
      onCreateTimeLimit(timeData.timeLimit);
      onClose();
    } else if ('message' in response) {
      toast.error(response.message, { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-700 text-4xl">
          &times;
        </button>
        <BasicPanelComponent backgroundColor="bg-white dark:bg-dark-primary">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className='flex flex-col items-center'>
              <LogoComponent size={100} />
              <h2 className="text-center text-lg font-bold dark:text-dark-accent">
                {timeId ? 'Editar límite de tiempo' : 'Crear nuevo límite de tiempo'}
              </h2>
              <TextFieldComponent
                labelText="Valor del tiempo"
                register={methods.register}
                fieldName="TimeLimit"
                id="TimeLimit"
                necessary={true}
                type="text"
              />
              <SubmitComponent text={timeId ? 'Actualizar' : 'Crear'} action={() => {}} />
            </div>
            <div className='mt-4'>
              <button
                type='button'
                onClick={clearForm}
                className='inline-flex items-center gap-x-2 rounded-md bg-primary text-complementary px-3.5 py-2.5 
                font-medium shadow-sm hover:bg-secondary focus-visible:outline 
                focus-visible:outline-offset-2 focus-visible:outline-complementary'
              >
                Borrar formulario
              </button>
            </div>
          </form>
        </BasicPanelComponent>
      </div>
    </div>
  );
};

export default CreateTimeLimitComponent;