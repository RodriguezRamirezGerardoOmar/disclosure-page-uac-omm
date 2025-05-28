'use client'
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import useExcerciseStore from '@/store/useExcerciseStore';
import useNewsStore from '@/store/useNewsStore';
import useNoteStore from '@/store/useNoteStore';

/*
Input: none (search bar is self-contained, but uses internal state and store search functions)
Output: a search bar with autocomplete options for exercises, news, and notes, and navigation on selection
Return value: a component used to search and navigate to exercises, news, or notes by title
Function: fetches search results from stores as the user types, displays them as options, and navigates to the selected item's page
Variables: options, inputValue, isClient, router, exerciseSearch, newsSearch, notesSearch, handleInputChange, handleChange
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const SearchBarComponent = () => {
  const [options, setOptions] = useState<{ value: string; label: string; type: string; url: string }[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const exerciseSearch = useExcerciseStore(state => state.search);
  const newsSearch = useNewsStore(state => state.search);
  const notesSearch = useNoteStore(state => state.search);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    // Effect: Fetches search options from stores when inputValue changes
    const fetchOptions = async () => {
      if (inputValue.trim() === '') return;

      try {
        const [exercisesResponse, newsResponse, notesResponse] = await Promise.all([
          exerciseSearch(inputValue),
          newsSearch(inputValue),
          notesSearch(inputValue)
        ]);

        const exercisesOptions = exercisesResponse.map((option: any) => ({
          value: option.id,
          label: option.title,
          type: 'exercise',
          url: `/exercises/${option.id}`
        }));

        const newsOptions = newsResponse.map((option: any) => ({
          value: option.id,
          label: option.title,
          type: 'news',
          url: `/news/${option.id}`
        }));

        const notesOptions = notesResponse.map((option: any) => ({
          value: option.id,
          label: option.title,
          type: 'note',
          url: `/note/${option.id}`
        }));

        setOptions([...exercisesOptions, ...newsOptions, ...notesOptions]);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, [inputValue]);

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue);
  };

  const handleChange = (selectedOption: any) => {
    router.push(selectedOption.url);
  };

  if (!isClient) {
    // Condition: Only render the search bar on the client side
    return null;
  }

  return (
    <div className='w-full max-w-lg lg:max-w-xs'>
      <label htmlFor='search' className='sr-only'>
        Search
      </label>
      <div className='relative'>
        <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
          <MagnifyingGlassIcon className='h-5 w-5 text-gray-400' aria-hidden='true' />
        </div>
        <Select
          id='search'
          name='search'
          className='w-full rounded-md py-1.5 pl-10 pr-3 text-black'
          placeholder='Buscar'
          options={options}
          onInputChange={handleInputChange}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default SearchBarComponent;