import React from 'react';
import styles from './NavBar.module.css'; 
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Navbar() {
    const router = useRouter();
    const { pathname } = router; 
    
    return (
        <div className={styles.navbar}>
            <div className={styles.navLink}>
                <Link href="/" className={pathname === '/' ? styles.link_disabled : styles.link}>
                    <b>About</b>
                </Link>
            </div>
            <div className={styles.navLink}>
                <Link href="/cardset" className={pathname === '/cardset' ? styles.link_disabled : styles.link}>
                    <b>CardSet</b>
                </Link>
            </div>
            <div className={styles.navLink}>
                <Link href="/ai" className={pathname === '/ai' ? styles.link_disabled : styles.link}>
                    <b>AI Generator</b>
                </Link>
            </div>
        </div>
    );
}
