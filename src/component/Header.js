import {memo, useState} from "react";
import React from "react";
import axiosClient from "../webservice/axiosClientConfiguration";


const Header = memo(props => {
    const [title, setTitle] = useState('');
    const {addTask} = props;
    const onAddTask = (event = {}) => {
        if (event.key === 'Enter' && title) {
            const newTask = {
                id: new Date().valueOf(), title: title, completed: false
            }
            // addTask({
            //     id: new Date().valueOf(),
            //     title,
            //     completed: false,
            // });
            axiosClient.post('/todos', newTask).then(function (response) {
                console.log(response);
                alert("Success create task")
            }).catch(function (error) {
                console.log(error);
            });
        }
    }

    return (
        <header>
            <h1>Todos</h1>
            <input className="new-todo" type="text"
                   onChange={(event) => setTitle(event.target.value)} value={title}
                   onKeyPress={(event) => onAddTask(event)}
            />
        </header>
    )
})

export default Header;
