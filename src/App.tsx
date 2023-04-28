import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";

export type FilterValuesType = string

type TodolistType = {
    todoId: string
    todolistTitle: string
    todolistFilter: FilterValuesType
    // tasks: Array<TaskType>
}

type TaskStateType = {
    [todolistId: string]: TaskType[]
}

function App(): JSX.Element {

    const todolistId_1= v1()
    const todolistId_2= v1()

    const [todolists, setTodolists] = useState<TodolistType[]>([
        { todoId: todolistId_1, todolistTitle: 'What to learn', todolistFilter: 'all' },
        { todoId: todolistId_2, todolistTitle: 'What to buy', todolistFilter: 'active' },
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todolistId_1]: [
            {taskId: v1(), taskTitle: "HTML&CSS", taskIsDone: true},
            {taskId: v1(), taskTitle: "JS", taskIsDone: true},
            {taskId: v1(), taskTitle: "ReactJS", taskIsDone: false},
        ],
        [todolistId_2]: [
            {taskId: v1(), taskTitle: "HTML", taskIsDone: false},
            {taskId: v1(), taskTitle: "CSS", taskIsDone: false},
            {taskId: v1(), taskTitle: "React", taskIsDone: true},
        ],
    })

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(t=>t.todoId!==todolistId))
        delete tasks[todolistId]
    }

    const removeTask = (todolistId: string, taskID: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t=> t.taskId!==taskID)})
    }

    const addTask = (todolistId: string, inputTitle: string) => {
        const newTask = { taskId: v1(), taskTitle: inputTitle, taskIsDone: true }
        setTasks({...tasks, [todolistId]: [...tasks[todolistId], newTask]})
    }

    const changeTaskCheckbox = (todolistId: string, taskID: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=> t.taskId===taskID?{...t, taskIsDone:newIsDone}:t)})
    }

    const changeTodolistFilter = (todolistId: string, filterValue: string) => {
        setTodolists(todolists.map(el=> el.todoId===todolistId?{...el, todolistFilter:filterValue}:el))
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

    //const filteredTasks = getFilteredTasksForTodolist(tasks, filter)

    const mappedTodolist = todolists.length
        ? todolists.map((tl) => {
            const filteredTasks = getFilteredTasksForTodolist(tasks[tl.todoId], tl.todolistFilter)
            return (
                <Todolist
                    tlId={tl.todoId}
                    title={tl.todolistTitle}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskCheckbox={changeTaskCheckbox}
                    filter={tl.todolistFilter}
                    removeTodolist={removeTodolist}
                />
            )
        })
        : <span> create a list pls </span>

    return (
        <div className="App">
            {mappedTodolist}
        </div>
    );
}

export default App;
