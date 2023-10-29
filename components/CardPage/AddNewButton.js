import { React, useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';

export default function AddNewButton(props){
    const [addState, setAddState] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const {list, setList, chosenSet, setChosenSet } = useAppContext();

    function questionChangeHandler(event){
        setQuestion(event.target.value);
    }

    function answerChangeHandler(event){
        setAnswer(event.target.value);
    }

    function cancelClickHandler(){
        setAddState(false);
    }

    function addClickHandler(){
        setAddState(true);
    }

    function submitHandler(event) {
        event.preventDefault();
        const newCard = {
            id: Math.random().toString(),
            question: question,
            answer: answer,
        };
        //The code inserts a new card into the chosenSet.cards array right after the specified props.index position.
        const updatedCards = [
            ...chosenSet.cards.slice(0, props.index + 1),
            newCard,
            ...chosenSet.cards.slice(props.index + 1)
        ];
        const updatedList = list.map(cardset => 
            cardset.id === chosenSet.id ? { ...cardset, cards: updatedCards } : cardset
        );
        
        setList(updatedList);
        setChosenSet(prev => ({ ...prev, cards: updatedCards }));
        
        setAddState(false);
        setQuestion('');
        setAnswer('');
    }


    return (
        <div>
            {addState ? (
                <form onSubmit={submitHandler}>
                    <div>
                        <label>Please input the Question:</label>
                        <input type="text" value={question} onChange={questionChangeHandler} />
                    </div>
                    <div>
                        <label>Please input the Answer:</label>
                        <input type="text" value={answer} onChange={answerChangeHandler} />
                    </div>
                    <button type="submit">Add</button>
                    <button onClick={cancelClickHandler}>Cancel</button>
                </form>
            ) : (
                <button onClick={addClickHandler}>Add New Card</button>
            )}
        </div> 
    )
}