"use client";
import styles from '@/app/page.module.css';
import { ChangeEvent, use, useEffect, useState } from 'react';
import { TPost } from '../page';

export default function PostDetails({params}: {params: Promise<{postId: string}>}) {
  const unwrappedParams = use(params);
  const postId = unwrappedParams.postId;
  const [isEdit, setIsEdit] = useState(false);
  const [inputState, setInputState] = useState({
        title: "",
        description: "",
    })

  console.log("Post ID:", postId);

  const [dataPost, setDataPost] = useState<TPost>();
  
  
  const fetchDetailsPost = async () => {
      fetch(`http://localhost:3000/post/api/${postId}`) 
          .then((res) => {
             if (!res.ok) {
                 throw new Error("Server không trả về JSON thành công");
             }
             return res.json();
          })
          .then((data) => {
             console.log({data});
             setDataPost(data.data);
          })
          .catch((err) => console.error("Lỗi Fetch:", err));
  };

  useEffect(() => {
     if(postId) {
       fetchDetailsPost();
     }
  }, [postId]);

  const handlleOnchangeInput = (e: ChangeEvent<HTMLInputElement>) => {
          console.log({name: e.target.name, value: e.target.value})
          setInputState({
              ...inputState,
              [e.target.name]: e.target.value
          })
      }

  const handleUpdatePost = () => {
        fetch(`http://localhost:3000/post/api/${postId}`, 
            {method: "PUT",
                body: JSON.stringify({
                    ...inputState
                })
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.message === "Success") {
                    fetchDetailsPost();
                    setIsEdit(false);
                    setInputState({
                        title: "",
                        description: ""
                    })
                }
                
            });
    }

    const handleToggleEdit = () => {

    if (!isEdit && dataPost) {
        setInputState({
            title: dataPost.title || "",
            description: dataPost.description || "",
        });
    }
    setIsEdit(!isEdit);
};
  return (
    <main className={styles.main} 
    style={{
      background: "#fff",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
        <h1>List posts</h1>
        <h2>
          Title:{" "}
          {isEdit ? (
            <input
              id="title"
              value={inputState.title}
              name="title"
              onChange={handlleOnchangeInput}
            />
          ) : (
            dataPost?.title
          )}
        </h2>
        <h3>
          Description:{" "}
          {isEdit ? (
            <input
              id="description"
              value={inputState.description}
              name="description"
              onChange={handlleOnchangeInput}
            />
          ) : (
            dataPost?.description
          )}
        </h3>

        <button onClick={handleToggleEdit}>
          {isEdit ? "Cancel" : "Edit"}
        </button>
        {isEdit ? (
          <button onClick={handleUpdatePost}>Update</button>
        ) : ""}
    </main>
  );
}