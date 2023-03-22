import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";

type PropsType = {
    mainTitle: string
    tasksList: TaskType[]
    removeTask: (removeId: string) => void
    filterTask: (buttonName: FilterType) => void
    addTask: (inputTitle: string) => void
    changeCheckbox: (changeId: string, newIsDone: boolean) => void
}


export type TaskType= {
    taskId: string
    taskTitle: string
    isDone: boolean
}

export const Todolist = (props: PropsType) => {
    let [inputTitle, setInputTitle] = useState<string>('')

    const allFilterHandler = () => {
        props.filterTask('All')
    }
    const activeFilterHandler = () => {
        props.filterTask('Active')
    }
    const completedFilterHandler = () => {
        props.filterTask('Completed')
    }

    const addTaskHandler = () => {
        if (inputTitle.trim() !== '')
        props.addTask(inputTitle.trim())
        setInputTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }













    return (
        <div>
            <h3>{props.mainTitle}</h3>
            <div>
                <input
                    value={inputTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                />
                <button onClick={addTaskHandler}>+</button>
            </div>
            <ul>
                {props.tasksList.map( (t) => {
                    const removeTaskHandler = () => {
                        props.removeTask(t.taskId)
                    }
                    const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeCheckbox(t.taskId, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.taskId}>
                            <button onClick={removeTaskHandler} >X</button>
                            <input
                                onChange={changeCheckboxHandler}
                                type="checkbox" checked={t.isDone}/>
                            <span>{t.taskTitle}</span>
                        </li>
                    )
                } )}
            </ul>
            <div>
                <button onClick={allFilterHandler}>All</button>
                <button onClick={activeFilterHandler}>Active</button>
                <button onClick={completedFilterHandler}>Completed</button>
            </div>
        </div>
    )
}