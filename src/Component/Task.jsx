/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faCheck, faPenToSquare } from '@fortawesome/free-solid-svg-icons';


const Task = ({ todo, handleDelete, handleEdit, handleComplete }) => {


    return (
        <ol className="todo-list" >
            <li className={(todo.compTask) ? "complete" : '' }>{todo.task}
            </li>
                <button className="editBtn" onClick={() => handleEdit(todo.id)}><FontAwesomeIcon icon={faPenToSquare} /></button>
                <button className="compBtn" onClick={() => handleComplete(todo.id)}><FontAwesomeIcon icon={faCheck} /></button>
                <button className="delBtn" onClick={() => handleDelete(todo.id)}><FontAwesomeIcon icon={faTrashAlt} /></button>
        </ol>
    )
}

export default Task
