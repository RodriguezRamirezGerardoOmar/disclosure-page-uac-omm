'use client';

import React, { useState } from 'react';
import { TextComponent } from '../text/TextComponent';

interface SimpleCollapsibleCardComponentProps {
  title: string;
  body: string;
}

const SimpleCollapsibleCardComponent: React.FC<SimpleCollapsibleCardComponentProps> = ({ title, body }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-sm ring-1 ring-gray-900/5">
      <div
        className="cursor-pointer p-4 border border-b-2 border-x-0 border-t-0 rounded-lg border-gray-900"
        onClick={toggleCard}
      >
        <h2 className="text-lg font-bold text-accent dark:text-dark-accent">{title}</h2>
      </div>
      {isOpen && (
        <div className="mt-4 p-4 rounded-lg text-accent dark:text-dark-accent">
          <TextComponent>{body}</TextComponent>
        </div>
      )}
    </div>
  );
};

export default SimpleCollapsibleCardComponent;