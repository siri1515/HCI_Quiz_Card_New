import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NavBar from "../components/Common/NavBar";
import styles from "../components/CardPage/about.module.css"; 

export default function About() {

  const router = useRouter();
  const { pathname } = router; 


  return (
    <div>
      <NavBar />
        <div className={styles.maincontainer}>
        <div className={styles.container1}>
        <div className={styles.columnContainer1}>
          <h1 className={styles.tex1text}>Welcome to Our quiz card website</h1>
          <p className={styles.para}>A place where you can explore, learn<br></br>
           and quiz your way to success.<br></br>
           <br></br>
            Join us to learn more about our mission and our Team. </p>
      </div>
      <img src="https://img.freepik.com/free-vector/web-development-programmer-engineering-coding-website-augmented-reality-interface-screens-developer-project-engineer-programming-software-application-design-cartoon-illustration_107791-3863.jpg" alt="computer man" className={styles.center} />
    </div>
    <h2 className={styles.text2}>What Do We Offer</h2>
    
    <div className={styles.container2}>
    <img src="https://99designs-blog.imgix.net/blog/wp-content/uploads/2022/01/104228210.jpg?auto=format&q=60&fit=max&w=930" alt="personalize" className={styles.center} /> 
    <div className={styles.columnContainer2}>
      <h3 className={styles.text3}>You can organize, edit and create new card sets</h3>
      <div className={styles.button1}>
      <Link href="/cardset" className={pathname === '/cardset' ? styles.link_disabled : styles.link}>
      <button className={styles.button1}> Try it </button>
      </Link>
      </div>
    </div>
    </div>

    <div className={styles.container3}> 
    <div className={styles.columnContainer3}>
      <h3 className={styles.text4}>You can generate new flashcards in one click with the power of AI</h3>
      <div className={styles.button1}>
      <Link href="/ai" className={pathname === '/ai' ? styles.link_disabled : styles.link}>
      <button className={styles.button1}> Try it </button>
      </Link>
      </div>
    </div>
    <img src="https://img.freepik.com/free-vector/doctor-consultation-online_74855-5815.jpg?size=626&ext=jpg&ga=GA1.1.386372595.1698019200&semt=ais" alt="AI" className={styles.center} />
    </div>

    <h2 className={styles.text2}>Our Team</h2>

    <div className= {styles.container4}>
      <div className= {styles.card}>
      <img src="https://cdn.vectorstock.com/i/1000x1000/48/51/portrait-female-character-young-lady-profile-vector-34014851.webp" alt="Reem" className={styles.center}/>
      <div className= {styles.names}>
        <h2>Reem</h2>
      </div>
      </div>

      <div className= {styles.card}>
      <img src="https://cdn.vectorstock.com/i/1000x1000/48/53/small-girl-with-ponytails-portrait-kid-vector-34014853.webp" alt="Xirui" className={styles.center}/>
      <div className= {styles.names}>
        <h2>Xirui</h2>
      </div>
      </div>

      <div className= {styles.card}>
      <img src="https://cdn.vectorstock.com/i/1000x1000/28/27/man-avatar-portrait-of-a-young-caucasian-vector-40842827.webp" alt="Lokitha" className={styles.center}/>
      <div className= {styles.names}>
        <h2>Lokitha</h2>
      </div>
      </div>



    </div>

  </div>
  </div>
  );
}