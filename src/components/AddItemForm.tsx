import React, {ChangeEvent, FC, KeyboardEvent, useState} from 'react';


type PropsType = {
    callBack: (inputTitle: string) => void

}

export const AddItemForm: FC<PropsType> = (props)=> {
    const {callBack}=props
    const [inputTitle, setInputTitle] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        error && setError('') // сетает только если ошибка тру
        setInputTitle(event.currentTarget.value)
    }

    const addItemHandler = () => {
        if (inputTitle.trim()) { // если обрезанный тайтл тру, то addTask
            callBack(inputTitle)
            setInputTitle('')
        } else {
            setError('напиши че-нить')
        }
        setInputTitle('')
    }
    const isAddTaskNotPossible = inputTitle.length === 0 || inputTitle.length > 20
    const onKeyDownHandler = isAddTaskNotPossible
        ? undefined
        : (event: KeyboardEvent<HTMLInputElement>) => event.key === 'Enter' && addItemHandler()

    return (
        <div>
            <input value={inputTitle}
                   onChange={onChangeInputHandler}
                   onKeyDown={onKeyDownHandler}
                   placeholder={'введи inputTitle, плез'}
            />
            <button onClick={addItemHandler}
                    disabled={isAddTaskNotPossible}
            >+</button>
            {error && <div>{error}</div>}
        </div>
    );
};

