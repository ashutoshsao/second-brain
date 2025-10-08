interface InputPros {
    placeholder: string
    onChange: () => void
}

export function Input({ placeholder, onChange }: InputPros) {
    return <input type="text" className="px-4 py-2 border rounded-lg my-2" onChange={onChange} placeholder={placeholder} />
}