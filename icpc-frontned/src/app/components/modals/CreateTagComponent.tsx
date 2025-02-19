'use client';
import React, { useEffect } from 'react';
import { UseFormReturn, FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { BasicPanelComponent } from '../panels/BasicPanelComponent';
import LogoComponent from '../LogoComponent';
import TextFieldComponent from '../forms/TextFieldComponent';
import SubmitComponent from '../forms/SubmitComponent';
import ColorPickerComponent from '@/app/components/forms/ColorPickerComponent';
import useUtilsStore from '@/store/useUtilsStore';
import { toast } from 'sonner';

interface CreateTagComponentProps {
  methods: UseFormReturn<FieldValues>;
  onCreateTag: (tagName: string) => void;
  tagId?: string;
  onClose: () => void;
}

const CreateTagComponent: React.FC<CreateTagComponentProps> = ({ methods, onCreateTag, tagId, onClose }) => {
  const createTag = useUtilsStore(state => state.createTag);
  const updateTag = useUtilsStore(state => state.updateTag);
  const getTags = useUtilsStore(state => state.getTags);

  useEffect(() => {
    if (tagId) {
      const loadTag = async () => {
        const tags = await getTags();
        const tag = tags.find(t => t.id === tagId);
        if (tag) {
          methods.setValue('name', tag.name);
          methods.setValue('color', `#${tag.color}`);
        }
      };
      loadTag();
    }
  }, [tagId, getTags, methods]);

  const clearForm = () => {
    methods.reset();
  };

  const onSubmit: SubmitHandler<FieldValues> = async data => {
    const color = String(data.color).replace('#', '');
    let response;
    if (tagId) {
      response = await updateTag(tagId, { name: String(data.name), color });
    } else {
      response = await createTag({ name: String(data.name), color });
    }

    if ('statusCode' in response && response.statusCode === 201) {
      toast.success(response.message, {
        duration: 5000,
        style: {
          backgroundColor: 'green',
          color: '#FFFFFF'
        }
      });
      onCreateTag(data.name);
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
            <div className="flex flex-col items-center">
              <LogoComponent size={100} />
              <h2 className="text-center text-lg font-bold dark:text-dark-accent">
                {tagId ? 'Editar etiqueta' : 'Crear nueva etiqueta'}
              </h2>
              <div className='flex items-end'>
                <div>
                  <TextFieldComponent
                    labelText="Nombre de la etiqueta"
                    register={methods.register}
                    fieldName="name"
                    id="TagName"
                    necessary={true}
                    type="text"
                  />
                </div>
                <div className='w-1/4'>
                  <ColorPickerComponent
                    register={methods.register}
                    fieldName="color"
                    id="TagColor"
                  />
                </div>
              </div>
              <SubmitComponent text={tagId ? 'Actualizar' : 'Crear'} />
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

export default CreateTagComponent;