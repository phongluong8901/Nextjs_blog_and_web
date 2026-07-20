import Link from 'next/link';
import styles from './page.module.css'

export default function Home() {
  console.log("Server component")
  return (
    <main className={styles.main}>
        <h1>Blog Page</h1>
        <Link href="/layout-auth/register">Go to Register page</Link>
        <Link href="/layout-auth/login">Go to Login page</Link>
        <Link href="/blog">Goto Blog</Link>
    </main>
  );
}
