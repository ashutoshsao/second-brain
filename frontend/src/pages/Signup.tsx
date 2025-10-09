import { Input } from "../component/ui/Input"
import { Button } from "../component/ui/Button"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
export const Signup = () => {

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    async function signup() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        })
        navigate("/signin")
        alert("you have signed up!")
    }

    return <div>
        <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg flex flex-col">
                <Input reference={usernameRef} placeholder="Username" onChange={() => { }} />
                <Input reference={passwordRef} placeholder="Password" onChange={() => { }} />
                <div className="flex pt-2">
                    <Button onClick={signup} varient="primary" size="md" text="Signup" maxWidth={true} />
                </div>
            </div>
        </div>
    </div >
}
export default Signup