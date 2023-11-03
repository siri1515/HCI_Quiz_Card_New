import { useState } from "react";
import styles from "./ai.module.css";
import NavBar from "../components/Common/NavBar";
import { useAppContext } from '../context/AppContext';
import { useRouter } from 'next/router';

export default function AI() {
  const [userInput, setUserInput] = useState("");
  const [title, setTitle] = useState("");
  const { list, setList } = useAppContext();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/openai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ info: userInput }),
      });

      const data = await response.json();
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`);
      }

      const newCardSet = {
        title: title,
        id: Math.random().toString(),
        cards: data.result
      };
      setList((prevCardSet) => {
        return [newCardSet, ...prevCardSet];
      })
      console.log(data.result);
      setUserInput("");
      router.replace('/cardset');
      
    } catch(error) {
      console.error(error);
      alert(error.message);
    }
    finally {
      setIsLoading(false);
    }
  }

  return (
    <div className={styles.body}>
      <NavBar />
      <main className={styles.main}>
        <h3>Let me create cardsets for you!</h3>
        <p>Input your learning material and I will automically generate a cardset including 3 cards for you</p>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Enter your New Cardset Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            name="info"
            placeholder="Enter your Learning Material"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="textarea_input"
          ></textarea>
          <input type="submit" value="Generate cards" />
        </form>
        {isLoading && 
          <div className={styles.overlay}>
            <h1 className={styles.loading_title}><b>Please wait a moment</b></h1>
            <div className={styles.loading_image}></div>
          </div>
        }
      </main>
    </div>
  );
}