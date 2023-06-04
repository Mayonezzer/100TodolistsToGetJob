import React, {ChangeEvent, FC, useState} from 'react';
import {SuperInput} from "./SuperInput";

type PropsType = {
    oldTitle: string
    callBack: (editInputTitle: string) => void
}

export const EditableSpan: FC<PropsType> = (props) => {
    const {oldTitle, callBack} = props

    const [edit, setEdit] = useState<boolean>(false)
    const [editInputTitle, setEditInputTitle] = useState<string>(oldTitle)
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setEditInputTitle(event.currentTarget.value)
    }
    const EditHandler = () => {
        setEdit(!edit)
        if (edit) {
            callBack(editInputTitle)
        }
    }



    return (
        edit
            ? <SuperInput inputValue={editInputTitle}
                          onChangeCallBack={onChangeInputHandler}
                          onBlurCallBack={EditHandler}
                          autoFocus={true}/>
            : <span onDoubleClick={EditHandler}>{oldTitle}</span>
    );
};

