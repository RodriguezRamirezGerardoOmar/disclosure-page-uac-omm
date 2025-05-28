'use client';

import React, { useState } from 'react';
import { TextComponent } from '../text/TextComponent';

interface SimpleCollapsibleCardComponentProps {
  title: string;
  body: string;
}

/*
Input: the title and body to display in the card, styles for the card
Output: a card with a title, body, and style
Return value: a card component used in the landing page to display collapsible information
Function: creates a collapsible card with a header and body
Variables: title, body, isOpen, setIsOpen, toggleCard
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

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
          {/* Condition: If isOpen is true, the card body is displayed with the TextComponent */}
          <TextComponent>{body}</TextComponent>
        </div>
      )}
    </div>
  );
};

export default SimpleCollapsibleCardComponent;