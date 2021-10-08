import React, {memo, useState} from "react";


const Todo = memo(props => {
    const {todo, taskEditingId, getTaskEditingId, onEditTask, index, markCompleted, onRemoveTask} = props;
    const isEditing = taskEditingId === todo.id
    const [text, setText] = useState(todo.text)
    const editTask = () => {
        onEditTask({
            ...todo,
            text
        }, index)
    }
    const removeTask = function (id) {
        onRemoveTask(id);
        alert("Delete Successful")
    }

return (
    <li className={`${isEditing ? 'editing' : ''} ${todo.completed ? 'completed' : ''}`}>
        {!isEditing ?
            <div className="view">
                <input className="toggle" type="checkbox"
                       checked={todo.completed}
                       onChange={()=>markCompleted(todo.id)}
                />
                <label onDoubleClick={() => getTaskEditingId(todo.id)}>
                    {todo.title}
                </label>
                {/*<span style={{marginLeft: 15}}>Created: {todo.created}</span>*/}
                <button className="destroy" onClick={() => removeTask(todo.id)}> </button>
            </div> :
            <input className="edit" type="text" value={text}
                   onChange={event => setText(event.target.value)}
                   onBlur={editTask}
                   onKeyPress={(event) => {
                       if(event.key==='Enter') {
                           editTask();
                       }
                   }}
            />
        }
    </li>
);
})

export default Todo;
