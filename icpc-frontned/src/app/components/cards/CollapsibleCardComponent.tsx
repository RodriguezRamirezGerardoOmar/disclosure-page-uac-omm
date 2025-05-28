'use client';

import React, { useState } from 'react';
import MarkdownBodyComponent from '../panels/MarkdownBodyComponent';

interface CollapsibleCardComponentProps {
  title: string;
  body: string;
}

/*
Input: the title and body to display in the card, styles for the card
Output: a card with a title, body, and style
Return value: a card component used in the landing page to display collapsible information
Function: creates a collapsible card with a header and body, allowing the user to expand or collapse the content
Variables: title, body, isOpen, setIsOpen, toggleCard
Date: 28 - 05 - 2025
Author: Alan Julian Itzamna Mier Cupul
*/

const CollapsibleCardComponent: React.FC<CollapsibleCardComponentProps> = ({ title, body }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full rounded-lg shadow-sm ring-1 ring-gray-900/5 bg-white dark:bg-gray-800">
      <div
        className="cursor-pointer p-4 border border-b-2 border-x-0 border-t-0 rounded-lg border-gray-900"
        onClick={toggleCard}
      >
        <h2 className="text-lg font-bold text-accent dark:text-dark-accent">{title}</h2>
      </div>
      {/* Condition: If isOpen is true, the card body is displayed with the MarkdownBodyComponent */}
      {isOpen && (
        <div className="mt-4 p-4">
          <MarkdownBodyComponent body={body} />
        </div>
      )}
    </div>
  );
};

export default CollapsibleCardComponent;