/* eslint-disable react/prop-types */
import { useState } from "react"

const AddTask = ({ count, AddTasks, isLoading, setError }) => {
    const [task, setTask] = useState("");
    
    // addEventListener("keydown", (e) => {
    //     // e.preventDefault();
    //     if (e.key === "Enter") {
    //     Submit();
    //   }
    // });

    const Submit = (e) => {
        e.preventDefault();
        if (task) {
            AddTasks(task)
        } else {
            setError();
        }
        setTask("")
    };
    

    return (
        < >
            <input type="text"
                placeholder="Task to be done..."
                autoFocus={true}
                className="task" 
                value={task}
                onChange={(e) => setTask(e.target.value)} />
            <button onClick={Submit}>Add Task</button>
            {isLoading && (
                <p>Adding Task...</p>
            )}
            {isLoading || (
                <p id="pending-tasks">You have { }{count}{ } task(s) to complete!</p>
            )}
        </>
    )
}

export default AddTask
