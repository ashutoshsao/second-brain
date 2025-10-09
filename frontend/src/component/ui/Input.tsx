interface InputPros {
    placeholder: string
    onChange?: () => void
    reference?: any
}

export function Input({ placeholder, onChange, reference }: InputPros) {
    return <input ref={reference} type="text" className="px-4 py-2 border rounded-lg my-2" onChange={onChange} placeholder={placeholder} />
}