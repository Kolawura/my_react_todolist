import { useState } from "react"

const EditTasks = ({ count, EditTasks, isLoading, newTask, setError }) => {
    const { task, compTask, id } = newTask
    const [todo, setTodo] = useState(task);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            Submit();
        }
    };

    const Submit = () => {
        if (todo.trim() != '') {
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
                autoFocus="True"
                className="task"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
                onKeyPress={handleKeyPress} />
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
