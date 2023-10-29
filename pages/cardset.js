import {useState} from 'react';
import CardSetItem from "../components/CardSetPage/CardSetItem";
import AddNewCardSet from '../components/CardSetPage/AddNewCardSet';
import NavBar from "../components/Common/NavBar";
import styles from './cardset.module.css';
import { useAppContext } from '../context/AppContext';


export default function CardSetPage(props){
    const { list, setList } = useAppContext();

    function deleteHandler(cardsetID){
        props.onSaveDeletedID(cardsetID);
    }

    return(
        <div className={styles.body}>
            <NavBar />
            <h1 className="page_title">Quiz Card Maker</h1> {/* Add the title */}
            <AddNewCardSet />
            <div className="card_set_page">
                {list.map((cardset) => {
                    return(
                        <div key={cardset.id} className="card_set_item">
                            <CardSetItem 
                                title={cardset.title} 
                                id={cardset.id} 
                            />
                          {/* <button className="delete_button" onClick={() => deleteHandler(cardset.id)}>Delete</button> */}
                        </div>
                    )
                })}
            </div>
        </div>
    );
}