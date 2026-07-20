
import './App.scss';
import { useState } from 'react';

function TodoItem({ todo, handleDeleteTodo, handleUpdateTodo }) {
  const [name, setName] = useState(todo.name);
  const [isEdit, setIsEdit] = useState(false);

  const handleUpdate = () => {
    handleUpdateTodo(todo.id, name);
    setIsEdit(false);
  };

  return (
    <div className="todo-item">
      {isEdit ? (
        <div>
          <input value={name} onChange={(e) => setName(e.target.value)} />
          <button onClick={handleUpdate}>Update</button>
        </div>
      ) : (
        <h1 onClick={() => setIsEdit(true)}>{todo.name}</h1>
      )}
      
      <span className="delete-btn" onClick={() => handleDeleteTodo(todo.id)}>
        X
      </span>
    </div>
  );
}

export default TodoItem;
