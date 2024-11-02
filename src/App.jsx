
import { useState, useEffect } from 'react';
import Navbar from './Components/Navbar';
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    const todoString = localStorage.getItem("todos");
    if (todoString) {
      const todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleEdit = (id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (id) => {
    let newTodos = todos.filter(item => item.id !== id);
    setTodos(newTodos);
    saveToLS();
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex(item => item.id === id);
    const newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-10 p-8 bg-white shadow-xl rounded-lg md:w-[40%]">
        <h1 className='font-bold text-center text-4xl mb-6 text-blue-900'>Daily TODO Check-List</h1>

        <div className="addTodo mb-6">
          <h2 className='text-2xl font-semibold mb-4'>Add a Todo</h2>
          <div className="flex gap-4">
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              className='w-full rounded-lg border-2 border-blue-300 px-4 py-2 text-gray-700 focus:outline-none focus:border-blue-500'
              placeholder="Enter your task"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className='bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg transition-all'>
              Save
            </button>
          </div>
        </div>

        <div className="flex items-center mb-6">
          <input
            className='mr-2'
            id='show'
            onChange={toggleFinished}
            type="checkbox"
            checked={showFinished}
          />
          <label htmlFor="show" className='text-gray-700'>Show Finished</label>
        </div>

        <h2 className='text-2xl font-semibold mb-4'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='text-center text-gray-500'>No Todos to display</div>}
          {todos.map(item => (
            (showFinished || !item.isCompleted) && (
              <div key={item.id} className="todo flex justify-between items-center p-4 bg-gray-100 rounded-lg mb-3 shadow-md">
                <div className='flex items-center gap-4'>
                  <input
                    name={item.id}
                    onChange={handleCheckbox}
                    type="checkbox"
                    checked={item.isCompleted}
                    className="cursor-pointer"
                  />
                  <span className={item.isCompleted ? 'line-through text-gray-500' : ''}>
                    {item.todo}
                  </span>
                </div>
                <div className="buttons flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className='bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-all'>
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className='bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg transition-all'>
                    <AiFillDelete />
                  </button>
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
