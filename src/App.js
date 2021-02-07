import Header from './components/Header';
import Tasks from './components/Tasks';
import {useState, useEffect} from 'react';
import AddTask from './components/AddTask'
import Footer from './components/Footer';
import About from './components/About';
import {BrowserRouter as Router, Route} from 'react-router-dom'


function App() {
  const name = 'Huiyi'
  const x = true

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  //Fetch tasks
  const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()
      // console.log(data)
      return data
  }

  //Fetch task
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()
    // console.log(data)
    return data
}

  //Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', { 
      method: 'POST',
      headers: { 'Content-type': 'application/json'},
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // console.log(task)
    //Old way, without server
    // const id = Math.floor(Math.random() * 10000) + 1
    // const newTask = { id, ...task}
    // setTasks([...tasks, newTask]) 
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: 'DELETE'})

    // console.log("delete", id)
    setTasks(tasks.filter((task) => task.id !== id))
  }

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/tasks/${id}`, { 
      method: 'PUT', 
      headers: {'Content-Type': 'application/json'}, 
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    // console.log(id)
    setTasks(tasks.map(task => task.id === id ? {...task, reminder: !data.reminder}: task))

  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => {setShowAddTask(!showAddTask)}}
        showAdd={showAddTask}/>
        <Route path="/" exact render={(props)=>(
          <>
          {showAddTask && <AddTask onAdd={addTask}/>}
          {tasks.length > 0 ? <Tasks tasks={tasks} onDelete = {deleteTask} onToggle = {toggleReminder}/>: 'There is no tasks'} 
          </>
        )}/>
        <h1>Hello {name}</h1>
        <h2>How you doing?</h2>
        <h3>{x ? 'Yes' : 'No'}</h3>
        <Route path="/about" component={About}/>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
