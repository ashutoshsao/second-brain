import { BinIcon } from "../../icon/BinIcon"
import { DocumentIcon } from "../../icon/DocumentIcon"
import { ShareIcon } from "../../icon/ShareIcon"
import { TwitterIcon } from "../../icon/TwitterIcon";
import { YouTubeIcon } from "../../icon/YouTubeIcon";

interface CardProps {
    title: string;
    type: "youtube" | "twitter" | "document";
    link: string;
}
const typeTypes = {
    "youtube": <YouTubeIcon />,
    "document": <DocumentIcon />,
    "twitter": <TwitterIcon />
}

export const Card = ({ title, link, type }: CardProps) => {
    return <div>
        <div className="p-4 max-w-72 min-w-64 bg-white rounded-2xl shadow-sm border border-gray-300">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <div className="pr-2 text-gray-500">
                        {typeTypes[type]}
                    </div>
                    <div className="text-lg">
                        {title}
                    </div>
                </div>
                <div className="flex">
                    <div className="pl-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
                        <a href={link} target="_blank">
                            <ShareIcon />
                        </a>
                    </div>
                    <div className="pl-2 text-gray-500 hover:text-gray-700 transition-all duration-300">
                        <a href="">
                            <BinIcon />
                        </a>
                    </div>
                </div>
            </div>
            <div className="pt-4 flex justify-center">
                {type === "youtube" && < iframe className="w-full max-w-65 aspect-video" src={link.replace("watch", "embed").replace("?v=", "/")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                {type === "twitter" && <blockquote className="twitter-tweet w-full max-w-65">
                    <a href={link.replace("x.com", "twitter.com")}></a>
                </blockquote>}
            </div >
        </div >
    </div>
}