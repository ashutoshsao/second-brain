import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import axios from "axios";

export function useContent() {
    const [contents, setContent] = useState([]);

    function Refresh() {
        axios.get(`${BACKEND_URL}/api/v1/content`, {
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        })
            .then((Response) => {
                setContent(Response.data.contents)
            })
    }

    useEffect(() => {
        const intervalId = setInterval(() => Refresh, 10 * 1000)
        return (clearInterval(intervalId))
    }, [])
    return { contents, Refresh }
}