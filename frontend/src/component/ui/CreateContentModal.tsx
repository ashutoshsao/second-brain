import { CrossIcon } from "../../icon/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"

interface CreateContentProps {
    open: boolean
    onClose: () => void
}

export const CreateContentModal = ({ open, onClose }: CreateContentProps) => {
    return <div>
        {open && <div className="h-screen w-screen bg-gray-500/60 fixed top-0 left-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
                        <CrossIcon />
                    </div>
                </div>
                <div className="flex flex-col">
                    <Input placeholder="Title" onChange={() => { }} />
                    <Input placeholder="Link" onChange={() => { }} />
                </div>
                <div className="flex justify-center pt-2">
                    <Button varient="primary" size="md" text="Submit" onClick={() => { }} />
                </div>
            </div>
        </div>}
    </div >
}