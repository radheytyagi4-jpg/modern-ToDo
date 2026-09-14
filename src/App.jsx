import { useState } from "react"
import './App.css'


function App() {
  const [columns, setColumns] = useState({
    todo: {
      name: "To Do",
      items: [
        {
          id: 1,
          content: ""
        }
      ]
    },
    inProgress: {
      name: "In Progress",
      items: [
        { id: 2, content: "" }
      ]
    },
    done: {
      name: "Done",
      items: [
        { id: 3, content: "" }
      ]
    }
  });

  const [newTask, setNewTask] = useState("");
  const [activeColmn, setActiveColmn] = useState("todo");
  const [draggedItem, setDraggedItem] = useState(null);

  const addNewTask = ()=>{
    if(newTask.trim() === "") return;

    const updateColumns = {...columns};

    updateColumns[activeColmn].items.push({
      id:Date.now().toString(),
      content:newTask
    });

    setColumns(updateColumns);
    setNewTask("");

  };

  const removeTask = (columnId, taskId)=>{
    const updatedColumns = {...columns};

    updatedColumns[columnId].items = updatedColumns[columnId].items.filter((item)=> item.id !== taskId);

    setColumns(updatedColumns);

  };

  const handleDragStart = (columnId, taskId)=>{
    setDraggedItem({columnId,taskId});
  }

  const handleDragOver = (e)=>{
    e.preventDefault();
  }

  const handleDrop =(e, columnId)=>{
    e.preventDefault();

    if(!draggedItem) return;

    const {columnId: sourceColumnId, item} = draggedItem;

    if(sourceColumnId === columnId) return;

    const updatedColumns = {...columns};

    updatedColumns[sourceColumnId].items = updatedColumns[sourceColumnId].items.filter((i)=> i.id !== item.id);

    updatedColumns[columnId].items.push(item);

    setColumns(updatedColumns);
    setDraggedItem(null);

  };

  const columnsStyle = {
    todo:{
      header:"bg-gradient-to-r from-blue-500 to-blue-300",
      border:"border-blue-400"
    },
    inProgress:{
      header:"bg-gradient-to-r from-green-500 to-green-300",
      border:"border-green-400"
    },
    done:{
      header:"bg-gradient-to-r from-yellow-500 to-yellow-300",
      border:"border-yellow-400"
    }
  };


  return (
    <>
    <div className="p-6 w-full min-h-screen bg-gradient-to-b from-zinc-600 to-zinc-400 flex items-center justify-center">
    <div className="flex flex-col items-center justify-center gap-4 max-w-6xl w-full">
      <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-green-500 to-yellow-500">kanban board</h1>
      <div className="mb-8 flex w-full  max-w-lg shadow-lg rounded-lg overflow-hidden">
        <input 
        type="text" 
        value={newTask}
        onChange={(e)=>setNewTask(e.target.value)}
        placeholder="add a new task..."
        onKeyDown={(e)=>e.key === "enter" && addNewTask()}
        className="flex-grow p-4 bg-zinc-500 text-white"
        />
        <select 
        value={activeColmn}
        onChange={(e)=> setActiveColmn(e.target.value)}
        className="p-4 text-white bg-zinc-500 border-0 border-l border-zinc-700">
          {Object.keys(columns).map((columnId)=>(
            <option value={columnId} key={columnId}>
              {columns[columnId].name }
            </option>
          ))}
        </select>
        <button 
        onClick={addNewTask}
        className="px-6 bg-amber-500 text-zinc-800 font-semibold hover:bg-amber-400 transition-colors duration-300">
          add
        </button>
      </div>
      <div className="flex gap-4 w-full">
        {Object.keys(columns).map((columnId)=>(
          <div
          key={columnId}
          className={`flex flex-col w-1/3 rounded-lg overflow-hidden ${columnsStyle[columnId].border}`}
          onDragOver={handleDragOver}
          onDrop={(e)=> handleDrop(e, columnId)}
          >
            <div className={`p-4 text-white font-semibold ${columnsStyle[columnId].header}`}>
              {columns[columnId].name}
            </div>
            <div className="flex flex-col gap-2 p-4 bg-zinc-500">
              {columns[columnId].items.map((item)=>(
                <div 
                key={item.id}
                draggable
                onDragStart={()=> handleDragStart(columnId, item)}
                className="p-4 bg-zinc-700 text-white rounded-lg cursor-move flex justify-between items-center"
                >
                  <span>{item.content}</span>
                  <button 
                  onClick={()=> removeTask(columnId, item.id)}
                  className="text-red-500 hover:text-red-400 transition-colors duration-300">
                    &times;
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
    </>
  )
}

export default App

