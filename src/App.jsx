import { useEffect, useRef, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaSave } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  const inputRef = useRef(0);
  useEffect(() => {
    try {
      let todosString = localStorage.getItem("todos");
      if (todosString) {
        setTodos(JSON.parse(todosString));
      }
    } catch (err) {
      console.error("Failed to parse todos from localStorage", err);
      localStorage.removeItem("todos");
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const handleEdit = (e, id) => {
    let newTodos = [...todos];
    let index = newTodos.findIndex(item => {
      return id === item.id;
    })
    setTodo(newTodos[index].todo);
    newTodos.splice(index, 1);
    setTodos(newTodos);
    inputRef.current.focus();
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
  }

  const handleAdd = () => {
    if (todo.trim() === "") return;
    const newTodos = [...todos, { id: uuidv4(), todo: todo, isCompleted: false }];
    setTodos(newTodos)
    setTodo("");
  }

  const handleChange = (e) => {
    setTodo(e.target.value);
  }

  const handleCheckbox = (e) => {
    let id = e.target.id;
    let index = todos.findIndex(item => {
      return id === item.id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
  }

  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }

  const enterClick = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  return (
    <>
      <Navbar />
      <div className="container bg-emerald-100 md:mx-auto md:my-5 p-5 rounded-xl md:min-h-[80vh] min-h-[86vh] flex flex-col items-center md:w-1/2">
        <div className='w-full'>
          <div >
            <h1 className='text-2xl font-bold text-center m-3'>ToDone – From ToDo to Done!</h1>
            <h2 className="font-bold">Add New Todo</h2>
            <div className="new-todo-form flex">
              <input onChange={handleChange} value={todo} ref={inputRef} type="text" className='border-1 rounded-lg w-full px-3' onKeyDown={enterClick}/>
              <button onClick={handleAdd} disabled={todo.length < 3} className='px-3 py-1 bg-slate-600 mx-5 rounded-lg text-white font-bold cursor-pointer hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed '><FaSave size={30} /></button>
            </div>
          </div>
          <div className="todos my-7">
            <input type="checkbox" checked={showFinished} onChange={toggleFinished} className='cursor-pointer' /> Show Done
            <h2 className='font-bold '>Your Todos</h2>
            {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
            {todos.map(item => {
              return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex gap-2 items-center my-3 justify-between rounded-md">
                <div className="details flex items-center gap-2">
                  <input onChange={handleCheckbox} checked={item.isCompleted} type="checkbox" name="" id={item.id} className='cursor-pointer' />
                  <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
                </div>
                <div className="buttons">
                  <button onClick={(e) => { handleEdit(e, item.id) }} className='px-3 py-1 bg-slate-600 mx-1 rounded-lg text-white font-bold cursor-pointer hover:bg-slate-800 text-xs'><FaEdit /></button>
                  <button onClick={(e) => { handleDelete(e, item.id) }} className='px-3 py-1 bg-slate-600 mx-1 rounded-lg text-white font-bold cursor-pointer hover:bg-slate-800 text-xs'><MdDelete /></button>
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default App
