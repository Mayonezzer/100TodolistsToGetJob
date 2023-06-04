import React from 'react';
import {FilterValuesType} from "../App";


type PropsType = {
    name: string
    callBack: () => void
    filter?: FilterValuesType
}

export const SuperButton: React.FC<PropsType> = (props) => {

    const onClickHandler = () => {
        props.callBack()
    }

    const buttonActiveClass = `${props.name === props.filter ? 'activeFilter' : ''}`

    return (
            <button className={buttonActiveClass} onClick={onClickHandler}>{props.name}</button>
    );
};