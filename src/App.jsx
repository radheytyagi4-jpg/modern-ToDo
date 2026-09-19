//input hoga then
//task ki value aygi
//add button hoga
//addtask fn se task add hoga ek array mai
//dummy tasks banane
//array pr map lagana
//task ko show krana ui pe
//delete task fn se task remove
//local storage mai save 

import { useEffect, useState } from "react"
import './App.css'

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [done, setDone] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return alert("Please enter a task");


    const newTasks = [...tasks]
    newTasks.push(task);
    setTasks(newTasks);
    setTask("");
  };

  const removeTask = (index) => {
    const newTasks = tasks.filter((task, i) => {
      return i !== index;
    })
    setTasks(newTasks);
  };

  useEffect(() => {
    localStorage.setItem("tasks",
      JSON.stringify(tasks)
    )
  },
    [tasks])
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-400 to-emerald-400  ">
        <h1
          className="text-4xl font-bold mb-4 text-white"
        >Todo List</h1>
        <div className="mb-4 flex">
          <input
            placeholder="Add a task"
            value={task}
            className="px-3 py-2 border text-white rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
            onChange={(e) => setTask(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTask();
              }
            }}
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >Add</button>
        </div>
        <div
          className="p-2 min-h-20 min-w-70 rounded-3xl bg-white">
          {tasks.map((task, index) => {
            return (

              <ul
                className="flex flex-col gap-4"
              >
                <li key={index}
                  className="py-2 px-2 text-2xl font-bold"
                ><button
                  className="text-2xl mx-2"
                  onClick={() => removeTask(index)}>❎</button>
                  {task}
                  <input className="ml-35 " 
                  value={done} 
                  onChange={(e) => setDone(e.target.checked)}   
                  type="checkbox" />
                  </li>
              </ul>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
