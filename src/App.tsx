import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = string

function App(): JSX.Element {

    const title: string = 'What to learn'

    const [tasks, setTasks] = useState <Array<TaskType>>([
        { taskId: v1(), taskTitle: "HTML&CSS", taskIsDone: true },
        { taskId: v1(), taskTitle: "JS", taskIsDone: true },
        { taskId: v1(), taskTitle: "ReactJS", taskIsDone: false },
    ])

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.taskId!==taskID))
    }

    const addTask = (inputTitle: string) => {
        const newTask = { taskId: v1(), taskTitle: inputTitle, taskIsDone: true }
        setTasks([newTask, ...tasks])
    }

    const changeTaskCheckbox = (taskID: string, newIsDone: boolean) => {
        setTasks(tasks.map(t=> t.taskId === taskID ? {...t, taskIsDone:newIsDone} :t))
    }

    const [filter, setFilter] = useState <FilterValuesType>('All')

    const changeFilter = (filterValue: string) => {
        setFilter(filterValue)
    }

    // let filteredTasks: TaskType[] = tasks
    // if (filter === 'Active') {
    //     filteredTasks = tasks.filter(t=> t.taskIsDone)
    // }
    // if (filter === 'Completed') {
    //     filteredTasks = tasks.filter(t=> !t.taskIsDone)
    // }

    const getFilteredTasksForTodolist = (tasksList: TaskType[], filterValue: FilterValuesType) => {
        switch (filterValue) {
            case 'Active':
                return tasksList.filter(t=> t.taskIsDone)
            case 'Completed':
                return tasksList.filter(t=> !t.taskIsDone)
            default:
                return tasksList
        }
    }
    const filteredTasks = getFilteredTasksForTodolist(tasks, filter)

    return (
        <div className="App">
            <Todolist
                title={title}
                tasks={filteredTasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskCheckbox={changeTaskCheckbox}
                filter={filter}
            />
        </div>
    );
}

export default App;
