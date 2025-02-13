'use client';
import React, { useState, useEffect } from 'react';
import { FieldValues, SubmitHandler, UseFormReturn } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent';
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';
import { SelectComponent } from '@/app/components/dropdowns/SelectComponent';
import useUtilsStore from '@/store/useUtilsStore';
import { toast } from 'sonner';

interface CreateMemoryComponentProps {
  methods: UseFormReturn<FieldValues>;
  onCreateMemory: (memoryName: string) => void;
  memoryId?: string;
  onClose: () => void;
}

const CreateMemoryComponent: React.FC<CreateMemoryComponentProps> = ({ methods, onCreateMemory, memoryId, onClose }) => {
  const createMemory = useUtilsStore(state => state.createMemory);
  const updateMemory = useUtilsStore(state => state.updateMemory);
  const getMemory = useUtilsStore(state => state.getMemory);
  const MemorySelect = [
    { index: 0, id: "KB", name: "KB" },
    { index: 1, id: "GB", name: "GB" },
    { index: 2, id: "MB", name: "MB" }
  ];
  const [selectedMemoryUnit, setSelectedMemoryUnit] = useState<string>(MemorySelect[0].id);

  useEffect(() => {
    if (memoryId) {
      const loadMemory = async () => {
        const memory = await getMemory(memoryId);
        if (memory) {
          methods.setValue('MemoryName', memory.memoryLimit.toString());
          const memoryUnit = MemorySelect.find(unit => unit.id === memory.id);
          if (memoryUnit) {
            setSelectedMemoryUnit(memoryUnit.id);
          }
        }
      };
      loadMemory();
    }
  }, [memoryId, getMemory, methods]);

  const clearForm = () => {
    methods.reset();
    setSelectedMemoryUnit(MemorySelect[0].id);
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const memoryData = {
      memoryLimit: parseInt(data.MemoryName),
      id: selectedMemoryUnit
    };

    let response;
    if (memoryId) {
      response = await updateMemory(memoryId, { value: memoryData.memoryLimit });
    } else {
      response = await createMemory({ value: memoryData.memoryLimit, id: memoryData.id });
    }

    if ('statusCode' in response && (response.statusCode === 201 || response.statusCode === 200)) {
      toast.success(response.message, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      });
      onCreateMemory(data.MemoryName);
      onClose();
    } else if ('message' in response) {
      toast.error(response.message, { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <BasicPanelComponent backgroundColor="bg-white dark:bg-dark-primary">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className='flex flex-col items-center'>
              <LogoComponent size={100} />
              <h2 className="text-center text-lg font-bold dark:text-dark-accent">
                {memoryId ? 'Editar limite de memoria' : 'Crear nuevo limite de memoria'}
              </h2>
              <div className='flex items-end'>
                <div className='w-[70%]'>
                  <TextFieldComponent
                    labelText="Valor de la memoria"
                    register={methods.register}
                    fieldName="MemoryName"
                    id="MemoryName"
                    necessary={true}
                    type="text"
                  />
                </div>
                <div className='w-[30%]'>
                  <SelectComponent
                    options={MemorySelect}
                    fieldName={'magnitud'}
                    id={'magnitud'}
                    labelText={''}
                    selected={selectedMemoryUnit}
                    onChange={setSelectedMemoryUnit}
                  />
                </div>
              </div>
              <SubmitComponent text={memoryId ? 'Actualizar' : 'Crear'} />
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

export default CreateMemoryComponent;