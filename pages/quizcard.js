import { React, Fragment, useState } from "react";
import CardBlock from "../components/CardPage/CardBlock";
import styles from './quizcard.module.css';
import { useAppContext } from '../context/AppContext';
import AddNewButton from "../components/CardPage/AddNewButton";
import { useRouter } from 'next/router';

export default function CardPage(props){
    const router = useRouter();
    const [editMode, setEditMode] = useState(false);
    const [modeState, setModeState] = useState('Enter');
    const { chosenSet, setChosenSet } = useAppContext();


    function editClickHandler(){
        if(modeState === 'Enter')
        {
            setModeState('Quit');
        }
        else{
            setModeState('Enter');
        }

        setEditMode(!editMode);
    }

    //
    function indexDeleteHandler(index){
        props.onSaveDeletedIndex2(index);
    }

    function backClickHandler(){
        router.replace('/cardset');
    }

    if (chosenSet?.cards?.length > 0){
        return(
            <Fragment>
                <nav className={styles.navbar}>
                    <div className={styles.back} onClick={backClickHandler}>back</div>
                    <div className={styles.title}>{chosenSet.title}</div>
                    <button className={styles.edit_mode_button} onClick={editClickHandler}>
                        {modeState + ' Edit Mode'}
                    </button>
                </nav>
                <CardBlock 
                    editState={editMode} 
                    onSaveDeletedIndex={indexDeleteHandler} 
                />
            </Fragment>
        )
    }
    else{
        return(
            <Fragment>
                <h1>
                    there's no card yet, let's add your cards!
                </h1>
                <AddNewButton index={0}/>
            </Fragment>
        )
    }
}