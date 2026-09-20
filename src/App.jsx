//input hoga then
//task ki value aygi
//add button hoga
//addtask fn se task add hoga ek array mai
//dummy tasks banane
//array pr map lagana
//task ko show krana ui pe
//delete task fn se task remove
//local storage mai save 
//checkbox add krna task pe
//toggle fn se value change hoke ui change hogi
//total or remianing tasks show karne

import { useEffect, useState } from "react"
import './App.css'

function App() {

  const [task, setTask] = useState("");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const totalTasks = tasks.length;
  const remainingTasks = tasks.filter((task) => !task.done).length;

  const [done, setDone] = useState(false);

  const addTask = () => {
    if (task.trim() === "") return alert("Please enter a task");

    const newTasks = {
      id: Date.now(),
      text: task,
      done: false,
    }
    // const newTasks = [...tasks]
    // newTasks.push(task);
    setTasks([...tasks, newTasks]);
    setTask("");
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => {
      return task.id !== id
    }));
  };

  useEffect(() => {
    localStorage.setItem("tasks",
      JSON.stringify(tasks)
    )
  },
    [tasks])

  const toggleTask = (id) => {
    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: !task.done };
      }
      return task;
    });
    setTasks(newTasks);
  };

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
          <div className="flex justify-between font-medium m-2">
            <h2>Total Tasks : {totalTasks}</h2>
            <h2>Remaining : {remainingTasks}</h2>
          </div>
          {tasks.map((task, id) => {
            return (
              <>
                <ul
                  className="flex flex-col gap-4"
                >
                  <li key={task.id}
                    className="py-2 px-2 text-2xl font-bold"
                  >
                    <input className="m-3 "
                      checked={task.done}
                      onChange={() => toggleTask(task.id)}
                      type="checkbox" />
                    <span className={task.done ? "line-through text-gray-500" : ""} >
                      {task.text}
                    </span>
                    <button
                      className="text-2xl ml-35"
                      onClick={() => removeTask(task.id)}>❎</button>
                  </li>
                </ul>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
