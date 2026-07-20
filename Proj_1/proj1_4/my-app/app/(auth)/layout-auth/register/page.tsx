"use client"
import { useRouter } from 'next/navigation';
import styles from '../../../page.module.css'

export default function Index() {
  const router = useRouter()
  const handleNavigationLogin = () => {
    // router.push("/layout-auth/login")
    router.replace("/layout-auth/login")
  }

  return (
    <main className={styles.main}>
        <h1>Register Page</h1>
        <button onClick={() => router.back()}>Back</button>
        <button onClick={() => router.forward()}>Forward</button>
        <button onClick={handleNavigationLogin}>Go to Login</button>
    </main>
  );
}
