import React, { useState, Dispatch, SetStateAction } from 'react';
import ThreeDotComponent from '../dropdowns/ThreeDotComponent';
import { IProfileTableItem, AllTabs } from '@/constants/types';
import { TextComponent } from '../text/TextComponent';
import TagComponent from '../tags/TagComponent';
import useExcerciseStore from '@/store/useExcerciseStore';
import useNoteStore from '@/store/useNoteStore';
import useNewsStore from '@/store/useNewsStore';
import useUtilsStore from '@/store/useUtilsStore';
import useStore from '@/store/useStore';
import { toast } from 'sonner';
import CreateCategoryComponent from '../modals/CreateCategoryComponent';
import CreateDifficultyComponent from '../modals/CreateDifficultyComponent';
import CreateMemoryComponent from '../modals/CreateMemoryComponent';
import CreateTimeLimitComponent from '../modals/CreateTimeComponent';
import CreateTagComponent from '../modals/CreateTagComponent';
import CreateExcerciseComponent from '../modals/CreateExcerciseComponent';
import CreateNoteComponent from '../modals/CreateNoteComponent';
import CreateNewsComponent from '../modals/CreateNewsComponent';
import { useForm } from 'react-hook-form';

interface IProfileTableComponentProps {
  data: IProfileTableItem[];
  itemType: string;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  onClose: () => void;
}

