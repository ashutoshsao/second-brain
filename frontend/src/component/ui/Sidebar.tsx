import { BrainIcon } from "../../icon/BrainIcon"
import { DocumentIcon } from "../../icon/DocumentIcon"
import { HashTagIcon } from "../../icon/HashTagIcon"
import { LinkIcon } from "../../icon/LinkIcon"
import { TwitterIcon } from "../../icon/TwitterIcon"
import { YouTubeIcon } from "../../icon/YouTubeIcon"
import { SidebarItem } from "./SidebarItem"

export const Sidebar = () => {
    return <div className="bg-white w-76 top-0 left-0 border-r border-gray-300">
        <div className="p-3 hover:bg-gray-100 transition-all duration-300 ">
            <span className="flex items-center cursor-pointer">
                <BrainIcon />
                <div className="pl-2 text-2xl font-semibold text-gray-700">
                    Second Brain
                </div>
            </span>
        </div>
        <SidebarItem icon={<TwitterIcon />} title="Tweets" />
        <SidebarItem icon={<YouTubeIcon />} title="Videos" />
        <SidebarItem icon={<DocumentIcon />} title="Documents" />
        <SidebarItem icon={<LinkIcon />} title="Links" />
        <SidebarItem icon={<HashTagIcon />} title="Tags" />
    </div>
}