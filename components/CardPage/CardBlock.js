import { React, useState, useEffect } from "react";
import styles from './CardBlock.module.css';
import EditButton from "./EditButton";
import AddNewButton from "./AddNewButton";
import { useAppContext } from '../../context/AppContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

export default function CardBlock(props) {

    const [index, setIndex] = useState(0);
    const [prevDisabled, setPrevDisabled] = useState(false);
    const [nextDisabled, setNextDisabled] = useState(true);
    const [side, setSide] = useState(true);  // true is front, false is back
    const [isFlipping, setIsFlipping] = useState(false);
    const { list, setList, chosenSet, setChosenSet } = useAppContext();
    const [flipDirection, setFlipDirection] = useState(1); // 1 for normal, -1 for reverse

    function prevClickHandler() {
        setSide(true);
        setIndex(index - 1);
    }

    function nextClickHandler() {
        setSide(true);
        setIndex(index + 1);
    }
    
    function cardClickHandler() {
        setSide(!side);
        setIsFlipping(true);
        setFlipDirection(flipDirection * -1); // This will change the direction of the flip
    
        setTimeout(() => {
            setIsFlipping(false);
        }, 100);
    }

    function updateButtonStates() {
        if (index === 0) {
            setPrevDisabled(true);
        } else {
            setPrevDisabled(false);
        }

        if (index === chosenSet.cards.length - 1) {
            setNextDisabled(true);
        } else {
            setNextDisabled(false);
        }
    }

	function deleteHandler() {
		const updatedList = list.map(set => {
			if (set && set.id === chosenSet.id) {
				return {
					...set,
					cards: set.cards.filter((_, i) => i !== index),
				};
			}
			return set;
		});
	
		const updatedChosenSet = updatedList.find(set => set.id === chosenSet.id);
		setList(updatedList);
		setChosenSet(updatedChosenSet);
	
		if (index >= updatedChosenSet.cards.length) {
			setIndex(Math.max(updatedChosenSet.cards.length - 1, 0));
		}
	}
	

    useEffect(() => {
        updateButtonStates();
    }, [index, chosenSet.cards.length]);

    return (
        <div>
            <div className={styles.list_block}>
                {
                    props.editState === true ? 
                    (
                        <div className={styles.edit_mode_button_block}>
                            <AddNewButton index={index} />
                            <EditButton index={index} />
                            <button className={styles.delete_card_button} onClick={deleteHandler}>Delete</button>
                        </div>
                    ) : ''
                }




                <div className={`${styles.card} ${isFlipping ? styles.flipping : ''}`} onClick={cardClickHandler}>
                    {/* Always render both the question and answer, but only display the side that is currently active */}
                    <div className={`${styles.card_content} ${styles.card_front} ${!side && styles.hidden}`}>
                        {chosenSet.cards[index].question}
                    </div>
                    <div className={`${styles.card_content} ${styles.card_back} ${side && styles.hidden}`}>
                        {chosenSet.cards[index].answer}
                    </div>
                </div>

                <div className={styles.button_block}>
                    <button className={styles.circleButton} onClick={prevClickHandler} disabled={prevDisabled}>
                        <FontAwesomeIcon className={styles.arrowIcon} size="2x" icon={faArrowLeft} />
                    </button>
                    <div className={styles.index_block}>
                        <div>{index + 1}</div>
                        <div>{'/'}</div>
                        <div>{chosenSet.cards.length}</div>
                    </div>
                    <button className={styles.circleButton} onClick={nextClickHandler} disabled={nextDisabled}>
                        <FontAwesomeIcon className={styles.arrowIcon} size="2x" icon={faArrowRight} />
                    </button>
                </div>
            </div>
        </div>
    );
}