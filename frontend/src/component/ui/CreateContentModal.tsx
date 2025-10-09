import { useRef, useState } from "react"
import { CrossIcon } from "../../icon/CrossIcon"
import { Button } from "./Button"
import { Input } from "./Input"
import { YouTubeIcon } from "../../icon/YouTubeIcon"
import { TwitterIcon } from "../../icon/TwitterIcon"
import { DocumentIcon } from "../../icon/DocumentIcon"
import axios from "axios"
import { BACKEND_URL } from "../../config"

interface CreateContentProps {
    open: boolean
    onClose: () => void
}

enum ContentType {
    YouTube = "youtube",
    Twitter = "twitter",
    Document = "document"
}

export const CreateContentModal = ({ open, onClose }: CreateContentProps) => {
    const titleRef = useRef<HTMLInputElement>(null)
    const linkRef = useRef<HTMLInputElement>(null)
    const [type, setType] = useState(ContentType.Document)

    async function addContent() {
        const title = titleRef.current?.value
        const link = linkRef.current?.value
        await axios.post(`${BACKEND_URL}/api/v1/content`, {
            title,
            link,
            type
        }, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
    }

    return <div>
        {open && <div className="h-screen w-screen bg-gray-500/60 fixed top-0 left-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
                        <CrossIcon />
                    </div>
                </div>

                <div className="flex flex-col">
                    <Input reference={titleRef} placeholder="Title" onChange={() => { }} />
                    <Input reference={linkRef} placeholder="Link" onChange={() => { }} />
                </div>

                <div className="text-xl font-medium text-gray-700 flex justify-center pb-2">
                    Type
                </div>
                <div className="flex gap-2">
                    <Button maxWidth={true} onClick={() => { setType(ContentType.Document) }} size="md" startIcon={<DocumentIcon />} varient={type === ContentType.Document ? "primary" : "secondary"} />
                    <Button maxWidth={true} onClick={() => { setType(ContentType.YouTube) }} size="md" startIcon={<YouTubeIcon />} varient={type === ContentType.YouTube ? "primary" : "secondary"} />
                    <Button maxWidth={true} onClick={() => { setType(ContentType.Twitter) }} size="md" startIcon={<TwitterIcon />} varient={type === ContentType.Twitter ? "primary" : "secondary"} />
                </div>

                <div className="flex justify-center pt-2">
                    <Button onClick={addContent} varient="primary" size="md" text="Submit" />
                </div>
            </div>
        </div>}
    </div >
}