import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";
import s from './Todolist.module.css';

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
    let [error, setError] = useState<string | null>('')
    let [buttonName, setButtonName] = useState<FilterType>('All')

    const mappedTasks = props.tasksList.map( (t) => {
        const removeTaskHandler = () => { // вынесли наверх
            props.removeTask(t.taskId)
        }
        const changeCheckboxHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeCheckbox(t.taskId, e.currentTarget.checked)
        }
        return (
            <li key={t.taskId} className={t.isDone ? s.isDone : ''}>
                <button onClick={removeTaskHandler}>X</button>
                <input
                    onChange={changeCheckboxHandler}
                    type="checkbox"
                    checked={t.isDone}
                />
                <span>{t.taskTitle}</span>
            </li>
        // <li key={t.taskId} className={t.isDone ? s.isDone : ''}>
        //     <button onClick={() => removeTaskHandler(t.taskId)}>
        //         X</button>
        //     <input
        //         onChange={(e) =>changeCheckboxHandler(t.taskId, e.currentTarget.checked)}
        //         type="checkbox" checked={t.isDone}/>
        //     <span>{t.taskTitle}</span>
        // </li>        это если функции вынести из mapa еще выше, а map останется в вёрстке
        )
    } )

    const setAllFilterHandler = () => {
        props.filterTask('All')
        setButtonName('All')
    }
    const setActiveFilterHandler = () => {
        props.filterTask('Active')
        setButtonName('Active')
    }
    const setCompletedFilterHandler = () => {
        props.filterTask('Completed')
        setButtonName('Completed')
    }

    const addTaskHandler = () => {
        if (inputTitle.trim() !== '') {
            props.addTask(inputTitle.trim())
        } else {
            setError('впиши че-нить плз')
        }
        setInputTitle('')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setInputTitle(e.currentTarget.value)
    }

    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addTaskHandler()
        }
    }

    const disabledHandler = inputTitle.trim() === '' || inputTitle.length > 15

    // const changeCheckboxHandler = (tID: string, newwIsDone: boolean) => {
    //     props.changeCheckbox(tID, newwIsDone)
    // }
    // const removeTaskHandler = (tID: string) => {
    //     props.removeTask(tID)
    // }           это если функции вынести из mapa еще выше, а map останется в вёрстке


    return (
        <div>
            <h3>{props.mainTitle}</h3>
            <div>
                <input
                    value={inputTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? s.error : ''}
                />
                <button onClick={addTaskHandler}
                        disabled={disabledHandler}
                >+</button>
            </div>
            {error && <div className={s.errorMessage}>{error}</div>}
            <ul>
                {mappedTasks}
            </ul>
            <div>
                <button className={buttonName === 'All' ? s.activeFilter : ''} onClick={setAllFilterHandler}>All</button>
                <button className={buttonName === 'Active' ? s.activeFilter : ''} onClick={setActiveFilterHandler}>Active</button>
                <button className={buttonName === 'Completed' ? s.activeFilter : ''} onClick={setCompletedFilterHandler}>Completed</button>
            </div>
        </div>
    )
}