import { useState } from "react"

const AddTask = ({ count, AddTasks, isLoading, setError }) => {
    const [task, setTask] = useState("");

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            Submit();
        }
    };

    const Submit = () => {
        if (task.trim() != '') {
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
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={handleKeyPress} />
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
