import { useEffect, useState } from 'react';
import './App.css'
import AddTask from './Component/AddTask'
import Tasks from './Component/Tasks';
import { useFetch } from './Component/useFetch';
import EditTasks from './Component/EditTask';
import Error from './Component/Error';

function App() {
  const [taskData, error, isLoading] = useFetch('http://localhost:4000/tasks');

  const [count, setcount] = useState(0);
  const [tasks, setTasks] = useState(taskData);
  const [compTask, setComplete] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [Edit, setEdit] = useState('');
  const [isError, setIsError] = useState(false);
  const [isError1, setIsError1] = useState(false);

  

  useEffect(() => {
    setLoading(isLoading)
  }, [isLoading])

  useEffect(() => {
    setTasks('')
    setTasks(taskData)
  }, [taskData])


  useEffect(() => {
    let inCompTask = 0;

    tasks.forEach((task) => {
      if (!task.compTask) {
        inCompTask += 1;
      }
    });
    setcount(inCompTask)
  }, [tasks])


  const InputTasks = async (task) => {
    const TaskData = { task, compTask }
    setLoading(true);
    setComplete(false);
    fetch('http://localhost:4000/tasks', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(TaskData)
    },
    ).then((res) => res.json())
      .then((data) => setTasks([...tasks, data]))
      .finally(() => setLoading(false))
  }

  const EditTask = async (id, newTask) => {
    const todo = await fetchTask(id)
    setLoading(true);
    setComplete(false);
    const newTodo = { ...todo, task: newTask }
    fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(newTodo)
    },
    ).then((res) => {
      return res.json()
    })
      .then((data) => {
        setTasks([...tasks, data])
      }).finally(() => {
        setLoading(false);
        setIsEdit(false);
      })
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:4000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  const handleDelete = async (id) => {
    const del = window.confirm("Are you sure you want to delete this blog?");
    if (del) {
      fetch(`http://localhost:4000/tasks/${id}`, {
        method: "DELETE",
      })
      setTasks(tasks.filter((task) => task.id !== id))
    }
  };

  const handleEdit = async (id) => {
    const edit = await fetchTask(id);
    if (!isEdit) {
      setEdit(edit);
      setIsEdit(true)
      setTasks(tasks.filter((task) => task.id !== id))
    } else {
      setIsError1(true);
      setTimeout(() => {
        setIsError1(false)
      }, 1000);
    }

  };

  const handleComplete = async (id) => {
    const todo = await fetchTask(id)
    console.log(todo)
    const comp = { ...todo, compTask: !todo.compTask }
    fetch(`http://localhost:4000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(comp)
    },
    ).then((res) => res.json())
      .then((data) => setTasks(tasks.map((task) =>
        task.id === id ? { ...task, compTask: data.compTask } : task
      )))
  }

  const setError = () => {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 1000);
  };


  return (
    <>
      <div className='app'>
        <div id="wrapper">
          {isEdit ?
            (<EditTasks
              count={count}
              EditTasks={EditTask}
              isLoading={Loading}
              newTask={Edit}
              setError={setError} />)
            :
            (<AddTask
              count={count}
              AddTasks={InputTasks}
              isLoading={Loading}
              setError={setError} />)}
        </div>
        <div id="task">
          <Tasks tasks={tasks} Error={error} Loading={Loading} del={handleDelete} complete={handleComplete} edit={handleEdit} />
        </div>
        <Error error={isError} error1={isError1} />
      </div>
      <footer>Made with <span>❤️</span> by Kolawura</footer>
    </>
  )
}

export default App
