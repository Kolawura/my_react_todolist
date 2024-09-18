/* eslint-disable react/prop-types */
import Task from "./Task";

const Tasks = ({ tasks, notEditTasks,isEdit, Loading, del, complete, edit }) => {
    if (Loading) return <h1 className='loading'></h1>;
    // if (Error) return <h1 className='error'>Error: {Error}</h1>;
    if (tasks?.length == 0) return <h1 className='error'>No Task, Add one!</h1>;
    if(isEdit){return (
        <>
            {notEditTasks && notEditTasks?.map((toDoTask) => {
                return (
                    <Task key={toDoTask.id} todo={toDoTask} handleDelete={del} handleComplete={complete} handleEdit={edit} />
                )
            })}
        </>
    )}
    if(!isEdit){return (
        <>
            {tasks && tasks?.map((toDoTask) => {
                return (
                    <Task key={toDoTask.id} todo={toDoTask} handleDelete={del} handleComplete={complete} handleEdit={edit} />
                )
            })}
        </>
    )}
};

export default Tasks;
