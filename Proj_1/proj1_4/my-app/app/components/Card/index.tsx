export function Card({children}: {children: React.ReactNode}) {
    return (
        <div style={{padding: "20px", margin: "10px", display: "flex", justifyContent:"center", border:"1px solid #aedndn"}}>
            {children}
        </div>
    )
}