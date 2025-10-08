import { Input } from "../component/ui/Input"
import { Button } from "../component/ui/Button"
export const Signup = () => {
    return <div>
        <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg flex flex-col">
                <Input placeholder="Username" onChange={() => { }} />
                <Input placeholder="Password" onChange={() => { }} />
                <div className="flex pt-2">
                    <Button varient="primary" size="md" text="Signup" maxWidth={true} />
                </div>
            </div>
        </div>
    </div >
}
export default Signup