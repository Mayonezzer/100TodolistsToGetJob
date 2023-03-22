import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterType = 'All' | 'Active' | 'Completed'


function App() {
    const mainTitle = '100timesTodolist'
    const tasksList: TaskType[] = [
        { taskId: v1(), taskTitle: 'HTML&CSS', isDone: true},
        { taskId: v1(), taskTitle: 'JS', isDone: false},
        { taskId: v1(), taskTitle: 'React', isDone: true},
        { taskId: v1(), taskTitle: 'Redux', isDone: false},
    ]

    let [tasks, setTasks] = useState<Array<TaskType>>(tasksList)
    let [filter, setFilter] = useState<FilterType>('All')

    const removeTask = (removeId: string) => {
        tasks = tasks.filter( (t) => t.taskId !== removeId )
        setTasks(tasks)
    }
    const filterTask = (buttonName: FilterType) => {
        setFilter(buttonName)
    }

    let filteredTasks = tasks
    if (filter === 'Active') {
        filteredTasks = tasks.filter( (t) => !t.isDone)
    }
    if (filter === 'Completed') {
        filteredTasks = tasks.filter( (t) => t.isDone)
    }

    const addTask = (inputTitle: string) => {
        const newTask = { taskId: v1(), taskTitle: inputTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeCheckbox = (changeId: string, newIsDone: boolean) => {
        setTasks(tasks.map( (t) => t.taskId === changeId ? {...t, isDone:newIsDone} : t))
    }






    return (
        <div className="App">
           <Todolist tasksList={filteredTasks}
                     mainTitle={mainTitle}
                     removeTask={removeTask}
                     filterTask={filterTask}
                     addTask={addTask}
                     changeCheckbox={changeCheckbox}
           />
        </div>
    );
}

export default App;
