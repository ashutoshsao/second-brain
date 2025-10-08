import type { ReactElement } from "react"

interface SidebarItemProps {
    icon: ReactElement
    title: string
}

export const SidebarItem = ({ icon, title }: SidebarItemProps) => {
    return <div className="pl-6 p-4 text-gray-700 hover:bg-gray-100 transition-all duration-300 ">
        <span className="flex items-center cursor-pointer">
            {icon}
            <div className="pl-3 text-lg font-light">{title}</div>
        </span>
    </div>
}