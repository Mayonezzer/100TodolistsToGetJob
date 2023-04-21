import React, {ChangeEvent,KeyboardEvent} from 'react';

type PropsType = {
    value: string
    placeholder: string
    onChangeCallBack: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyDownCallBack: ((event: KeyboardEvent<HTMLInputElement>) => false | void) | undefined
}

export const SuperInput: React.FC<PropsType> = (props) => {
    return (
            <input
                value={props.value}
                placeholder={props.placeholder}
                onChange={props.onChangeCallBack}
                onKeyDown={props.onKeyDownCallBack}
            />
    );
};
