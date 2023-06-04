import React, {ChangeEvent, FC, KeyboardEvent} from 'react';

type PropsType = {
    inputValue: string
    placeholder?: string
    onChangeCallBack: (event: ChangeEvent<HTMLInputElement>) => void
    onKeyDownCallBack?: ((event: KeyboardEvent<HTMLInputElement>) => false | void) | undefined
    onBlurCallBack?: () => void
    autoFocus?: boolean
}

export const SuperInput: FC<PropsType> = (props) => {
    const {inputValue, placeholder, onChangeCallBack, onKeyDownCallBack, onBlurCallBack, autoFocus} = props
    return (
            <input
                value={inputValue}
                placeholder={placeholder}
                onChange={onChangeCallBack}
                onKeyDown={onKeyDownCallBack}
                onBlur={onBlurCallBack}
                autoFocus={autoFocus}
            />
    );
};
