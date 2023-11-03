import {useState} from 'react';
import CardSetItem from "../components/CardSetPage/CardSetItem";
import AddNewCardSet from '../components/CardSetPage/AddNewCardSet';
import NavBar from "../components/Common/NavBar";
import styles from './cardset.module.css';
import { useAppContext } from '../context/AppContext';


export default function CardSetPage(){
    const { list, setList } = useAppContext();

    return(
        <div className={styles.body}>
            <NavBar />
            <h1 className={styles.page_title}>Quiz Card Maker</h1> {/* Add the title */}
            <AddNewCardSet />
            <div className={styles.card_set_page}>
                {list.map((cardset) => {
                    return(
                        <div key={cardset.id} className={styles.card_set_item}>
                            <CardSetItem 
                                title={cardset.title} 
                                id={cardset.id} 
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    );
}