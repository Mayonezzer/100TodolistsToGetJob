import React from "react";
import {MappedTasks} from "./MappedTasks";
import {SuperButton} from "./SuperButton";
import {FilterValuesType} from "../App";
import {EditableSpan} from "./EditableSpan";
import {AddItemForm} from "./AddItemForm";


export type PropsType = {
    tlId: string
    title: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskID: string) => void
    addTask: (todolistId: string, inputTitle: string) => void
    changeTodolistFilter: (todolistId: string, filterValue: string) => void
    changeTaskCheckbox: (todolistId: string, taskID: string, newIsDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    addEditTask: (todolistId: string, taskID: string, editInputTaskTitle: string) => void
    addEditTodolistTitle: (todolistId: string, editInputTitle: string) => void
}

export type TaskType = {
    taskId: string
    taskTitle: string
    taskIsDone: boolean
}


export const Todolist: React.FC<PropsType> = (props) => {

    /*let isAllTasksNotIsDone = true // все не выполненные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].taskIsDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'*/

    const bigChangeFilter = (filterValue: FilterValuesType) => {
        props.changeTodolistFilter(props.tlId, filterValue)
    }
    const removeTodolistHandler = () => {
        props.removeTodolist(props.tlId)
    }
    const addEditTodolistTitleHandler = (editInputTitle: string) => {
        props.addEditTodolistTitle(props.tlId, editInputTitle)
    }
    const addTaskHandler = (inputTitle: string) => {
        props.addTask(props.tlId, inputTitle)
    }

    return (
        <div className={'todolist'}>
            <h3>
                <EditableSpan oldTitle={props.title} callBack={addEditTodolistTitleHandler}/>
                <button onClick={removeTodolistHandler}>X</button>
            </h3>
            <div>
                <AddItemForm callBack={(inputTitle)=>addTaskHandler(inputTitle)}/>
            </div>
                <MappedTasks
                    tlId={props.tlId}
                    tasks={props.tasks}
                    removeTask={props.removeTask}
                    changeTaskCheckbox={props.changeTaskCheckbox}
                    addEditTask={props.addEditTask}
                />
            <SuperButton name={"All"} filter={props.filter} callBack={() => bigChangeFilter('All')}/>
            <SuperButton name={"Active"} filter={props.filter} callBack={() => bigChangeFilter('Active')}/>
            <SuperButton name={"Completed"} filter={props.filter} callBack={() => bigChangeFilter('Completed')}/>
        </div>
    )
}