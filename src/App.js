import React, {PureComponent, useState} from "react";

//Component
import Header from "./component/Header";


//CSS
import './App.css'
import './css/app.css'
import TodoList from "./component/TodoList";
import axiosClient from "./webservice/axiosClientConfiguration";


class App extends PureComponent {
    state = {
        todoList: [{
            userId: 0,
            id: 0,
            title: '',
            completed: false,
        }, ],
        taskEditingId: '',

    }

    componentDidMount() {
        this.getList();
    }


    getList=()=>{
        fetch('https://jsonplaceholder.typicode.com/todos',
        )
            .then(response => response.json())
            .then(data => this.setState({ todoList:data }));
    }

    addTask = (todo = {}) => {
        console.log(todo)
        this.setState(preState => ({
            todoList: [...preState.todoList, todo]
        }));
        const response = axiosClient.post("/contacts", todo);
        console.log(response);
    }
    getTaskEditingId = (id = '') => {
        this.setState({taskEditingId: id})
    }
    onEditTask = (todo = {},index =-1 )=> {
        if(index >=0) {
            const {todoList: list} = this.state;
            list.splice(index,1, todo);
            this.setState({
                todoList: list,
                taskEditingId: ''
            })
        }
    }

    markCompleted = (id = '') => {
        this.setState(preState =>({
            todoList:preState.todoList.map(todo => todo.id ===id ? ({...todo, completed: !todo.completed}): todo)
        }))
    }



    onRemoveTask = (id = '') => {
        for (let i = 0; i < this.state.todoList.length; i++) {
            if(id === this.state.todoList[i].id) {
                delete this.state.todoList[i];
                axiosClient.delete('/todos/' + id).then(function (res) {
                    console.log("Delete successful")
                }).catch(function (error) {
                    console.log(error)
                });
            }
        }

    }

    render() {
        const {
            todoList, taskEditingId
        } = this.state;

        return (
            <div className="todoapp">
                <Header addTask={this.addTask}
                />
                <TodoList
                    todoList={todoList}
                    getTaskEditingId={this.getTaskEditingId}
                    taskEditingId={taskEditingId}
                    onEditTask = {this.onEditTask}
                    markCompleted = {this.markCompleted}
                    onRemoveTask = {this.onRemoveTask}
                    getDeleteTask = {this.getDeleteTask}
                />
            </div>
        );
    }

}

export default App;
