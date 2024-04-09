/* eslint-disable react/prop-types */
import { useState } from "react"

const EditTasks = ({ count, EditTasks, isLoading, newTask, setError }) => {
    const { task, compTask, id } = newTask
    const [todo, setTodo] = useState(task);
    console.log(compTask);

    addEventListener("keydown", (e) => {
        e.preventDefault();
        if (e.key === "Enter") {
        Submit();
      }
    });

    const Submit = (e) => {
        e.preventDefault();
        if (todo) {
            EditTasks(id, todo);
        } else {
            setError();
        }
        setTodo("");
    }

    return (
        < >
            <input type="text"
                placeholder="Task to be done..."
                autoFocus="true"
                className="task" 
                value={todo}
                onChange={(e) => setTodo(e.target.value)} />
            <button onClick={Submit}>Edit Task</button>
            {isLoading && (
                <p>Editing Task...</p>
            )}
            {isLoading || (
                <p id="pending-tasks">You have { }{count}{ } task(s) to complete!</p>
            )}
        </>
    )
}

export default EditTasks
