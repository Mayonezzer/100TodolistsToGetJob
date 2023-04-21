import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {MappedTasks} from "./MappedTasks";
import {SuperInput} from "./SuperInput";
import {MegaButton} from "./MegaButton";
import {FilterValuesType} from "../App";

export type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    addTask: (inputTitle: string) => void
    changeFilter: (filterValue: string) => void
    changeTaskCheckbox: (taskID: string, newIsDone: boolean) => void
    filter: FilterValuesType

}

export type TaskType = {
    taskId: string
    taskTitle: string
    taskIsDone: boolean
}


export const Todolist: React.FC<PropsType> = (props) => {

    let isAllTasksNotIsDone = true // все не выполненные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].taskIsDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? 'todolist-empty' : 'todolist'

    const [inputTitle, setInputTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputTitle(event.currentTarget.value)
    }

    const addTaskHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addTask(inputTitle.trim())
            setInputTitle('')
        } else {
            setError('напиши че-нить')
        }
        setInputTitle('')
    }

    const isAddTaskNotPossible = inputTitle.length === 0 || inputTitle.length > 20

    const onKeyDownHandler = isAddTaskNotPossible
        ? undefined
        : (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addTaskHandler()

    // const allChangeFilterHandler = () => {
    //     props.changeFilter('All')
    // }
    // const activeChangeFilterHandler = () => {
    //     props.changeFilter('Active')
    // }
    // const completedChangeFilterHandler = () => {
    //     props.changeFilter('Completed')
    // }

    const changeFilter = (filterValue: FilterValuesType) => {
        props.changeFilter(filterValue)
    }


    return (
        <div className={todoClasses}>
            <h3>{props.title}</h3>
            <div>
                <SuperInput value={inputTitle}
                            placeholder={'введи inputTitle, плез'}
                            onChangeCallBack={onChangeHandler}
                            onKeyDownCallBack={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}
                        disabled={isAddTaskNotPossible}
                >+
                </button>
                {error && <div>{error}</div>}
            </div>
            <MappedTasks
                tasks={props.tasks}
                removeTask={props.removeTask}
                changeTaskCheckbox={props.changeTaskCheckbox}
            />
            <MegaButton name={"All"} filter={props.filter} callBack={() => changeFilter('All')}/>
            <MegaButton name={"Active"} filter={props.filter} callBack={() => changeFilter('Active')}/>
            <MegaButton name={"Completed"} filter={props.filter} callBack={() => changeFilter('Completed')}/>
        </div>
    )
}