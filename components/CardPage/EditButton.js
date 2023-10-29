import { useState } from "react";
import { useAppContext } from '../../context/AppContext';

export default function EditButton(props){

    const [editState, setEditState] = useState(false);
    const [newQuestion, setNewQuestion] = useState('');
    const [newAnswer, setNewAnswer] = useState('');
    const { list, setList, chosenSet, setChosenSet } = useAppContext();

    function questionChangeHandler(event){
        setNewQuestion(event.target.value);
    }

    function answerChangeHandler(event){
        setNewAnswer(event.target.value);
    }

    function editClickHandler(){
        setEditState(true);
    }

    function cancelClickHandler(){
        setEditState(false);
    }

    function submitHandler(event){
        event.preventDefault();
        const newList = [...chosenSet.cards];
        newList[props.index].question = newQuestion;
        newList[props.index].answer = newAnswer;
        setEditState(false);
        const updatedList = list.map((cardset) => {
            if(cardset.id === chosenSet.id){
                return {
                    ...cardset,
                    cards: newList,
                };
            }
            return cardset;
        })
        setList(updatedList);
        setNewQuestion('');
        setNewAnswer('');
    }

    return(
        <div>
            {editState ? (
                <form onSubmit={submitHandler}>
                    <div>
                        <label>New Question:</label>
                        <input type="text" value={newQuestion} onChange={questionChangeHandler} />
                    </div>
                    <div>
                        <label>New Answer:</label>
                        <input type="text" value={newAnswer} onChange={answerChangeHandler} />
                    </div>
                    <button type="submit">Save</button>
                    <button onClick={cancelClickHandler}>Cancel</button>
                </form>
            ) : (
                <button onClick={editClickHandler}>Edit</button>
            )}
        </div>
    )
}