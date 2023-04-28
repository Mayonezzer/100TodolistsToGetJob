import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";

type PropsType = {
    tlId: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskID: string) => void
    changeTaskCheckbox: (todolistId: string, taskID: string, newIsDone: boolean)=> void
}

export const MappedTasks: React.FC<PropsType> = (props) => {

    const mappedTasks = props.tasks.length
        ? props.tasks.map((t) => {

            const removeTaskHandler = () => {
                props.removeTask(props.tlId, t.taskId)
            }
            const changeTaskCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
                props.changeTaskCheckbox(props.tlId, t.taskId, event.currentTarget.checked)
            }

            return (
                <div>
                    <li key={t.taskId}>
                        <button onClick={removeTaskHandler}>x</button>
                        <input type="checkbox"
                               checked={t.taskIsDone}
                               onChange={changeTaskCheckboxHandler}
                        />
                        <span>{t.taskTitle}</span></li>
                </div>
            )
        })
        : <span> create a task pls </span>

    return (
        <>
            <ul>
                {mappedTasks}
            </ul>
        </>
    );
};

