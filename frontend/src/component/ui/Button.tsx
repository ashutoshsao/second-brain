import type { ReactElement } from "react";

interface ButtonProps {
    varient: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    maxWidth?: boolean
}

const buttonVarients = {
    "primary": "bg-indigo-600 text-white hover:bg-indigo-700",
    "secondary": "bg-indigo-100 text-indigo-600 hover:bg-indigo-200"
}

const sizeVarients = {
    "sm": "py-1 px-2 text-sm rounded-sm",
    "md": "py-2 px-4 text-base rounded-md",
    "lg": "py-4 px-6 text-xl rounded-xl"
}

const defaultVarients = "flex items-center font-light transition-all duration-300 cursor-pointer"



export const Button = ({ varient, size, onClick, startIcon, endIcon, text, maxWidth }: ButtonProps) => {
    return <button onClick={onClick} className={`${buttonVarients[varient]} ${sizeVarients[size]} ${defaultVarients} ${maxWidth ? "w-full justify-center items-center" : ""} `}>
        {startIcon}
        {text ? <div className="pl-2 pr-2">{text}</div> : null}
        {endIcon}
    </button>
}