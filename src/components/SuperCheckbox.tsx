import React, {ChangeEvent} from "react";

type PropsType = {
    checked: boolean
    onChangeCallBack: (eCurrentTargetChecked: boolean) => void
}

export const SuperCheckbox: React.FC<PropsType> = (props) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChangeCallBack(e.currentTarget.checked)
    }

    return (
        <input type={"checkbox"} checked={props.checked} onChange={onChangeHandler}/>
    )
}