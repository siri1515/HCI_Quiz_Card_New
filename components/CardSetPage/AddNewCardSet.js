import { React, useState } from 'react';
import CardSetForm from './CardSetForm';
import styles from './AddNewCardSet.module.css'; 
import { useAppContext } from '../../context/AppContext';

export default function AddNewCardSet(props){
    const { list, setList } = useAppContext();
    const [addNew, setAddNew] = useState(true);

    function ClickHandler(){
        setAddNew(false);
    }

    function saveCardSetDataHandler(cardSetData){
        const newCardSet = {
            ...cardSetData,
            id: Math.random().toString(),
        };

        //use context
        setList((prevCardSet) => {
            return [newCardSet, ...prevCardSet];
        })
        setAddNew(true);
    }

    function saveDeleteHandler(state){
        setAddNew(state);
    }

    return (
        <div>
            {addNew ? 
                (
                    <div className={styles.new_cardset_button_block}>
                        <button className={styles.new_cardset_button} onClick={ClickHandler}>Add Your New CardSet</button>
                    </div>
                )
            :
                (   
                    <div>
                        <CardSetForm onSaveCardSetData={saveCardSetDataHandler} onDeleteForm={saveDeleteHandler} />
                    </div>
                )
            }
        </div>
        
    )
}