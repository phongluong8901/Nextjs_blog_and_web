"use client"
import { use } from 'react'
// Bước 1: Import hàm notFound từ thư viện navigation của Next.js
import { notFound } from 'next/navigation' 
import styles from '../page.module.css'

export default function Index({ params }: { params: Promise<any> }) {
  const resolvedParams = use(params);
  const documents = resolvedParams.documents;

  console.log("params đã giải mã:", resolvedParams);

  // Kiểm tra nếu có từ khóa "routing"
  if (documents?.includes("routing")) {
    
    if (documents?.includes("nested")) {
      return <h1 className={styles.main}>You can read document of nested</h1>;
    }

    return <h1 className={styles.main}>You can read document of routing</h1>;
  }

  // Bước 2: Thay vì return "Document Page...", bạn gọi hàm notFound()
  // Bất kỳ URL nào không chứa "routing" sẽ tự động hiển thị file not-found.tsx của bạn
  return notFound();
}