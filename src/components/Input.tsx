'use client';

import React from "react";


interface InputProps {
    type: string;
    placeholder: string;
    classes: string;
}

const Input = ({ type, placeholder, classes }: InputProps) => {
    return (
        <>
            <input type={type} placeholder={placeholder} className={classes} />
        </>
    )
}

export default Input;