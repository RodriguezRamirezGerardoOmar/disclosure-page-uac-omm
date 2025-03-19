'use client';
import React, { useEffect } from 'react';
import { UseFormReturn, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent';
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';
import useUtilsStore from '@/store/useUtilsStore';
import { toast } from 'sonner';

interface CreateDifficultyComponentProps {
  methods: UseFormReturn<FieldValues>;
  onCreateDifficulty: (DifficultyName: string) => void;
  difficultyId?: string;
  onClose: () => void;
}

const CreateDifficultyComponent: React.FC<CreateDifficultyComponentProps> = ({ methods, onCreateDifficulty, difficultyId, onClose }) => {
  const createDifficulty = useUtilsStore(state => state.createDifficulty);
  const updateDifficulty = useUtilsStore(state => state.updateDifficulty);
  const getDifficulty = useUtilsStore(state => state.getDifficulty);

  useEffect(() => {
    if (difficultyId) {
      const loadDifficulty = async () => {
        const difficulty = await getDifficulty(difficultyId);
        if (difficulty) {
          methods.setValue('DifficultyName', difficulty.name);
          methods.setValue('Level', difficulty.level);
        }
      };
      loadDifficulty();
    }
  }, [difficultyId, getDifficulty, methods]);

  const clearForm = () => {
    methods.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    let response;
    if (difficultyId) {
      response = await updateDifficulty(difficultyId, { level: Number(data.Level), name: String(data.DifficultyName) });
    } else {
      response = await createDifficulty({ level: Number(data.Level), name: String(data.DifficultyName) });
    }

    if ('id' in response) {
      toast.success(`La dificultad se ha ${difficultyId? 'creado' : 'editado'} con éxito.`, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      });
      onCreateDifficulty(data.DifficultyName);
      onClose();
    } else if ('message' in response) {
      toast.error(response.message, { duration: 5000, style: { backgroundColor: 'red', color: '#FFFFFF' } });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark-primary p-4 rounded-lg shadow-lg relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-red-700 text-4xl">
          &times;
        </button>
        <BasicPanelComponent backgroundColor="bg-white dark:bg-dark-primary">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <div className='flex flex-col items-center'>
              <LogoComponent size={100} />
              <h2 className="text-center text-lg font-bold dark:text-dark-accent">
                {difficultyId ? 'Editar nivel de dificultad' : 'Crear nuevo nivel de dificultad'}
              </h2>
              <TextFieldComponent
                labelText="Nombre de la dificultad"
                register={methods.register}
                fieldName="DifficultyName"
                id="DifficultyName"
                necessary={true}
                type="text"
              />
              <TextFieldComponent
                labelText="Nivel de la dificultad"
                register={methods.register}
                fieldName="Level"
                id="Level"
                necessary={true}
                type="number"
              />
              <SubmitComponent text={difficultyId ? 'Actualizar' : 'Crear'} action={() => {}}/>
            </div>
            <div className='mt-4'>
              <button
                type='button'
                onClick={clearForm}
                className='inline-flex items-center gap-x-2 rounded-md bg-primary 
                text-complementary px-3.5 py-2.5 font-medium shadow-sm hover:bg-secondary focus-visible:outline 
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

export default CreateDifficultyComponent;