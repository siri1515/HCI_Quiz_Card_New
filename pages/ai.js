import { useState } from "react";
import styles from "./ai.module.css";
import NavBar from "../components/Common/NavBar";

export default function AI() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState();

  async function onSubmit(event) {
    event.preventDefault();
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

      console.log(data.result);
      setResult(data.result);
      setUserInput("");
    } catch(error) {
      // Consider implementing your own error handling logic here
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <h3>Create Cardset</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="info"
            placeholder="Enter your Learning Material"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate cards" />
        </form>
        <div className={styles.result}>{result}</div>
      </main>
    </div>
  );
}