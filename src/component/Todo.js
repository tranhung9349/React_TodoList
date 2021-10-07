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
    const removeTask =() => {
        getTaskEditingId (todo.id)
        onRemoveTask({
            ...todo
        }, index)
    }


return (
    <li className={`${isEditing ? 'editing' : ''} ${todo.isCompleted ? 'completed' : ''}`}>
        {!isEditing ?
            <div className="view">
                <input className="toggle" type="checkbox"
                       checked={todo.isCompleted}
                       onChange={()=>markCompleted(todo.id)}
                />
                <label onDoubleClick={() => getTaskEditingId(todo.id)}>
                    {todo.text}
                </label>
                <span style={{marginLeft: 15}}>Created: {todo.created}</span>
                <button className="destroy" onClick={(event) => removeTask()}> </button>
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
