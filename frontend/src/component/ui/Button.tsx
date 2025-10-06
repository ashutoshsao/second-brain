interface ButtonProps {
    varient: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: any;
    endIcon?: any;
    onClick: () => void;
}

const buttonVarients = {
    "primary": "bg-indigo-500 text-indigo-200",
    "secondary": "bg-indigo-200 text-indigo-500"
}

const sizeVarients = {
    "sm": "py-1 px-2",
    "md": "py-2 px-4",
    "lg": "py-4 px-6"
}

const defaultVarients = "flex flex-row rounded-md"



export const Button = (props: ButtonProps) => {
    return <button className={`${buttonVarients[props.varient]} ${defaultVarients} ${sizeVarients[props.size]}`}>
        {props.startIcon ? <div className="pr-2">{props.startIcon}</div> : null}{props.text}{props.endIcon}
    </button>
}