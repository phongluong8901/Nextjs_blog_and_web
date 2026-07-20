"use client"
import { useRouter } from 'next/navigation';
import styles from '../../../page.module.css'

export default function Index() {
  const router = useRouter()
    const handleNavigationRegister = () => {
      // router.push("/layout-auth/register")
      router.replace("/layout-auth/register")
    }

  return (
    <main className={styles.main}>
        <h1>Login Page</h1>
        <button onClick={() => router.back()}>Back</button>
        <button onClick={() => router.forward()}>Forward</button>
        <button onClick={handleNavigationRegister}>Go to Register</button>
    </main>
  );
}
