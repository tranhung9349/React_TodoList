import React, {PureComponent} from "react";

//Component
import Header from "./component/Header";


//CSS
import './App.css'
import './css/app.css'
import TodoList from "./component/TodoList";


class App extends PureComponent {
    state = {
        todoList: [{
            id: 1,
            text: "Task 1",
            created: new Date().toDateString() + ", " + new Date().toLocaleTimeString(),
            isCompleted: false,
        }, {
            id: 2,
            text: "Task 2",
            created: new Date().toDateString() + ", " + new Date().toLocaleTimeString(),
            isCompleted: false,
        }, {
            id: 3,
            text: "Task 3",
            created: new Date().toDateString() + ", " + new Date().toLocaleTimeString(),
            isCompleted: false,
        }],
        taskEditingId: '',

    }

    addTask = (todo = {}) => {
        console.log(todo)
        this.setState(preState => ({
            todoList: [...preState.todoList, todo]
        }))
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
            todoList:preState.todoList.map(todo => todo.id ===id ? ({...todo, isCompleted: !todo.isCompleted}): todo)
        }))
    }



    onRemoveTask = (todo = {},index =-1 ) => {
        if(index >=0) {
            const {todoList: list} = this.state;
            list.splice(index,1, todo);
            this.setState({
                todoList: list,
            })
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
                    removeTask = {this.onRemoveTask}
                />
            </div>
        );
    }

}

export default App;
