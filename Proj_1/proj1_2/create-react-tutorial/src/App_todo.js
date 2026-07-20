
import './App.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import TodoItem from './TodoItem';
import Content from './Content';

function App() {
  const [todos, setTodos] = useState([
    {
      name: "ok",
      id: 1
    },
    {
      name: "ok2",
      id: 2
    },
  ])

  
  useEffect(() => {

  })

  const [inputState, setInpuState] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const refInput = useRef(null)

  const handleAddTodo = () => {
    setTodos((prev) => [
      ...prev,
      {name: inputState, id: Math.random()}
    ])
    setInpuState("")
    refInput.current.focus()
  }

  const handleDeleteTodo = (idDelete) => {
    const filterd = todos.filter((item) => item.id !== idDelete)
    setTodos(filterd)
  }

  const handleUpdateTodo = (id, newName) => {
    const cloneTodos = [...todos]
    const findUpdate = cloneTodos.find(item => item.id === id)
    if (findUpdate) {
      findUpdate.name = newName
      setTodos(cloneTodos)
    }
  }
  
  const [count, setCount] = useState(1)
  const handleIncrease = useCallback(
    () => {
    setCount((prev) => prev + 1)
  }, [])

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="input-group">
        <input 
          ref={refInput}
          value={inputState} 
          onChange={(e) => setInpuState(e.target.value)}
          placeholder="Thêm việc cần làm..."
        />
        <button onClick={handleAddTodo}>Add</button>
      </div>

      <div className="todo-container">
        {todos.map((todo) => (
          <TodoItem 
            key={todo.id} 
            todo={todo} 
            handleDeleteTodo={handleDeleteTodo} 
            handleUpdateTodo={handleUpdateTodo}
          />
        ))}
      </div>

      <Content count={count} handleIncrease={handleIncrease} />
      
    </div>
  );
}

export default App;
