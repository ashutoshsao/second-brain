import type { ReactElement } from "react";

interface ButtonProps {
    varient: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const buttonVarients = {
    "primary": "bg-indigo-500 text-indigo-200",
    "secondary": "bg-indigo-200 text-indigo-500"
}

const sizeVarients = {
    "sm": "py-1 px-2 text-sm rounded-sm",
    "md": "py-2 px-4 text-base rounded-md",
    "lg": "py-4 px-6 text-xl rounded-xl"
}

const defaultVarients = "flex"



export const Button = (props: ButtonProps) => {
    return <button onClick={props.onClick} className={`${buttonVarients[props.varient]} ${defaultVarients} ${sizeVarients[props.size]} flex items-center`}>
        {props.startIcon}
        <div className="pl-2 pr-2">{props.text}</div>
        {props.endIcon}
    </button>
}