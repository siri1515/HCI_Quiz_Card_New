import { React, useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import styles from './AddNewButton.module.css';

export default function AddNewButton(props){
    const [addState, setAddState] = useState(false);
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');
    const [isValid,setIsValid] = useState(true);
    const {list, setList, chosenSet, setChosenSet } = useAppContext();

    function questionChangeHandler(event){
        setQuestion(event.target.value);
        setIsValid(true);
    }

    function answerChangeHandler(event){
        setAnswer(event.target.value);
        setIsValid(true);
    }

    function cancelClickHandler(){
        setAddState(false);
        setIsValid(true);
        setQuestion('');
        setAnswer('');
    }

    function addClickHandler(){
        setAddState(true);
    }

    function submitHandler(event) {
        event.preventDefault();
        if (question.trim() === '' || answer.trim() === '') {
            setIsValid(false);
            return;
        }
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
                <div className={styles.modal_background}>
                    <div className={styles.popup_form}>
                        <form className={styles.add_card_form} onSubmit={submitHandler}>
                            <div>
                                <label>Please input the Question:</label>
                                <input type="text" value={question} onChange={questionChangeHandler} />
                            </div>
                            <div>
                                <label>Please input the Answer:</label>
                                <input type="text" value={answer} onChange={answerChangeHandler} />
                            </div>
                            {!isValid && <div className={styles.error}>Please input valid text</div>} 
                            <button type="submit">Add</button>
                            <button onClick={cancelClickHandler}>Cancel</button>
                        </form>
                    </div>
                </div>
            ) : (
                <button className={styles.add_new_card_button} onClick={addClickHandler}>Add New Card</button>
            )}
        </div> 
    )
}