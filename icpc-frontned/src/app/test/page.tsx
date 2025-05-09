'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import CreateDifficultyComponent from '@/app/components/modals/CreateDifficultyComponent';

export default function Home() {
  const methods = useForm();

  const handleCancel = () => {
    alert('Creación cancelada');
  };

  const handleCreateDifficulty = (DifficultyName: string) => {
    alert(`Categoría creada: ${DifficultyName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <CreateDifficultyComponent
        methods={methods}
        onCancel={handleCancel}
        onCreateDifficulty={handleCreateDifficulty}
      />
    </div>
  );
}
