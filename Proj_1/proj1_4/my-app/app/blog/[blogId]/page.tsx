// Remove "use client" from here
import { Metadata } from 'next'
import styles from '../../page.module.css'
import { resolve } from 'path'

interface Props {
  params: { blogId: string }
}

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
  const nameBlog = await new Promise(resolve => {
    setTimeout(() => {
      resolve("Frontend")
    }, 200)
  })
  return {
    title: `Blog details - ${nameBlog}`
  }
}

export default function Index({ params }: Props) {
  
  // console.log("params", params) 
  const random = Math.floor(Math.random() *2)
  if (random === 1) {
    throw new Error ("Ërror in blog")
  }
  
  return (
    <main className={styles.main}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1>Blog Page detail {params.blogId}</h1>
        </div>
    </main>
  );
}