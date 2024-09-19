import { useEffect, useState } from "react";
import "./App.css";
import AddTask from "./Component/AddTask";
import Tasks from "./Component/Tasks";
import EditTasks from "./Component/EditTask";
import Error from "./Component/Error";

function App() {
  const [count, setcount] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [Edit, setEdit] = useState({});
  const [isError, setIsError] = useState(false);
  const [isError1, setIsError1] = useState(false);
  const [notEditTask, setNotEditTask] = useState([]);
  console.log(tasks);
  console.log(notEditTask);

  useEffect(() => {
    setLoading(true);
    const getTask = JSON.parse(localStorage.getItem("tasks"));
    if (getTask) {
      if (!isEdit) {
        console.log("EDIT IS FALSE");
        setTasks(getTask);
      }
      if (isEdit) {
        console.log("EDIT IS TRUE");
        setTasks(notEditTask);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    let inCompTask;
    if (tasks && !isEdit) {
      inCompTask = 0;
      tasks?.forEach((task) => {
        if (!task.compTask) {
          inCompTask += 1;
        }
      });
    }
    if (notEditTask && isEdit) {
      inCompTask = 0;
      notEditTask?.forEach((task) => {
        if (!task.compTask) {
          inCompTask += 1;
        }
      });
    }
    setcount(inCompTask);
  }, [tasks, count]);

  const InputTasks = (task) => {
    setLoading(true);
    const TaskData = { id: Date.now(), task: task, compTask: false };
    const newTasks = [TaskData, ...tasks];
    localStorage.setItem("tasks", JSON.stringify(newTasks));
    setTasks(newTasks);
    setLoading(false);
  };

  const EditTask = (id, editTask) => {
    const getTask = JSON.parse(localStorage.getItem("tasks"));
    const newTask = getTask.map((task) =>
      task.id === id ? { ...task, task: editTask } : task
    );
    setLoading(true);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    setTasks(newTask);
    setLoading(false);
    setIsEdit(false);
  };

  const handleDelete = (id) => {
    const del = window.confirm("Are you sure you want to delete this blog?");
    const Tasks = JSON.parse(localStorage.getItem("tasks"));
    if (del) {
      const newTask = Tasks.filter((task) => task.id != id);
      const updatednotEditTask = notEditTask.filter((task) => task.id != id);
      setNotEditTask(updatednotEditTask);
      localStorage.setItem("tasks", JSON.stringify(newTask));
      isEdit ? setTasks(notEditTask) : setTasks(newTask);
    }
  };

  const handleEdit = (id) => {
    const getTask = JSON.parse(localStorage.getItem("tasks"));
    const edit = getTask.filter((task) => task.id == id);
    if (!isEdit) {
      setEdit(edit[0]);
      setIsEdit(true);
      setTasks(tasks.filter((task) => task.id !== id));
      setNotEditTask(tasks.filter((task) => task.id !== id));
    } else {
      setIsError1(true);
      setTimeout(() => {
        setIsError1(false);
      }, 1000);
    }
  };

  const handleComplete = (id) => {
    const Task = JSON.parse(localStorage.getItem("tasks"));
    const newTask = Task.map((task) =>
      task.id == id ? { ...task, compTask: !task.compTask } : task
    );
    const updatednotEditTask = notEditTask.map((task) =>
      task.id == id ? { ...task, compTask: !task.compTask } : task
    );
    setNotEditTask(updatednotEditTask);
    localStorage.setItem("tasks", JSON.stringify(newTask));
    isEdit ? setTasks(notEditTask) : setTasks(newTask);
  };

  const setError = () => {
    setIsError(true);
    setTimeout(() => {
      setIsError(false);
    }, 1000);
  };

  return (
    <>
      <div className="app">
        <div id="wrapper">
          {isEdit ? (
            <EditTasks
              count={count}
              EditTasks={EditTask}
              isLoading={Loading}
              newTask={Edit}
              setError={setError}
            />
          ) : (
            <AddTask
              count={count}
              AddTasks={InputTasks}
              isLoading={Loading}
              setError={setError}
            />
          )}
        </div>
        <div id="task">
          <Tasks
            tasks={tasks}
            notEditTasks={notEditTask}
            isEdit={isEdit}
            Loading={Loading}
            del={handleDelete}
            complete={handleComplete}
            edit={handleEdit}
          />
        </div>
        <Error
          error={isError}
          error1={isError1}
        />
      </div>
      <footer>
        Made with <span>❤️</span> by Kolawura
      </footer>
    </>
  );
}

export default App;
