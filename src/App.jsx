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

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    const newTasks = [...tasks]
    newTasks.push(task);
    setTasks(newTasks);
    setTask("");
  };


  const removeTask = (index) => {
    const newTasks = tasks.filter((task, i)=>{
      return i !==index;
    })
    setTasks(newTasks)
  };

  useEffect(()=>{
    localStorage.setItem("tasks",
      JSON.stringify(tasks))
  },[tasks]);

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from blue-500 to-emerald-400">
      <div className="mb-4 flex">
        <input
          placeholder="Add a task"
          value={task}
          className="px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-400"
          onChange={(e)=>setTask(e.target.value)}
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
        >Add</button>
      </div>
      <div 
      className="p-2 ">
        {tasks.map((task, index)=>{
          return(

            <ul>
            <li key={index}>{task}<button className="text-2xl" onClick={()=>removeTask(index)}>*</button></li>
          </ul>
      )
        })}
      </div>
    </div>
    </>
  )
}

export default App
