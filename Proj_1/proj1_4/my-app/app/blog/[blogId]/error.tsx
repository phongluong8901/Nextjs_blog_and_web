"use client"

// File này BẮT BUỘC phải tên là error.tsx
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>Service of blog is die</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}