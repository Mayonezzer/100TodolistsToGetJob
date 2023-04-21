import React, {ChangeEvent} from 'react';
import {TaskType} from "./Todolist";

type PropsType = {
    tasks: TaskType[]
    removeTask: (taskID: string) => void
    changeTaskCheckbox: (taskID: string, newIsDone: boolean)=> void
}

export const MappedTasks: React.FC<PropsType> = (props) => {

    const mappedTasks = props.tasks.map((t) => {

        const removeTaskHandler = () => {
            props.removeTask(t.taskId)
        }
        const changeTaskCheckboxHandler = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskCheckbox(t.taskId, event.currentTarget.checked)
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

    return (
        <>
            <ul>
                {mappedTasks}
            </ul>
        </>
    );
};

