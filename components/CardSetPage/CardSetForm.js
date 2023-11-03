import { React, useState } from 'react';
import styles from './CardSetForm.module.css'; 

export default function CardSetForm(props){
    const [newCardSetName, setNewCardSetName] = useState('');
    const [isValid, setIsValid] = useState(true);

    function cardSetChangeHandler(event){
        setNewCardSetName(event.target.value);
        setIsValid(true);
    }

    function submitHandler(event){
        event.preventDefault();
        if (newCardSetName.trim() === '') {
            setIsValid(false);
            return;
        }
        const cardSetData = {
            title: newCardSetName,
            cards: []
        }
        props.onSaveCardSetData(cardSetData);   
        setNewCardSetName('');
    }

    function cancelHandler(){
        props.onDeleteForm(true);
        setIsValid(true);
        setNewCardSetName('');
    }

    return(
        <div className={styles.modal_background}>
            <div className={styles.popup_form}>
                <h1 className={styles.h1}>Let's Add Your New Cardset!</h1>
                <form className={styles.cardset_form} onSubmit={submitHandler}>
                    <div>
                        <label>Please input your new cardset name:</label>
                        <input type="text" value={newCardSetName} onChange={cardSetChangeHandler} />
                        {!isValid && <div className={styles.error}>Please input valid text</div>} 
                    </div>
                    <div>
                        <button onClick={cancelHandler}><b>Cancel</b></button>
                        <button type="submit"><b>Add New Cardset</b></button>
                    </div>
                </form>
            </div>
        </div>
    )
}