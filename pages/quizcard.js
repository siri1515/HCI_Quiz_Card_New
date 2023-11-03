import { React, useState } from "react";
import CardBlock from "../components/CardPage/CardBlock";
import styles from './quizcard.module.css';
import { useAppContext } from '../context/AppContext';
import AddNewButton from "../components/CardPage/AddNewButton";
import { useRouter } from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

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
            <div className={styles.body}>
                <nav className={styles.navbar}>
                    <div className={styles.back} onClick={backClickHandler}>
                        <FontAwesomeIcon className={styles.arrowIcon} size="2x" icon={faArrowLeft} />
                    </div>
                    <div className={styles.title}>{chosenSet.title}</div>
                    <button className={styles.edit_mode_button} onClick={editClickHandler}>
                        {modeState + ' Edit Mode'}
                    </button>
                </nav>
                <CardBlock 
                    editState={editMode} 
                    onSaveDeletedIndex={indexDeleteHandler} 
                />
            </div>
        )
    }
    else{
        return(
            <div className={styles.centeredContent}>
                <h1>
                    <b>There's no card yet, Let's add your cards!</b>
                </h1>
                <AddNewButton index={0}/>
            </div>
        )
    }
}