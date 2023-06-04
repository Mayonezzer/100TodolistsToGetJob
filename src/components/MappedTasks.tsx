import React from 'react';
import {TaskType} from "./Todolist";
import {SuperCheckbox} from "./SuperCheckbox";
import {EditableSpan} from "./EditableSpan";
import {SuperButton} from "./SuperButton";

type PropsType = {
    tlId: string
    tasks: TaskType[]
    removeTask: (todolistId: string, taskID: string) => void
    changeTaskCheckbox: (todolistId: string, taskID: string, newIsDone: boolean)=> void
    addEditTask: (todolistId: string, taskID: string, editInputTaskTitle: string) => void
}

export const MappedTasks: React.FC<PropsType> = (props) => {

    const mappedTasks = props.tasks.length
        ? props.tasks.map((t) => {

            const removeTaskHandler = () => {
                props.removeTask(props.tlId, t.taskId)
            }
            const changeTaskCheckboxHandler = (eCurrentTargetChecked: boolean) => {
                props.changeTaskCheckbox(props.tlId, t.taskId, eCurrentTargetChecked)
            }
            // добавляем таску из едитбл спана при блюре
            const addEditTaskHandler = (editInputTitle: string) => {
                props.addEditTask(props.tlId,t.taskId, editInputTitle)
            }

            return (
                    <li key={t.taskId}>
                        <SuperButton name={'x'} callBack={removeTaskHandler}/>
                        <SuperCheckbox checked={t.taskIsDone} onChangeCallBack={changeTaskCheckboxHandler} />
                        <EditableSpan oldTitle={t.taskTitle}
                                      callBack={addEditTaskHandler}
                        />
                    </li>
            )
        })
        : <span> create a task pls </span>

    return (
            <ul>
                {mappedTasks}
            </ul>
    );
};

