import styles from './CardSetItem.module.css';
import React, { useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/router';

export default function CardSetItem(props){

    const { list, setList, chosenSetIndex, setChosenSetIndex, chosenSet, setChosenSet } = useAppContext();
    const router = useRouter();

    function cardSetClickHandler(){
        console.log("setid", props.id);
        console.log("chosenbefore", chosenSet);
        console.log("listbefore", list);
        const clickedSet = list.find((set) => {
            return set.id === props.id;
        })
        console.log("clicked", clickedSet);
        const clickedSetIndex = list.findIndex(set => set.id === props.id);
        setChosenSet(clickedSet);
        setChosenSetIndex(clickedSetIndex);
        router.push('/quizcard');
    }

    useEffect(() => {
        console.log("Updated chosenSet:", chosenSet);
    }, [chosenSet]);

    return(
        <div className={styles.card_set_item} onClick={cardSetClickHandler}>
            {props.title}
        </div>
    )
}