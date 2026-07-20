"use client"
export const Paginations = () => {
    return (
        <div style={{display: "flex", alignItems: "center", gap: 4}}>
            <button 
            // disabled={params.page === 1}
            onClick={() => {
                // setParams ({
                //     ...params,
                //     page: params.page - 1,
                // });
            }}>Preveious</button>
            {/* <div>Current page: {params.page}</div> */}
            <button
            // disabled={params.page === listPost.totalPage}
            onClick={() => {
                // setParams ({
                //     ...params,
                //     page: params.page + 1,
                // });
            }}>Next</button>
        </div>
    )
}

export default Paginations;