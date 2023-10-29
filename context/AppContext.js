import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();
const data = [
    {
      id: 100001,
      key: 100001,
      title: 'Card Set 1',
      cards: [
        {
          id: 902,
          question: 'Question 1',
          answer: 'Answer 1',
        },
        {
          id: 367,
          question: 'Question 2',
          answer: 'Answer 2',
        },
      ],
    },
    {
      id:28647,
      key: 28647,
      title: 'Card Set 2',
      cards: [
        {
          id: 979,
          question: 'Question 1',
          answer: 'Answer 1',
        },
        {
          id: 5634,
          question: 'Question 2',
          answer: 'Answer 2',
        },
        {
          id: 3542,
          question: 'Question 3',
          answer: 'Answer 3',
        },
      ],
    },
];

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [list, setList] = useState(data);
  const [chosenSetIndex, setChosenSetIndex] = useState(-1);
  const [chosenSet, setChosenSet] = useState('');

  return (
    <AppContext.Provider value={{ list, setList, chosenSetIndex, setChosenSetIndex,  chosenSet, setChosenSet }}>
      {children}
    </AppContext.Provider>
  );
};
