import { useNavigate } from "react-router-dom";
import { Button } from "../component/ui/Button";
import { BrainIcon } from "../icon/BrainIcon";

export function Landing() {
    const navigate = useNavigate();
    return <div className="bg-white ">
        <div className="flex justify-between p-4">
            <div>
                {<BrainIcon />}
            </div>
            <div className="flex justify between gap-4">
                <Button onClick={() => {
                    navigate("/signup")
                }} text="Signup" varient="primary" size="md" />
                <Button onClick={() => {
                    navigate("/signin")
                }} text="Signin" varient="primary" size="md" />
            </div>
        </div>
    </div>
}