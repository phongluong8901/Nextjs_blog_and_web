"use client"
import { notFound, useParams } from 'next/navigation';
import styles from '../../../../page.module.css'

export default function Index() {
  const params = useParams();
  const arrIds = [1, 2, 3];

  if (!params.reviewId || !arrIds.includes(Number(params.reviewId))) {
    return notFound(); 
  }

  return (
    <main className={styles.main}>
        Reviews Pages details {params.reviewId}
    </main>
  );
}