const ProfileTableComponent = (props: Readonly<IProfileTableComponentProps>) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isDifficultyModalOpen, setIsDifficultyModalOpen] = useState(false);
  const [isMemoryModalOpen, setIsMemoryModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isTagModalOpen, setIsTagModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  const [isNoteModalOpen, setIsNoteModalOpen] = useState(false);
  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string | undefined>(undefined);
  const [activeDifficultyId, setActiveDifficultyId] = useState<string | undefined>(undefined);
  const [activeMemoryId, setActiveMemoryId] = useState<string | undefined>(undefined);
  const [activeTimeId, setActiveTimeId] = useState<string | undefined>(undefined);
  const [activeTagId, setActiveTagId] = useState<string | undefined>(undefined);
  const [activeExerciseId, setActiveExerciseId] = useState<string | undefined>(undefined);
  const [activeNoteId, setActiveNoteId] = useState<string | undefined>(undefined);
  const [activeNewsId, setActiveNewsId] = useState<string | undefined>(undefined);
  const deleteExercise = useExcerciseStore(state => state.deleteExercise);
  const deleteNote = useNoteStore(state => state.deleteNote);
  const deleteNews = useNewsStore(state => state.deleteNews);
  const deleteCategory = useUtilsStore(state => state.deleteCategory);
  const deleteTag = useUtilsStore(state => state.deleteTag);
  const deleteTimeLimit = useUtilsStore(state => state.deleteTimeLimit);
  const deleteMemoryLimit = useUtilsStore(state => state.deleteMemoryLimit);
  const deleteDifficulty = useUtilsStore(state => state.deleteDifficulty);
  const deleteUser = useStore(state => state.deleteUser);

  const methods = useForm();

  const handleEdit = (id: string, itemType: string) => {
    if (itemType === AllTabs.CATEGORIES) {
      setActiveCategoryId(id);
      setIsCategoryModalOpen(true);
    } else if (itemType === AllTabs.DIFFICULTY) {
      setActiveDifficultyId(id);
      setIsDifficultyModalOpen(true);
    } else if (itemType === AllTabs.MEMORY) {
      setActiveMemoryId(id);
      setIsMemoryModalOpen(true);
    } else if (itemType === AllTabs.TIME) {
      setActiveTimeId(id);
      setIsTimeModalOpen(true);
    } else if (itemType === AllTabs.TAGS) {
      setActiveTagId(id);
      setIsTagModalOpen(true);
    } else if (itemType === AllTabs.EXERCISES) {
      setActiveExerciseId(id);
      setIsExerciseModalOpen(true);
    } else if (itemType === AllTabs.NOTES) {
      setActiveNoteId(id);
      setIsNoteModalOpen(true);
    } else if (itemType === AllTabs.NEWS) {
      setActiveNewsId(id);
      setIsNewsModalOpen(true);
    }
    toast.success('Le picó en Editar' + id + itemType, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
  };

  const handleDelete = async (id: string) => {
    let response;
    switch (props.itemType) {
      case AllTabs.EXERCISES:
        response = await deleteExercise(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.NOTES:
        response = await deleteNote(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.NEWS:
        response = await deleteNews(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.CATEGORIES:
        response = await deleteCategory(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.TAGS:
        response = await deleteTag(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.TIME:
        response = await deleteTimeLimit(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.MEMORY:
        response = await deleteMemoryLimit(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.DIFFICULTY:
        response = await deleteDifficulty(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
      case AllTabs.ACCOUNT:
        response = await deleteUser(id);
        if ('statusCode' in response && response.statusCode === 200) {
          toast.success(response.message, { duration: 5000, style: { backgroundColor: 'green', color: 'white' } });
        }
        break;
    }
    props.setUpdate(!props.update);
  };

  const tableData =
    props.data.length !== 0 ? (
      props.data.map(item => (
        <tr
          key={item.index}
          className='cursor-pointer hover:bg-slate-200'>
          <td
            className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 
        dark:text-dark-accent sm:pl-6 lg:pl-8 w-full justify-between items-center`}>
            <TextComponent>{item.title}</TextComponent>
            {item.tagName && item.color && (
              <div className='max-w-min'>
                <TagComponent
                  color={item.color}
                  tagName={item.title}
                  showIcon={false}
                />
              </div>
            )}
          </td>
          <td className={`whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium 
            text-gray-900 dark:text-dark-accent sm:pl-6 lg:pl-8 justify-between items-center`}>
            <ThreeDotComponent
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              id={item.id}
              itemType={props.itemType}
            />
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td
          className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 
      dark:text-dark-accent sm:pl-6 lg:pl-8 w-full justify-between items-center'>
          <TextComponent>¡Ups! No hay elementos para mostrar</TextComponent>
        </td>
      </tr>
    );

  return (
    <div>
      {isCategoryModalOpen && (
        <CreateCategoryComponent 
          onClose={() => {
            setIsCategoryModalOpen(false);
            props.setUpdate(!props.update);
          }} 
          categoryId={activeCategoryId} 
        />
      )}
      {isDifficultyModalOpen && (
        <CreateDifficultyComponent
          onClose={() => {
            setIsDifficultyModalOpen(false);
            props.setUpdate(!props.update);
          }}
          difficultyId={activeDifficultyId}
          methods={methods}
          onCreateDifficulty={(difficultyName: string) => {
          }}
        />
      )}
      {isMemoryModalOpen && (
        <CreateMemoryComponent
          onClose={() => {
            setIsMemoryModalOpen(false);
            props.setUpdate(!props.update);
          }}
          memoryId={activeMemoryId}
          methods={methods}
          onCreateMemory={(memoryName: string) => {
          }}
        />
      )}
      {isTimeModalOpen && (
        <CreateTimeLimitComponent
          onClose={() => {
            setIsTimeModalOpen(false);
            props.setUpdate(!props.update);
          }}
          timeId={activeTimeId}
          methods={methods}
          onCreateTimeLimit={(time: number) => {
          }}
        />
      )}
      {isTagModalOpen && (
        <CreateTagComponent
          onClose={() => {
            setIsTagModalOpen(false);
            props.setUpdate(!props.update);
          }}
          tagId={activeTagId}
          methods={methods}
          onCreateTag={(tagName: string) => {
          }}
        />
      )}
      {isExerciseModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="rounded-lg p-6 w-full max-h-[90%] overflow-y-auto">
            <CreateExcerciseComponent
              onClose={() => {
                setIsExerciseModalOpen(false);
                props.setUpdate(!props.update);
              }}
              id={activeExerciseId}
            />
          </div>
        </div>
      )}
      {isNoteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="rounded-lg p-6 w-full max-h-[90%] overflow-y-auto">
            <CreateNoteComponent
              onClose={() => {
                setIsNoteModalOpen(false);
                props.setUpdate(!props.update);
              }}
              id={activeNoteId}
            />
          </div>
        </div>
      )}
      {isNewsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="rounded-lg p-6 w-full max-h-[90%] overflow-y-auto">
            <CreateNewsComponent
              onClose={() => {
                setIsNewsModalOpen(false);
                props.setUpdate(!props.update);
              }}
              id={activeNewsId}
            />
          </div>
        </div>
      )}
      <table className='min-w-full border-separate border-spacing-0'>
        <thead>
          <tr>
            <th
              scope='col'
              className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 
                    text-left text-sm font-semibold text-gray-500 backdrop-blur 
                    backdrop-filter sm:pl-6 lg:pl-8'>
              TÍTULO
            </th>
            <th
              scope='col'
              className='sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 
                    text-left text-sm font-semibold text-gray-500 backdrop-blur 
                    backdrop-filter sm:pl-6 lg:pl-8'></th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
};

export default ProfileTableComponent;