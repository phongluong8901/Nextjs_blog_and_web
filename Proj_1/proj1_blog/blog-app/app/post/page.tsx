"use client";
import styles from "@/app/page.module.css";
import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import Paginations from "./components/Paginations";

export interface TPost {
    title: string;
    description: string;
    _id: string;
}


export default function ListPost() {
    // const posts = await getListPost(2,1);

    const [listPost, setListPost] = useState<{data: TPost[], totalPage: number}>({data: [], totalPage: 0});
    const [params, setParams] = useState({
        page: 1, limit: 2
    })
    const [inputState, setInputState] = useState({
        title: "",
        description: "",
    })
    const [isEdit, setIsEdit] = useState({})
    
    const fetchListPost = async () => {
        fetch(`http://localhost:3000/post/api?limit=${params.limit}&page=${params.page}`)
            .then((res) => res.json())
            .then((data) => {
                setListPost({
                    data: data.data,
                    totalPage: data?.meta.totalCount
                });
            });
    };

    useEffect(() => {
        fetchListPost();
    }, [params.page]);

    const handleDeletePost = async (id: string) => {
        fetch(`http://localhost:3000/post/api/${id}`, 
            {method: "DELETE"})
            .then((res) => res.json())
            .then((data) => {
                fetchListPost();
            });
    }

    const handlleOnchangeInput = (e: ChangeEvent<HTMLInputElement>) => {
        console.log({name: e.target.name, value: e.target.value})
        setInputState({
            ...inputState,
            [e.target.name]: e.target.value
        })
    }

    const handleCreate = () => {
        fetch(`http://localhost:3000/post/api`, 
            {method: "POST",
                body: JSON.stringify({
                    ...inputState
                })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message === "Success") {
                    fetchListPost();
                    setInputState({
                        title: "",
                        description: ""
                    })
                }
                
            });
    }

    return (
        <main className={styles.main}
        style={{
            background: "#fff",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <div>
                <div style={{display:"flex", alignItems:"center", gap: 2}}>
                    <label htmlFor="">Title</label>
                    <input id="title" value={inputState.title} name="title" onChange={handlleOnchangeInput} />
                </div>
                <div style={{display:"flex", alignItems:"center", gap: 2}}>
                    <label htmlFor="">Desciption</label>
                    <input id="title" value={inputState.description} name="description" onChange={handlleOnchangeInput} />
                </div>
            </div>
            <button onClick={handleCreate}>Create</button>
            <h1>List posts</h1>
            <div style={{ display: "flex", flexDirection: "column" }}>
                {listPost?.data?.map((item: TPost) => {
                    return (
                        <div key={item._id}>
                            <Link href={`/post/${item._id}`} key={item._id}>
                            <span>{item.title}</span>{" "}
                        </Link>
                            <span onClick={() => handleDeletePost(item._id)}>X</span>
                            <button onClick={() => {
                                setIsEdit(item._id)
                            }}>Edit</button>
                        </div>
                        
                    );
                })}
            </div>
            <div>
                <div style={{display: "flex", alignItems: "center", gap: 4}}>
                    <button 
                    disabled={params.page === 1}
                    onClick={() => {
                        setParams ({
                            ...params,
                            page: params.page - 1,
                        });
                    }}>Preveious</button>
                    <div>Current page: {params.page}</div>
                    <button
                    disabled={params.page === listPost.totalPage}
                    onClick={() => {
                        setParams ({
                            ...params,
                            page: params.page + 1,
                        });
                    }}>Next</button>
                </div>

                {/* <Paginations /> */}
            </div>
            
        </main>
    );
}