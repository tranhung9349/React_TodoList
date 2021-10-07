import {memo, useState} from "react";
import React from "react";

const Header = memo( props => {
    const [text, setText] = useState('');
    const { addTask } = props;
    const onAddTask = (event = {}) => {
        if(event.key=== 'Enter' && text) {
            addTask({
                id: new Date().valueOf(),
                text,
                created: new Date().toDateString() +", "+ new Date().toLocaleTimeString(),
                isCompleted:false,
            })
        }
    }
    return(
        <header>
            <h1>Todos</h1>
            <input className="new-todo" type="text"
                   onChange={(event) => setText(event.target.value)} value={text}
                   onKeyPress={(event) => onAddTask(event)}
            />
        </header>
    )
})

export default Header;
