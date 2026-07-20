"use client"
import { useState } from "react"

export default function Index() {
    console.log("Client component")
    const [count, setCount] = useState(2);
    return (
        <h1>Page about - client component</h1>
    )
}