import { Input } from "../component/ui/Input"
import { Button } from "../component/ui/Button"
import { useRef } from "react"
import { BACKEND_URL } from "../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const Signin = () => {
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()

    async function signin() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
            username,
            password
        })
        const token = response.data.token
        localStorage.setItem("token", token)
        navigate("/dashboard")
    }

    return <div>
        <div className="h-screen w-screen bg-gray-300 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg flex flex-col">
                <Input reference={usernameRef} placeholder="Username" />
                <Input reference={passwordRef} placeholder="Password" />
                <div className="flex pt-2">
                    <Button onClick={signin} varient="primary" size="md" text="Signin" maxWidth={true} />
                </div>
            </div>
        </div>
    </div >
}
export default Signin