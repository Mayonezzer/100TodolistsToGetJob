import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";


export type FilterValuesType = string

type TodolistType = {
    todoId: string
    todolistTitle: string
    todolistFilter: FilterValuesType
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
        const newTask = { taskId: v1(), taskTitle: inputTitle, taskIsDone: false }
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const addEditTask = (todolistId: string, taskID: string, editInputTaskTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(el=>el.taskId===taskID ? {...el, taskTitle: editInputTaskTitle}:el)})
    }
    const addEditTodolistTitle = (todolistId: string, editInputTitle: string) => {
        setTodolists(todolists.map(el=>el.todoId===todolistId?{...el, todolistTitle:editInputTitle}:el))
    }
    const changeTaskCheckbox = (todolistId: string, taskID: string, newIsDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t=> t.taskId===taskID?{...t, taskIsDone:newIsDone}:t)})
    }
    const changeTodolistFilter = (todolistId: string, filterValue: string) => {
        setTodolists(todolists.map(el=> el.todoId===todolistId?{...el, todolistFilter:filterValue}:el))
    }
    const addNewTodolist = (newTodoName: string) => {
        const newTodoId: string = v1()
        const newTodolist: TodolistType = { todoId:newTodoId, todolistTitle: newTodoName, todolistFilter: 'all' }
        setTodolists([newTodolist, ...todolists])
        setTasks({[newTodoId]: [], ...tasks})
    }
    const getFilteredTasksForTodolist = (tasksList: TaskType[], filterValue: FilterValuesType) => {
        switch (filterValue) {
            case 'Active':
                return tasksList.filter(t=> !t.taskIsDone)
            case 'Completed':
                return tasksList.filter(t=> t.taskIsDone)
            default:
                return tasksList
        }
    }

    // let filteredTasks: TaskType[] = tasks
    // if (filter === 'Active') {
    //     filteredTasks = tasks.filter(t=> t.taskIsDone)
    // }
    // if (filter === 'Completed') {
    //     filteredTasks = tasks.filter(t=> !t.taskIsDone)
    // }
    //const filteredTasks = getFilteredTasksForTodolist(tasks, filter)

    const mappedTodolist = todolists.length
        ? todolists.map((tl) => {
            const filteredTasks = getFilteredTasksForTodolist(tasks[tl.todoId], tl.todolistFilter)
            return (
                <Todolist
                    key={tl.todoId}
                    tlId={tl.todoId}
                    title={tl.todolistTitle}
                    tasks={filteredTasks}
                    removeTask={removeTask}
                    changeTodolistFilter={changeTodolistFilter}
                    addTask={addTask}
                    changeTaskCheckbox={changeTaskCheckbox}
                    filter={tl.todolistFilter}
                    removeTodolist={removeTodolist}
                    addEditTask={addEditTask}
                    addEditTodolistTitle={addEditTodolistTitle}
                />
            )
        })
        : <span> create a list pls </span>

    return (
        <div className="App">
            <div>
                <AddItemForm callBack={addNewTodolist}/>
            </div>
            {mappedTodolist}
        </div>
    );
}

export default App;
